import fs from "fs";
import path from "path";
import { eq, desc, and, ne } from "drizzle-orm";
import { getDb } from "@/db";
import { appointments as appointmentsTable, clinicSettings as clinicSettingsTable } from "@/db/schema";
import { Appointment, DoctorSettings, SessionFormat, PaymentMethod, PaymentStatus, BookingStatus } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const APPOINTMENTS_FILE = path.join(DATA_DIR, "appointments.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

export const DEFAULT_SETTINGS: DoctorSettings = {
  doctorName: "Deepa Kanwaar",
  title: "Counselling Psychologist & Allied Health Provider",
  sessionFee: 2100,
  upiId: "deepakanwaar.therapy@oksbi",
  whatsappNumber: "+919877408869",
  clinicAddress: "Purely Online Consultations (Google Meet Worldwide)",
  workingDays: [1, 2, 3, 4, 5, 6], // Mon - Sat
  availableSlots: [
    "10:00 AM - 11:00 AM",
    "11:30 AM - 12:30 PM",
    "02:00 PM - 03:00 PM",
    "03:30 PM - 04:30 PM",
    "05:00 PM - 06:00 PM",
    "06:30 PM - 07:30 PM",
  ],
};

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// =================== SETTINGS ===================

export async function getSettings(): Promise<DoctorSettings> {
  const db = getDb();
  if (db) {
    try {
      const rows = await db
        .select()
        .from(clinicSettingsTable)
        .where(eq(clinicSettingsTable.id, 1))
        .limit(1);

      if (rows.length > 0) {
        const row = rows[0];
        return {
          doctorName: row.doctorName,
          title: row.title,
          sessionFee: row.sessionFee,
          upiId: row.upiId,
          whatsappNumber: row.whatsappNumber,
          clinicAddress: row.clinicAddress,
          workingDays: row.workingDays || DEFAULT_SETTINGS.workingDays,
          availableSlots: row.availableSlots || DEFAULT_SETTINGS.availableSlots,
        };
      } else {
        // Seed default settings row if table is empty
        await db.insert(clinicSettingsTable).values({
          id: 1,
          doctorName: DEFAULT_SETTINGS.doctorName,
          title: DEFAULT_SETTINGS.title,
          sessionFee: DEFAULT_SETTINGS.sessionFee,
          upiId: DEFAULT_SETTINGS.upiId,
          whatsappNumber: DEFAULT_SETTINGS.whatsappNumber,
          clinicAddress: DEFAULT_SETTINGS.clinicAddress,
          workingDays: DEFAULT_SETTINGS.workingDays,
          availableSlots: DEFAULT_SETTINGS.availableSlots,
        });
        return DEFAULT_SETTINGS;
      }
    } catch (err) {
      console.warn("Neon DB query failed, falling back to local storage:", err);
    }
  }

  // Fallback to local JSON
  ensureDataDir();
  if (!fs.existsSync(SETTINGS_FILE)) {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2), "utf8");
    return DEFAULT_SETTINGS;
  }
  try {
    const raw = fs.readFileSync(SETTINGS_FILE, "utf8");
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function updateSettings(newSettings: Partial<DoctorSettings>): Promise<DoctorSettings> {
  const db = getDb();
  if (db) {
    try {
      await db
        .update(clinicSettingsTable)
        .set({
          ...newSettings,
          updatedAt: new Date(),
        })
        .where(eq(clinicSettingsTable.id, 1));
      return await getSettings();
    } catch (err) {
      console.warn("Neon DB update failed, falling back to local storage:", err);
    }
  }

  ensureDataDir();
  const current = await getSettings();
  const updated = { ...current, ...newSettings };
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2), "utf8");
  return updated;
}

export async function getAdminPasswordHash(): Promise<string | null> {
  const db = getDb();
  if (db) {
    try {
      const rows = await db
        .select({ hash: clinicSettingsTable.adminPasswordHash })
        .from(clinicSettingsTable)
        .where(eq(clinicSettingsTable.id, 1))
        .limit(1);
      if (rows.length > 0 && rows[0].hash) {
        return rows[0].hash;
      }
    } catch (err) {
      console.warn("Neon DB getAdminPasswordHash failed:", err);
    }
  }

  // Fallback to local settings file
  ensureDataDir();
  if (fs.existsSync(SETTINGS_FILE)) {
    try {
      const raw = fs.readFileSync(SETTINGS_FILE, "utf8");
      const data = JSON.parse(raw);
      return data.adminPasswordHash || null;
    } catch {
      return null;
    }
  }
  return null;
}

