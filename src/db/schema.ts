import { pgTable, text, varchar, integer, timestamp, json } from "drizzle-orm/pg-core";

export const appointments = pgTable("appointments", {
  id: varchar("id", { length: 64 }).primaryKey(),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").default(""),
  clientPhone: varchar("client_phone", { length: 32 }).notNull(),
  sessionType: text("session_type").notNull(),
  format: varchar("format", { length: 32 }).notNull().default("online"), // 'online' | 'in_person'
  date: varchar("date", { length: 32 }).notNull(), // 'YYYY-MM-DD'
  timeSlot: varchar("time_slot", { length: 64 }).notNull(), // e.g. '10:00 AM - 11:00 AM'
  concerns: text("concerns").default(""),
  fee: integer("fee").notNull().default(2100),
  paymentMethod: varchar("payment_method", { length: 32 }).notNull().default("online"), // 'online' | 'pay_later'
  paymentStatus: varchar("payment_status", { length: 32 }).notNull().default("pending_verification"), // 'paid' | 'pending_verification' | 'unpaid'
  bookingStatus: varchar("booking_status", { length: 32 }).notNull().default("pending"), // 'confirmed' | 'pending' | 'completed' | 'cancelled'
  meetingLink: text("meeting_link"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const clinicSettings = pgTable("clinic_settings", {
  id: integer("id").primaryKey().default(1),
  doctorName: text("doctor_name").notNull().default("Deepa Kanwaar"),
  title: text("title").notNull().default("Counselling Psychologist & Allied Health Provider"),
  sessionFee: integer("session_fee").notNull().default(2100),
  upiId: text("upi_id").notNull().default("deepakanwaar.therapy@oksbi"),
  whatsappNumber: varchar("whatsapp_number", { length: 32 }).notNull().default("+919877408869"),
  clinicAddress: text("clinic_address").notNull().default("Purely Online Consultations (Google Meet Worldwide)"),
  workingDays: json("working_days").$type<number[]>().notNull().default([1, 2, 3, 4, 5, 6]),
  availableSlots: json("available_slots").$type<string[]>().notNull().default([
    "10:00 AM - 11:00 AM",
    "11:30 AM - 12:30 PM",
    "02:00 PM - 03:00 PM",
    "03:30 PM - 04:30 PM",
    "05:00 PM - 06:00 PM",
    "06:30 PM - 07:30 PM",
  ]),
  adminPasswordHash: text("admin_password_hash"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type AppointmentRow = typeof appointments.$inferSelect;
export type NewAppointmentRow = typeof appointments.$inferInsert;
export type ClinicSettingsRow = typeof clinicSettings.$inferSelect;
