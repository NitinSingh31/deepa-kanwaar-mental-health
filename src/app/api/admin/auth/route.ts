import { NextRequest, NextResponse } from "next/server";
import { getAdminPasswordHash } from "@/lib/db";
import {
  checkRateLimit,
  recordFailedLogin,
  resetLoginAttempts,
  verifyPassword,
  createAdminToken,
  getClientIp,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    // 1. Check rate limit
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many failed login attempts. Access is locked for security. Please try again in ${rateLimit.retryAfterSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    const { password } = await request.json();
    if (!password || typeof password !== "string") {
      return NextResponse.json({ success: false, error: "Passcode is required" }, { status: 400 });
    }

    const inputPassword = password.trim();

    // 2. Master developer password from environment
    const masterPassword = (process.env.ADMIN_PASSWORD || "deepa2026").trim();
    let isAuthorized = inputPassword === masterPassword;

    // 3. Check custom database password if master didn't match
    if (!isAuthorized) {
      const storedHash = await getAdminPasswordHash();
      if (storedHash && verifyPassword(inputPassword, storedHash)) {
        isAuthorized = true;
      }
    }

    if (isAuthorized) {
      // Reset rate limit on success
      resetLoginAttempts(ip);

      // Generate cryptographically signed token valid for 7 days
      const token = createAdminToken(24 * 7);

      const response = NextResponse.json({
        success: true,
        token,
        message: "Authentication successful",
      });

      // Also set HTTP-only cookie for enhanced security
      response.cookies.set("dkm_admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      });

      return response;
    }

    // Record failure
    recordFailedLogin(ip);
    return NextResponse.json(
      { success: false, error: "Incorrect passcode. Access is restricted." },
      { status: 401 }
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