export async function saveAdminPasswordHash(hash: string): Promise<boolean> {
  const db = getDb();
  if (db) {
    try {
      await db
        .update(clinicSettingsTable)
        .set({
          adminPasswordHash: hash,
          updatedAt: new Date(),
        })
        .where(eq(clinicSettingsTable.id, 1));
      return true;
    } catch (err) {
      console.warn("Neon DB saveAdminPasswordHash failed:", err);
    }
  }

  // Fallback to local settings file
  ensureDataDir();
  try {
    const raw = fs.existsSync(SETTINGS_FILE) ? fs.readFileSync(SETTINGS_FILE, "utf8") : "{}";
    const data = JSON.parse(raw);
    data.adminPasswordHash = hash;
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch {
    return false;
  }
}

// =================== APPOINTMENTS ===================

export async function getAppointments(): Promise<Appointment[]> {
  const db = getDb();
  if (db) {
    try {
      const rows = await db
        .select()
        .from(appointmentsTable)
        .orderBy(desc(appointmentsTable.createdAt));

      return rows.map((r) => ({
        id: r.id,
        clientName: r.clientName,
        clientEmail: r.clientEmail || "",
        clientPhone: r.clientPhone,
        sessionType: r.sessionType,
        format: (r.format || "online") as SessionFormat,
        date: r.date,
        timeSlot: r.timeSlot,
        concerns: r.concerns || "",
        fee: r.fee,
        paymentMethod: (r.paymentMethod || "online") as PaymentMethod,
        paymentStatus: (r.paymentStatus || "pending_verification") as PaymentStatus,
        bookingStatus: (r.bookingStatus || "pending") as BookingStatus,
        meetingLink: r.meetingLink || undefined,
        adminNotes: r.adminNotes || undefined,
        createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
      }));
    } catch (err) {
      console.warn("Neon DB getAppointments failed, falling back to local storage:", err);
    }
  }

  // Fallback to local JSON
  ensureDataDir();
  if (!fs.existsSync(APPOINTMENTS_FILE)) {
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify([], null, 2), "utf8");
    return [];
  }
  try {
    const raw = fs.readFileSync(APPOINTMENTS_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function saveAppointment(appointment: Appointment): Promise<Appointment> {
  const db = getDb();
  if (db) {
    try {
      const existing = await db
        .select()
        .from(appointmentsTable)
        .where(eq(appointmentsTable.id, appointment.id))
        .limit(1);

      if (existing.length > 0) {
        await db
          .update(appointmentsTable)
          .set({
            clientName: appointment.clientName,
            clientEmail: appointment.clientEmail || "",
            clientPhone: appointment.clientPhone,
            sessionType: appointment.sessionType,
            format: appointment.format,
            date: appointment.date,
            timeSlot: appointment.timeSlot,
            concerns: appointment.concerns || "",
            fee: appointment.fee,
            paymentMethod: appointment.paymentMethod,
            paymentStatus: appointment.paymentStatus,
            bookingStatus: appointment.bookingStatus,
            meetingLink: appointment.meetingLink,
            adminNotes: appointment.adminNotes,
            updatedAt: new Date(),
          })
          .where(eq(appointmentsTable.id, appointment.id));
      } else {
        await db.insert(appointmentsTable).values({
          id: appointment.id,
          clientName: appointment.clientName,
          clientEmail: appointment.clientEmail || "",
          clientPhone: appointment.clientPhone,
          sessionType: appointment.sessionType,
          format: appointment.format,
          date: appointment.date,
          timeSlot: appointment.timeSlot,
          concerns: appointment.concerns || "",
          fee: appointment.fee,
          paymentMethod: appointment.paymentMethod,
          paymentStatus: appointment.paymentStatus,
          bookingStatus: appointment.bookingStatus,
          meetingLink: appointment.meetingLink,
          adminNotes: appointment.adminNotes,
          createdAt: new Date(appointment.createdAt || Date.now()),
          updatedAt: new Date(),
        });
      }
      return appointment;
    } catch (err) {
      console.warn("Neon DB saveAppointment failed, falling back to local storage:", err);
    }
  }

  // Fallback to local JSON
  ensureDataDir();
  const appointments = await getAppointments();
  const existingIndex = appointments.findIndex((a) => a.id === appointment.id);

  if (existingIndex >= 0) {
    appointments[existingIndex] = appointment;
  } else {
    appointments.unshift(appointment);
  }

  fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2), "utf8");
  return appointment;
}

export async function updateAppointment(id: string, updates: Partial<Appointment>): Promise<Appointment | null> {
  const db = getDb();
  if (db) {
    try {
      const dbUpdates: Record<string, any> = { updatedAt: new Date() };
      if (updates.clientName !== undefined) dbUpdates.clientName = updates.clientName;
      if (updates.clientEmail !== undefined) dbUpdates.clientEmail = updates.clientEmail;
      if (updates.clientPhone !== undefined) dbUpdates.clientPhone = updates.clientPhone;
      if (updates.sessionType !== undefined) dbUpdates.sessionType = updates.sessionType;
      if (updates.format !== undefined) dbUpdates.format = updates.format;
      if (updates.date !== undefined) dbUpdates.date = updates.date;
      if (updates.timeSlot !== undefined) dbUpdates.timeSlot = updates.timeSlot;
      if (updates.concerns !== undefined) dbUpdates.concerns = updates.concerns;
      if (updates.fee !== undefined) dbUpdates.fee = updates.fee;
      if (updates.paymentMethod !== undefined) dbUpdates.paymentMethod = updates.paymentMethod;
      if (updates.paymentStatus !== undefined) dbUpdates.paymentStatus = updates.paymentStatus;
      if (updates.bookingStatus !== undefined) dbUpdates.bookingStatus = updates.bookingStatus;
      if (updates.meetingLink !== undefined) dbUpdates.meetingLink = updates.meetingLink;
      if (updates.adminNotes !== undefined) dbUpdates.adminNotes = updates.adminNotes;

      await db
        .update(appointmentsTable)
        .set(dbUpdates)
        .where(eq(appointmentsTable.id, id));

      const updatedRows = await db
        .select()
        .from(appointmentsTable)
        .where(eq(appointmentsTable.id, id))
        .limit(1);

      if (updatedRows.length > 0) {
        const r = updatedRows[0];
        return {
          id: r.id,
          clientName: r.clientName,
          clientEmail: r.clientEmail || "",
          clientPhone: r.clientPhone,
          sessionType: r.sessionType,
          format: (r.format || "online") as SessionFormat,
          date: r.date,
          timeSlot: r.timeSlot,
          concerns: r.concerns || "",
          fee: r.fee,
          paymentMethod: (r.paymentMethod || "online") as PaymentMethod,
          paymentStatus: (r.paymentStatus || "pending_verification") as PaymentStatus,
          bookingStatus: (r.bookingStatus || "pending") as BookingStatus,
          meetingLink: r.meetingLink || undefined,
          adminNotes: r.adminNotes || undefined,
          createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
        };
      }
    } catch (err) {
      console.warn("Neon DB updateAppointment failed, falling back to local storage:", err);
    }
  }

  // Fallback to local JSON
  ensureDataDir();
  const appointments = await getAppointments();
  const index = appointments.findIndex((a) => a.id === id);
  if (index === -1) return null;

  appointments[index] = { ...appointments[index], ...updates };
  fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2), "utf8");
  return appointments[index];
}

