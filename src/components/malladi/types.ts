export type PageId = "home" | "about" | "services" | "projects" | "process" | "gallery" | "news" | "contact";

export interface NavItem {
  id: PageId;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "process", label: "Process" },
  { id: "gallery", label: "Gallery" },
  { id: "news", label: "News" },
];

export const BRAND = {
  name: "Malladi Homes",
  tagline: "Building Your Dream Home",
  phone: "+1 (469) 555-0199",
  email: "info@malladihomes.com",
  whatsapp: "14695550199",
  whatsappMessage: "Hello Malladi Homes! I'm interested in learning more about your luxury custom home building services. Please share available options.",
  address: {
    hq: {
      label: "Office Headquarters",
      street: "Houston Professional Plaza, 1200 Smith St",
      city: "Houston, TX 77002",
    },
    design: {
      label: "Design & Engineering Hub",
      street: "Atlanta Tech Village, 3423 Piedmont Rd NE",
      city: "Atlanta, GA 30305",
    },
  },
  social: {
    facebook: "https://facebook.com/malladihomes",
    linkedin: "https://linkedin.com/company/malladihomes",
    instagram: "https://instagram.com/malladihomes",
  },
} as const;
