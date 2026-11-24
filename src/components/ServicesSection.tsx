"use client";

import React, { useState } from "react";
import { 
  Brain, 
  HeartHandshake, 
  Sparkles, 
  Activity, 
  Compass, 
  Flame, 
  ArrowRight,
  CheckCircle2,
  X
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  icon: React.ElementType;
  accentColor: string;
  description: string;
  keyAreas: string[];
  approach: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "anxiety",
    title: "Anxiety & Panic Management",
    subtitle: "Reclaim your inner calm",
    tagline: "Break free from constant worry and racing thoughts",
    icon: Activity,
    accentColor: "bg-sage-100 text-sage-700 border-sage-200",
    description:
      "Struggling with chronic worry, restlessness, panic attacks, or social anxiety? We utilize Cognitive Behavioral Therapy (CBT) and somatic grounding techniques to help you rewire distress pathways and regain confidence.",
    keyAreas: [
      "Generalized Anxiety Disorder (GAD)",
      "Panic Attacks & Health Anxiety",
      "Social Anxiety & Performance Fears",
      "Obsessive thoughts and overthinking",
    ],
    approach: "CBT, Exposure Response Prevention, and Nervous System Regulation.",
  },
  {
    id: "depression",
    title: "Depression & Mood Healing",
    subtitle: "Rediscover meaning & hope",
    tagline: "Gentle, compassionate support when everything feels heavy",
    icon: Brain,
    accentColor: "bg-terracotta-100 text-terracotta-700 border-terracotta-200",
    description:
      "When fatigue, numbness, and hopelessness cloud your days, therapy provides a safe sanctuary to unpack grief, emotional numbness, and depressive episodes without fear of judgment.",
    keyAreas: [
      "Persistent low mood & lack of motivation",
      "Post-loss grief and emotional numbness",
      "Major depressive episodes & sadness",
      "Navigating isolation and life transitions",
    ],
    approach: "Behavioral Activation, Mindful Acceptance, and Compassion-Focused Therapy.",
  },
  {
    id: "couples",
    title: "Relationship & Couples Counseling",
    subtitle: "Foster authentic connection",
    tagline: "Bridge emotional disconnects and rebuild mutual trust",
    icon: HeartHandshake,
    accentColor: "bg-ochre-100 text-ochre-700 border-ochre-200",
    description:
      "Whether addressing recurring arguments, emotional distance, infidelity recovery, or premarital alignment, we create a neutral, respectful space for healthy communication and intimacy.",
    keyAreas: [
      "Communication breakdowns & circular arguments",
      "Premarital counseling & alignment of values",
      "Rebuilding trust, safety, and emotional bond",
      "Navigating separation or difficult boundaries",
    ],
    approach: "Emotionally Focused Therapy (EFT) and Gottman Method frameworks.",
  },
  {
    id: "burnout",
    title: "Work-Life Burnout & Executive Stress",
    subtitle: "Restore energy & healthy boundaries",
    tagline: "Navigate corporate pressure without sacrificing your health",
    icon: Flame,
    accentColor: "bg-sage-100 text-sage-800 border-sage-200",
    description:
      "High performance should not cost your mental stability. Learn how to set firm professional boundaries, manage imposter syndrome, and recover from severe corporate exhaustion.",
    keyAreas: [
      "Chronic workplace exhaustion & fatigue",
      "Boundary setting with colleagues & managers",
      "Imposter syndrome & perfectionism traps",
      "Career crossroads and decision anxiety",
    ],
    approach: "Acceptance & Commitment Therapy (ACT) and Stress Inoculation.",
  },
  {
    id: "trauma",
    title: "Trauma, Grief & Inner Child Healing",
    subtitle: "Unpack past wounds gently",
    tagline: "Heal deeply held emotional pain at your own pace",
    icon: Sparkles,
    accentColor: "bg-terracotta-100 text-terracotta-800 border-terracotta-200",
    description:
      "Past experiences often cast long shadows over present choices. Through gentle pacing and trauma-informed guidance, we process unresolved memories so you can feel whole again.",
    keyAreas: [
      "Childhood emotional neglect or trauma",
      "Loss of loved ones, sudden life shifts",
      "Inner critic resolution and self-forgiveness",
      "Developing emotional resilience and safety",
    ],
    approach: "Trauma-Informed Psychotherapy and Somatic Grounding.",
  },
  {
    id: "growth",
    title: "Personal Growth & Self-Worth",
    subtitle: "Step into your authentic self",
    tagline: "Cultivate self-worth, assertiveness, and emotional clarity",
    icon: Compass,
    accentColor: "bg-ochre-100 text-ochre-800 border-ochre-200",
    description:
      "Therapy isn't only for crisis; it is also a powerful mirror for self-discovery, strengthening self-trust, overcoming people-pleasing, and charting a purposeful life.",
    keyAreas: [
      "Overcoming chronic people-pleasing habits",
      "Building healthy self-esteem & body image",
      "Clarifying personal values & identity",
      "Navigating major 20s/30s/40s life transitions",
    ],
    approach: "Humanistic, Person-Centered Psychotherapy.",
  },
];

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [activeModal, setActiveModal] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-semibold uppercase tracking-wider">
            Clinical Specializations &bull; Skills
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sage-900">
            Tailored Counseling for Life&apos;s Complexities
          </h2>
          <p className="text-base sm:text-lg text-sage-700 leading-relaxed">
            Every mind is unique. Sessions are crafted around your personal narrative, drawing on proven, scientifically verified psychological modalities.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative bg-linen-50/70 hover:bg-white rounded-3xl p-8 border border-sage-100 hover:border-sage-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Subtitle */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${service.accentColor}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-semibold tracking-wider text-sage-600 uppercase bg-white px-3 py-1 rounded-full border border-sage-100">
                      60 Min Session
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-sage-900 mb-2 group-hover:text-terracotta-600 transition">
                    {service.title}
                  </h3>
                  
                  <p className="text-xs font-medium text-terracotta-600 mb-4">
                    {service.subtitle}
                  </p>

                  <p className="text-sm text-sage-700 leading-relaxed mb-6">
                    {service.tagline}
                  </p>

                  {/* Bullet points summary */}
                  <ul className="space-y-2 mb-6">
                    {service.keyAreas.slice(0, 3).map((area, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-sage-700">
                        <CheckCircle2 className="w-4 h-4 text-sage-600 flex-shrink-0 mt-0.5" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-4 border-t border-sage-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveModal(service)}
                    className="text-xs font-semibold text-sage-800 hover:text-terracotta-600 underline underline-offset-4 transition"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => onSelectService(service.title)}
                    className="inline-flex items-center gap-1.5 bg-sage-800 hover:bg-terracotta-500 text-white text-xs px-4 py-2 rounded-full font-medium transition"
                  >
                    <span>Book Session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global / NRI Note */}
        <div className="mt-12 bg-linen-100 rounded-2xl p-6 border border-sage-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-sage-700 shadow-xs">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-sage-900">
                Online Therapy Across India &amp; Global (NRI Support)
              </h4>
              <p className="text-xs sm:text-sm text-sage-700">
                Sessions offered via secure Google Meet / Zoom with flexible scheduling across international time zones (US, UK, UAE, Australia).
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectService("General Consultation")}
            className="flex-shrink-0 bg-white hover:bg-sage-50 text-sage-900 border border-sage-300 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition"
          >
            Schedule Online Session
          </button>
        </div>

      </div>

      {/* Service Detail Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sage-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-sage-100 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-sage-600 hover:text-sage-900 hover:bg-sage-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-semibold text-terracotta-600 uppercase tracking-wider">
                Clinical Focus
              </span>
              <h3 className="font-serif text-2xl font-bold text-sage-900 mt-1">
                {activeModal.title}
              </h3>
            </div>

            <p className="text-sm text-sage-700 leading-relaxed mb-6">
              {activeModal.description}
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-sage-800 mb-2">
                  Key Symptoms &amp; Issues Addressed:
                </h5>
                <ul className="space-y-1.5">
                  {activeModal.keyAreas.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-sage-700">
                      <CheckCircle2 className="w-4 h-4 text-sage-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-linen-100 p-3.5 rounded-xl border border-sage-100">
                <span className="text-[11px] uppercase font-bold text-sage-600 block mb-1">
                  Clinical Modalities Used:
                </span>
                <span className="text-xs text-sage-800 font-medium">
                  {activeModal.approach}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-sage-100">
              <div className="text-xs text-sage-700">
                <span className="font-bold text-base text-sage-900">₹2,100</span> / 60 minutes
              </div>
              <button
                onClick={() => {
                  const serviceName = activeModal.title;
                  setActiveModal(null);
                  onSelectService(serviceName);
                }}
                className="bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs px-6 py-3 rounded-full font-semibold transition shadow-sm"
              >
                Book This Service
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
