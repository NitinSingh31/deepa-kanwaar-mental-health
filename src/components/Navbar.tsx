"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone, Calendar, ShieldCheck, Lock } from "lucide-react";

interface NavbarProps {
  onBookClick: () => void;
  onFreeConsultClick?: () => void;
}

export default function Navbar({ onBookClick, onFreeConsultClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleFreeConsult = () => {
    if (onFreeConsultClick) {
      onFreeConsultClick();
    } else {
      onBookClick();
    }
  };

  return (
    <>
      {/* Top Header Information Strip */}
      <div className="bg-sage-900 text-sage-100 text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-ochre-400 flex-shrink-0" />
            <span>Strictly Confidential &amp; Safe Psychological Care &bull; 100% Online Worldwide</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-sage-200">
            <a
              href="https://wa.me/919877408869"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ochre-300 transition"
            >
              WhatsApp: +91 98774 08869
            </a>
            <span className="hidden sm:inline">|</span>
            <Link
              href="/admin"
              className="text-ochre-300 hover:text-white flex items-center gap-1 transition"
            >
              <Lock className="w-3 h-3" />
              Doctor Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 bg-linen-50/90 backdrop-blur-md border-b border-sage-100/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo - Name is never truncated on mobile */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-sage-200 shadow-xs flex-shrink-0 bg-white">
                <Image
                  src="/images/logo-icon.png"
                  alt="Deepa Kanwaar Logo Icon"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="flex flex-col flex-shrink-0">
                <span className="font-serif font-bold text-[15px] sm:text-lg md:text-xl tracking-tight text-sage-900 leading-tight whitespace-nowrap">
                  DEEPA KANWAAR
                </span>
                <span className="text-[9px] sm:text-[10px] md:text-[11px] tracking-wider uppercase font-semibold text-terracotta-600 whitespace-nowrap">
                  Counselling Psychologist
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-sage-800">
              <a href="#services" className="hover:text-terracotta-600 transition">
                Specialties
              </a>
              <a href="#about" className="hover:text-terracotta-600 transition">
                About Deepa
              </a>
              <a href="#how-it-works" className="hover:text-terracotta-600 transition">
                How It Works
              </a>
              <a href="#pricing" className="hover:text-terracotta-600 transition">
                Fees & Plans
              </a>
              <a href="#faqs" className="hover:text-terracotta-600 transition">
                FAQs
              </a>
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://wa.me/919877408869?text=Hello%20Deepa%20Kanwaar,%20I%20would%20like%20to%20inquire%20about%20a%20counseling%20session."
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full text-sage-700 hover:text-sage-900 hover:bg-sage-100 transition border border-sage-200"
                title="WhatsApp Deepa"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                onClick={handleFreeConsult}
                className="inline-flex items-center gap-1.5 bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-700 border border-terracotta-200 px-4 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition shadow-2xs hover:shadow-xs active:scale-95"
              >
                <span>Get a Free Consultation</span>
              </button>

              <button
                onClick={onBookClick}
                className="inline-flex items-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 text-white px-5 py-2.5 rounded-full font-medium text-sm transition shadow-sm hover:shadow active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                Book Session
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex md:hidden items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <button
                onClick={onBookClick}
                className="bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs px-3 sm:px-3.5 py-1.5 rounded-full font-semibold shadow-xs transition active:scale-95 whitespace-nowrap"
              >
                <span className="hidden sm:inline">Book Session</span>
                <span className="sm:hidden">Book</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 sm:p-2 text-sage-800 hover:text-sage-900 rounded-lg hover:bg-sage-100 transition"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-linen-100 border-b border-sage-200 px-4 pt-3 pb-6 space-y-3">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-sage-900"
            >
              Specialties
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-sage-900"
            >
              About Deepa
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-sage-900"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-sage-900"
            >
              Fees & Plans
            </a>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-sage-900"
            >
              FAQs
            </a>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-ochre-700 flex items-center gap-1"
            >
              <Lock className="w-4 h-4" /> Doctor Admin Portal
            </Link>
            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleFreeConsult();
                }}
                className="w-full text-center bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-700 border border-terracotta-200 py-2.5 rounded-xl font-semibold text-sm transition"
              >
                Get a Free Consultation (15 Mins)
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full text-center bg-terracotta-500 hover:bg-terracotta-600 text-white py-3 rounded-xl font-medium shadow"
              >
                Book Session
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
