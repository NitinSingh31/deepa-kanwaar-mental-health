import crypto from "crypto";
import { NextRequest } from "next/server";

// Stable server secret for HMAC token signing
const AUTH_SECRET =
  process.env.ADMIN_JWT_SECRET ||
  process.env.ADMIN_PASSWORD ||
  "dkm-deepa-kanwaar-secure-secret-2026-auth";

// Rate limiting state in memory (per serverless instance)
interface RateLimitRecord {
  attempts: number;
  firstAttemptAt: number;
  lockedUntil?: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    return { allowed: true };
  }

  // Check if currently locked out
  if (record.lockedUntil && record.lockedUntil > now) {
    const remaining = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, retryAfterSeconds: remaining };
  }

  // Reset window after 15 minutes of inactivity
  if (now - record.firstAttemptAt > 15 * 60 * 1000) {
    rateLimitMap.delete(ip);
    return { allowed: true };
  }

  if (record.attempts >= 5) {
    // Lock out for 15 minutes
    record.lockedUntil = now + 15 * 60 * 1000;
    return { allowed: false, retryAfterSeconds: 15 * 60 };
  }

  return { allowed: true };
}

export function recordFailedLogin(ip: string) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { attempts: 1, firstAttemptAt: now });
  } else {
    record.attempts += 1;
    if (record.attempts >= 5) {
      record.lockedUntil = now + 15 * 60 * 1000;
    }
  }
}

export function resetLoginAttempts(ip: string) {
  rateLimitMap.delete(ip);
}

// =================== PASSWORD HASHING ===================

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(":");
    if (!salt || !key) return false;
    const keyBuffer = Buffer.from(key, "hex");
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}

// =================== TOKEN SIGNING & VERIFICATION ===================

export interface AdminTokenPayload {
  role: "admin";
  exp: number; // Unix timestamp in ms
  jti: string; // Unique token ID
}

export function createAdminToken(durationHours: number = 24 * 7): string {
  const exp = Date.now() + durationHours * 60 * 60 * 1000;
  const payload: AdminTokenPayload = {
    role: "admin",
    exp,
    jti: crypto.randomUUID(),
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(encodedPayload)
    .digest("base64url");

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminToken(token: string | null | undefined): boolean {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [encodedPayload, signature] = parts;

  // Re-compute expected signature
  const expectedSignature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(encodedPayload)
    .digest("base64url");

  try {
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (sigBuffer.length !== expectedBuffer.length) return false;
    if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) return false;

    // Decode payload
    const decoded = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as AdminTokenPayload;

    if (decoded.role !== "admin") return false;
    if (Date.now() > decoded.exp) return false;

    return true;
  } catch {
    return false;
  }
}

export function verifyAdminRequest(request: NextRequest): boolean {
  // Check Authorization: Bearer <token>
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7).trim();
    if (verifyAdminToken(token)) return true;
  }

  // Also check cookie for convenience if set
  const cookieToken = request.cookies.get("dkm_admin_token")?.value;
  if (cookieToken && verifyAdminToken(cookieToken)) {
    return true;
  }

  return false;
}

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}
