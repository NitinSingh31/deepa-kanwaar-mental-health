"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Brain, 
  Flame, 
  HeartHandshake, 
  Activity, 
  Compass, 
  ShieldAlert, 
  HelpCircle,
  Clock
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
    pillLabel: "Overthinking & Racing Thoughts",
    category: "Anxiety & Stress",
    icon: Brain,
    userFeeling:
      "Your mind feels like it has 20 tabs open at once. You analyze past conversations, dread worst-case scenarios, and struggle to switch off even when trying to sleep.",
    serviceMatch: "Anxiety & Panic Management",
    clinicalApproach:
      "We use Cognitive Restructuring (CBT) and somatic down-regulation to slow down neural threat alarms and restore mental quiet.",
    firstStepTip:
      "Learn how to separate helpful problem-solving from unhelpful rumination loops.",
  },
  {
    id: "burnout",
    pillLabel: "Corporate Burnout & Exhaustion",
    category: "Workplace Mental Health",
    icon: Flame,
    userFeeling:
      "Dreading Monday mornings, feeling depleted by Slack messages, and wondering if you have lost your edge. You're exhausted but feel guilty whenever you rest.",
    serviceMatch: "Work-Life Burnout & Executive Stress",
    clinicalApproach:
      "Boundary inoculation, nervous system recovery pacing, and detaching your self-worth from non-stop workplace performance.",
    firstStepTip:
      "Identify your silent energy drains and establish firm professional boundaries without guilt.",
  },
  {
    id: "relationship",
    pillLabel: "Relationship Friction & Distance",
    category: "Couples & Marital",
    icon: HeartHandshake,
    userFeeling:
      "Having the exact same argument over and over. One person shuts down while the other feels unheard, creating an emotional wall between you and your partner.",
    serviceMatch: "Relationship & Couples Counseling",
    clinicalApproach:
      "Emotionally Focused Therapy (EFT) to decode underlying attachment needs and replace defensive walls with open, honest dialogue.",
    firstStepTip:
      "Discover the hidden emotional trigger beneath recurring daily disagreements.",
  },
  {
    id: "panic",
    pillLabel: "Sudden Panic & Physical Restlessness",
    category: "Somatic Distress",
    icon: Activity,
    userFeeling:
      "Heart pounding, shallow breathing, chest tightness, or a sudden rush of dread in crowded spaces, meetings, or quiet moments.",
    serviceMatch: "Anxiety & Panic Management",
    clinicalApproach:
      "Vagus nerve stimulation, diaphragmatic resetting, and somatic exposure so physical sensations no longer trigger panic.",
    firstStepTip:
      "Build a reliable 90-second physiological anchor to de-escalate acute panic.",
  },
  {
    id: "boundaries",
    pillLabel: "People-Pleasing & Saying 'No'",
    category: "Self-Worth",
    icon: ShieldAlert,
    userFeeling:
      "Saying 'yes' when every fiber in you wants to say 'no'. You fear disappointing others, taking on everyone else's emotional burden at the expense of your own peace.",
    serviceMatch: "Personal Growth & Self-Worth",
    clinicalApproach:
      "Assertiveness conditioning, differentiating kindness from self-betrayal, and building healthy emotional autonomy.",
    firstStepTip:
      "Learn the art of the compassionate pause before committing your energy to others.",
  },
  {
    id: "imposter",
    pillLabel: "Imposter Syndrome & Self-Doubt",
    category: "Identity & Growth",
    icon: Compass,
    userFeeling:
      "No matter what you achieve, a persistent inner voice whispers that you got lucky and will soon be exposed. Perfectionism becomes a trap to hide self-doubt.",
    serviceMatch: "Personal Growth & Self-Worth",
    clinicalApproach:
      "Inner critic restructuring, reconciling perceived vs actual competence, and cultivating grounded self-compassion.",
    firstStepTip:
      "Uncover why external praise never feels quite enough and anchor internal confidence.",
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

        {/* Dynamic Empathy & Action Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-linen-50 rounded-3xl p-6 sm:p-10 border-2 border-sage-200 shadow-md relative overflow-hidden transition-all duration-300">
            
            {/* Top Accent Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-sage-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-sage-200 flex items-center justify-center text-terracotta-600 shadow-2xs">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-terracotta-600">
                    {selectedTopic.category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-sage-900">
                    {selectedTopic.pillLabel}
                  </h3>
                </div>
              </div>

              <span className="text-xs font-semibold bg-white border border-sage-200 text-sage-700 px-3.5 py-1 rounded-full">
                Recommended Focus
              </span>
            </div>

            {/* Content Details */}
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
                    Specialized Counseling:
                  </span>
                  <span className="font-serif text-base font-bold text-sage-900 block">
                    {selectedTopic.serviceMatch}
                  </span>
                </div>

                <div className="text-xs text-sage-700 leading-relaxed bg-linen-50 p-3 rounded-xl border border-sage-100">
                  <span className="font-semibold text-sage-900 block mb-1">Evidence-Based Method:</span>
                  <span>{selectedTopic.clinicalApproach}</span>
                </div>

                <div className="text-xs text-sage-600 flex items-center gap-1.5 pt-1">
                  <Clock className="w-3.5 h-3.5 text-sage-500" />
                  <span>Available via Online Video or In-Clinic</span>
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
