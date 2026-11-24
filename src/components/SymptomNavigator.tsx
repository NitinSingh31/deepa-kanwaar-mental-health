"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Brain, 
  HeartHandshake, 
  Users,
  ShieldAlert,
  ShieldCheck,
  HelpCircle,
  Video
} from "lucide-react";

interface SymptomTopic {
  id: string;
  pillLabel: string;
  category: string;
  icon: React.ElementType;
  userFeeling: string;
  serviceMatch: string;
  clinicalApproach: string;
  firstStepTip: string;
}

const TOPICS: SymptomTopic[] = [
  {
    id: "overthinking",
    pillLabel: "Overthinking, Anxiety & Depression",
    category: "Mental Health & Mood",
    icon: Brain,
    userFeeling:
      "Your mind feels like it has 20 tabs open at once. Constant worry, dreading worst-case scenarios, feelings of low mood, or sudden panic keep you exhausted.",
    serviceMatch: "Psychotherapy",
    clinicalApproach:
      "Cognitive Behavioral Therapy (CBT) and compassionate psychodynamic reframing to dismantle negative thought spirals and build emotional equilibrium.",
    firstStepTip:
      "Learn how to separate real actionable problems from automatic catastrophic thoughts.",
  },
  {
    id: "restlessness",
    pillLabel: "Physical Restlessness & Stress",
    category: "Somatic Distress",
    icon: Sparkles,
    userFeeling:
      "Your chest feels tight, your breathing is shallow, and your body stays in a constant state of hyper-alert fight-or-flight, making deep sleep or true rest impossible.",
    serviceMatch: "Relaxation Techniques",
    clinicalApproach:
      "Vagus nerve down-regulation, diaphragmatic breathwork, and progressive muscle relaxation (PMR) to reset your physical nervous system.",
    firstStepTip:
      "Practice an immediate 3-minute somatic breath pacing anchor to physically discharge tension.",
  },
  {
    id: "relationship",
    pillLabel: "Relationship Friction & Communication",
    category: "Couples & Marital",
    icon: HeartHandshake,
    userFeeling:
      "Having the exact same arguments over and over. One person shuts down while the other feels unheard, creating an emotional wall between you and your partner.",
    serviceMatch: "Individual and Couple Counselling",
    clinicalApproach:
      "Emotionally Focused Therapy (EFT) to decode underlying emotional needs, replace defensive barriers with vulnerability, and realign mutual trust.",
    firstStepTip:
      "Identify the unspoken emotional vulnerability beneath repeating everyday friction.",
  },
  {
    id: "de-addiction",
    pillLabel: "Habit Loops & Substance Dependency",
    category: "Habit Transformation",
    icon: ShieldAlert,
    userFeeling:
      "Using substances, alcohol, gaming, or compulsive behaviors to cope with overwhelming stress or loneliness, feeling caught in a cycle of regret and relapse.",
    serviceMatch: "De-addiction Counselling",
    clinicalApproach:
      "Motivational interviewing, identifying emotional triggers, urge surfing, and creating structured, non-judgmental relapse prevention plans.",
    firstStepTip:
      "Map out the exact high-risk emotional triggers that precede compulsive urges.",
  },
  {
    id: "trauma",
    pillLabel: "Trauma & Sexual Abuse Healing",
    category: "Trauma Recovery",
    icon: ShieldCheck,
    userFeeling:
      "Carrying unresolved past pain, memories that trigger sudden emotional overwhelm, flashbacks, or a profound loss of safety and bodily autonomy.",
    serviceMatch: "Sexual Abuse Counselling",
    clinicalApproach:
      "Safe, trauma-informed pacing, somatic grounding, and gentle compassion-focused processing in an absolute, strictly confidential environment.",
    firstStepTip:
      "Anchor your present safety so difficult memories lose their overwhelming power over your day.",
  },
  {
    id: "isolation",
    pillLabel: "Feeling Isolated & Needing Peer Support",
    category: "Collective Healing",
    icon: Users,
    userFeeling:
      "Feeling like no one around you truly understands what you are going through, leading to emotional loneliness and isolation.",
    serviceMatch: "Group Therapy",
    clinicalApproach:
      "Facilitated small-group reflection circles where shared experiences, peer empathy, and collective coping dismantle shame and build resilience.",
    firstStepTip:
      "Experience the profound relief of hearing 'I feel that exact same way too' in a safe space.",
  },
];

