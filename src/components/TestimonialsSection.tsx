"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Rhea M.",
    location: "Bengaluru (Online Client)",
    concern: "Workplace Burnout & Panic",
    review:
      "Deepa creates an incredibly calm and grounded atmosphere. I had been struggling with severe work panic attacks for months. In just 4 sessions, the cognitive tools and grounding exercises she taught me transformed how I react to stress.",
    rating: 5,
  },
  {
    name: "S. & A. Kapoor",
    location: "Online Video (Couples Counseling)",
    concern: "Relationship Communication",
    review:
      "We felt heard without any bias. Deepa helped us break down years of defensive patterns and taught us how to talk to each other without spiraling into conflict. We are deeply grateful.",
    rating: 5,
  },
  {
    name: "Tanmay D.",
    location: "Dubai, UAE (NRI Online Session)",
    concern: "Grief & Emotional Transition",
    review:
      "Living abroad and dealing with the loss of a parent felt isolating. Deepa was patient, compassionate, and helped me navigate the stages of grief at my own pace. Booking and scheduling from overseas was seamless.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-semibold uppercase tracking-wider">
            Stories of Healing
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sage-900">
            What Clients Say
          </h2>
          <p className="text-base sm:text-lg text-sage-700 leading-relaxed">
            Real experiences from individuals and couples who took the brave first step toward emotional well-being.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, index) => (
            <div
              key={index}
              className="bg-linen-50 rounded-3xl p-8 border border-sage-100 shadow-xs flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-ochre-500 gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-ochre-500" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-sage-300/60" />
                </div>

                <p className="text-sm text-sage-800 leading-relaxed italic mb-6">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-sage-200/60">
                <div className="font-serif font-bold text-base text-sage-900">
                  {item.name}
                </div>
                <div className="text-xs text-terracotta-600 font-medium">
                  {item.concern}
                </div>
                <div className="text-[11px] text-sage-500">
                  {item.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-sage-500 italic">
          * Names abbreviated or anonymized to respect strict client privacy and confidentiality guidelines.
        </div>

      </div>
    </section>
  );
}
