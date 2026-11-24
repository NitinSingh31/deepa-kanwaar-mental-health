"use client";

import React, { useState } from "react";
import { 
  Brain, 
  HeartHandshake, 
  Sparkles, 
  Users,
  ShieldAlert,
  ShieldCheck,
  Compass, 
  ArrowRight,
  CheckCircle2,
  X,
  Phone
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
    id: "psychotherapy",
    title: "Psychotherapy",
    subtitle: "Comprehensive mental health care",
    tagline: "Evidence-based therapy for anxiety, depression, mood distress, and emotional balance",
    icon: Brain,
    accentColor: "bg-sage-100 text-sage-800 border-sage-200",
    description:
      "Psychotherapy provides a confidential sanctuary to address persistent emotional distress, chronic anxiety, depression, panic, and overwhelming life challenges. Drawing on 20+ years of clinical insight, we collaboratively unpack root triggers and establish lasting coping strategies.",
    keyAreas: [
      "Generalized Anxiety, Panic & Overthinking",
      "Depression, Mood Swings & Loss of Motivation",
      "Emotional Dysregulation & Burnout",
      "Cognitive Restructuring & Behavioral Grounding",
    ],
    approach: "Cognitive Behavioral Therapy (CBT), Psychodynamic & Humanistic Modalities.",
  },
  {
    id: "relaxation",
    title: "Relaxation Techniques",
    subtitle: "Somatic calm & nervous system regulation",
    tagline: "Guided somatic practices, deep breathwork, and progressive stress alleviation",
    icon: Sparkles,
    accentColor: "bg-terracotta-100 text-terracotta-800 border-terracotta-200",
    description:
      "When psychological tension expresses itself physically—as tight chests, shallow breathing, sleep disturbances, or restless tension—relaxation therapies help restore autonomic balance and calm an overstimulated nervous system.",
    keyAreas: [
      "Guided Diaphragmatic Breathwork & Vagus Nerve Soothing",
      "Progressive Muscle Relaxation (PMR)",
      "Mindfulness Grounding for Acute Panic & Stress",
      "Sleep Hygiene & Restorative Evening Routines",
    ],
    approach: "Mindfulness-Based Stress Reduction (MBSR), Somatic Grounding, and Autogenic Relaxation.",
  },
  {
    id: "group-therapy",
    title: "Group Therapy",
    subtitle: "Shared healing & collective resilience",
    tagline: "Safe, facilitated group circles to break isolation and build emotional strength together",
    icon: Users,
    accentColor: "bg-ochre-100 text-ochre-800 border-ochre-200",
    description:
      "Healing does not have to be a lonely pursuit. Guided by Deepa Kanwaar, small-group sessions create an empowering, non-judgmental space to share experiences, gain fresh perspectives, and discover that you are never truly alone.",
    keyAreas: [
      "Safe, Facilitated Peer Reflection & Validation",
      "Breaking Loneliness, Social Alienation & Guilt",
      "Collective Emotional Coping & Resilience Circles",
      "Interpersonal Communication & Empathy Practice",
    ],
    approach: "Facilitated Group Process, Interpersonal Learning, and Psychoeducation.",
  },
  {
    id: "individual-couple",
    title: "Individual and Couple Counselling",
    subtitle: "Deepening connection & personal growth",
    tagline: "Navigating relationship friction, premarital clarity, communication barriers, and self-worth",
    icon: HeartHandshake,
    accentColor: "bg-sage-100 text-sage-800 border-sage-200",
    description:
      "Whether exploring your own personal identity or navigating recurring friction with your partner, this counseling helps decode defensive loops, rebuild trust, foster respectful communication, and align on mutual values.",
    keyAreas: [
      "Communication Breakdowns & Circular Conflicts",
      "Premarital Guidance & Value Alignment",
      "Rebuilding Trust, Intimacy & Emotional Safety",
      "Self-Worth, Boundaries & Personal Autonomy",
    ],
    approach: "Emotionally Focused Therapy (EFT), Gottman Frameworks, and Person-Centered Counseling.",
  },
  {
    id: "de-addiction",
    title: "De-addiction Counselling",
    subtitle: "Compassionate recovery & habit transformation",
    tagline: "Structured psychological guidance for overcoming substance dependencies and behavioral habits",
    icon: ShieldAlert,
    accentColor: "bg-terracotta-100 text-terracotta-800 border-terracotta-200",
    description:
      "Addiction is deeply tied to emotional pain, stress, and behavioral triggers. Deepa provides an empathetic, non-shaming space to identify compulsive patterns, de-escalate cravings, and design sustainable relapse prevention plans.",
    keyAreas: [
      "Substance & Alcohol Dependency Support",
      "Behavioral Addictions (Gaming, Digital, Compulsions)",
      "Identifying Emotional Triggers & Urge Surfing",
      "Relapse Prevention Strategies & Accountability Support",
    ],
    approach: "Motivational Interviewing, Relapse Prevention Therapy (RPT), and Cognitive Behavioral Conditioning.",
  },
  {
    id: "sexual-abuse",
    title: "Sexual Abuse Counselling",
    subtitle: "Trauma-informed, confidential safe space",
    tagline: "Compassionate healing and safe emotional processing for survivors of sexual abuse and assault",
    icon: ShieldCheck,
    accentColor: "bg-ochre-100 text-ochre-800 border-ochre-200",
    description:
      "Surviving sexual abuse carries profound emotional weight. In this deeply confidential, pacing-controlled environment, survivors are supported with utmost dignity to reclaim emotional safety, work through trauma responses, and rebuild self-worth.",
    keyAreas: [
      "Trauma-Informed Safe Processing at Your Own Pace",
      "Reclaiming Bodily Autonomy, Safety & Personal Dignity",
      "Untangling Guilt, Shame, Flashbacks & Hypervigilance",
      "100% Confidential, Strictly Protected Care",
    ],
    approach: "Trauma-Informed Psychotherapy, Compassion-Focused Care, and Somatic De-escalation.",
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-semibold uppercase tracking-wider">
            Compassionate Care for Your Well-being
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sage-900">
            Working with All Kinds of Mental Health Issues
          </h2>
          <p className="text-base sm:text-lg text-sage-700 leading-relaxed">
            With <strong>20+ years of dedicated clinical experience</strong>, Deepa Kanwaar provides empathetic, scientifically grounded psychological counseling across six specialized pillars—conducted 100% online with absolute confidentiality.
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
                      60 Min &bull; Online
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

        {/* Global / Purely Online Banner */}
        <div className="mt-12 bg-linen-100 rounded-2xl p-6 border border-sage-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-sage-700 shadow-xs">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-sage-900">
                100% Online Counseling &bull; Pan-India &amp; Global NRI Support
              </h4>
              <p className="text-xs sm:text-sm text-sage-700">
                All consultations are conducted via encrypted Google Meet links. Attend from the comfort and privacy of your home anywhere in India or across international time zones.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919877408869?text=Hello%20Deepa%20Kanwaar,%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp: 9877408869</span>
            </a>
            <button
              onClick={() => onSelectService("Psychotherapy")}
              className="flex-shrink-0 bg-white hover:bg-sage-50 text-sage-900 border border-sage-300 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition"
            >
              Schedule Online
            </button>
          </div>
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
                Specialized Service Focus
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
                  Key Areas Addressed:
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
                <span className="font-bold text-base text-sage-900">₹2,100</span> / 60 minutes (100% Online)
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
