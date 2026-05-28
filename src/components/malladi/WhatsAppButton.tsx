"use client";

import { MessageCircle } from "lucide-react";
import { BRAND } from "./types";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(BRAND.whatsappMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-all duration-300 pulse-ring"
    >
      <MessageCircle size={26} strokeWidth={1.5} />
    </a>
  );
}
