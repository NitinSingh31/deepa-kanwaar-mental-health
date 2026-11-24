"use client";

import React from "react";
import Image from "next/image";
import { Award, BookOpen, Heart, Shield, CheckCircle } from "lucide-react";

interface AboutSectionProps {
  onBookClick: () => void;
}

export default function AboutSection({ onBookClick }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 bg-linen-100 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-sage-200/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Portrait & Visual Badges */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="relative bg-white rounded-3xl p-4 shadow-xl border border-sage-200/80">
                <div className="relative h-[360px] sm:h-[480px] w-full rounded-2xl overflow-hidden bg-linen-50">
                  <Image
                    src="/images/deepa-portrait.jpg"
                    alt="Deepa Kanwaar - Psychologist"
                    fill
                    className="object-cover object-top"
                  />
                </div>

                {/* Floating quote badge */}
                <div className="mt-4 p-4 rounded-xl bg-linen-50 border border-sage-100 text-center">
                  <p className="font-serif italic text-sage-800 text-sm">
                    &ldquo;Healing begins the moment you feel genuinely heard without judgement.&rdquo;
                  </p>
                  <p className="text-xs font-semibold text-terracotta-600 mt-1 uppercase tracking-wider">
                    — Deepa Kanwaar
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Philosophy & Credentials */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sage-200/70 text-sage-800 text-xs font-semibold uppercase tracking-wider">
              About The Psychologist
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sage-900 leading-tight">
              Hello, I&apos;m Deepa Kanwaar
            </h2>

            <p className="text-base text-terracotta-600 font-medium">
              Counselling Psychologist &bull; Allied Health Provider &bull; 20+ Years Clinical Practice
            </p>

            <div className="space-y-4 text-sm sm:text-base text-sage-800 leading-relaxed">
              <p>
                For over twenty years, I have walked alongside individuals, couples, and groups navigating the delicate terrain of emotional distress, mental health challenges, trauma, and personal healing.
              </p>
              <p>
                My practice is rooted in warmth, empathy, and evidence-based clinical science. I believe therapy is not an interrogation or a set of rigid instructions—it is a collaborative sanctuary where we gently untangle the thoughts, behaviors, and emotional patterns that hold you back.
              </p>
              <p>
                As a dedicated Allied Health Provider conducting <strong>100% online sessions</strong> via encrypted Google Meet, I offer a secure, accessible, and completely confidential space for clients across India and worldwide.
              </p>
            </div>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-white rounded-2xl p-4 border border-sage-200 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-sage-100 flex items-center justify-center text-sage-700 mb-3">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-sm text-sage-900">Confidentiality</h4>
                <p className="text-xs text-sage-600 mt-1">
                  Protected by clinical ethical guidelines &amp; medical data privacy.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-sage-200 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-terracotta-100 flex items-center justify-center text-terracotta-700 mb-3">
                  <Heart className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-sm text-sage-900">Empathy First</h4>
                <p className="text-xs text-sage-600 mt-1">
                  Non-judgmental, inclusive, and culturally sensitive space.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-sage-200 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-ochre-100 flex items-center justify-center text-ochre-700 mb-3">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-sm text-sage-900">Proven Science</h4>
                <p className="text-xs text-sage-600 mt-1">
                  Grounding techniques, CBT, EFT, and mindfulness modalities.
                </p>
              </div>
            </div>

            {/* Credentials / Affiliations */}
            <div className="pt-2 border-t border-sage-200">
              <h5 className="text-xs font-bold uppercase tracking-wider text-sage-700 mb-3">
                Professional Expertise &amp; Credentials:
              </h5>
              <div className="flex flex-wrap gap-2 text-xs text-sage-800">
                <span className="bg-white px-3 py-1.5 rounded-lg border border-sage-200 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-sage-600" />
                  20+ Years Clinical Counseling Experience
                </span>
                <span className="bg-white px-3 py-1.5 rounded-lg border border-sage-200 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-sage-600" />
                  Allied Health Provider
                </span>
                <span className="bg-white px-3 py-1.5 rounded-lg border border-sage-200 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-sage-600" />
                  Trauma-Informed &amp; Sexual Abuse Counseling
                </span>
                <span className="bg-white px-3 py-1.5 rounded-lg border border-sage-200 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-sage-600" />
                  Relaxation &amp; De-addiction Modalities
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                onClick={onBookClick}
                className="bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-3.5 rounded-full font-semibold text-sm transition shadow-md hover:shadow-lg"
              >
                Book a Session with Deepa
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
