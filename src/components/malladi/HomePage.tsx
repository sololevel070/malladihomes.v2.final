"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Layers,
  Clock,
  Home,
  MapPin,
  CheckCircle,
  ArrowRight,
  Shield,
  Leaf,
  Award,
  Ruler,
  HardHat,
  Building2,
  Building,
  TreePine,
  Fence,
  Eye,
  TrendingUp,
  Scale,
  Gem,
} from "lucide-react";

/* ────────────────────────── Counter Animation Hook ────────────────────────── */

function useCounter(end: number, duration = 2000, startOnView = true) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startOnView || !isInView) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration, startOnView]);

  return { ref, count };
}

/* ────────────────────────── Data ────────────────────────── */

const stats = [
  { icon: Layers, value: 10, suffix: "", label: "Specialized Divisions" },
  { icon: Clock, value: 20, suffix: "+", label: "Years of Experience" },
  { icon: Home, value: 500, suffix: "+", label: "Custom Homes Built" },
  { icon: MapPin, value: 12, suffix: "+", label: "US States Covered" },
];

const divisions = [
  {
    abbr: "PAS",
    name: "Project Assessment & Site Evaluation",
    description:
      "Comprehensive site analysis, feasibility studies, and project scoping to ensure a solid foundation before construction begins.",
    icon: Eye,
    category: "Assessment",
    serviceCategory: "architectural",
  },
  {
    abbr: "HDS",
    name: "Horizontal Design & Planning",
    description:
      "Expert land planning, civil engineering, and infrastructure design for residential and commercial developments.",
    icon: Ruler,
    category: "Horizontal",
    serviceCategory: "engineering",
  },
  {
    abbr: "HCS",
    name: "Horizontal Construction Services",
    description:
      "Full-service site work including grading, utilities, roads, and infrastructure construction for your development.",
    icon: HardHat,
    category: "Horizontal",
    serviceCategory: "engineering",
  },
  {
    abbr: "VDS-I",
    name: "Vertical Design — Custom Estates",
    description:
      "Bespoke architectural design for luxury custom estate homes, tailored to your vision, lifestyle, and site conditions.",
    icon: Building2,
    category: "Vertical",
    serviceCategory: "architectural",
  },
  {
    abbr: "VDS-II",
    name: "Vertical Design — Commercial",
    description:
      "Innovative commercial building design with a focus on functionality, aesthetics, and long-term value creation.",
    icon: Building,
    category: "Vertical",
    serviceCategory: "architectural",
  },
  {
    abbr: "VCS",
    name: "Vertical Construction Services",
    description:
      "Precision construction management and execution for custom homes and commercial structures from foundation to finish.",
    icon: HardHat,
    category: "Vertical",
    serviceCategory: "engineering",
  },
  {
    abbr: "LDS",
    name: "Landscape Design Studio",
    description:
      "Artful landscape architecture that harmonizes outdoor living spaces with the natural environment and Vastu principles.",
    icon: TreePine,
    category: "Landscape",
    serviceCategory: "landscape",
  },
  {
    abbr: "LCS",
    name: "Landscape Construction Services",
    description:
      "Expert implementation of landscape designs including hardscaping, softscaping, irrigation, and outdoor features.",
    icon: TreePine,
    category: "Landscape",
    serviceCategory: "landscape",
  },
  {
    abbr: "FIS",
    name: "Fence Installation Services",
    description:
      "Professional fence design and installation with premium materials, offering privacy, security, and curb appeal.",
    icon: Fence,
    category: "Landscape",
    serviceCategory: "landscape",
  },
];

const reasons = [
  {
    icon: TrendingUp,
    title: "Experience",
    description: "20+ years of luxury building expertise crafting exceptional custom residences across the nation.",
  },
  {
    icon: Layers,
    title: "10 Expert Divisions",
    description: "Comprehensive in-house capabilities spanning design, engineering, construction, and landscape services.",
  },
  {
    icon: Scale,
    title: "Transparent Pricing",
    description: "No hidden costs, clear proposals, and detailed budgets so you always know exactly where your investment goes.",
  },
  {
    icon: Gem,
    title: "Vastu Compliance",
    description: "Traditional Vastu principles thoughtfully integrated into modern architectural design for harmonious living.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Premium materials and master craftsmanship backed by rigorous quality control at every stage of construction.",
  },
  {
    icon: CheckCircle,
    title: "Legal Compliance",
    description: "Full permit acquisition and strict code adherence ensuring your home meets all regulatory requirements.",
  },
];

