import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Malladi Homes | Luxury Custom Estate Home Builder",
  description:
    "Malladi Homes is a premier boutique luxury custom estate home builder with 20+ years of experience, 10 specialized divisions, and 500+ custom homes built across 12+ US states.",
  keywords: [
    "Malladi Homes",
    "luxury homes",
    "custom estate builder",
    "boutique home builder",
    "luxury construction",
    "architectural design",
    "Vastu compliant homes",
  ],
  authors: [{ name: "Malladi Homes" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Malladi Homes | Luxury Custom Estate Home Builder",
    description:
      "Premier boutique luxury custom estate home builder with 10 specialized divisions and 20+ years of experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${playfair.variable} antialiased bg-background text-foreground font-sans`}
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