interface SymptomNavigatorProps {
  onSelectService: (serviceName: string) => void;
  onFreeConsultClick: () => void;
}

export default function SymptomNavigator({
  onSelectService,
  onFreeConsultClick,
}: SymptomNavigatorProps) {
  const [selectedTopic, setSelectedTopic] = useState<SymptomTopic>(TOPICS[0]);

  const Icon = selectedTopic.icon;

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-50 border border-terracotta-200 text-terracotta-700 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Navigator
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sage-900">
            What Are You Navigating Right Now?
          </h2>
          <p className="text-sm sm:text-base text-sage-700">
            Select what resonates most with your current emotional state to see how Deepa approaches your situation.
          </p>
        </div>

        {/* Interactive Pill Cloud */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto mb-10">
          {TOPICS.map((topic) => {
            const isSelected = selectedTopic.id === topic.id;
            const TopicIcon = topic.icon;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => setSelectedTopic(topic)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-terracotta-500 text-white shadow-md scale-102 ring-2 ring-terracotta-400/40"
                    : "bg-linen-100 hover:bg-linen-200 text-sage-800 border border-sage-200/80 hover:border-terracotta-300"
                }`}
              >
                <TopicIcon className={`w-4 h-4 ${isSelected ? "text-white" : "text-terracotta-600"}`} />
                <span>{topic.pillLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-linen-50 via-white to-linen-50 rounded-3xl p-6 sm:p-10 border border-sage-200 shadow-md">
          <div className="flex flex-col">
            
            {/* Top row of card */}
            <div className="flex items-center justify-between pb-6 border-b border-sage-200/80 flex-wrap gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-terracotta-100 border border-terracotta-200 flex items-center justify-center text-terracotta-700">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta-600 block">
                    {selectedTopic.category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-sage-900">
                    {selectedTopic.pillLabel}
                  </h3>
                </div>
              </div>

              <div className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-sage-100 text-sage-800 border border-sage-200">
                20+ Years Clinical Insight
              </div>
            </div>

            {/* Middle 2-col content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-6 items-start">
              
              {/* Left Column: What It Feels Like */}
              <div className="md:col-span-7 space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-sage-200/80 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-sage-700 uppercase tracking-wider mb-2">
                    <HelpCircle className="w-4 h-4 text-terracotta-500" />
                    <span>How You Might Be Feeling:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-sage-800 leading-relaxed italic">
                    &ldquo;{selectedTopic.userFeeling}&rdquo;
                  </p>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-sage-800">
                  <CheckCircle2 className="w-5 h-5 text-sage-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sage-900 block font-semibold">In Our First Session:</strong>
                    <span>{selectedTopic.firstStepTip}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Deepa's Approach Box */}
              <div className="md:col-span-5 bg-white rounded-2xl p-5 border border-sage-200/80 space-y-3.5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sage-500 block">
                    Recommended Service:
                  </span>
                  <span className="font-serif text-base font-bold text-sage-900 block">
                    {selectedTopic.serviceMatch}
                  </span>
                </div>

                <div className="text-xs text-sage-700 leading-relaxed bg-linen-50 p-3 rounded-xl border border-sage-100">
                  <span className="font-semibold text-sage-900 block mb-1">Clinical Approach:</span>
                  <span>{selectedTopic.clinicalApproach}</span>
                </div>

                <div className="text-xs text-sage-600 flex items-center gap-1.5 pt-1">
                  <Video className="w-3.5 h-3.5 text-sage-500" />
                  <span>100% Online via Encrypted Google Meet</span>
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-sage-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-sage-700 text-center sm:text-left">
                Not sure where to begin? <strong className="text-sage-900">Start with a Free 15-Minute Call.</strong>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onFreeConsultClick}
                  className="w-full sm:w-auto bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-700 border border-terracotta-200 px-5 py-2.5 rounded-full text-xs font-bold transition active:scale-95 text-center"
                >
                  Get a Free Consultation
                </button>

                <button
                  type="button"
                  onClick={() => onSelectService(selectedTopic.serviceMatch)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sage-800 hover:bg-terracotta-500 text-white px-5 py-2.5 rounded-full text-xs font-semibold transition active:scale-95"
                >
                  <span>Book for This</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
