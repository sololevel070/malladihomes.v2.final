"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Search,
  Ruler,
  FileCheck,
  HardHat,
  Building,
  Palette,
  Key,
  ArrowRight,
} from "lucide-react";

/* ────────────────────────── Data ────────────────────────── */

const steps = [
  {
    number: 1,
    title: "Assessment & Site Selection",
    icon: Search,
    description:
      "We begin with a comprehensive evaluation of your needs, lifestyle preferences, and budget parameters. Our team conducts thorough site assessments including soil testing, topographical analysis, and zoning verification to ensure optimal building conditions.",
    timeline: "Weeks 1–2",
    team: "PAS Division",
  },
  {
    number: 2,
    title: "Architectural Blueprint & Vastu Alignment",
    icon: Ruler,
    description:
      "Our architects craft bespoke designs that blend your vision with structural excellence. Each plan undergoes Vastu compliance review, ensuring harmony between traditional principles and modern luxury living. Multiple revisions until perfect.",
    timeline: "Weeks 3–6",
    team: "HDS Division",
  },
  {
    number: 3,
    title: "Permits & Structural Engineering",
    icon: FileCheck,
    description:
      "We handle all regulatory requirements including building permits, environmental clearances, and structural engineering certifications. Our legal team ensures complete compliance with local, state, and federal building codes.",
    timeline: "Weeks 7–10",
    team: "HDS Division",
  },
  {
    number: 4,
    title: "Groundbreaking & Horizontal Construction",
    icon: HardHat,
    description:
      "Site preparation begins with grading, utility installation, and foundation work. Our HCS division manages all horizontal construction including driveway, drainage systems, and underground utilities with precision engineering.",
    timeline: "Weeks 11–18",
    team: "HCS Division",
  },
  {
    number: 5,
    title: "Framing & Vertical Build",
    icon: Building,
    description:
      "The structure rises with expert framing, roofing, and exterior finishing. Our VCS division orchestrates all vertical construction activities, from structural steel to exterior cladding, ensuring architectural fidelity.",
    timeline: "Weeks 19–32",
    team: "VCS Division",
  },
  {
    number: 6,
    title: "Landscape & Interior Finishing",
    icon: Palette,
    description:
      "Interior spaces come alive with premium finishes, custom cabinetry, and fixture installation. Simultaneously, our LCS division transforms outdoor areas with designed landscapes, hardscapes, and irrigation systems.",
    timeline: "Weeks 33–42",
    team: "LCS Division",
  },
  {
    number: 7,
    title: "Final Inspection & Handover",
    icon: Key,
    description:
      "Comprehensive quality audits across all systems and finishes. A detailed walkthrough with our project manager ensures every detail meets our exacting standards before we hand over the keys to your dream home.",
    timeline: "Weeks 43–46",
    team: "VCS Division",
  },
];

/* ────────────────────────── Animated Step Hook ────────────────────────── */

function useAnimatedSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= steps.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isInView]);

  return { ref, visibleCount };
}

/* ────────────────────────── ProcessPage ────────────────────────── */

export default function ProcessPage() {
  const { ref: stepperRef, visibleCount } = useAnimatedSteps();

  return (
    <main>
      {/* ═══════════════════════ 1. HERO SECTION ═══════════════════════ */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center bg-navy overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-sky/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-maroon/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Building Process
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
            className="text-sky text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8"
          >
            From Plan to Key — A Journey of Precision and Excellence
          </motion.p>

          {/* Decorative accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="w-24 h-1 bg-maroon mx-auto rounded-full"
          />
        </div>
      </section>

      {/* ═══════════════════════ 2. INTERACTIVE STEPPER ═══════════════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              7 Steps to Your Dream Home
            </h2>
            <p className="text-slate text-base sm:text-lg max-w-2xl mx-auto">
              A carefully orchestrated process that transforms your vision into an
              extraordinary residence, guided by expertise at every stage.
            </p>
          </motion.div>

          {/* Vertical Stepper */}
          <div ref={stepperRef} className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-0.5 bg-accentgray" />

            <div className="space-y-8 sm:space-y-10">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isVisible = i < visibleCount;

                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -30 }}
                    animate={
                      isVisible
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -30 }
                    }
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative flex items-start gap-4 sm:gap-6"
                  >
                    {/* Step circle */}
                    <div className="relative z-10 shrink-0">
                      <div
                        className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-lg lg:text-xl font-bold transition-all duration-500 ${
                          isVisible
                            ? "bg-navy text-white shadow-lg shadow-navy/25"
                            : "bg-accentgray text-slate"
                        }`}
                        style={
                          isVisible
                            ? { fontFamily: "var(--font-playfair)" }
                            : { fontFamily: "var(--font-playfair)" }
                        }
                      >
                        {step.number}
                      </div>
                    </div>

                    {/* Step card */}
                    <div
                      className={`flex-1 rounded-xl border p-5 sm:p-6 lg:p-8 transition-all duration-500 ${
                        isVisible
                          ? "bg-white border-accentgray shadow-lg shadow-navy/5"
                          : "bg-softgray border-accentgray/50 opacity-50"
                      }`}
                    >
                      {/* Title row */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-500 ${
                              isVisible
                                ? "bg-navy/10 text-navy"
                                : "bg-accentgray text-slate"
                            }`}
                          >
                            <Icon size={20} strokeWidth={1.5} />
                          </div>
                          <h3
                            className="text-lg sm:text-xl font-bold text-navy"
                            style={{ fontFamily: "var(--font-playfair)" }}
                          >
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate text-sm sm:text-base leading-relaxed mb-5">
                        {step.description}
                      </p>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-500 ${
                            isVisible
                              ? "bg-sky/30 text-navy"
                              : "bg-accentgray text-slate"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {step.timeline}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-500 ${
                            isVisible
                              ? "bg-maroon/10 text-maroon"
                              : "bg-accentgray text-slate"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {step.team}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 3. CTA SECTION ═══════════════════════ */}
      <section className="py-20 sm:py-28 bg-softgray">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ready to Begin Your Journey?
            </h2>
            <p className="text-slate text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Take the first step toward your dream home. Our team is ready to
              guide you through every phase with expertise and dedication.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-maroon text-white text-sm sm:text-base font-semibold tracking-wide rounded-full hover:bg-maroon/90 transition-colors duration-300 shadow-lg shadow-maroon/25 hover:shadow-maroon/40"
            >
              Schedule a Consultation
              <ArrowRight size={18} strokeWidth={1.5} className="ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
