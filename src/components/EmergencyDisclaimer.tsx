"use client";

import React from "react";
import { AlertCircle, PhoneCall } from "lucide-react";

export default function EmergencyDisclaimer() {
  return (
    <div className="bg-amber-50/90 border-y border-amber-200/80 py-5 px-4 text-xs text-amber-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-200/80 flex items-center justify-center flex-shrink-0 text-amber-900">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <strong className="font-semibold block sm:inline">
              Crisis &amp; Emergency Notice:
            </strong>{" "}
            Deepa Kanwaar Mental Health is an outpatient counseling practice and not an emergency service.
          </div>
        </div>

        <div className="flex items-center gap-3 font-medium">
          <PhoneCall className="w-4 h-4 text-terracotta-600 flex-shrink-0" />
          <span>
            If in crisis or danger, please call 24/7 National Helplines:{" "}
            <strong className="text-amber-950 font-bold underline">14416 (Tele-MANAS)</strong> or{" "}
            <strong className="text-amber-950 font-bold underline">1800-599-0019 (KIRAN)</strong>.
          </span>
        </div>
      </div>
    </div>
  );
}
