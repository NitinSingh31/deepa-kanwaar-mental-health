"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Lock, 
  Unlock, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  CreditCard, 
  Search, 
  RefreshCw, 
  Video, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  ExternalLink,
  Trash2,
  Check,
  X,
  MessageCircle,
  LogOut,
  Sliders,
  DollarSign
} from "lucide-react";
import { Appointment } from "@/lib/types";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  // Appointments data
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Selected appointment for detail drawer/modal
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);

  // Check existing session
  useEffect(() => {
    const saved = localStorage.getItem("dkm_admin_auth");
    if (saved === "dkm-auth-token-verified") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch appointments
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      if (data.appointments) {
        setAppointments(data.appointments);
      }
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAppointments();
    }
  }, [isAuthenticated]);

  // Filter logic
  useEffect(() => {
    let result = [...appointments];
    if (statusFilter !== "all") {
      if (statusFilter === "paid") {
        result = result.filter((a) => a.paymentStatus === "paid");
      } else if (statusFilter === "pending_payment") {
        result = result.filter((a) => a.paymentStatus === "pending_verification" || a.paymentStatus === "unpaid");
      } else {
        result = result.filter((a) => a.bookingStatus === statusFilter);
      }
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.clientName.toLowerCase().includes(query) ||
          a.clientEmail.toLowerCase().includes(query) ||
          a.id.toLowerCase().includes(query) ||
          a.clientPhone.includes(query)
      );
    }

    setFilteredAppointments(result);
  }, [appointments, statusFilter, searchQuery]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("dkm_admin_auth", data.token);
      } else {
        setAuthError(data.error || "Incorrect passcode");
      }
    } catch {
      setAuthError("Failed to authenticate");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("dkm_admin_auth");
    setIsAuthenticated(false);
    setPassword("");
  };

  // Update appointment action
  const handleUpdateStatus = async (id: string, updates: Partial<Appointment>) => {
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
        );
        if (selectedAppt && selectedAppt.id === id) {
          setSelectedAppt((prev) => (prev ? { ...prev, ...updates } : null));
        }
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this appointment?")) return;
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAppointments((prev) => prev.filter((a) => a.id !== id));
        if (selectedAppt?.id === id) setSelectedAppt(null);
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Metrics
  const totalBookings = appointments.length;
  const paidBookings = appointments.filter((a) => a.paymentStatus === "paid");
  const pendingPayments = appointments.filter((a) => a.paymentStatus !== "paid");
  const totalRevenue = paidBookings.reduce((sum, a) => sum + (a.fee || 2100), 0);

  // ================= LOGIN SCREEN =================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-linen-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-xl border border-sage-200">
          <div className="text-center mb-8">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-sage-200 mx-auto mb-4 bg-white">
              <Image
                src="/images/logo-icon.png"
                alt="Deepa Kanwaar Logo"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="font-serif text-2xl font-bold text-sage-900">
              Doctor Admin Portal
            </h1>
            <p className="text-xs text-sage-600 mt-1">
              Deepa Kanwaar Mental Health Management
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                {authError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-sage-700 mb-1.5">
                Doctor Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Enter passcode (default: deepa2026)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 text-sm text-sage-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-terracotta-500/30"
                />
                <Lock className="w-4 h-4 text-sage-400 absolute right-3.5 top-3.5" />
              </div>
              <p className="text-[11px] text-sage-500 mt-1.5 italic">
                Default access code: <code className="bg-linen-100 px-1 py-0.5 rounded text-terracotta-600 font-bold">deepa2026</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-white py-3 rounded-full font-semibold text-sm transition shadow-sm"
            >
              {loading ? "Verifying..." : "Access Dashboard"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-sage-600 hover:text-terracotta-600 underline"
            >
              &larr; Return to Patient Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ================= AUTHENTICATED DOCTOR PORTAL =================
  return (
    <div className="min-h-screen bg-linen-100 flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-sage-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-sage-200 bg-white">
              <Image
                src="/images/logo-icon.png"
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-sage-900">
                Doctor Portal &bull; Deepa Kanwaar
              </h2>
              <span className="text-[11px] text-terracotta-600 font-medium">
                Clinic &amp; Appointments Management
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-sage-700 hover:text-sage-900 bg-linen-100 px-3 py-1.5 rounded-lg border border-sage-200 transition"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={fetchAppointments}
              className="p-2 text-sage-600 hover:text-sage-900 hover:bg-sage-100 rounded-lg transition"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-6">
        
        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-sage-200 shadow-xs">
            <div className="flex items-center justify-between text-xs font-medium text-sage-600 mb-2">
              <span>Total Bookings</span>
              <Calendar className="w-4 h-4 text-sage-400" />
            </div>
            <div className="text-2xl font-bold font-serif text-sage-900">
              {totalBookings}
            </div>
            <div className="text-[11px] text-sage-500 mt-1">
              Active counseling clients
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-sage-200 shadow-xs">
            <div className="flex items-center justify-between text-xs font-medium text-sage-600 mb-2">
              <span>Paid &amp; Confirmed</span>
              <CheckCircle className="w-4 h-4 text-sage-600" />
            </div>
            <div className="text-2xl font-bold font-serif text-sage-900">
              {paidBookings.length}
            </div>
            <div className="text-[11px] text-sage-600 mt-1">
              Online paid / verified
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-sage-200 shadow-xs">
            <div className="flex items-center justify-between text-xs font-medium text-sage-600 mb-2">
              <span>Pending Payments (UPI / Later)</span>
              <AlertCircle className="w-4 h-4 text-ochre-600" />
            </div>
            <div className="text-2xl font-bold font-serif text-ochre-700">
              {pendingPayments.length}
            </div>
            <div className="text-[11px] text-ochre-600 mt-1">
              Requires UPI verification
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-sage-200 shadow-xs">
            <div className="flex items-center justify-between text-xs font-medium text-sage-600 mb-2">
              <span>Total Revenue (Paid)</span>
              <CreditCard className="w-4 h-4 text-terracotta-500" />
            </div>
            <div className="text-2xl font-bold font-serif text-terracotta-600">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </div>
            <div className="text-[11px] text-sage-500 mt-1">
              @ ₹2,100 / session
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-sage-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {[
              { id: "all", label: "All Sessions" },
              { id: "confirmed", label: "Confirmed" },
              { id: "pending_payment", label: "Pending Payment" },
              { id: "completed", label: "Completed" },
              { id: "cancelled", label: "Cancelled" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  statusFilter === tab.id
                    ? "bg-sage-800 text-white shadow-2xs"
                    : "bg-linen-100 text-sage-700 hover:bg-sage-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-sage-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search by client, email, ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-sage-200 text-xs text-sage-900 bg-linen-50 focus:outline-hidden focus:ring-2 focus:ring-terracotta-500/30"
            />
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-2xl border border-sage-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-sage-700">
              <thead className="bg-linen-100/80 border-b border-sage-200 text-sage-800 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Booking ID</th>
                  <th className="py-3.5 px-4">Client Details</th>
                  <th className="py-3.5 px-4">Specialty &amp; Format</th>
                  <th className="py-3.5 px-4">Date &amp; Time</th>
                  <th className="py-3.5 px-4">Payment</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-100">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-sage-500">
                      No appointments found matching this criteria.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appt) => (
                    <tr key={appt.id} className="hover:bg-linen-50/60 transition">
                      
                      {/* ID */}
                      <td className="py-3.5 px-4 font-mono font-semibold text-sage-900">
                        {appt.id}
                      </td>

                      {/* Client */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-sage-900 text-sm">
                          {appt.clientName}
                        </div>
                        <div className="text-[11px] text-sage-500 flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3 text-sage-400" />
                          <span>{appt.clientEmail}</span>
                        </div>
                        <div className="text-[11px] text-sage-500 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-sage-400" />
                          <span>{appt.clientPhone}</span>
                        </div>
                      </td>

                      {/* Specialty & Format */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-sage-900">
                          {appt.sessionType}
                        </div>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-1 text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                            <Video className="w-3 h-3" />
                            Online Meet
                          </span>
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-sage-900">
                          {appt.date}
                        </div>
                        <div className="text-[11px] text-sage-600">
                          {appt.timeSlot}
                        </div>
                      </td>

                      {/* Payment */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-sage-900">
                          ₹{appt.fee || 2100}
                        </div>
                        <div>
                          {appt.paymentStatus === "paid" ? (
                            <span className="inline-flex items-center gap-1 text-[11px] text-sage-800 bg-sage-200/80 px-2 py-0.5 rounded-full font-bold">
                              <Check className="w-3 h-3" /> Paid
                            </span>
                          ) : (
                            <button
                              onClick={() => handleUpdateStatus(appt.id, { paymentStatus: "paid", bookingStatus: "confirmed" })}
                              className="inline-flex items-center gap-1 text-[10px] text-ochre-800 bg-ochre-100 hover:bg-ochre-200 px-2 py-0.5 rounded-full font-bold transition"
                              title="Click to mark as paid"
                            >
                              <AlertCircle className="w-3 h-3" /> Mark Paid
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Booking Status Dropdown */}
                      <td className="py-3.5 px-4">
                        <select
                          value={appt.bookingStatus}
                          onChange={(e) => handleUpdateStatus(appt.id, { bookingStatus: e.target.value as any })}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-hidden ${
                            appt.bookingStatus === "confirmed"
                              ? "bg-sage-100 text-sage-800 border-sage-300"
                              : appt.bookingStatus === "completed"
                              ? "bg-blue-50 text-blue-800 border-blue-200"
                              : appt.bookingStatus === "cancelled"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-ochre-50 text-ochre-800 border-ochre-200"
                          }`}
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedAppt(appt)}
                          className="px-2.5 py-1 rounded-lg bg-linen-100 hover:bg-sage-100 text-sage-800 text-xs font-semibold border border-sage-200 transition"
                        >
                          Notes
                        </button>

                        <a
                          href={`https://wa.me/${appt.clientPhone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(appt.clientName)},%20this%20is%20Deepa%20Kanwaar%20regarding%20your%20counseling%20session%20(Ref:%20${appt.id}).`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center p-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition"
                          title="WhatsApp Client"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>

                        <button
                          onClick={() => handleDelete(appt.id)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"
                          title="Delete appointment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Appointment Details / Intake Notes Modal */}
      {selectedAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sage-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-sage-100">
            <button
              onClick={() => setSelectedAppt(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-sage-600 hover:text-sage-900 hover:bg-sage-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-mono text-terracotta-600 font-bold uppercase">
                {selectedAppt.id}
              </span>
              <h3 className="font-serif text-2xl font-bold text-sage-900 mt-1">
                {selectedAppt.clientName}
              </h3>
              <p className="text-xs text-sage-600">
                Booked on: {new Date(selectedAppt.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="space-y-4 my-6 text-xs text-sage-800">
              <div className="p-3 bg-linen-50 rounded-xl border border-sage-100">
                <span className="font-bold text-sage-700 block mb-1">Client Intake Concerns:</span>
                <p className="text-sm italic text-sage-900">
                  {selectedAppt.concerns ? `"${selectedAppt.concerns}"` : "No specific notes provided during booking."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-linen-50 rounded-xl border border-sage-100">
                  <span className="text-sage-500 block mb-1">Session Date &amp; Time</span>
                  <span className="font-bold text-sage-900">{selectedAppt.date} &bull; {selectedAppt.timeSlot}</span>
                </div>
                <div className="p-3 bg-linen-50 rounded-xl border border-sage-100">
                  <span className="text-sage-500 block mb-1">Mode &amp; Fee</span>
                  <span className="font-bold text-sage-900">
                    Online Video (Google Meet) &bull; ₹{selectedAppt.fee || 2100}
                  </span>
                </div>
              </div>

              {/* Meeting Link input if online */}
              {selectedAppt.format === "online" && (
                <div className="p-3 bg-linen-50 rounded-xl border border-sage-100">
                  <span className="font-bold text-sage-700 block mb-1">Google Meet Room Link:</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      defaultValue={selectedAppt.meetingLink || ""}
                      onBlur={(e) => handleUpdateStatus(selectedAppt.id, { meetingLink: e.target.value })}
                      placeholder="e.g. https://meet.google.com/abc-defg-hij"
                      className="w-full px-3 py-1.5 rounded-lg border border-sage-200 text-xs bg-white"
                    />
                    {selectedAppt.meetingLink && (
                      <a
                        href={selectedAppt.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-sage-800 text-white flex items-center justify-center flex-shrink-0"
                        title="Open Meet"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-sage-100">
              <button
                onClick={() => {
                  const newStatus = selectedAppt.paymentStatus === "paid" ? "unpaid" : "paid";
                  handleUpdateStatus(selectedAppt.id, { 
                    paymentStatus: newStatus,
                    bookingStatus: newStatus === "paid" ? "confirmed" : selectedAppt.bookingStatus
                  });
                }}
                className={`px-4 py-2 rounded-full font-semibold text-xs transition ${
                  selectedAppt.paymentStatus === "paid"
                    ? "bg-sage-200 text-sage-900 hover:bg-sage-300"
                    : "bg-terracotta-500 text-white hover:bg-terracotta-600"
                }`}
              >
                {selectedAppt.paymentStatus === "paid" ? "Mark Unpaid" : "Verify & Mark Paid (₹2,100)"}
              </button>

              <button
                onClick={() => setSelectedAppt(null)}
                className="bg-sage-800 text-white text-xs px-5 py-2 rounded-full font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
