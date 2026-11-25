import { NextRequest, NextResponse } from "next/server";
import { getAdminPasswordHash, saveAdminPasswordHash } from "@/lib/db";
import {
  verifyAdminRequest,
  hashPassword,
  verifyPassword,
  createAdminToken,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // 1. Verify that requester is currently authenticated
    if (!verifyAdminRequest(request)) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in first." },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current passcode and new passcode are required." },
        { status: 400 }
      );
    }

    if (typeof newPassword !== "string" || newPassword.trim().length < 6) {
      return NextResponse.json(
        { error: "New passcode must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const inputCurrent = currentPassword.trim();
    const inputNew = newPassword.trim();

    // 2. Validate current password against master or stored DB hash
    const masterPassword = (process.env.ADMIN_PASSWORD || "deepa2026").trim();
    let isCurrentValid = inputCurrent === masterPassword;

    if (!isCurrentValid) {
      const storedHash = await getAdminPasswordHash();
      if (storedHash && verifyPassword(inputCurrent, storedHash)) {
        isCurrentValid = true;
      }
    }

    if (!isCurrentValid) {
      return NextResponse.json(
        { error: "Current passcode is incorrect. Passcode was not changed." },
        { status: 403 }
      );
    }

    // 3. Hash the new password and save to Neon database
    const newHash = hashPassword(inputNew);
    const saved = await saveAdminPasswordHash(newHash);

    if (!saved) {
      return NextResponse.json(
        { error: "Failed to persist new passcode to database." },
        { status: 500 }
      );
    }

    // 4. Issue a new signed session token
    const newToken = createAdminToken(24 * 7);

    const response = NextResponse.json({
      success: true,
      message: "Passcode updated successfully! Your new passcode is now active.",
      token: newToken,
    });

    response.cookies.set("dkm_admin_token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json({ error: "Failed to change passcode" }, { status: 500 });
  }
}
