"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <aside aria-label="WhatsApp Support" className="fixed bottom-6 right-6 z-40">
      <a
        href="https://wa.me/919876543210?text=Hello%20Deepa%20Kanwaar,%20I%20would%20like%20to%20inquire%20about%20a%20therapy%20session."
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        <span className="text-xs font-bold tracking-wide pr-1 hidden sm:inline">
          Chat with Deepa
        </span>
      </a>
    </aside>
  );
}
