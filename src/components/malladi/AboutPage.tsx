"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Lightbulb,
  Shield,
  Heart,
  Layers,
  Leaf,
  ArrowRight,
} from "lucide-react";

/* ────────────────────────── Data ────────────────────────── */

const principles = [
  {
    icon: Lightbulb,
    title: "Architectural Innovation",
    description:
      "Pushing boundaries of design while honoring timeless aesthetics. Every Malladi home is a masterwork of architectural vision.",
    color: "navy",
  },
  {
    icon: Shield,
    title: "Technical Integrity",
    description:
      "Engineering excellence forms the backbone of every structure. We build homes that stand the test of generations.",
    color: "maroon",
  },
  {
    icon: Heart,
    title: "Client-Centricity",
    description:
      "Your vision drives our process. From initial consultation to final walkthrough, your preferences shape every decision.",
    color: "navy",
  },
  {
    icon: Layers,
    title: "Holistic Solutions",
    description:
      "Ten specialized divisions working as one cohesive unit. Design, engineering, construction, and finishing under a single roof.",
    color: "maroon",
  },
  {
    icon: Leaf,
    title: "Sustainable Growth",
    description:
      "Building responsibly for today while preserving resources for tomorrow. Energy-efficient design is standard, not optional.",
    color: "navy",
  },
];

const timeline = [
  {
    year: "2004",
    title: "Foundation & Vision",
    description:
      "Malladi Homes founded with a commitment to luxury custom home building in the Dallas-Fort Worth metroplex.",
  },
  {
    year: "2008",
    title: "First 50 Homes",
    description:
      "Completed our 50th custom estate, establishing a reputation for uncompromising quality and design excellence.",
  },
  {
    year: "2012",
    title: "Multi-State Expansion",
    description:
      "Extended operations across Texas and into neighboring states, bringing our vision to new communities.",
  },
  {
    year: "2016",
    title: "Division Specialization",
    description:
      "Launched our 10 specialized divisions model, creating dedicated teams for every aspect of home construction.",
  },
  {
    year: "2019",
    title: "300 Homes Milestone",
    description:
      "Surpassed 300 custom homes built, with projects spanning 8 states across the southern and eastern US.",
  },
  {
    year: "2022",
    title: "Engineering Hub Launch",
    description:
      "Opened our dedicated Design & Engineering Hub in Frisco, TX, centralizing all pre-construction services.",
  },
  {
    year: "2024",
    title: "500+ Homes & Growing",
    description:
      "Crossed the 500-home milestone with operations in 12+ states, continuing to set new standards in luxury construction.",
  },
];

/* ────────────────────────── Scroll-Reveal Wrapper ────────────────────────── */

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────── AboutPage ────────────────────────── */

