import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.ADMIN_PASSWORD || "deepa2026";

    if (password === correctPassword) {
      return NextResponse.json({ success: true, token: "dkm-auth-token-verified" });
    }

    return NextResponse.json({ success: false, error: "Incorrect passcode" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