const certifications = [
  { icon: Shield, label: "NAHB Membership" },
  { icon: Leaf, label: "Energy Star Partnership" },
  { icon: Award, label: "ISO 9001:2015 Certification" },
];

/* ────────────────────────── Section Wrapper ────────────────────────── */

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}

/* ────────────────────────── HomePage ────────────────────────── */

export default function HomePage({
  onNavigateToService,
}: {
  onNavigateToService?: (category: string) => void;
}) {
  /* Stat counters */
  const counter0 = useCounter(stats[0].value, 1800);
  const counter1 = useCounter(stats[1].value, 1800);
  const counter2 = useCounter(stats[2].value, 2000);
  const counter3 = useCounter(stats[3].value, 1600);
  const counters = [counter0, counter1, counter2, counter3];

  return (
    <main>
      {/* ═══════════════════════ 1. HERO SECTION ═══════════════════════ */}
      <Section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video — Vimeo (autoplay + loop + muted via background=1) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <iframe
            src="https://www.youtube.com/embed/jpNaOJRU_HI?autoplay=1&mute=1&loop=1&playlist=jpNaOJRU_HI&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1"
            allow="autoplay; fullscreen"
            className="absolute w-full h-full"
            style={{
              top: "50%",
              left: "50%",
              width: "177.78vh", /* 16:9 aspect — always wider than viewport */
              minWidth: "100%",
              height: "56.25vw", /* 16:9 aspect — always taller than viewport */
              minHeight: "100%",
              transform: "translate(-50%, -50%)",
              border: "none",
            }}
            frameBorder="0"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-navy/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sky text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold mb-6"
          >
            Welcome to Malladi Homes
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Building Your
            <br />
            <span style={{ color: "#B5DCEB" }}>Dream</span> Home
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Malladi Homes is a premier boutique luxury custom estate home builder,
            delivering extraordinary residences with unmatched craftsmanship,
            innovative design, and personalized service across the United States.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-maroon text-white text-sm font-semibold tracking-wide rounded-full hover:bg-maroon/90 transition-all duration-300 shadow-lg shadow-maroon/25 hover:shadow-maroon/40 hover:scale-105"
            >
              Join Interest List
              <ArrowRight size={16} strokeWidth={1.5} className="ml-2" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/60 text-white text-sm font-semibold tracking-wide rounded-full hover:bg-white hover:text-navy transition-all duration-300 hover:scale-105"
            >
              About Company
            </a>
          </motion.div>
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
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2 rounded-full bg-white/60" />
          </motion.div>
        </motion.div>
      </Section>

      {/* ═══════════════════════ 2. STATISTICS BAR ═══════════════════════ */}
      <Section className="bg-navy py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <Icon
                    size={28}
                    strokeWidth={1.5}
                    className="text-sky mb-3"
                  />
                  <span
                    ref={counters[i].ref}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-1"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {counters[i].count}
                    {stat.suffix}
                  </span>
                  <span className="text-white/60 text-xs sm:text-sm tracking-wide">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ═══════════════════════ 3. INTRODUCTION SECTION ═══════════════════════ */}
      <Section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Image with accent frame */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              {/* Rotated accent frame behind image */}
              <div className="absolute -inset-4 sm:-inset-6 bg-sky/20 rounded-2xl rotate-3 z-0" />

              {/* Main image */}
              <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl shadow-navy/15">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                  alt="Elegant custom home crafted by Malladi Homes"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            {/* Right — Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <p className="text-maroon text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold mb-4">
                Who We Are
              </p>

              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                A Multi-Disciplinary Design &amp; Building Firm
              </h2>

              <p className="text-slate text-base sm:text-lg leading-relaxed mb-8">
                Malladi Homes brings together ten specialized divisions under one
                roof, offering an integrated approach to luxury custom home
                building. From initial site evaluation through architectural
                design, engineering, construction, and landscaping, every phase
                is orchestrated by expert teams committed to excellence and
                precision.
              </p>

              {/* Checklist */}
              <ul className="space-y-3 mb-8">
                {[
                  "Custom Estate Design",
                  "Structural Engineering",
                  "Interior Architecture",
                  "Landscape & Vastu Planning",
                  "Legal & Permit Services",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle
                      size={20}
                      strokeWidth={1.5}
                      className="text-maroon shrink-0"
                    />
                    <span className="text-ink text-sm sm:text-base font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="inline-flex items-center gap-2 text-maroon font-semibold text-sm sm:text-base group"
              >
                Learn More
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════ 4. SPECIALIZED DIVISIONS ═══════════════════════ */}
      <Section id="divisions" className="py-20 sm:py-28 bg-softgray overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="inline-block text-maroon text-xs sm:text-sm tracking-[0.3em] uppercase font-bold mb-4">
              What We Do
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Our Specialized{" "}
              <span className="text-maroon">Divisions</span>
            </h2>
            <p className="text-slate text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Ten dedicated divisions organized across four core disciplines, working in concert
              to deliver your vision from concept to completion.
            </p>
          </motion.div>

          {/* Division Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {divisions.map((div, i) => {
              const Icon = div.icon;
              const isNavyGroup = div.category === "Assessment" || div.category === "Vertical";

              return (
                <motion.div
                  key={div.abbr}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  onClick={() => onNavigateToService?.(div.serviceCategory)}
                  className={`group relative bg-white rounded-2xl p-6 sm:p-7 transition-all duration-300 cursor-pointer ${isNavyGroup
                      ? "border border-accentgray/80 hover:border-navy/40 hover:shadow-xl hover:shadow-navy/8"
                      : "border-2 border-navy/20 hover:border-navy/50 hover:shadow-xl hover:shadow-navy/10"
                    }`}
                >
                  {/* Top row: Icon + Badge */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${isNavyGroup
                          ? "bg-navy/8 group-hover:bg-navy/12"
                          : "bg-maroon/8 group-hover:bg-maroon/12"
                        }`}
                    >
                      <Icon
                        size={22}
                        strokeWidth={1.5}
                        className={`transition-colors duration-300 ${isNavyGroup ? "text-navy" : "text-maroon"
                          }`}
                      />
                    </div>
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-widest ${isNavyGroup
                          ? "bg-navy/6 text-navy/70"
                          : "bg-maroon/8 text-maroon"
                        }`}
                    >
                      {div.abbr}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-base sm:text-lg font-bold text-ink mb-2 leading-snug group-hover:text-navy transition-colors duration-300"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {div.name}
                  </h3>

                  {/* Description */}
                  <p className="text-slate text-sm leading-relaxed mb-5">
                    {div.description}
                  </p>

                  {/* Explore Division CTA */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-xs font-bold tracking-wider uppercase transition-colors duration-300 ${isNavyGroup ? "text-navy/70 group-hover:text-navy" : "text-maroon/70 group-hover:text-maroon"
                        }`}
                    >
                      Explore Division
                    </span>
                    <ArrowRight
                      size={14}
                      strokeWidth={2}
                      className={`transition-all duration-300 group-hover:translate-x-1 ${isNavyGroup ? "text-navy/70 group-hover:text-navy" : "text-maroon/70 group-hover:text-maroon"
                        }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ═══════════════════════ 5. WHY CHOOSE US GRID ═══════════════════════ */}
      <Section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Why Choose Malladi Homes
            </h2>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group border border-accentgray rounded-xl p-6 hover:border-maroon/30 hover:shadow-lg hover:shadow-navy/5 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-maroon/10 flex items-center justify-center mb-4 group-hover:bg-maroon/15 transition-colors duration-300">
                    <Icon
                      size={24}
                      strokeWidth={1.5}
                      className="text-maroon"
                    />
                  </div>
                  <h3
                    className="text-lg font-bold text-navy mb-2"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {reason.title}
                  </h3>
                  <p className="text-slate text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ═══════════════════════ 6. CERTIFICATIONS BAR ═══════════════════════ */}
      <Section className="py-14 sm:py-16 bg-softgray border-t border-accentgray">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 lg:gap-24">
            {certifications.map((cert, i) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={cert.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex items-center gap-3"
                >
                  <Icon
                    size={24}
                    strokeWidth={1.5}
                    className="text-navy shrink-0"
                  />
                  <span className="text-ink text-sm font-semibold tracking-wide">
                    {cert.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>
    </main>
  );
}
