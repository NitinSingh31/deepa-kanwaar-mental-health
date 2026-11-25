import { NextRequest, NextResponse } from "next/server";
import { getAppointments, saveAppointment, getBookedSlotsForDate, getSettings } from "@/lib/db";
import { Appointment } from "@/lib/types";
import { verifyAdminRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    if (!verifyAdminRequest(request)) {
      return NextResponse.json({ error: "Unauthorized access to patient records" }, { status: 401 });
    }
    const appointments = await getAppointments();
    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      clientName,
      clientEmail,
      clientPhone,
      sessionType,
      format,
      date,
      timeSlot,
      concerns,
      paymentMethod,
      isFreeConsultation,
    } = body;

    // Validation
    if (!clientName || !clientPhone || !date || !timeSlot) {
      return NextResponse.json({ error: "Missing required booking details (Name, Phone, Date, or Time)" }, { status: 400 });
    }

    // Check conflict
    const bookedSlots = await getBookedSlotsForDate(date);
    if (bookedSlots.includes(timeSlot)) {
      return NextResponse.json(
        { error: "The selected time slot was just booked by someone else. Please choose another slot." },
        { status: 409 }
      );
    }

    const settings = await getSettings();
    const id = `DKM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const isFree = Boolean(
      isFreeConsultation || 
      sessionType?.toLowerCase().includes("free") || 
      paymentMethod === "free"
    );

    const feeAmount = isFree ? 0 : settings.sessionFee;
    const finalPaymentMethod = isFree ? "online" : (paymentMethod === "online" ? "online" : "pay_later");
    const finalPaymentStatus = isFree ? "paid" : (paymentMethod === "online" ? "paid" : "pending_verification");
    const finalBookingStatus = isFree ? "confirmed" : (paymentMethod === "online" ? "confirmed" : "pending");

    const newAppointment: Appointment = {
      id,
      clientName: clientName.trim(),
      clientEmail: clientEmail?.trim() ? clientEmail.trim().toLowerCase() : "",
      clientPhone: clientPhone.trim(),
      sessionType: sessionType || (isFree ? "Free Consultation (15 Mins)" : "Individual Psychotherapy"),
      format: format === "in_person" ? "in_person" : "online",
      date,
      timeSlot,
      concerns: concerns?.trim() || "",
      fee: feeAmount,
      paymentMethod: finalPaymentMethod,
      paymentStatus: finalPaymentStatus,
      bookingStatus: finalBookingStatus,
      meetingLink:
        format === "online"
          ? `https://meet.google.com/dkm-${Math.random().toString(36).substring(2, 5)}-${Math.random().toString(36).substring(2, 5)}`
          : undefined,
      createdAt: new Date().toISOString(),
    };

    await saveAppointment(newAppointment);

    return NextResponse.json({
      success: true,
      message: isFree
        ? "Your Free Consultation is confirmed! Meeting details have been reserved."
        : paymentMethod === "online"
        ? "Your appointment is confirmed! Meeting details have been reserved."
        : "Your appointment request has been received! Please verify payment to lock your session.",
      appointment: newAppointment,
      upiDetails: isFree
        ? undefined
        : {
            upiId: settings.upiId,
            amount: settings.sessionFee,
            recipient: settings.doctorName,
            note: `Session Booking ${newAppointment.id}`,
          },
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
