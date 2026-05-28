"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Camera } from "lucide-react";

/* ────────────────────────── Gallery Data ────────────────────────── */

type GalleryCategory = "All" | "Exteriors" | "Interiors" | "Landscapes" | "Architectural Details";

interface GalleryItem {
  id: number;
  title: string;
  category: Exclude<GalleryCategory, "All">;
  image: string;
  aspectClass: string;
}

const CATEGORIES: GalleryCategory[] = [
  "All",
  "Exteriors",
  "Interiors",
  "Landscapes",
  "Architectural Details",
];

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Grand Foyer Entryway",
    category: "Interiors",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 2,
    title: "Mediterranean Facade",
    category: "Exteriors",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: 3,
    title: "Infinity Pool & Garden",
    category: "Landscapes",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 4,
    title: "Custom Staircase Detail",
    category: "Architectural Details",
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&q=80",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: 5,
    title: "Master Suite Retreat",
    category: "Interiors",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: 6,
    title: "Contemporary Exterior",
    category: "Exteriors",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 7,
    title: "Outdoor Kitchen & Living",
    category: "Landscapes",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: 8,
    title: "Marble Column Detail",
    category: "Architectural Details",
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&q=80",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 9,
    title: "Wine Cellar Interior",
    category: "Interiors",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&q=80",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 10,
    title: "Craftsman Exterior Detail",
    category: "Exteriors",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: 11,
    title: "Japanese Garden Path",
    category: "Landscapes",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 12,
    title: "Custom Ironwork Railing",
    category: "Architectural Details",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    aspectClass: "aspect-[4/3]",
  },
];

/* ────────────────────────── Lightbox Modal ────────────────────────── */

function Lightbox({
  items,
  initialIndex,
  isOpen,
  onClose,
}: {
  items: GalleryItem[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, goNext, goPrev, onClose]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentItem = items[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
            aria-label="Close lightbox"
          >
            <X size={20} strokeWidth={1.5} className="text-white" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} strokeWidth={1.5} className="text-white" />
          </button>

          {/* Image */}
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-[90vw] max-h-[80vh] mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentItem.image}
              alt={currentItem.title}
              width={1200}
              height={900}
              className="max-h-[75vh] w-auto object-contain rounded-lg"
              sizes="90vw"
              priority
            />
          </motion.div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
            aria-label="Next image"
          >
            <ChevronRight size={24} strokeWidth={1.5} className="text-white" />
          </button>

          {/* Caption */}
          <div
            className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className="text-white text-lg sm:text-xl font-bold mb-1"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {currentItem.title}
            </h3>
            <p className="text-sky text-sm tracking-wide">
              {currentItem.category}
            </p>
            <p className="text-white/50 text-xs mt-2">
              {currentIndex + 1} of {items.length}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ────────────────────────── GalleryPage ────────────────────────── */

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems =
    activeFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <main>
      {/* ═══════════════════════ 1. HERO SECTION ═══════════════════════ */}
      <section className="relative bg-navy py-20 sm:py-28 overflow-hidden">
        {/* Decorative accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-maroon/5 rounded-full translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <Camera size={28} strokeWidth={1.5} className="text-sky" />
            <span className="text-sky text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold">
              Our Portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Visual Gallery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-sky text-base sm:text-lg max-w-xl mx-auto"
          >
            Explore Our Portfolio of Craftsmanship
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════ 2. FILTER TOGGLES ═══════════════════════ */}
      <section className="bg-softgray border-b border-accentgray sticky top-16 sm:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-maroon text-white shadow-md shadow-maroon/20"
                    : "bg-white text-slate border border-accentgray hover:border-maroon/30 hover:text-navy"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 3. MASONRY-STYLE GRID ═══════════════════════ */}
      <section className="py-12 sm:py-20 bg-softgray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5"
            >
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="break-inside-avoid mb-4 sm:mb-5 group cursor-pointer"
                  onClick={() => openLightbox(i)}
                >
                  <div className="relative rounded-xl overflow-hidden shadow-md shadow-navy/5 hover:shadow-xl hover:shadow-navy/15 transition-shadow duration-300">
                    <div className={item.aspectClass}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={600}
                        height={item.aspectClass === "aspect-[3/4]" ? 800 : 450}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/60 transition-colors duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                      <h3
                        className="text-white text-base sm:text-lg font-bold mb-1 px-4 text-center"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sky text-xs tracking-wide">
                        {item.category}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate text-lg">No images found for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════ LIGHTBOX MODAL ═══════════════════════ */}
      <Lightbox
        items={filteredItems}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </main>
  );
}
