"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Newspaper } from "lucide-react";

/* ────────────────────────── Article Data ────────────────────────── */

interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  image: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "The Art of Vastu-Compliant Home Design in Modern Architecture",
    category: "Design Trends",
    date: "January 15, 2025",
    readTime: "8 min read",
    summary:
      "Exploring how ancient Vastu principles seamlessly integrate with contemporary architectural design to create homes that are both spiritually harmonious and visually stunning.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
  },
  {
    id: 2,
    title: "2025 Luxury Home Building Trends: What Discerning Buyers Want",
    category: "Industry Insights",
    date: "January 8, 2025",
    readTime: "6 min read",
    summary:
      "From biophilic design to smart home integration, discover the top trends shaping the luxury residential construction industry in the new year.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80",
  },
  {
    id: 3,
    title: "Understanding the Complete Custom Home Building Timeline",
    category: "Building Guide",
    date: "December 20, 2024",
    readTime: "10 min read",
    summary:
      "A comprehensive walkthrough of every phase in the custom home building process, from initial assessment to the moment you receive your keys.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
  },
  {
    id: 4,
    title: "Green Building Standards: Why Energy Star Certification Matters",
    category: "Sustainability",
    date: "December 12, 2024",
    readTime: "7 min read",
    summary:
      "How Energy Star certification in custom homes reduces environmental impact while delivering significant long-term savings on utility costs.",
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400&q=80",
  },
  {
    id: 5,
    title: "Texas Real Estate Guide: Prime Locations for Custom Estate Homes",
    category: "Real Estate",
    date: "November 28, 2024",
    readTime: "9 min read",
    summary:
      "An insider's guide to the most sought-after neighborhoods and communities in the Dallas-Fort Worth metroplex for building your dream estate.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80",
  },
  {
    id: 6,
    title: "Structural Innovation: Engineering Homes That Last Generations",
    category: "Engineering",
    date: "November 15, 2024",
    readTime: "5 min read",
    summary:
      "Behind the scenes of our structural engineering process — how we ensure every Malladi home stands strong for decades to come.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80",
  },
];

/* ────────────────────────── NewsPage ────────────────────────── */

export default function NewsPage() {
  return (
    <main>
      {/* ═══════════════════════ 1. HERO SECTION ═══════════════════════ */}
      <section className="relative bg-navy py-20 sm:py-28 overflow-hidden">
        {/* Decorative accents */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-sky/5 rounded-full -translate-y-1/2 -translate-x-1/3" />
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-maroon/5 rounded-full translate-y-1/2 translate-x-1/4" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <Newspaper size={28} strokeWidth={1.5} className="text-sky" />
            <span className="text-sky text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold">
              Stay Informed
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            News &amp; Updates
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-sky text-base sm:text-lg max-w-2xl mx-auto"
          >
            Insights Into Luxury Living &amp; Construction Excellence
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════ 2. BLOG ARTICLE FEED ═══════════════════════ */}
      <section className="py-12 sm:py-20 bg-softgray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {articles.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-white rounded-xl border border-accentgray overflow-hidden hover:shadow-xl hover:shadow-navy/8 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  {/* Category Tag + Date Row */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block px-3 py-1 bg-maroon text-white text-[10px] sm:text-xs font-semibold tracking-wide rounded-full uppercase">
                      {article.category}
                    </span>
                    <span className="text-slate text-xs sm:text-sm">
                      {article.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-lg sm:text-xl font-bold text-navy leading-snug mb-3 line-clamp-2"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {article.title}
                  </h2>

                  {/* Read Time */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <Clock size={14} strokeWidth={1.5} className="text-slate" />
                    <span className="text-slate text-xs">{article.readTime}</span>
                  </div>

                  {/* Summary */}
                  <p className="text-slate text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.summary}
                  </p>

                  {/* Read More */}
                  <button className="inline-flex items-center gap-2 text-maroon font-semibold text-sm group/btn">
                    <span>Read More</span>
                    <ArrowRight
                      size={16}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
