"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Heart, Sparkles, CheckCircle2 } from "lucide-react";

interface HeroProps {
  onBookClick: () => void;
  onFreeConsultClick?: () => void;
}

export default function Hero({ onBookClick, onFreeConsultClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-linen-100 via-linen-50 to-linen-50">
      {/* Decorative organic background shapes */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-sage-200/40 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 -ml-24 w-80 h-80 rounded-full bg-terracotta-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-ochre-100/50 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Tag & Live Availability Status Badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100/80 border border-sage-200/60 text-sage-800 text-xs sm:text-sm font-medium">
                <Sparkles className="w-4 h-4 text-terracotta-500" />
                <span>Compassionate, Evidence-Based Therapy</span>
              </div>

              {/* Pulsing Live Availability Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-emerald-200/80 text-xs font-semibold text-emerald-900 shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Slots Open This Week &bull; Online &amp; Clinic</span>
              </div>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-sage-900 leading-[1.15]">
              Your Journey to <br className="hidden sm:inline" />
              <span className="text-terracotta-600 relative inline-block">
                Emotional Harmony
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-ochre-400/70"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,7 Q50,0 100,7"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-sage-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Transformative psychological counseling and guidance to help you heal, grow, and thrive. Experience a safe, non-judgmental sanctuary where your thoughts and emotions are understood.
            </p>

            {/* Safe & Confidential Sanctuary Badge */}
            <div className="inline-flex items-center gap-3.5 bg-white/90 border border-sage-200/80 rounded-2xl p-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center text-sage-700">
                <ShieldCheck className="w-5 h-5 text-sage-600" />
              </div>
              <div className="text-left">
                <div className="text-xs text-sage-600 uppercase font-semibold tracking-wider">
                  Safe &amp; Confidential Care
                </div>
                <div className="text-sm font-bold text-sage-900">
                  RCI Licensed Guidance &bull; <span className="text-terracotta-600 font-semibold">100% Private</span>
                </div>
              </div>
              <div className="border-l border-sage-200 pl-3 text-xs text-sage-600 hidden sm:block">
                Online &amp; In-Clinic
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={onFreeConsultClick || onBookClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 text-white px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onBookClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-linen-50 text-sage-900 border border-sage-300 px-6 py-3.5 rounded-full font-semibold text-sm sm:text-base transition shadow-2xs hover:shadow-xs"
              >
                Book Full Session
              </button>

              <a
                href="#services"
                className="text-xs sm:text-sm font-semibold text-sage-700 hover:text-terracotta-600 underline underline-offset-4 px-2 py-2 transition"
              >
                Explore Specialties
              </a>
            </div>

            {/* Trust Bullet Points */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-sage-700">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-sage-600 flex-shrink-0" />
                <span>100% Confidential Space</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-sage-600 flex-shrink-0" />
                <span>RCI Licensed Guidance</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-sage-600 flex-shrink-0" />
                <span>Instant Google Meet or Clinic</span>
              </div>
            </div>
          </div>

          {/* Right Column: Imagery with Deepa Portrait & Organic Shapes */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Backing decorative frames */}
              <div className="absolute inset-0 bg-sage-500 rounded-3xl transform rotate-3 opacity-20 scale-105" />
              <div className="absolute inset-0 bg-terracotta-500 rounded-3xl transform -rotate-2 opacity-15 scale-102" />

              {/* Main Portrait Card */}
              <div className="relative bg-white rounded-3xl p-3 shadow-xl border border-sage-100 overflow-hidden">
                <div className="relative h-[420px] sm:h-[460px] w-full rounded-2xl overflow-hidden bg-linen-100">
                  <Image
                    src="/images/deepa-portrait.jpg"
                    alt="Deepa Kanwaar - Consulting Psychologist"
                    fill
                    priority
                    className="object-cover object-top hover:scale-102 transition duration-500"
                  />
                  {/* Subtle gradient overlay at bottom for text contrast */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sage-950/80 via-sage-950/40 to-transparent p-5 text-white">
                    <p className="font-serif text-xl font-bold">Deepa Kanwaar</p>
                    <p className="text-xs text-ochre-200 tracking-wide font-medium">
                      Consulting Psychologist &bull; M.A., RCI Reg.
                    </p>
                    <p className="text-[11px] text-sage-100/90 mt-1 italic">
                      &quot;You don&apos;t have to navigate life&apos;s complexities alone.&quot;
                    </p>
                  </div>
                </div>

                {/* Floating Experience Badge */}
                <div className="absolute -top-3 -right-3 bg-white border border-sage-200 rounded-2xl p-3 shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-sage-700">
                    <Heart className="w-5 h-5 text-terracotta-500 fill-terracotta-500/20" />
                  </div>
                  <div>
                    <div className="text-xs text-sage-600 font-medium">Experience</div>
                    <div className="text-sm font-bold text-sage-900">8+ Years &bull; 1500+ Hrs</div>
                  </div>
                </div>

                {/* Floating Rating / Trust Badge */}
                <div className="absolute -bottom-3 -left-3 bg-white border border-sage-200 rounded-2xl py-2 px-3.5 shadow-lg flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sage-600" />
                  <span className="text-xs font-semibold text-sage-900">Verified Clinical Care</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Layered Organic Wave Transition Divider */}
      <div className="w-full overflow-hidden leading-none relative z-10 pt-10">
        <svg
          className="relative block w-full h-12 sm:h-16 text-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          {/* Subtle Sage Wave */}
          <path
            d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,30 L1200,120 L0,120 Z"
            fill="#7E9A85"
            fillOpacity="0.18"
          />
          {/* Subtle Terracotta Wave */}
          <path
            d="M0,20 C200,100 420,-10 650,50 C850,110 1050,30 1200,60 L1200,120 L0,120 Z"
            fill="#C87856"
            fillOpacity="0.14"
          />
          {/* Foreground White Wave matching section background */}
          <path
            d="M0,45 C180,105 380,20 600,65 C820,110 1020,40 1200,75 L1200,120 L0,120 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </section>
  );
}
