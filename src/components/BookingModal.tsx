"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  MapPin, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  Loader2,
  ExternalLink,
  MessageCircle,
  Sparkles
} from "lucide-react";
import { Appointment } from "@/lib/types";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  isFreeConsultationDefault?: boolean;
}

export default function BookingModal({
  isOpen,
  onClose,
  preselectedService = "Psychotherapy",
  isFreeConsultationDefault = false,
}: BookingModalProps) {
  // Step state: 1 = Details & Date/Time, 2 = Intake Info, 3 = Payment Method, 4 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Consultation Tier: Free Consultation (15 Mins) vs Full Session (60 Mins, ₹2,100)
  const [isFreeConsult, setIsFreeConsult] = useState(isFreeConsultationDefault);

  // Form State
  const [format, setFormat] = useState<"online" | "in_person">("online");
  const [sessionType, setSessionType] = useState(preselectedService);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  
  // Available slots fetched from API
  const [slots, setSlots] = useState<{ slot: string; isAvailable: boolean }[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Intake State
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [concerns, setConcerns] = useState("");

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<"online" | "pay_later">("online");
  const [onlinePaymentType, setOnlinePaymentType] = useState<"upi" | "card" | "netbanking">("upi");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Confirmed Appointment Result
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);
  const [minDate, setMinDate] = useState<string>("");

  // Sync preselectedService & isFreeConsultationDefault
  useEffect(() => {
    if (isOpen) {
      setIsFreeConsult(isFreeConsultationDefault);
    }
  }, [isOpen, isFreeConsultationDefault]);

  useEffect(() => {
    if (preselectedService) {
      setSessionType(preselectedService);
    }
  }, [preselectedService]);

  // Set default date and minDate on mount
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setMinDate(`${yyyy}-${mm}-${dd}`);

    if (!selectedDate) {
      const tomorrow = new Date(Date.now() + 86400000);
      const tyyyy = tomorrow.getFullYear();
      const tmm = String(tomorrow.getMonth() + 1).padStart(2, "0");
      const tdd = String(tomorrow.getDate()).padStart(2, "0");
      setSelectedDate(`${tyyyy}-${tmm}-${tdd}`);
    }
  }, [selectedDate]);

  // Fetch slots whenever date changes
  useEffect(() => {
    if (!selectedDate) return;
    async function fetchSlots() {
      setLoadingSlots(true);
      setErrorMsg("");
      try {
        const res = await fetch(`/api/availability?date=${selectedDate}`);
        const data = await res.json();
        if (data.slots) {
          setSlots(data.slots);
          // Auto select first available slot
          const firstAvailable = data.slots.find((s: { isAvailable: boolean }) => s.isAvailable);
          if (firstAvailable) {
            setSelectedSlot(firstAvailable.slot);
          } else {
            setSelectedSlot("");
          }
        } else {
          setSlots([]);
          setSelectedSlot("");
        }
      } catch (err) {
        console.error("Failed to fetch slots", err);
      } finally {
        setLoadingSlots(false);
      }
    }
    fetchSlots();
  }, [selectedDate]);

  const resetAndClose = () => {
    setStep(1);
    setConfirmedBooking(null);
    setErrorMsg("");
    onClose();
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        resetAndClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      setErrorMsg("Please fill in your name and phone / WhatsApp number.");
      return;
    }
    setErrorMsg("");
    setStep(3);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      const payload = {
        clientName,
        clientEmail,
        clientPhone,
        sessionType: isFreeConsult ? "Free Consultation (15 Mins)" : sessionType,
        format,
        date: selectedDate,
        timeSlot: selectedSlot,
        concerns,
        paymentMethod: isFreeConsult ? "online" : paymentMethod,
        isFreeConsultation: isFreeConsult,
      };

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Failed to book appointment. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setConfirmedBooking(data.appointment);
      setStep(4);
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-sage-950/75 backdrop-blur-xs p-2.5 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) resetAndClose();
      }}
    >
      <div className="min-h-full flex items-start sm:items-center justify-center">
        <div 
          className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-8 relative shadow-2xl border border-sage-200 my-2 sm:my-8 text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Prominent Cross (Close) Button */}
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 sm:top-5 sm:right-5 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-linen-100 hover:bg-terracotta-100 text-sage-700 hover:text-terracotta-700 border border-sage-200 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-xs cursor-pointer group"
          >
            <X className="w-5 h-5 stroke-[2.5] group-hover:rotate-90 transition-transform duration-200" />
          </button>

        {/* Modal Progress Indicator */}
        {step < 4 && (
          <div className="mb-6 pr-10 sm:pr-12">
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold text-sage-600 mb-2">
              <span className={step >= 1 ? "text-terracotta-600 font-bold" : ""}>1. Slot</span>
              <span className={step >= 2 ? "text-terracotta-600 font-bold" : ""}>2. Intake</span>
              <span className={step >= 3 ? "text-terracotta-600 font-bold" : ""}>3. Payment</span>
            </div>
            <div className="w-full bg-sage-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-terracotta-500 h-full transition-all duration-300"
                style={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
              />
            </div>
          </div>
        )}

        {/* ================= STEP 1: DATE, TIME & FORMAT ================= */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-sage-900">
                Book a Consultation
              </h3>
              <p className="text-xs sm:text-sm text-sage-600 mt-1">
                Select your consultation type, mode, date, and preferred time slot.
              </p>
            </div>

            {/* Consultation Tier Switcher */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-sage-700 mb-2">
                Consultation Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setIsFreeConsult(true)}
                  className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                    isFreeConsult
                      ? "border-terracotta-500 bg-terracotta-50/70 text-sage-900 ring-2 ring-terracotta-500/20"
                      : "border-sage-200 hover:bg-linen-50 text-sage-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-sage-900">Get a Free Consultation</span>
                    <span className="text-[10px] bg-terracotta-500 text-white font-bold px-2 py-0.5 rounded-full">
                      ₹0 (Free)
                    </span>
                  </div>
                  <div className="text-[11px] text-sage-600">
                    15-Minute introductory discovery call to discuss your goals &amp; fit.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setIsFreeConsult(false)}
                  className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                    !isFreeConsult
                      ? "border-terracotta-500 bg-terracotta-50/70 text-sage-900 ring-2 ring-terracotta-500/20"
                      : "border-sage-200 hover:bg-linen-50 text-sage-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-sage-900">Full Therapy Session</span>
                    <span className="text-[10px] bg-sage-200 text-sage-800 font-bold px-2 py-0.5 rounded-full">
                      ₹2,100
                    </span>
                  </div>
                  <div className="text-[11px] text-sage-600">
                    60-Minute in-depth clinical psychotherapy &amp; coping plan.
                  </div>
                </button>
              </div>
            </div>

            {/* Format Selection */}
            {/* Session Format: 100% Online Reassurance */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-sage-700 mb-2">
                Session Mode
              </label>
              <div className="p-3.5 rounded-2xl border border-sage-200 bg-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-terracotta-500 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-sage-900">100% Online Consultation (Google Meet)</div>
                  <div className="text-[11px] text-sage-600">Encrypted video session &bull; Available across India &amp; Worldwide</div>
                </div>
              </div>
            </div>

            {/* Specialty Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-sage-700 mb-2">
                Counseling Focus
              </label>
              <select
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-sage-200 text-sm text-sage-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-terracotta-500/30"
              >
                <option value="Psychotherapy">Psychotherapy (Anxiety, Depression, Mood Distress)</option>
                <option value="Relaxation Techniques">Relaxation Techniques (Breathwork, Somatic Regulation)</option>
                <option value="Group Therapy">Group Therapy (Shared Peer Support Circles)</option>
                <option value="Individual and Couple Counselling">Individual and Couple Counselling</option>
                <option value="De-addiction Counselling">De-addiction Counselling (Habit &amp; Relapse Support)</option>
                <option value="Sexual Abuse Counselling">Sexual Abuse Counselling (Trauma-Informed Safe Space)</option>
              </select>
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-sage-700 mb-2 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-terracotta-500" />
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                min={minDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-sage-200 text-sm text-sage-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-terracotta-500/30"
              />
            </div>

            {/* Slots Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-sage-700 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-terracotta-500" />
                  Available 60-Min Time Slots
                </span>
                <span className="text-[11px] font-normal text-sage-500">
                  {loadingSlots ? "Checking slots..." : `${slots.filter(s => s.isAvailable).length} slots open`}
                </span>
              </label>

              {loadingSlots ? (
                <div className="py-6 flex items-center justify-center text-xs text-sage-600 gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-terracotta-500" />
                  <span>Loading schedule...</span>
                </div>
              ) : slots.length === 0 ? (
                <div className="p-4 rounded-xl bg-linen-100 text-center text-xs text-sage-700">
                  Deepa is not taking consultations on this date. Please choose another day.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-1">
                  {slots.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={!item.isAvailable}
                      onClick={() => setSelectedSlot(item.slot)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition flex flex-col items-center justify-center min-h-[46px] ${
                        !item.isAvailable
                          ? "bg-sage-100/60 text-sage-400 border-sage-200/50 cursor-not-allowed opacity-60"
                          : selectedSlot === item.slot
                          ? "bg-terracotta-500 text-white border-terracotta-600 font-semibold shadow-xs"
                          : "bg-white text-sage-800 border-sage-200 hover:border-terracotta-300 hover:bg-terracotta-50/30"
                      }`}
                    >
                      <span>{item.slot}</span>
                      {!item.isAvailable && (
                        <span className="text-[9px] font-bold tracking-wider uppercase text-sage-500 mt-0.5">
                          Booked
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Step 1 Actions */}
            <div className="pt-4 border-t border-sage-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-sage-600">
                Session Fee:{" "}
                <strong className="text-sm text-sage-900">
                  {isFreeConsult ? "₹0 (Complimentary)" : "₹2,100"}
                </strong>
                {isFreeConsult ? (
                  <span className="ml-1.5 text-[11px] text-terracotta-600 font-bold">
                    &bull; 15 Mins
                  </span>
                ) : (
                  <span className="ml-1.5 text-[11px] text-sage-500">
                    &bull; 60 Mins
                  </span>
                )}
              </div>
              <div className="flex items-center justify-end gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-3.5 py-2 rounded-full text-xs font-semibold text-sage-600 hover:text-sage-900 hover:bg-sage-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!selectedSlot}
                  onClick={() => setStep(2)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 disabled:opacity-50 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition shadow-xs"
                >
                  <span>Continue to Intake</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: CLIENT INTAKE DETAILS ================= */}
        {step === 2 && (
          <form onSubmit={handleNextToPayment} className="space-y-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-sage-900">
                Client Confidential Intake
              </h3>
              <p className="text-xs sm:text-sm text-sage-600 mt-1">
                Your details are strictly private and shared solely with Deepa Kanwaar.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-sage-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sage-200 text-sm text-sage-900 bg-white focus:ring-2 focus:ring-terracotta-500/30 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-sage-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@example.com (optional)"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sage-200 text-sm text-sage-900 bg-white focus:ring-2 focus:ring-terracotta-500/30 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-sage-700 mb-1">
                Phone / WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98774 08869"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sage-200 text-sm text-sage-900 bg-white focus:ring-2 focus:ring-terracotta-500/30 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-sage-700 mb-1">
                What brings you to counseling? (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe what you've been navigating recently (e.g. stress, work burnout, anxiety, relationship communication)..."
                value={concerns}
                onChange={(e) => setConcerns(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sage-200 text-sm text-sage-900 bg-white focus:ring-2 focus:ring-terracotta-500/30 focus:outline-hidden resize-none"
              />
            </div>

            {/* Booking Summary strip */}
            <div className="bg-linen-100 rounded-xl p-3 border border-sage-200/80 flex items-center justify-between text-xs text-sage-700">
              <div>
                <span className="font-semibold text-sage-900">Online Video (Google Meet)</span> &bull; {selectedDate}
              </div>
              <div className="font-bold text-sage-900">{selectedSlot}</div>
            </div>

            {/* Step 2 Actions */}
            <div className="pt-3 border-t border-sage-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-xs text-sage-700 hover:text-sage-900 font-medium px-2 py-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition shadow-xs"
              >
                <span>{isFreeConsult ? "To Confirmation" : "To Payment"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* ================= STEP 3: PAYMENT METHOD (BOTH OPTIONS OR FREE) ================= */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-sage-900">
                {isFreeConsult ? "Confirm Free Consultation" : "Choose Payment Method"}
              </h3>
              <p className="text-xs sm:text-sm text-sage-600 mt-1">
                {isFreeConsult
                  ? "Complimentary 15-Minute introductory discovery consultation with Deepa Kanwaar."
                  : "Total consultation fee: ₹2,100 for a dedicated 60-minute session."}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                {errorMsg}
              </div>
            )}

            {isFreeConsult ? (
              <div className="p-6 rounded-2xl bg-terracotta-50/70 border border-terracotta-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-terracotta-100 text-terracotta-600 flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-lg text-sage-900">
                  100% Free Initial Consultation
                </h4>
                <p className="text-xs text-sage-700 max-w-md mx-auto leading-relaxed">
                  No payment or credit card is needed! Deepa offers this 15-minute consultation so you can discuss your situation, ask questions about the therapeutic process, and see if it feels like the right fit.
                </p>
                <div className="inline-block bg-white px-3.5 py-1 rounded-full text-xs font-bold text-terracotta-700 border border-terracotta-200 shadow-2xs">
                  Fee: ₹0 (No Charges)
                </div>
              </div>
            ) : (
              /* The Dual Payment Options requested by user */
              <div className="space-y-3">
                
                {/* Option 1: Pay Online Now */}
                <div
                  onClick={() => setPaymentMethod("online")}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    paymentMethod === "online"
                      ? "border-terracotta-500 bg-terracotta-50/40 ring-2 ring-terracotta-500/20"
                      : "border-sage-200 hover:bg-linen-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "online"}
                        onChange={() => setPaymentMethod("online")}
                        className="text-terracotta-600 focus:ring-terracotta-500"
                      />
                      <div>
                        <div className="text-sm font-bold text-sage-900 flex items-center gap-2">
                          <span>Option 1: Pay Online Now (₹2,100)</span>
                          <span className="text-[10px] bg-sage-200 text-sage-800 px-2 py-0.5 rounded-full font-bold">
                            Instant Confirm
                          </span>
                        </div>
                        <div className="text-xs text-sage-600 mt-0.5">
                          Pay instantly via UPI (GPay, PhonePe, Paytm), Debit/Credit Card, or Netbanking.
                        </div>
                      </div>
                    </div>
                    <CreditCard className="w-5 h-5 text-terracotta-500 flex-shrink-0" />
                  </div>

                  {/* Sub-options for Online Payment */}
                  {paymentMethod === "online" && (
                    <div className="mt-4 pt-3 border-t border-terracotta-200/60 pl-6 space-y-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setOnlinePaymentType("upi")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                            onlinePaymentType === "upi"
                              ? "bg-terracotta-500 text-white"
                              : "bg-white border border-sage-200 text-sage-700"
                          }`}
                        >
                          UPI (GPay / PhonePe)
                        </button>
                        <button
                          type="button"
                          onClick={() => setOnlinePaymentType("card")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                            onlinePaymentType === "card"
                              ? "bg-terracotta-500 text-white"
                              : "bg-white border border-sage-200 text-sage-700"
                          }`}
                        >
                          Cards
                        </button>
                        <button
                          type="button"
                          onClick={() => setOnlinePaymentType("netbanking")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                            onlinePaymentType === "netbanking"
                              ? "bg-terracotta-500 text-white"
                              : "bg-white border border-sage-200 text-sage-700"
                          }`}
                        >
                          Netbanking
                        </button>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-sage-200 text-xs text-sage-700 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-sage-600" />
                        <span>Razorpay 256-bit SSL encrypted secure payment channel</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Option 2: Pay Later / Direct UPI */}
                <div
                  onClick={() => setPaymentMethod("pay_later")}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    paymentMethod === "pay_later"
                      ? "border-terracotta-500 bg-terracotta-50/40 ring-2 ring-terracotta-500/20"
                      : "border-sage-200 hover:bg-linen-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "pay_later"}
                        onChange={() => setPaymentMethod("pay_later")}
                        className="text-terracotta-600 focus:ring-terracotta-500"
                      />
                      <div>
                        <div className="text-sm font-bold text-sage-900 flex items-center gap-2">
                          <span>Option 2: Reserve Slot &amp; Pay via UPI / Later</span>
                        </div>
                        <div className="text-xs text-sage-600 mt-0.5">
                          Hold this slot. You can pay via UPI QR or bank transfer before your session begins.
                        </div>
                      </div>
                    </div>
                    <QrCode className="w-5 h-5 text-ochre-600 flex-shrink-0" />
                  </div>

                  {paymentMethod === "pay_later" && (
                    <div className="mt-4 pt-3 border-t border-terracotta-200/60 pl-6 space-y-2 text-xs text-sage-700">
                      <p>
                        <strong>How it works:</strong> Your slot will be reserved. Deepa&apos;s clinic will verify payment confirmation via WhatsApp before sending the final calendar invite.
                      </p>
                      <div className="p-2.5 bg-white rounded-xl border border-sage-200 flex items-center justify-between">
                        <span>UPI ID: <strong className="text-sage-900">deepakanwaar.therapy@oksbi</strong></span>
                        <span className="text-[11px] text-terracotta-600 font-semibold">₹2,100</span>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Step 3 Actions */}
            <div className="pt-4 border-t border-sage-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 text-xs text-sage-700 hover:text-sage-900 font-medium px-2 py-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinalSubmit}
                className="inline-flex items-center justify-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirming...</span>
                  </>
                ) : isFreeConsult ? (
                  <>
                    <span>Confirm Free Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : paymentMethod === "online" ? (
                  <>
                    <span>Pay ₹2,100 &amp; Confirm</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Reserve My Slot</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: CONFIRMATION & DETAILS ================= */}
        {step === 4 && confirmedBooking && (
          <div className="text-center space-y-6 py-2">
            <div className="w-16 h-16 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center mx-auto border-2 border-sage-300">
              <CheckCircle2 className="w-10 h-10 text-sage-600" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
                {confirmedBooking.paymentStatus === "paid" ? "Session Confirmed" : "Booking Reserved"}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-sage-900 mt-1">
                Thank You, {confirmedBooking.clientName.split(" ")[0]}!
              </h3>
              <p className="text-xs sm:text-sm text-sage-600 mt-1">
                Booking Reference ID: <strong className="text-sage-900">{confirmedBooking.id}</strong>
              </p>
            </div>

            {/* Summary card */}
            <div className="bg-linen-100 rounded-2xl p-5 border border-sage-200 text-left space-y-3 max-w-md mx-auto">
              <div className="flex justify-between text-xs">
                <span className="text-sage-600">Consulting Psychologist:</span>
                <span className="font-bold text-sage-900">Deepa Kanwaar</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-sage-600">Specialty:</span>
                <span className="font-semibold text-sage-900">{confirmedBooking.sessionType}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-sage-600">Date &amp; Time:</span>
                <span className="font-semibold text-sage-900">{confirmedBooking.date} &bull; {confirmedBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-sage-600">Format:</span>
                <span className="font-semibold text-sage-900">
                  Online Video (Google Meet)
                </span>
              </div>
              <div className="flex justify-between text-xs pt-2 border-t border-sage-200">
                <span className="text-sage-600">Payment Status:</span>
                <span className={`font-bold px-2 py-0.5 rounded-full text-[11px] ${
                  confirmedBooking.fee === 0
                    ? "bg-sage-200 text-sage-900"
                    : confirmedBooking.paymentStatus === "paid"
                    ? "bg-sage-200 text-sage-800"
                    : "bg-ochre-100 text-ochre-800"
                }`}>
                  {confirmedBooking.fee === 0
                    ? "Free Consultation (₹0)"
                    : confirmedBooking.paymentStatus === "paid"
                    ? "Paid (₹2,100)"
                    : "Pending Payment (₹2,100)"}
                </span>
              </div>

              {/* Online Video Link display if paid */}
              {confirmedBooking.format === "online" && confirmedBooking.meetingLink && (
                <div className="mt-3 p-3 bg-white rounded-xl border border-sage-200 text-xs">
                  <span className="text-[11px] font-bold text-sage-600 uppercase block mb-1">
                    Google Meet Room:
                  </span>
                  <a
                    href={confirmedBooking.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-terracotta-600 font-semibold underline flex items-center gap-1"
                  >
                    <span>{confirmedBooking.meetingLink}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {/* Pay later instructions if pending */}
              {confirmedBooking.paymentMethod === "pay_later" && (
                <div className="mt-3 p-3 bg-white rounded-xl border border-ochre-200 text-xs text-sage-700 space-y-1">
                  <div className="font-bold text-sage-900 flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-ochre-600" />
                    <span>Pay via UPI before session:</span>
                  </div>
                  <div>UPI ID: <strong className="text-sage-900">deepakanwaar.therapy@oksbi</strong></div>
                  <div className="text-[11px] text-sage-600">
                    Send screenshot with reference <strong>{confirmedBooking.id}</strong> on WhatsApp.
                  </div>
                </div>
              )}
            </div>

            {/* Quick WhatsApp Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/919877408869?text=Hello%20Deepa,%20I%20have%20booked%20session%20${confirmedBooking.id}%20for%20${confirmedBooking.date}%20at%20${confirmedBooking.timeSlot}.`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message Deepa on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={resetAndClose}
                className="w-full sm:w-auto bg-sage-800 hover:bg-sage-900 text-white px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition"
              >
                Done
              </button>
            </div>
          </div>
        )}

        </div>
      </div>
    </div>
  );
}
