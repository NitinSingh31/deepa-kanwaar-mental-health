"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EmergencyDisclaimer from "@/components/EmergencyDisclaimer";
import SymptomNavigator from "@/components/SymptomNavigator";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import EmotionalQuiz from "@/components/EmotionalQuiz";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("Individual Psychotherapy");
  const [isFreeConsult, setIsFreeConsult] = useState(false);

  const handleOpenBooking = (serviceName?: string) => {
    setIsFreeConsult(false);
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsBookingOpen(true);
  };

  const handleOpenFreeConsult = (serviceName?: string) => {
    setIsFreeConsult(true);
    setSelectedService(serviceName || "Free Consultation (15 Mins)");
    setIsBookingOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-linen-50">
      {/* Navigation Bar */}
      <Navbar
        onBookClick={() => handleOpenBooking()}
        onFreeConsultClick={() => handleOpenFreeConsult()}
      />

      {/* Hero Section with Live Availability Badge & Organic Waves */}
      <Hero
        onBookClick={() => handleOpenBooking()}
        onFreeConsultClick={() => handleOpenFreeConsult()}
      />

      {/* Emergency Helpline Disclaimer */}
      <EmergencyDisclaimer />

      {/* Interactive Symptom Navigator ("What Are You Navigating Right Now?") */}
      <SymptomNavigator
        onSelectService={(service) => handleOpenBooking(service)}
        onFreeConsultClick={() => handleOpenFreeConsult()}
      />

      {/* Clinical Services / Specialties */}
      <ServicesSection onSelectService={(service) => handleOpenBooking(service)} />

      {/* About Deepa Kanwaar */}
      <AboutSection onBookClick={() => handleOpenBooking()} />

      {/* How Therapy Works */}
      <HowItWorks onBookClick={() => handleOpenBooking()} />

      {/* Pricing & Fees (Free 15-Min Consult & ₹2,100 Full Session) */}
      <PricingSection
        onBookClick={() => handleOpenBooking()}
        onFreeConsultClick={() => handleOpenFreeConsult()}
      />

      {/* 60-Second Emotional Wellness Self-Check (Mini-Quiz) */}
      <EmotionalQuiz
        onClaimFreeConsult={() => handleOpenFreeConsult("Free Consultation (15 Mins)")}
      />

      {/* Client Testimonials */}
      <TestimonialsSection />

      {/* FAQs */}
      <FAQSection />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Interactive Booking Modal with Free Consult & Dual Payment Flow */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService={selectedService}
        isFreeConsultationDefault={isFreeConsult}
      />
    </main>
  );
}