export default function AboutPage() {
  return (
    <main>
      {/* ═══════════════════════ 1. HERO SECTION ═══════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center bg-navy overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-maroon/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Crafting Dreams
            <br />
            Into Reality
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
            className="text-sky text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            A legacy of excellence in luxury custom estate building
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2 rounded-full bg-sky/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════ 2. COMPANY NARRATIVE SECTION ═══════════════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Image with accent frame */}
            <Reveal>
              <div className="relative">
                {/* Rotated accent frame behind image */}
                <div className="absolute -inset-4 sm:-inset-6 bg-sky/20 rounded-2xl rotate-2 z-0" />

                {/* Main image */}
                <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl shadow-navy/15">
                  <Image
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                    alt="Luxury home interior showcasing Malladi Homes craftsmanship"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </Reveal>

            {/* Right — Content */}
            <Reveal delay={0.15}>
              <p className="text-maroon text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold mb-4">
                Our Story
              </p>

              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-8"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Building Excellence Since 2004
              </h2>

              <div className="space-y-5 mb-8">
                <p className="text-slate text-base sm:text-lg leading-relaxed">
                  Founded with a vision to redefine luxury residential
                  construction, Malladi Homes has grown from a small design-build
                  firm into a multi-disciplinary powerhouse with 10 specialized
                  divisions. Our journey began with a simple belief: every family
                  deserves a home that reflects their unique aspirations.
                </p>
                <p className="text-slate text-base sm:text-lg leading-relaxed">
                  Over two decades, we&apos;ve assembled the finest architects,
                  engineers, interior designers, and craftsmen under one roof.
                  This integrated approach eliminates the fragmentation that
                  plagues conventional construction, ensuring seamless execution
                  from concept to completion.
                </p>
                <p className="text-slate text-base sm:text-lg leading-relaxed">
                  Today, with over 500 custom homes across 12 states, Malladi
                  Homes stands as a testament to what&apos;s possible when
                  unwavering commitment meets extraordinary talent. Each home we
                  build carries our signature of excellence.
                </p>
              </div>

              <button className="inline-flex items-center gap-2 text-maroon font-semibold text-sm sm:text-base group">
                Our Process
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 3. CORE PRINCIPLES GRID ═══════════════════════ */}
      <section className="py-20 sm:py-28 bg-softgray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Reveal className="text-center mb-14">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Our Core Principles
            </h2>
            <p className="text-slate text-base sm:text-lg max-w-2xl mx-auto">
              The foundational values that guide every home we build and every
              relationship we nurture.
            </p>
          </Reveal>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, i) => {
              const Icon = principle.icon;
              const borderColor =
                principle.color === "navy"
                  ? "border-t-navy"
                  : "border-t-maroon";
              const iconBg =
                principle.color === "navy"
                  ? "bg-navy/10 text-navy"
                  : "bg-maroon/10 text-maroon";

              return (
                <Reveal key={principle.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className={`group bg-white rounded-xl shadow-md shadow-navy/5 overflow-hidden hover:shadow-xl hover:shadow-navy/10 transition-shadow duration-300 border-t-4 ${borderColor}`}
                  >
                    <div className="p-6 sm:p-8">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${iconBg}`}
                      >
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <h3
                        className="text-lg sm:text-xl font-bold text-navy mb-3"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {principle.title}
                      </h3>
                      <p className="text-slate text-sm sm:text-base leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 4. HISTORY TIMELINE ═══════════════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Reveal className="text-center mb-16">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Our Journey
            </h2>
            <p className="text-slate text-base sm:text-lg max-w-2xl mx-auto">
              Two decades of growth, innovation, and an unwavering commitment to
              building extraordinary homes.
            </p>
          </Reveal>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line — center on desktop, left on mobile */}
            <div className="absolute left-4 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-0.5 bg-accentgray" />

            <div className="space-y-10 lg:space-y-14">
              {timeline.map((item, i) => {
                const isEven = i % 2 === 0;
                return (
                  <Reveal key={item.year} delay={i * 0.08}>
                    <div
                      className={`relative flex items-start gap-6 lg:gap-0 ${
                        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                      }`}
                    >
                      {/* Circle marker */}
                      <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 z-10">
                        <div className="w-4 h-4 rounded-full bg-navy border-4 border-white shadow-md" />
                      </div>

                      {/* Content card — offset for timeline on both sides */}
                      <div
                        className={`ml-12 lg:ml-0 lg:w-[calc(50%-2rem)] ${
                          isEven ? "lg:pr-0 lg:mr-auto" : "lg:pl-0 lg:ml-auto"
                        }`}
                      >
                        <div
                          className={`bg-softgray border border-accentgray rounded-xl p-5 sm:p-6 ${
                            isEven
                              ? "lg:mr-8"
                              : "lg:ml-8"
                          }`}
                        >
                          <span className="inline-block px-3 py-1 bg-navy text-white text-xs sm:text-sm font-bold rounded-full mb-3">
                            {item.year}
                          </span>
                          <h3
                            className="text-lg sm:text-xl font-bold text-navy mb-2"
                            style={{ fontFamily: "var(--font-playfair)" }}
                          >
                            {item.title}
                          </h3>
                          <p className="text-slate text-sm sm:text-base leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
