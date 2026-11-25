import { NextRequest, NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    if (!verifyAdminRequest(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const settings = await getSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    if (!verifyAdminRequest(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const updates: Record<string, any> = {};

    if (body.sessionFee !== undefined) {
      const fee = Number(body.sessionFee);
      if (isNaN(fee) || fee < 0) {
        return NextResponse.json({ error: "Session fee must be a valid positive number" }, { status: 400 });
      }
      updates.sessionFee = fee;
    }

    if (body.upiId !== undefined && typeof body.upiId === "string") {
      updates.upiId = body.upiId.trim();
    }

    if (body.whatsappNumber !== undefined && typeof body.whatsappNumber === "string") {
      updates.whatsappNumber = body.whatsappNumber.trim();
    }

    const updated = await updateSettings(updates);

    return NextResponse.json({
      success: true,
      message: "Clinic settings updated successfully!",
      settings: updated,
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