export async function deleteAppointment(id: string): Promise<boolean> {
  const db = getDb();
  if (db) {
    try {
      await db
        .delete(appointmentsTable)
        .where(eq(appointmentsTable.id, id));
      return true;
    } catch (err) {
      console.warn("Neon DB deleteAppointment failed, falling back to local storage:", err);
    }
  }

  // Fallback to local JSON
  ensureDataDir();
  const appointments = await getAppointments();
  const filtered = appointments.filter((a) => a.id !== id);
  if (filtered.length === appointments.length) return false;

  fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(filtered, null, 2), "utf8");
  return true;
}

export async function getBookedSlotsForDate(dateStr: string): Promise<string[]> {
  const db = getDb();
  if (db) {
    try {
      const rows = await db
        .select({ timeSlot: appointmentsTable.timeSlot })
        .from(appointmentsTable)
        .where(
          and(
            eq(appointmentsTable.date, dateStr),
            ne(appointmentsTable.bookingStatus, "cancelled")
          )
        );

      return rows.map((r) => r.timeSlot);
    } catch (err) {
      console.warn("Neon DB getBookedSlotsForDate failed, falling back to local storage:", err);
    }
  }

  // Fallback to local JSON
  const appointments = await getAppointments();
  return appointments
    .filter(
      (a) =>
        a.date === dateStr &&
        a.bookingStatus !== "cancelled"
    )
    .map((a) => a.timeSlot);
}
