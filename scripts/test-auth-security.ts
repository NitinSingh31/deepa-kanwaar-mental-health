import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createAdminToken, verifyAdminToken, hashPassword, verifyPassword, checkRateLimit, recordFailedLogin, resetLoginAttempts } from "../src/lib/auth";
import { getAdminPasswordHash, saveAdminPasswordHash } from "../src/lib/db";

async function verifyAuthSecurity() {
  console.log("=== VERIFYING ADMIN PORTAL SECURITY & PASSWORD CHANGE ===");

  // 1. Test token creation and verification
  const token = createAdminToken(1);
  console.log("1. Created signed HMAC token:", token.substring(0, 30) + "...");
  const isValid = verifyAdminToken(token);
  console.log("✓ Token verification:", isValid ? "PASS" : "FAIL");
  if (!isValid) throw new Error("Token verification failed");

  // Tampered token test
  const tamperedToken = token.slice(0, -4) + "XXXX";
  const isTamperedValid = verifyAdminToken(tamperedToken);
  console.log("✓ Tampered token rejection:", !isTamperedValid ? "PASS (Properly rejected)" : "FAIL");
  if (isTamperedValid) throw new Error("Tampered token was accepted!");

  // 2. Test password hashing & verification
  const testPassword = "DoctorDeepaSecret2026!";
  const hash = hashPassword(testPassword);
  console.log("2. Generated password hash with salt:", hash.substring(0, 30) + "...");
  const isPassValid = verifyPassword(testPassword, hash);
  console.log("✓ Password hash check:", isPassValid ? "PASS" : "FAIL");
  if (!isPassValid) throw new Error("Password verification failed");

  const isWrongValid = verifyPassword("WrongPassword123", hash);
  console.log("✓ Wrong password rejection:", !isWrongValid ? "PASS" : "FAIL");
  if (isWrongValid) throw new Error("Wrong password was accepted!");

  // 3. Test saving password hash to Neon PostgreSQL
  console.log("3. Saving custom password hash to Neon DB...");
  const saved = await saveAdminPasswordHash(hash);
  console.log("✓ Saved to database:", saved ? "PASS" : "FAIL");

  const retrievedHash = await getAdminPasswordHash();
  console.log("✓ Retrieved hash from database matches:", retrievedHash === hash ? "PASS" : "FAIL");
  if (retrievedHash !== hash) throw new Error("Retrieved hash does not match saved hash!");

  // 4. Test rate-limiting brute force protection
  console.log("4. Testing brute-force lockout protection...");
  const testIp = "192.0.2.100";
  resetLoginAttempts(testIp);
  for (let i = 0; i < 5; i++) {
    recordFailedLogin(testIp);
  }
  const rateLimitStatus = checkRateLimit(testIp);
  console.log("✓ 5 failed attempts triggered lockout:", !rateLimitStatus.allowed ? `PASS (Locked for ${rateLimitStatus.retryAfterSeconds}s)` : "FAIL");
  if (rateLimitStatus.allowed) throw new Error("Rate limit did not lock out after 5 failures!");

  resetLoginAttempts(testIp);

  console.log("\n=== ALL SECURITY CHECKS PASSED WITH 100% SUCCESS ===");
}

verifyAuthSecurity()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Test failed:", err);
    process.exit(1);
  });
