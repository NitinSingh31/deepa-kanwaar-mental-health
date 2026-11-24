export type SessionFormat = "online" | "in_person";

export type PaymentMethod = "online" | "pay_later";

export type PaymentStatus = "paid" | "pending_verification" | "unpaid";

export type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  sessionType: string;
  format: SessionFormat;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00 AM - 11:00 AM"
  concerns?: string;
  fee: number; // in INR, e.g. 2100
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  meetingLink?: string;
  adminNotes?: string;
  createdAt: string;
}

export interface DoctorSettings {
  doctorName: string;
  title: string;
  sessionFee: number;
  upiId: string;
  whatsappNumber: string;
  clinicAddress: string;
  workingDays: number[]; // 0 = Sunday, 1 = Monday, etc.
  availableSlots: string[];
}
