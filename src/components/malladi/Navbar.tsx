"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { NAV_ITEMS, type PageId } from "./types";

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

export default function Navbar({ activePage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (id: PageId) => {
    onNavigate(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white shadow-lg shadow-navy/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <button
              onClick={() => handleNav("home")}
              className="flex items-center group"
              aria-label="Go to home"
            >
              <Image
                src={scrolled ? "/primary-logo.png" : "/white-logo.svg"}
                alt="Malladi Homes"
                width={100}
                height={32}
                className="h-6 sm:h-7 w-auto object-contain transition-all duration-300"
                priority
              />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full ${
                    activePage === item.id
                      ? scrolled
                        ? "text-maroon"
                        : "text-white"
                      : scrolled
                      ? "text-slate hover:text-navy"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.label}
                  {activePage === item.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-maroon"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
              {/* Contact Us CTA */}
              <button
                onClick={() => handleNav("contact")}
                className="ml-3 inline-flex items-center gap-2 px-5 py-2 bg-maroon text-white text-sm font-semibold tracking-wide rounded-full hover:bg-maroon/90 transition-all duration-300 shadow-md shadow-maroon/20 hover:shadow-maroon/35 hover:scale-105"
              >
                <Phone size={15} strokeWidth={1.5} />
                Contact Us
              </button>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? "text-navy hover:bg-navy/5" : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-accentgray">
                  <Image
                    src="/primary-logo.png"
                    alt="Malladi Homes"
                    width={90}
                    height={28}
                    className="h-7 w-auto object-contain"
                    priority
                  />
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-lg text-slate hover:bg-softgray"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>
                <nav className="flex-1 py-4">
                  {NAV_ITEMS.map((item, i) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleNav(item.id)}
                      className={`w-full text-left px-6 py-4 text-base font-medium transition-all duration-200 ${
                        activePage === item.id
                          ? "text-maroon bg-maroon/5 border-r-3 border-maroon"
                          : "text-slate hover:text-navy hover:bg-softgray"
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>
                <div className="p-6 border-t border-accentgray">
                  <button
                    onClick={() => handleNav("contact")}
                    className="flex items-center justify-center gap-2 w-full bg-maroon text-white py-3 rounded-full font-medium text-sm hover:bg-maroon/90 transition-colors"
                  >
                    <Phone size={16} strokeWidth={1.5} />
                    Contact Us
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
