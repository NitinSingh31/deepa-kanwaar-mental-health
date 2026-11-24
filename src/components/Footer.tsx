"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Heart, ShieldCheck, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#18221c] text-sage-100 pt-16 pb-12 border-t border-sage-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-sage-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-sage-500 bg-white flex-shrink-0 shadow-xs">
                <Image
                  src="/images/logo-icon.png"
                  alt="Deepa Kanwaar Mental Health Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-2xl text-white block tracking-tight">
                  DEEPA KANWAAR
                </span>
                <span className="text-xs uppercase tracking-widest text-ochre-300 font-bold">
                  Mental Health &bull; Consulting Psychologist
                </span>
              </div>
            </div>

            <p className="text-sm text-sage-200 leading-relaxed max-w-sm">
              Providing compassionate, scientifically verified psychotherapy to help individuals, couples, and professionals overcome distress, regain balance, and thrive.
            </p>

            <div className="flex items-center gap-2 text-xs text-sage-300">
              <ShieldCheck className="w-4 h-4 text-ochre-400" />
              <span>RCI Registered Psychologist &bull; 100% Confidential</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-sage-200">
              <li>
                <a href="#services" className="hover:text-ochre-300 transition">
                  Therapy Specialties
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-ochre-300 transition">
                  About Deepa Kanwaar
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-ochre-300 transition">
                  How Therapy Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-ochre-300 transition">
                  Fees &amp; Plans
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-ochre-300 transition">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <Link href="/admin" className="text-ochre-300 hover:text-white flex items-center gap-1 transition">
                  <Lock className="w-3.5 h-3.5" />
                  Doctor Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Contact &amp; Clinic
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-sage-200">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-terracotta-400 flex-shrink-0 mt-0.5" />
                <span>Suite 402, Serene Mind Wellness Clinic, Park Street, New Delhi</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-terracotta-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-terracotta-400 flex-shrink-0" />
                <a href="mailto:contact@deepakanwaar.com" className="hover:text-white transition">
                  contact@deepakanwaar.com
                </a>
              </li>
            </ul>
            <div className="pt-2">
              <div className="p-3 rounded-xl bg-[#121915] border border-sage-800 text-xs text-sage-300">
                Online sessions conducted via encrypted Google Meet worldwide.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sage-300 gap-3 text-center">
          <div>
            &copy; 2026 Deepa Kanwaar Mental Health. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-sage-300">
            <span>Made with compassionate care for emotional well-being</span>
            <Heart className="w-3.5 h-3.5 text-terracotta-500 inline fill-terracotta-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
