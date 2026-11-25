import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { getSettings, getAppointments, saveAppointment, updateAppointment, deleteAppointment, getBookedSlotsForDate } from "../src/lib/db";
import { isDatabaseConfigured, getDb } from "../src/db";
import { Appointment } from "../src/lib/types";

async function runE2ETest() {
  console.log("=== NEON DATABASE END-TO-END VERIFICATION ===");
  console.log("Database configured:", isDatabaseConfigured());
  console.log("Database URL host:", process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL.replace("postgresql://", "http://")).hostname : "None");

  const db = getDb();
  if (!db) {
    throw new Error("Neon Database is NOT configured properly!");
  }

  // 1. Test getSettings
  console.log("\n[Test 1] Testing getSettings() against Neon...");
  const settings = await getSettings();
  console.log("✓ Settings retrieved successfully:", {
    doctorName: settings.doctorName,
    title: settings.title,
    sessionFee: settings.sessionFee,
    whatsappNumber: settings.whatsappNumber,
  });

  // 2. Test saveAppointment (Insert)
  const testId = `TEST-E2E-${Date.now()}`;
  const testAppt: Appointment = {
    id: testId,
    clientName: "Deepa E2E Test Patient",
    clientEmail: "test.patient@example.com",
    clientPhone: "+919877408869",
    sessionType: "Individual Psychotherapy",
    format: "online",
    date: "2026-12-01",
    timeSlot: "10:00 AM - 11:00 AM",
    concerns: "End-to-end verification of Neon Postgres integration",
    fee: 2100,
    paymentMethod: "online",
    paymentStatus: "paid",
    bookingStatus: "confirmed",
    meetingLink: "https://meet.google.com/dkm-test-link",
    createdAt: new Date().toISOString(),
  };

  console.log(`\n[Test 2] Inserting test appointment (${testId}) into Neon...`);
  await saveAppointment(testAppt);
  console.log("✓ Appointment inserted successfully!");

  // 3. Test getAppointments & getBookedSlotsForDate
  console.log("\n[Test 3] Reading appointments from Neon...");
  const appts = await getAppointments();
  const found = appts.find((a) => a.id === testId);
  if (!found) throw new Error("Inserted appointment not found in Neon!");
  console.log("✓ Found inserted appointment in Neon:", {
    id: found.id,
    clientName: found.clientName,
    date: found.date,
    timeSlot: found.timeSlot,
    status: found.bookingStatus,
  });

  const bookedSlots = await getBookedSlotsForDate("2026-12-01");
  console.log("✓ Booked slots for 2026-12-01:", bookedSlots);
  if (!bookedSlots.includes("10:00 AM - 11:00 AM")) {
    throw new Error("Booked slot not reflected in getBookedSlotsForDate!");
  }

  // 4. Test updateAppointment
  console.log(`\n[Test 4] Updating appointment status in Neon...`);
  const updated = await updateAppointment(testId, { bookingStatus: "completed" });
  if (updated?.bookingStatus !== "completed") throw new Error("Update failed!");
  console.log("✓ Appointment updated successfully:", { id: updated.id, status: updated.bookingStatus });

  // 5. Test deleteAppointment (Clean up)
  console.log(`\n[Test 5] Cleaning up test appointment from Neon...`);
  const deleted = await deleteAppointment(testId);
  if (!deleted) throw new Error("Delete failed!");
  console.log("✓ Test appointment deleted successfully.");

  const verifyAppts = await getAppointments();
  const stillExists = verifyAppts.some((a) => a.id === testId);
  if (stillExists) throw new Error("Appointment still exists after deletion!");
  console.log("✓ Verified appointment removed from Neon. Database is clean.");

  console.log("\n=== ALL NEON INTEGRATION TESTS PASSED PERFECTLY ===");
}

runE2ETest()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Test failed:", err);
    process.exit(1);
  });
