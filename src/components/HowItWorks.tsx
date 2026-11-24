"use client";

import React from "react";
import { CalendarCheck, FileEdit, Video, Sparkles } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Select Your Preferred Slot",
    description: "Reserve your 100% online video consultation (Google Meet) at a date and time that fits your schedule from the comfort of your home.",
    icon: CalendarCheck,
  },
  {
    step: "02",
    title: "Confidential Intake & Payment",
    description: "Share a few details on what you wish to navigate. Pay online instantly or reserve and pay via UPI before the session.",
    icon: FileEdit,
  },
  {
    step: "03",
    title: "60-Minute Guided Session",
    description: "Engage in a calm, focused, one-on-one session with Deepa Kanwaar. Unpack feelings, explore triggers, and gain fresh perspectives.",
    icon: Video,
  },
  {
    step: "04",
    title: "Reflect & Take Practical Steps",
    description: "Leave each session with clear cognitive strategies, grounding tools, and a collaborative roadmap for your emotional growth.",
    icon: Sparkles,
  },
];

interface HowItWorksProps {
  onBookClick: () => void;
}

export default function HowItWorks({ onBookClick }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-semibold uppercase tracking-wider">
            Simple &amp; Clear Process
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sage-900">
            How Therapy Works
          </h2>
          <p className="text-base sm:text-lg text-sage-700 leading-relaxed">
            Starting therapy shouldn&apos;t feel overwhelming. Here is the simple 4-step path from booking to your ongoing well-being.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative bg-linen-50 rounded-3xl p-6 border border-sage-100 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-bold text-terracotta-500/80">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-sage-200 flex items-center justify-center text-sage-700 shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-sage-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-sage-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-14 text-center">
          <button
            onClick={onBookClick}
            className="bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-4 rounded-full font-semibold text-sm sm:text-base transition shadow-md hover:shadow-lg"
          >
            Start Your Therapy Journey
          </button>
        </div>

      </div>
    </section>
  );
}
