import fs from "fs";
import path from "path";
import { Appointment, DoctorSettings } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const APPOINTMENTS_FILE = path.join(DATA_DIR, "appointments.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

const DEFAULT_SETTINGS: DoctorSettings = {
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

const INITIAL_APPOINTMENTS: Appointment[] = [];

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getSettings(): DoctorSettings {
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

export function updateSettings(newSettings: Partial<DoctorSettings>): DoctorSettings {
  ensureDataDir();
  const current = getSettings();
  const updated = { ...current, ...newSettings };
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2), "utf8");
  return updated;
}

export function getAppointments(): Appointment[] {
  ensureDataDir();
  if (!fs.existsSync(APPOINTMENTS_FILE)) {
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(INITIAL_APPOINTMENTS, null, 2), "utf8");
    return INITIAL_APPOINTMENTS;
  }
  try {
    const raw = fs.readFileSync(APPOINTMENTS_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveAppointment(appointment: Appointment): Appointment {
  ensureDataDir();
  const appointments = getAppointments();
  const existingIndex = appointments.findIndex((a) => a.id === appointment.id);

  if (existingIndex >= 0) {
    appointments[existingIndex] = appointment;
  } else {
    appointments.unshift(appointment);
  }

  fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2), "utf8");
  return appointment;
}

export function updateAppointment(id: string, updates: Partial<Appointment>): Appointment | null {
  ensureDataDir();
  const appointments = getAppointments();
  const index = appointments.findIndex((a) => a.id === id);
  if (index === -1) return null;

  appointments[index] = { ...appointments[index], ...updates };
  fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2), "utf8");
  return appointments[index];
}

export function deleteAppointment(id: string): boolean {
  ensureDataDir();
  const appointments = getAppointments();
  const filtered = appointments.filter((a) => a.id !== id);
  if (filtered.length === appointments.length) return false;

  fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(filtered, null, 2), "utf8");
  return true;
}

export function getBookedSlotsForDate(dateStr: string): string[] {
  const appointments = getAppointments();
  return appointments
    .filter(
      (a) =>
        a.date === dateStr &&
        a.bookingStatus !== "cancelled"
    )
    .map((a) => a.timeSlot);
}
