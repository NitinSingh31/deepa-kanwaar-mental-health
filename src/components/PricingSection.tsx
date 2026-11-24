"use client";

import React from "react";
import { Check, Clock, Sparkles, HeartHandshake } from "lucide-react";

interface PricingSectionProps {
  onBookClick: () => void;
  onFreeConsultClick?: () => void;
}

export default function PricingSection({ onBookClick, onFreeConsultClick }: PricingSectionProps) {
  const handleFree = onFreeConsultClick || onBookClick;

  return (
    <section id="pricing" className="py-20 bg-linen-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-200/70 text-sage-800 text-xs font-semibold uppercase tracking-wider">
            Clear &amp; Transparent
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sage-900">
            Consultation Options &amp; Fees
          </h2>
          <p className="text-base sm:text-lg text-sage-700 leading-relaxed">
            Begin with a complimentary introductory conversation or dive straight into a full personalized therapy session.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card 1: Free Consultation */}
          <div className="relative bg-white rounded-3xl p-8 sm:p-10 border-2 border-sage-200 shadow-lg flex flex-col justify-between hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 bg-sage-700 text-white text-[11px] uppercase font-bold tracking-widest py-1.5 px-5 rounded-bl-2xl">
              Introductory Fit
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-terracotta-50 border border-terracotta-200 flex items-center justify-center text-terracotta-600 mb-6">
                <Sparkles className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-sage-900">
                Free Discovery Consultation
              </h3>
              <p className="text-xs text-sage-600 mt-1">
                A warm, no-pressure chat to explore whether therapy is right for you.
              </p>

              <div className="mt-5 mb-6 flex items-baseline gap-2">
                <span className="font-serif text-4xl font-bold text-sage-900">
                  ₹0
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-terracotta-600 bg-terracotta-50 px-2.5 py-0.5 rounded-full border border-terracotta-200">
                  100% Free &bull; 15 Mins
                </span>
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-sage-800">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-terracotta-500 flex-shrink-0 mt-0.5" />
                  <span>15 minutes one-on-one video call with Deepa Kanwaar</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-terracotta-500 flex-shrink-0 mt-0.5" />
                  <span>Discuss current challenges, anxiety, burnout, or relationship concerns</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-terracotta-500 flex-shrink-0 mt-0.5" />
                  <span>Ask questions about therapeutic methods (CBT, Mindfulness) &amp; expectations</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-terracotta-500 flex-shrink-0 mt-0.5" />
                  <span>No credit card or payment details required</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={handleFree}
                className="w-full bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-700 border-2 border-terracotta-200 hover:border-terracotta-300 py-3.5 px-6 rounded-full font-bold text-sm transition shadow-2xs hover:shadow-xs active:scale-98"
              >
                Get a Free Consultation
              </button>
            </div>
          </div>

          {/* Card 2: Comprehensive 60-Min Session */}
          <div className="relative bg-white rounded-3xl p-8 sm:p-10 border-2 border-terracotta-500/40 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 ring-2 ring-terracotta-500/10">
            <div className="absolute top-0 right-0 bg-terracotta-500 text-white text-[11px] uppercase font-bold tracking-widest py-1.5 px-5 rounded-bl-2xl">
              Comprehensive Care
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-sage-100 border border-sage-200 flex items-center justify-center text-sage-700 mb-6">
                <HeartHandshake className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-sage-900">
                Full Counseling Session
              </h3>
              <p className="text-xs text-sage-600 mt-1">
                In-depth clinical psychotherapy for individuals and couples.
              </p>

              <div className="mt-5 mb-6 flex items-baseline gap-2">
                <span className="font-serif text-4xl font-bold text-sage-900">
                  ₹2,100
                </span>
                <span className="text-xs font-normal text-sage-600">
                  / 60-Minute Session
                </span>
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-sage-800">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-terracotta-500 flex-shrink-0 mt-0.5" />
                  <span>Full 60 minutes dedicated one-on-one psychological counseling</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-terracotta-500 flex-shrink-0 mt-0.5" />
                  <span>Choice of Google Meet (Online) or In-Person Clinic (New Delhi)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-terracotta-500 flex-shrink-0 mt-0.5" />
                  <span>Customized cognitive restructuring &amp; emotional coping exercises</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-terracotta-500 flex-shrink-0 mt-0.5" />
                  <span>Flexible payment: Pay online now or reserve and pay via UPI before session</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-terracotta-500 flex-shrink-0 mt-0.5" />
                  <span>Reschedule up to 12 hours prior with zero fees</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={onBookClick}
                className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-white py-3.5 px-6 rounded-full font-bold text-sm transition shadow-md hover:shadow-lg active:scale-98"
              >
                Book Full Session
              </button>
            </div>
          </div>

        </div>

        {/* Long-term therapy WhatsApp link */}
        <div className="mt-12 text-center text-xs text-sage-600">
          Have questions about therapy bundles or corporate wellness sessions?{" "}
          <a
            href="https://wa.me/919876543210?text=Hi%20Deepa,%20I%20would%20like%20to%20ask%20about%20therapy%20packages."
            target="_blank"
            rel="noopener noreferrer"
            className="text-terracotta-600 font-semibold underline underline-offset-2"
          >
            Chat directly with Deepa on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
