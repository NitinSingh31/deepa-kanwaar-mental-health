import { NextRequest, NextResponse } from "next/server";
import { getSettings, getBookedSlotsForDate } from "@/lib/db";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Date parameter is required" }, { status: 400 });
  }

  try {
    const targetDate = new Date(date + "T00:00:00");
    const dayOfWeek = targetDate.getDay();

    const settings = getSettings();

    // Check if the doctor works on this day
    if (!settings.workingDays.includes(dayOfWeek)) {
      return NextResponse.json({
        available: false,
        message: "Doctor does not take consultations on this day.",
        slots: [],
      });
    }

    const bookedSlots = getBookedSlotsForDate(date);
    const slots = settings.availableSlots.map((slot) => ({
      slot,
      isAvailable: !bookedSlots.includes(slot),
    }));

    return NextResponse.json({
      available: true,
      date,
      slots,
      fee: settings.sessionFee,
    });
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_")) {
      throw error;
    }
    console.error("Error fetching availability:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
