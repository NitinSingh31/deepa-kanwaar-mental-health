"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "What happens during our first therapy session?",
    answer:
      "The first 60-minute session is an exploratory, intake evaluation. We will gently discuss what brought you to therapy, current symptoms, personal history, and what goals you hope to achieve. There is no pressure to share more than you feel ready to.",
  },
  {
    question: "Is therapy strictly confidential?",
    answer:
      "Yes, 100%. Everything shared in our sessions is completely private and protected under clinical psychology ethical guidelines and medical data protection standards. Exceptions occur only in extreme, life-threatening legal circumstances.",
  },
  {
    question: "How do I attend an online session?",
    answer:
      "Online sessions take place over encrypted Google Meet or Zoom. Upon booking confirmation, you will receive a private meeting link. All you need is a stable internet connection and a quiet, private space.",
  },
  {
    question: "How does the ₹2,100 payment work?",
    answer:
      "You have two options: 1) Pay online immediately via UPI (Google Pay, PhonePe, Paytm), Cards, or Netbanking to lock your slot instantly. 2) Reserve your slot and transfer ₹2,100 to the clinic's UPI ID, then send confirmation via WhatsApp prior to the appointment.",
  },
  {
    question: "What is the cancellation or rescheduling policy?",
    answer:
      "We understand unforeseen events happen. You can reschedule your session up to 12 hours prior to the appointment time without any fee by messaging or emailing us.",
  },
  {
    question: "How many sessions will I need?",
    answer:
      "Therapy duration varies according to each individual's needs. Some clients find clarity and coping tools within 4 to 8 sessions, while others benefit from ongoing fortnightly support. We evaluate your progress together every few sessions.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 bg-linen-100 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-200/70 text-sage-800 text-xs font-semibold uppercase tracking-wider">
            Got Questions?
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sage-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-sage-700">
            Clear answers about sessions, confidentiality, pricing, and how therapy works.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-sage-200/80 shadow-2xs overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-sage-900"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-terracotta-500 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-sage-700 leading-relaxed border-t border-sage-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
