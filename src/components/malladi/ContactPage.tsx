"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  CheckCircle,
  Facebook,
  Linkedin,
  Instagram,
  Globe,
  Clock,
} from "lucide-react";
import { BRAND } from "./types";

/* ────────────────────────── Types ────────────────────────── */

interface FormState {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

/* ────────────────────────── Data ────────────────────────── */

const locations = [
  {
    label: "Headquarters",
    name: "Houston Professional Plaza",
    address: "1200 Smith St, Houston, TX 77002",
    country: "United States",
    phone: "+1 (832) 555-0123",
    phoneLabel: "Corporate",
    email: "contact@malladihomes.com",
    emailLabel: "General",
  },
  {
    label: "Design & Engineering Hub",
    name: "Atlanta Tech Village",
    address: "3423 Piedmont Rd NE, Atlanta, GA 30305",
    country: "United States",
    phone: "+1 (404) 555-0199",
    phoneLabel: "Technical",
    email: "tech@malladihomes.com",
    emailLabel: "Technical",
  },
];

const subjectOptions = [
  { value: "", label: "Select a subject" },
  { value: "general", label: "General Inquiry" },
  { value: "architectural", label: "Architectural Design" },
  { value: "construction", label: "Construction Services" },
  { value: "styling", label: "Interior Styling" },
  { value: "development", label: "Land Development" },
];

/* ────────────────────────── ContactPage Component ────────────────────────── */

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!form.fullName.trim()) errors.fullName = "Full name is required";
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Invalid email format";
    if (!form.subject) errors.subject = "Please select a subject";
    if (!form.message.trim()) errors.message = "Message is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setForm({ fullName: "", email: "", subject: "", message: "" });
      }, 4000);
    }
  };

  return (
    <main>
      {/* ═══════════════════════ 1. HERO BANNER ═══════════════════════ */}
      <section className="relative py-28 sm:py-36 lg:py-44 overflow-hidden bg-ink">
        {/* Background glow effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-navy/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-maroon/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-navy/15 rounded-full blur-[150px]" />
        </div>

        {/* Decorative accents */}
        <div className="absolute top-16 left-16 w-24 h-24 border border-sky/10 rounded-full" />
        <div className="absolute bottom-20 right-20 w-16 h-16 border border-maroon/15 rounded-full" />
        <div className="absolute top-1/3 right-32 w-1.5 h-1.5 bg-sky/30 rounded-full" />
        <div className="absolute bottom-1/3 left-28 w-2 h-2 bg-sky/20 rounded-full" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sky text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold mb-6"
          >
            Contact Us
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Get in{" "}
            <span className="text-maroon">Touch</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-4"
          >
            Have a question or ready to start your dream home project?
            Reach out through any of our inquiry channels and our team
            will respond within 24 hours.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8 mx-auto w-24 h-0.5 bg-gradient-to-r from-transparent via-maroon to-transparent"
          />
        </div>
      </section>

      {/* ═══════════════════════ 2. TWO-COLUMN SPLIT ═══════════════════════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

            {/* ──── Left Column: Locations & Channels ──── */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
              >
                {/* Section Label */}
                <span className="inline-block text-maroon text-xs tracking-[0.25em] uppercase font-bold mb-3">
                  Our Offices
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-navy mb-8"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Visit or Reach Us
                </h2>

                {/* Location Cards */}
                <div className="space-y-6">
                  {locations.map((loc, i) => (
                    <motion.div
                      key={loc.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="group relative bg-softgray rounded-xl p-5 sm:p-6 border border-accentgray/60 hover:border-navy/20 hover:shadow-lg hover:shadow-navy/5 transition-all duration-300"
                    >
                      {/* Top accent bar */}
                      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl bg-gradient-to-r from-navy via-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-navy/8 flex items-center justify-center shrink-0 mt-0.5">
                          <MapPin size={18} strokeWidth={1.5} className="text-navy" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-sky bg-navy/5 px-2 py-0.5 rounded">
                            {loc.label}
                          </span>
                          <h3 className="text-base font-bold text-navy mt-2 mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
                            {loc.name}
                          </h3>
                          <p className="text-slate text-sm leading-relaxed">
                            {loc.address}, {loc.country}
                          </p>
                        </div>
                      </div>

                      {/* Contact details */}
                      <div className="mt-4 pt-4 border-t border-accentgray/50 space-y-2.5">
                        <div className="flex items-center gap-2.5">
                          <Phone size={14} strokeWidth={1.5} className="text-navy/60 shrink-0" />
                          <span className="text-xs font-medium text-slate/70 uppercase tracking-wider">{loc.phoneLabel}</span>
                          <a href={`tel:${loc.phone.replace(/[^+\d]/g, "")}`} className="text-sm text-ink font-medium hover:text-maroon transition-colors">
                            {loc.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Mail size={14} strokeWidth={1.5} className="text-navy/60 shrink-0" />
                          <span className="text-xs font-medium text-slate/70 uppercase tracking-wider">{loc.emailLabel}</span>
                          <a href={`mailto:${loc.email}`} className="text-sm text-ink font-medium hover:text-maroon transition-colors">
                            {loc.email}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Working Hours */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-8 flex items-start gap-3 p-4 bg-softgray rounded-xl border border-accentgray/60"
                >
                  <Clock size={18} strokeWidth={1.5} className="text-navy shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-ink">Business Hours</p>
                    <p className="text-slate text-sm">Mon – Fri: 9:00 AM – 6:00 PM (CST)</p>
                    <p className="text-slate text-sm">Sat: 10:00 AM – 2:00 PM (By Appointment)</p>
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-8"
                >
                  <h4 className="text-sm font-semibold tracking-wider uppercase text-navy mb-4">
                    Follow Us
                  </h4>
                  <div className="flex items-center gap-3">
                    {[
                      { icon: Facebook, href: BRAND.social.facebook, label: "Facebook" },
                      { icon: Linkedin, href: BRAND.social.linkedin, label: "LinkedIn" },
                      { icon: Instagram, href: BRAND.social.instagram, label: "Instagram" },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="w-11 h-11 rounded-xl border border-accentgray flex items-center justify-center text-slate hover:text-navy hover:border-navy/30 hover:bg-navy/5 transition-all duration-300"
                      >
                        <social.icon size={18} strokeWidth={1.5} />
                      </a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* ──── Right Column: Inquiry Form ──── */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="bg-softgray rounded-2xl border border-accentgray/60 p-6 sm:p-8 lg:p-10"
              >
                {/* Form Header */}
                <div className="mb-8">
                  <span className="inline-block text-maroon text-xs tracking-[0.25em] uppercase font-bold mb-2">
                    Send a Message
                  </span>
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-navy"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    How Can We Help?
                  </h2>
                  <div className="mt-3 w-12 h-0.5 bg-maroon rounded-full" />
                </div>

                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-5">
                      <CheckCircle
                        size={40}
                        strokeWidth={1.5}
                        className="text-green-600"
                      />
                    </div>
                    <h3
                      className="text-xl font-bold text-navy mb-2"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      Message Sent Successfully!
                    </h3>
                    <p className="text-slate text-sm max-w-sm">
                      Thank you for reaching out. Our team will get back to you
                      within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="contactFullName"
                        className="block text-sm font-medium text-ink mb-1.5"
                      >
                        Full Name <span className="text-maroon">*</span>
                      </label>
                      <input
                        type="text"
                        id="contactFullName"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={`w-full px-4 py-3 border rounded-xl text-sm text-ink placeholder:text-slate/50 outline-none transition-all duration-200 bg-white ${
                          formErrors.fullName
                            ? "border-maroon focus:ring-1 focus:ring-maroon"
                            : "border-accentgray focus:border-maroon focus:ring-1 focus:ring-maroon/30"
                        }`}
                      />
                      {formErrors.fullName && (
                        <p className="mt-1 text-xs text-maroon">
                          {formErrors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label
                        htmlFor="contactEmail"
                        className="block text-sm font-medium text-ink mb-1.5"
                      >
                        Email Address <span className="text-maroon">*</span>
                      </label>
                      <input
                        type="email"
                        id="contactEmail"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`w-full px-4 py-3 border rounded-xl text-sm text-ink placeholder:text-slate/50 outline-none transition-all duration-200 bg-white ${
                          formErrors.email
                            ? "border-maroon focus:ring-1 focus:ring-maroon"
                            : "border-accentgray focus:border-maroon focus:ring-1 focus:ring-maroon/30"
                        }`}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-xs text-maroon">
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Subject Dropdown */}
                    <div>
                      <label
                        htmlFor="contactSubject"
                        className="block text-sm font-medium text-ink mb-1.5"
                      >
                        Subject <span className="text-maroon">*</span>
                      </label>
                      <select
                        id="contactSubject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl text-sm text-ink outline-none transition-all duration-200 bg-white appearance-none cursor-pointer ${
                          formErrors.subject
                            ? "border-maroon focus:ring-1 focus:ring-maroon"
                            : "border-accentgray focus:border-maroon focus:ring-1 focus:ring-maroon/30"
                        }`}
                      >
                        {subjectOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {formErrors.subject && (
                        <p className="mt-1 text-xs text-maroon">
                          {formErrors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="contactMessage"
                        className="block text-sm font-medium text-ink mb-1.5"
                      >
                        Message <span className="text-maroon">*</span>
                      </label>
                      <textarea
                        id="contactMessage"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project or inquiry..."
                        rows={5}
                        className={`w-full px-4 py-3 border rounded-xl text-sm text-ink placeholder:text-slate/50 outline-none transition-all duration-200 resize-none bg-white ${
                          formErrors.message
                            ? "border-maroon focus:ring-1 focus:ring-maroon"
                            : "border-accentgray focus:border-maroon focus:ring-1 focus:ring-maroon/30"
                        }`}
                      />
                      {formErrors.message && (
                        <p className="mt-1 text-xs text-maroon">
                          {formErrors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-navy text-white text-sm font-semibold tracking-wide rounded-xl hover:bg-maroon transition-all duration-300 shadow-lg shadow-navy/15 hover:shadow-maroon/25 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Send size={16} strokeWidth={1.5} />
                      Send Message
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 3. GLOBAL PRESENCE MAP ═══════════════════════ */}
      <section className="py-16 sm:py-20 bg-softgray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="inline-block text-maroon text-xs tracking-[0.25em] uppercase font-bold mb-3">
              Our Reach
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold text-navy"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Global Presence
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative bg-accentgray/30 rounded-2xl border border-accentgray/60 overflow-hidden"
            style={{ minHeight: "400px" }}
          >
            {/* Map Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Globe size={48} strokeWidth={1} className="text-navy/20 mx-auto mb-4" />
                <p className="text-slate/60 text-sm font-medium">
                  Interactive Map Coming Soon
                </p>
                <p className="text-slate/40 text-xs mt-1">
                  Serving clients across the United States
                </p>

                {/* Pulsing dots for office locations */}
                <div className="relative mt-8 mx-auto" style={{ width: "280px", height: "160px" }}>
                  {/* Simplified US outline hint */}
                  <svg viewBox="0 0 280 160" fill="none" className="absolute inset-0">
                    <path
                      d="M30 80 Q50 40 100 35 Q140 30 180 35 Q230 40 250 60 Q260 75 250 90 Q220 110 180 115 Q140 120 100 115 Q60 110 30 80Z"
                      stroke="rgba(27,51,96,0.1)"
                      strokeWidth="1.5"
                      fill="rgba(27,51,96,0.03)"
                    />
                  </svg>
                  {/* Houston dot */}
                  <div className="absolute" style={{ left: "38%", top: "72%" }}>
                    <div className="w-3 h-3 bg-navy rounded-full" />
                    <div className="absolute inset-0 w-3 h-3 bg-navy rounded-full animate-ping opacity-30" />
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-navy whitespace-nowrap">
                      Houston, TX
                    </span>
                  </div>
                  {/* Atlanta dot */}
                  <div className="absolute" style={{ left: "68%", top: "58%" }}>
                    <div className="w-3 h-3 bg-maroon rounded-full" />
                    <div className="absolute inset-0 w-3 h-3 bg-maroon rounded-full animate-ping opacity-30" />
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-maroon whitespace-nowrap">
                      Atlanta, GA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
