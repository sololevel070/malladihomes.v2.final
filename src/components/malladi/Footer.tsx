"use client";

import Image from "next/image";
import { Facebook, Linkedin, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { NAV_ITEMS, BRAND, type PageId } from "./types";

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/white-logo.svg"
                alt="Malladi Homes"
                width={40}
                height={40}
                className="object-contain"
              />
              <div>
                <span
                  className="font-display text-xl font-bold tracking-wide"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  MALLADI
                </span>
                <span className="block text-[10px] tracking-[0.25em] uppercase text-sky">
                  Homes
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              A premier boutique luxury custom estate home builder with 10
              specialized divisions and 20+ years of experience crafting
              extraordinary residences across the United States.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={BRAND.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-sky hover:bg-sky/10 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              <a
                href={BRAND.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-sky hover:bg-sky/10 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} strokeWidth={1.5} />
              </a>
              <a
                href={BRAND.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-sky hover:bg-sky/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-sky mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-white/60 text-sm hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Divisions */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-sky mb-6">
              Service Divisions
            </h4>
            <ul className="space-y-3">
              {[
                "Project Assessment",
                "Horizontal Design",
                "Horizontal Construction",
                "Vertical Design",
                "Vertical Construction",
                "Landscape Design",
                "Landscape Construction",
                "Fence Installation",
              ].map((division) => (
                <li key={division}>
                  <button
                    onClick={() => {
                      onNavigate("services");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-white/60 text-sm hover:text-white transition-colors duration-200"
                  >
                    {division}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-sky mb-6">
              Contact
            </h4>
            <div className="space-y-5">
              <div className="flex gap-3">
                <MapPin size={18} className="text-sky mt-0.5 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-white/80 text-sm font-medium">
                    {BRAND.address.hq.label}
                  </p>
                  <p className="text-white/50 text-sm">
                    {BRAND.address.hq.street}
                  </p>
                  <p className="text-white/50 text-sm">
                    {BRAND.address.hq.city}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin size={18} className="text-sky mt-0.5 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-white/80 text-sm font-medium">
                    {BRAND.address.design.label}
                  </p>
                  <p className="text-white/50 text-sm">
                    {BRAND.address.design.street}
                  </p>
                  <p className="text-white/50 text-sm">
                    {BRAND.address.design.city}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Phone size={18} className="text-sky shrink-0" strokeWidth={1.5} />
                <a
                  href={`tel:${BRAND.phone}`}
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  {BRAND.phone}
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <Mail size={18} className="text-sky shrink-0" strokeWidth={1.5} />
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  {BRAND.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Malladi Homes. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button className="text-white/40 text-xs hover:text-white/70 transition-colors">
              Privacy Policy
            </button>
            <button className="text-white/40 text-xs hover:text-white/70 transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
