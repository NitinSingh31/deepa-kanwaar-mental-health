"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, RotateCcw, Heart, CheckCircle2 } from "lucide-react";

interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    trait: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "How has your emotional battery felt over the last two weeks?",
    subtitle: "Select the option that feels most true for you right now.",
    options: [
      {
        label: "Running on empty & exhausted",
        description: "Fatigued even after rest, struggling to find motivation or excitement.",
        trait: "Burnout & Low Energy",
      },
      {
        label: "Restless & constantly anxious",
        description: "Racing thoughts, trouble sleeping, or frequent physical tension.",
        trait: "Elevated Anxiety",
      },
      {
        label: "Emotionally numb or detached",
        description: "Feeling disconnected from loved ones and going through the motions.",
        trait: "Emotional Overload",
      },
      {
        label: "Fluctuating with mood swings",
        description: "Fine one day, but easily triggered, irritable, or overwhelmed the next.",
        trait: "Stress Dysregulation",
      },
    ],
  },
  {
    id: 2,
    question: "What feels like your heaviest weight right now?",
    subtitle: "There are no wrong answers; this is entirely confidential.",
    options: [
      {
        label: "Work pressure & career uncertainty",
        description: "Deadlines, perfectionism, toxic environment, or imposter syndrome.",
        trait: "Workplace Stress",
      },
      {
        label: "Relationship friction or feeling unheard",
        description: "Recurring arguments, silent treatment, or premarital anxiety.",
        trait: "Interpersonal Conflict",
      },
      {
        label: "Past unresolved pain or sudden grief",
        description: "Processing a major loss, childhood patterns, or difficult memories.",
        trait: "Grief & Emotional Healing",
      },
      {
        label: "Self-doubt & chronic people-pleasing",
        description: "Difficulty setting boundaries and feeling not good enough.",
        trait: "Self-Worth Challenges",
      },
    ],
  },
  {
    id: 3,
    question: "Have you ever spoken with a professional counselor or psychologist before?",
    subtitle: "Helps Deepa tailor her communication to your familiarity.",
    options: [
      {
        label: "No, this would be my first time",
        description: "I am curious but nervous about what to expect and where to begin.",
        trait: "First-Time Client",
      },
      {
        label: "Yes, but looking for a better fit",
        description: "I have attended therapy before and want an empathetic, evidence-based approach.",
        trait: "Experienced Seeker",
      },
      {
        label: "I was considering it for someone else",
        description: "Exploring support for a partner, adolescent, or family member.",
        trait: "Family Guidance",
      },
    ],
  },
];

interface EmotionalQuizProps {
  onClaimFreeConsult: () => void;
}

export default function EmotionalQuiz({ onClaimFreeConsult }: EmotionalQuizProps) {
  const [currentStep, setCurrentStep] = useState(0); // 0, 1, 2 = Questions; 3 = Results
  const [answers, setAnswers] = useState<string[]>([]);

  const handleSelectOption = (trait: string) => {
    const updated = [...answers, trait];
    setAnswers(updated);
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(3); // Show results
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([]);
  };

  return (
    <section className="py-20 bg-linen-100 relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-0 -ml-20 w-80 h-80 rounded-full bg-sage-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 -mr-20 w-80 h-80 rounded-full bg-terracotta-200/30 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-200/80 text-sage-800 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
            60-Second Self-Reflection
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sage-900">
            Is Therapy Right for You?
          </h2>
          <p className="text-xs sm:text-sm text-sage-700">
            Take a gentle, anonymous moment to check in with yourself. No sign-ups or personal details required.
          </p>
        </div>

        {/* Main Quiz Card */}
        <div className="bg-white rounded-3xl p-4 sm:p-10 shadow-xl border border-sage-200/80 transition-all duration-300">
          
          {/* Active Questions Flow (0 to 2) */}
          {currentStep < 3 && (
            <div>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs font-semibold text-sage-600 mb-3">
                <span className="uppercase tracking-wider">
                  Question {currentStep + 1} of {QUESTIONS.length}
                </span>
                <span className="text-terracotta-600 font-bold">
                  {Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-linen-100 h-2 rounded-full overflow-hidden mb-8">
                <div 
                  className="bg-terracotta-500 h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <div className="mb-6">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-sage-900 mb-1.5">
                  {QUESTIONS[currentStep].question}
                </h3>
                <p className="text-xs sm:text-sm text-sage-600">
                  {QUESTIONS[currentStep].subtitle}
                </p>
              </div>

              {/* Options Grid */}
              <div className="space-y-3">
                {QUESTIONS[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(option.trait)}
                    className="w-full text-left p-3.5 sm:p-5 rounded-2xl border border-sage-200 hover:border-terracotta-400 bg-linen-50/50 hover:bg-terracotta-50/40 transition-all duration-200 group flex items-start justify-between gap-3 sm:gap-4 cursor-pointer"
                  >
                    <div>
                      <div className="text-sm sm:text-base font-bold text-sage-900 group-hover:text-terracotta-700 transition">
                        {option.label}
                      </div>
                      <div className="text-xs text-sage-600 mt-1 leading-relaxed">
                        {option.description}
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-sage-200 group-hover:border-terracotta-500 flex items-center justify-center flex-shrink-0 text-sage-400 group-hover:text-terracotta-500 transition">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Screen (Step 3) */}
          {currentStep === 3 && (
            <div className="text-center space-y-6 py-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center mx-auto border-2 border-sage-300">
                <Heart className="w-8 h-8 text-terracotta-500 fill-terracotta-500/20" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
                  Your Reflection Summary
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-sage-900 mt-1">
                  You Don&apos;t Have to Carry This Alone
                </h3>
              </div>

              <div className="bg-linen-50 rounded-2xl p-6 border border-sage-200 text-left max-w-xl mx-auto space-y-3 text-xs sm:text-sm text-sage-800 leading-relaxed">
                <p>
                  Based on your reflections, you appear to be navigating a combination of <strong>{answers[0] || "Emotional Fatigue"}</strong> alongside <strong>{answers[1] || "Life Transitions"}</strong>.
                </p>
                <p>
                  Carrying this kind of continuous mental load quietly takes a real toll on your physical energy, relationships, and sleep. Feeling tired or overwhelmed is not a personal failure—it is simply your nervous system signaling that it needs support.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-terracotta-700">
                  <CheckCircle2 className="w-4 h-4 text-terracotta-600 flex-shrink-0" />
                  <span>Therapy can help you untangle these patterns at your own pace.</span>
                </div>
              </div>

              {/* Call to action */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClaimFreeConsult}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-md hover:shadow-lg active:scale-95"
                >
                  <span>Claim Your Free 15-Min Discovery Call</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center gap-1.5 text-xs text-sage-600 hover:text-sage-900 font-semibold px-4 py-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Check</span>
                </button>
              </div>

              <p className="text-[11px] text-sage-500 italic">
                * This screener is for self-reflection and does not replace a clinical psychological diagnosis.
              </p>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
