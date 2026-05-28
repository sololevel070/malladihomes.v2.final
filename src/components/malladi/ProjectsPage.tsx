"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Maximize2,
  BedDouble,
  Bath,
  Paintbrush,
  ChevronRight,
  ChevronLeft,
  Check,
  Ruler,
  Gem,
  FileText,
  ExternalLink,
  Layers,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

/* ════════════════════════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════════════════════════ */

type BuildStatus = "Finished" | "Under Construction" | "Architectural Concept";

interface Plan {
  name: string;
  sqft: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
  gallery: string[];
  floorplanHighlights: string[];
}

interface Estate {
  id: number;
  name: string;
  sqft: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  status: BuildStatus;
  style: string;
  image: string;
  floorplanHighlights: string[];
  materialSpecs: string[];
  gallery?: string[];
  documents?: { label: string; url: string }[];
  plans?: Plan[];
}

interface LotDetails {
  id: string;
  planName: string;
  planIndex: number;
  status: "Available" | "Reserved" | "Sold";
  size: string;
}

interface Release {
  name: string;
  documentLabel: string;
  documentUrl: string;
  lots: LotDetails[];
}

const oasisMeadowsReleases: Release[] = [
  {
    name: "Release #1",
    documentLabel: "Phase 1 - Release #1 Site Plan (PDF)",
    documentUrl: "/projects/docs/Oasis Meadows_Phase-01_Release #1_Site plan_03-11.25.V1.0.pdf",
    lots: [
      { id: "Lot 08", planName: "Plan 2A - Texas Transitional", planIndex: 1, status: "Reserved", size: "1,691 sq ft" },
      { id: "Lot 09", planName: "Plan 3A - Contemporary Farmhouse", planIndex: 2, status: "Available", size: "1,691 sq ft" },
      { id: "Lot 10", planName: "Plan 4A - Modern Prairie", planIndex: 3, status: "Reserved", size: "1,691 sq ft" },
      { id: "Lot 11", planName: "Plan 1A - Modern Craftsman", planIndex: 0, status: "Sold", size: "1,691 sq ft" },
      { id: "Lot 30", planName: "Plan 4A - Modern Prairie", planIndex: 3, status: "Available", size: "1,691 sq ft" },
      { id: "Lot 34", planName: "Plan 2A - Texas Transitional", planIndex: 1, status: "Sold", size: "1,691 sq ft" },
      { id: "Lot 35", planName: "Plan 3A - Contemporary Farmhouse", planIndex: 2, status: "Sold", size: "1,691 sq ft" },
      { id: "Lot 38", planName: "Plan 1A - Modern Craftsman", planIndex: 0, status: "Available", size: "1,691 sq ft" },
    ]
  },
  {
    name: "Release #2",
    documentLabel: "Phase 1 - Release #2 Site Plan (PDF)",
    documentUrl: "/projects/docs/Oasis Meadows_Phase-01_Release #2_Site plan_03-11.25.V1.0.pdf",
    lots: [
      { id: "Lot 31", planName: "Plan 3A - Contemporary Farmhouse", planIndex: 2, status: "Available", size: "1,691 sq ft" },
      { id: "Lot 32", planName: "Plan 2A - Texas Transitional", planIndex: 1, status: "Reserved", size: "1,691 sq ft" },
      { id: "Lot 33", planName: "Plan 1A - Modern Craftsman", planIndex: 0, status: "Sold", size: "1,691 sq ft" },
      { id: "Lot 36", planName: "Plan 3A - Contemporary Farmhouse", planIndex: 2, status: "Sold", size: "1,691 sq ft" },
      { id: "Lot 37", planName: "Plan 4A - Modern Prairie", planIndex: 3, status: "Reserved", size: "1,691 sq ft" },
      { id: "Lot 39", planName: "Plan 4A - Modern Prairie", planIndex: 3, status: "Available", size: "1,691 sq ft" },
      { id: "Lot 40", planName: "Plan 1A - Modern Craftsman", planIndex: 0, status: "Available", size: "1,691 sq ft" },
    ]
  },
  {
    name: "Release #3",
    documentLabel: "Phase 1 - Release #3 Site Plan (PDF)",
    documentUrl: "/projects/docs/Oasis Meadows_Phase-01_Release #3_Site plan_03-11.25.V1.0.pdf",
    lots: [
      { id: "Lot 01", planName: "Plan 4A - Modern Prairie", planIndex: 3, status: "Sold", size: "1,691 sq ft" },
      { id: "Lot 02", planName: "Plan 1A - Modern Craftsman", planIndex: 0, status: "Reserved", size: "1,691 sq ft" },
      { id: "Lot 03", planName: "Plan 2A - Texas Transitional", planIndex: 1, status: "Available", size: "1,691 sq ft" },
      { id: "Lot 04", planName: "Plan 4A - Modern Prairie", planIndex: 3, status: "Available", size: "1,691 sq ft" },
      { id: "Lot 05", planName: "Plan 3A - Contemporary Farmhouse", planIndex: 2, status: "Available", size: "1,691 sq ft" },
      { id: "Lot 06", planName: "Plan 1A - Modern Craftsman", planIndex: 0, status: "Sold", size: "1,691 sq ft" },
      { id: "Lot 07", planName: "Plan 2A - Texas Transitional", planIndex: 1, status: "Reserved", size: "1,691 sq ft" },
    ]
  }
];

const estates: Estate[] = [
  {
    id: 1,
    name: "Oasis Meadows - Phase 01",
    sqft: "1,691",
    location: "Prosper, TX",
    bedrooms: 4,
    bathrooms: 2,
    status: "Under Construction",
    style: "Modern Transitional Texas Style",
    image: "/projects/images/main/ARIAL VIEW 0.png",
    gallery: [
      "/projects/images/main/ARIAL VIEW 0.png",
      "/projects/images/main/ARIAL VIEW 00.png",
      "/projects/images/main/ARIAL VIEW 000.png",
      "/projects/images/main/ARIAL VIEW 00a.png",
      "/projects/images/main/STREET VIEW.png",
      "/projects/images/main/STREET VIEW 1.png",
      "/projects/images/main/skyee.png"
    ],
    floorplanHighlights: [
      "Exclusive master-planned custom community in Prosper (Phase-01 & Phase-02)",
      "Features 4 customizable floor plans (Plan 1A, 2A, 3A, 4A) at 1,691 Sq. Ft.",
      "Standard layout footprint dimensions: 29'-8\" x 66'-0\"",
      "Includes integrated 2-car garages (20' x 20') and site-built architectural porches"
    ],
    materialSpecs: [
      "Premium Texas brick, cream limestone, and stucco facades",
      "Energy-efficient spray foam insulation and Low-E double pane windows",
      "Commercial-grade chef appliances and custom floor-to-ceiling millwork",
      "Pre-wired for full smart home automation, security, and surround sound systems"
    ],
    documents: [
      { label: "Phase 1 Complete Floor Plans (PDF)", url: "/projects/docs/Oasis Meadows_Phase-01_Floor plans_03-11.25.V.1.0.pdf" },
      { label: "Phase 1 - Release #1 Site Plan (PDF)", url: "/projects/docs/Oasis Meadows_Phase-01_Release #1_Site plan_03-11.25.V1.0.pdf" },
      { label: "Phase 1 - Release #2 Site Plan (PDF)", url: "/projects/docs/Oasis Meadows_Phase-01_Release #2_Site plan_03-11.25.V1.0.pdf" },
      { label: "Phase 1 - Release #3 Site Plan (PDF)", url: "/projects/docs/Oasis Meadows_Phase-01_Release #3_Site plan_03-11.25.V1.0.pdf" }
    ],
    plans: [
      {
        name: "Plan 1A - Modern Craftsman",
        sqft: "1,691",
        bedrooms: 4,
        bathrooms: 2,
        image: "/projects/images/plan-1/IMG-20250829-WA0047.jpg",
        gallery: [
          "/projects/images/plan-1/IMG-20250829-WA0047.jpg",
          "/projects/images/plan-1/IMG-20250829-WA0048.jpg",
          "/projects/images/plan-1/IMG-20250829-WA0049.jpg",
          "/projects/images/plan-1/IMG-20250829-WA0050.jpg",
          "/projects/images/plan-1/IMG-20250829-WA0051.jpg",
          "/projects/images/plan-1/IMG-20250829-WA0052.jpg",
          "/projects/images/plan-1/IMG-20250829-WA0053.jpg",
          "/projects/images/plan-1/IMG-20250829-WA0054.jpg"
        ],
        floorplanHighlights: [
          "Spacious 4 Bed | 2 Bath design with 1,691 Sq. Ft. of living area",
          "Standard layout footprint dimensions: 29'-8\" x 66'-0\"",
          "Features a site-built front porch (9'-0\" x 4'-0\") and 2-car garage (20' x 20')",
          "Gourmet kitchen with island snack bar, farmhouse sink, refrigerator space, and walk-in pantry",
          "Dedicated utility room with washer/dryer hookups, FAU, and water heater cabinet",
          "Primary suite with walk-in wardrobe and private bath featuring a 60\" stall shower"
        ]
      },
      {
        name: "Plan 2A - Texas Transitional",
        sqft: "1,691",
        bedrooms: 4,
        bathrooms: 2,
        image: "/projects/images/plan-2/IMG-20250829-WA0055.jpg",
        gallery: [
          "/projects/images/plan-2/IMG-20250829-WA0055.jpg",
          "/projects/images/plan-2/IMG-20250829-WA0056.jpg",
          "/projects/images/plan-2/IMG-20250829-WA0057.jpg",
          "/projects/images/plan-2/IMG-20250829-WA0058.jpg",
          "/projects/images/plan-2/IMG-20250829-WA0059.jpg",
          "/projects/images/plan-2/IMG-20250829-WA0060.jpg",
          "/projects/images/plan-2/IMG-20250829-WA0061.jpg",
          "/projects/images/plan-2/IMG-20250829-WA0062.jpg"
        ],
        floorplanHighlights: [
          "Spacious 4 Bed | 2 Bath design with 1,691 Sq. Ft. of living area",
          "Standard layout footprint dimensions: 29'-8\" x 66'-0\"",
          "Features beautiful Trellis Exterior Eyebrow architectural elements",
          "Includes a site-built front porch (18'-0\" x 4'-0\") and 2-car garage (20' x 20')",
          "Open kitchen with snack bar island, dishwasher, farm sink, and pantry",
          "Utility room with washer/dryer shelf, FAU/WH, and secondary storage options"
        ]
      },
      {
        name: "Plan 3A - Contemporary Farmhouse",
        sqft: "1,691",
        bedrooms: 3,
        bathrooms: 2,
        image: "/projects/images/plan-3/IMG-20250829-WA0063.jpg",
        gallery: [
          "/projects/images/plan-3/IMG-20250829-WA0063.jpg",
          "/projects/images/plan-3/IMG-20250829-WA0064.jpg",
          "/projects/images/plan-3/IMG-20250829-WA0065.jpg",
          "/projects/images/plan-3/IMG-20250829-WA0066.jpg",
          "/projects/images/plan-3/IMG-20250829-WA0067.jpg",
          "/projects/images/plan-3/IMG-20250829-WA0068.jpg",
          "/projects/images/plan-3/IMG-20250829-WA0069.jpg",
          "/projects/images/plan-3/IMG-20250829-WA0070.jpg"
        ],
        floorplanHighlights: [
          "Versatile 3 Bed | 2 Bath design with 1,691 Sq. Ft. of living area",
          "Standard layout footprint dimensions: 29'-8\" x 66'-0\"",
          "Features a flexible Den layout that can function as a dining room option",
          "Includes a site-built front porch (6'-0\" x 14'-10\") and 2-car garage (20' x 20')",
          "Gourmet kitchen with island snack bar, farm sink, pantry, and microwave hood",
          "Utility room with shelf, washer/dryer hookups, FAU, and water heater cabinet"
        ]
      },
      {
        name: "Plan 4A - Modern Prairie",
        sqft: "1,691",
        bedrooms: 3,
        bathrooms: 2,
        image: "/projects/images/plan-4/IMG-20250829-WA0071.jpg",
        gallery: [
          "/projects/images/plan-4/IMG-20250829-WA0071.jpg",
          "/projects/images/plan-4/IMG-20250829-WA0072.jpg",
          "/projects/images/plan-4/IMG-20250829-WA0073.jpg",
          "/projects/images/plan-4/IMG-20250829-WA0074.jpg",
          "/projects/images/plan-4/IMG-20250829-WA0075.jpg",
          "/projects/images/plan-4/IMG-20250829-WA0076.jpg",
          "/projects/images/plan-4/IMG-20250829-WA0077.jpg",
          "/projects/images/plan-4/IMG-20250829-WA0078.jpg"
        ],
        floorplanHighlights: [
          "Modern 3 Bed | 2 Bath design with 1,691 Sq. Ft. of living area",
          "Standard layout footprint dimensions: 29'-8\" x 66'-0\"",
          "Features a flexible Den / Dining Room option layout",
          "Includes a site-built front porch (6'-0\" x 14'-10\") and 2-car garage (20' x 20')",
          "Chef's kitchen with double island snack bar, pantry, farm sink, and utility closet",
          "Primary suite with walk-in wardrobe, primary bath, and direct layout access"
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Oasis Meadows - Plan 1A",
    sqft: "1,691",
    location: "Prosper, TX",
    bedrooms: 4,
    bathrooms: 2,
    status: "Under Construction",
    style: "Modern Craftsman",
    image: "/projects/images/plan-1/IMG-20250829-WA0047.jpg",
    gallery: [
      "/projects/images/plan-1/IMG-20250829-WA0047.jpg",
      "/projects/images/plan-1/IMG-20250829-WA0048.jpg",
      "/projects/images/plan-1/IMG-20250829-WA0049.jpg",
      "/projects/images/plan-1/IMG-20250829-WA0050.jpg",
      "/projects/images/plan-1/IMG-20250829-WA0051.jpg",
      "/projects/images/plan-1/IMG-20250829-WA0052.jpg",
      "/projects/images/plan-1/IMG-20250829-WA0053.jpg",
      "/projects/images/plan-1/IMG-20250829-WA0054.jpg"
    ],
    floorplanHighlights: [
      "Spacious 4 Bed | 2 Bath design with 1,691 Sq. Ft. of living area",
      "Standard layout footprint dimensions: 29'-8\" x 66'-0\"",
      "Features a site-built front porch (9'-0\" x 4'-0\") and 2-car garage (20' x 20')",
      "Gourmet kitchen with island snack bar, farmhouse sink, refrigerator space, and walk-in pantry",
      "Dedicated utility room with washer/dryer hookups, FAU, and water heater cabinet",
      "Primary suite with walk-in wardrobe and private bath featuring a 60\" stall shower"
    ],
    materialSpecs: [
      "Premium Texas brick, cream limestone, and stucco facades",
      "Energy-efficient spray foam insulation and Low-E double pane windows",
      "Commercial-grade chef appliances and custom floor-to-ceiling millwork",
      "Pre-wired for full smart home automation, security, and surround sound systems"
    ],
    documents: [
      { label: "Phase 1 Complete Floor Plans (PDF)", url: "/projects/docs/Oasis Meadows_Phase-01_Floor plans_03-11.25.V.1.0.pdf" },
      { label: "Phase 1 - Release #1 Site Plan (PDF)", url: "/projects/docs/Oasis Meadows_Phase-01_Release #1_Site plan_03-11.25.V1.0.pdf" },
      { label: "Phase 1 - Release #2 Site Plan (PDF)", url: "/projects/docs/Oasis Meadows_Phase-01_Release #2_Site plan_03-11.25.V1.0.pdf" },
      { label: "Phase 1 - Release #3 Site Plan (PDF)", url: "/projects/docs/Oasis Meadows_Phase-01_Release #3_Site plan_03-11.25.V1.0.pdf" }
    ]
  },
  {
    id: 3,
    name: "Oasis Meadows - Plan 2A",
    sqft: "1,691",
    location: "Prosper, TX",
    bedrooms: 4,
    bathrooms: 2,
    status: "Under Construction",
    style: "Texas Transitional",
    image: "/projects/images/plan-2/IMG-20250829-WA0055.jpg",
    gallery: [
      "/projects/images/plan-2/IMG-20250829-WA0055.jpg",
      "/projects/images/plan-2/IMG-20250829-WA0056.jpg",
      "/projects/images/plan-2/IMG-20250829-WA0057.jpg",
      "/projects/images/plan-2/IMG-20250829-WA0058.jpg",
      "/projects/images/plan-2/IMG-20250829-WA0059.jpg",
      "/projects/images/plan-2/IMG-20250829-WA0060.jpg",
      "/projects/images/plan-2/IMG-20250829-WA0061.jpg",
      "/projects/images/plan-2/IMG-20250829-WA0062.jpg"
    ],
    floorplanHighlights: [
      "Spacious 4 Bed | 2 Bath design with 1,691 Sq. Ft. of living area",
      "Standard layout footprint dimensions: 29'-8\" x 66'-0\"",
      "Features beautiful Trellis Exterior Eyebrow architectural elements",
      "Includes a site-built front porch (18'-0\" x 4'-0\") and 2-car garage (20' x 20')",
      "Open kitchen with snack bar island, dishwasher, farm sink, and pantry",
      "Utility room with washer/dryer shelf, FAU/WH, and secondary storage options"
    ],
    materialSpecs: [
      "Premium Texas brick, cream limestone, and stucco facades",
      "Energy-efficient spray foam insulation and Low-E double pane windows",
      "Commercial-grade chef appliances and custom floor-to-ceiling millwork",
      "Pre-wired for full smart home automation, security, and surround sound systems"
    ],
    documents: [
      { label: "Phase 1 Complete Floor Plans (PDF)", url: "/projects/docs/Oasis Meadows_Phase-01_Floor plans_03-11.25.V.1.0.pdf" },
      { label: "Phase 1 - Release #1 Site Plan (PDF)", url: "/projects/docs/Oasis Meadows_Phase-01_Release #1_Site plan_03-11.25.V1.0.pdf" },
      { label: "Phase 1 - Release #2 Site Plan (PDF)", url: "/projects/docs/Oasis Meadows_Phase-01_Release #2_Site plan_03-11.25.V1.0.pdf" },
      { label: "Phase 1 - Release #3 Site Plan (PDF)", url: "/projects/docs/Oasis Meadows_Phase-01_Release #3_Site plan_03-11.25.V1.0.pdf" }
    ]
  },
  {
    id: 4,
    name: "Oasis Meadows - Plan 3A",
    sqft: "1,691",
    location: "Prosper, TX",
    bedrooms: 3,
    bathrooms: 2,
    status: "Under Construction",
    style: "Contemporary Farmhouse",
    image: "/projects/images/plan-3/IMG-20250829-WA0063.jpg",
    gallery: [
      "/projects/images/plan-3/IMG-20250829-WA0063.jpg",
      "/projects/images/plan-3/IMG-20250829-WA0064.jpg",
      "/projects/images/plan-3/IMG-20250829-WA0065.jpg",
      "/projects/images/plan-3/IMG-20250829-WA0066.jpg",
      "/projects/images/plan-3/IMG-20250829-WA0067.jpg",
      "/projects/images/plan-3/IMG-20250829-WA0068.jpg",
      "/projects/images/plan-3/IMG-20250829-WA0069.jpg",
      "/projects/images/plan-3/IMG-20250829-WA0070.jpg"
    ],
    floorplanHighlights: [
      "Versatile 3 Bed | 2 Bath design with 1,691 Sq. Ft. of living area",
      "Standard layout footprint dimensions: 29'-8\" x 66'-0\"",
      "Features a flexible Den layout that can function as a dining room option",
      "Includes a site-built front porch (6'-0\" x 14'-10\") and 2-car garage (20' x 20')",
      "Gourmet kitchen with island snack bar, farm sink, pantry, and microwave hood",
      "Utility room with shelf, washer/dryer hookups, FAU, and water heater cabinet"
    ],
    materialSpecs: [
      "Premium Texas brick, cream limestone, and stucco facades",
      "Energy-efficient spray foam insulation and Low-E double pane windows",
      "Commercial-grade chef appliances and custom floor-to-ceiling millwork",
      "Pre-wired for full smart home automation, security, and surround sound systems"
    ],
    documents: [
      { label: "Phase 1 Complete Floor Plans (PDF)", url: "/projects/docs/Oasis Meadows_Phase-01_Floor plans_03-11.25.V.1.0.pdf" },
      { label: "Phase 1 - Release #1 Site Plan (PDF)", url: "/projects/docs/Oasis Meadows_Phase-01_Release #1_Site plan_03-11.25.V1.0.pdf" },
      { label: "Phase 1 - Release #2 Site Plan (PDF)", url: "/projects/docs/Oasis Meadows_Phase-01_Release #2_Site plan_03-11.25.V1.0.pdf" },
      { label: "Phase 1 - Release #3 Site Plan (PDF)", url: "/projects/docs/Oasis Meadows_Phase-01_Release #3_Site plan_03-11.25.V1.0.pdf" }
    ]
  },
  {
    id: 5,
    name: "Oasis Meadows - Plan 4A",
    sqft: "1,691",
    location: "Prosper, TX",
    bedrooms: 3,
    bathrooms: 2,
    status: "Under Construction",
    style: "Modern Prairie",
    image: "/projects/images/plan-4/IMG-20250829-WA0071.jpg",
    gallery: [
      "/projects/images/plan-4/IMG-20250829-WA0071.jpg",
      "/projects/images/plan-4/IMG-20250829-WA0072.jpg",
      "/projects/images/plan-4/IMG-20250829-WA0073.jpg",
      "/projects/images/plan-4/IMG-20250829-WA0074.jpg",
      "/projects/images/plan-4/IMG-20250829-WA0075.jpg",
      "/projects/images/plan-4/IMG-20250829-WA0076.jpg",
      "/projects/images/plan-4/IMG-20250829-WA0077.jpg",
      "/projects/images/plan-4/IMG-20250829-WA0078.jpg"
    ],
    floorplanHighlights: [
      "Modern 3 Bed | 2 Bath design with 1,691 Sq. Ft. of living area",
      "Standard layout footprint dimensions: 29'-8\" x 66'-0\"",
      "Features a flexible Den / Dining Room option layout",
      "Includes a site-built front porch (6'-0\" x 14'-10\") and 2-car garage (20' x 20')",
      "Chef's kitchen with double island snack bar, pantry, farm sink, and utility closet",
      "Primary suite with walk-in wardrobe, primary bath, and direct layout access"
    ],
    materialSpecs: [
      "Premium Texas brick, cream limestone, and stucco facades",
      "Energy-efficient spray foam insulation and Low-E double pane windows",
      "Commercial-grade chef appliances and custom floor-to-ceiling millwork",
      "Pre-wired for full smart home automation, security, and surround sound systems"
    ],
    documents: [
      { label: "Phase 1 Complete Floor Plans (PDF)", url: "/projects/docs/Oasis Meadows_Phase-01_Floor plans_03-11.25.V.1.0.pdf" },
      { label: "Phase 1 - Release #1 Site Plan (PDF)", url: "/projects/docs/Oasis Meadows_Phase-01_Release #1_Site plan_03-11.25.V1.0.pdf" },
      { label: "Phase 1 - Release #2 Site Plan (PDF)", url: "/projects/docs/Oasis Meadows_Phase-01_Release #2_Site plan_03-11.25.V1.0.pdf" },
      { label: "Phase 1 - Release #3 Site Plan (PDF)", url: "/projects/docs/Oasis Meadows_Phase-01_Release #3_Site plan_03-11.25.V1.0.pdf" }
    ]
  },
  {
    id: 6,
    name: "The Belmont Estate",
    sqft: "8,500",
    location: "Dallas, TX",
    bedrooms: 6,
    bathrooms: 5,
    status: "Finished",
    style: "Mediterranean Villa",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    floorplanHighlights: [
      "Grand foyer with double-height ceiling",
      "Gourmet kitchen with butler's pantry",
      "Resort-style courtyard with fountain",
      "Home theater with tiered seating",
    ],
    materialSpecs: [
      "Italian marble countertops",
      "Hardwood flooring throughout",
      "Hand-carved limestone facade",
      "Custom wrought-iron balustrades",
    ],
  },
  {
    id: 7,
    name: "Cedar Ridge Manor",
    sqft: "12,000",
    location: "Plano, TX",
    bedrooms: 7,
    bathrooms: 6,
    status: "Finished",
    style: "Modern Craftsman",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    floorplanHighlights: [
      "Open-concept great room with exposed timber beams",
      "Chef's kitchen with dual islands",
      "Wine cellar with tasting room",
      "Spa-inspired primary suite with soaking tub",
    ],
    materialSpecs: [
      "Reclaimed oak hardwood floors",
      "Granite slab countertops",
      "Copper gutter system",
      "Natural stone fireplace surround",
    ],
  },
  {
    id: 8,
    name: "The Waterford",
    sqft: "9,200",
    location: "Frisco, TX",
    bedrooms: 5,
    bathrooms: 4,
    status: "Under Construction",
    style: "Contemporary Estate",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
    floorplanHighlights: [
      "Floating staircase with glass railings",
      "Indoor-outdoor living with folding glass walls",
      "Rooftop terrace with panoramic views",
      "Smart home automation throughout",
    ],
    materialSpecs: [
      "Polished concrete floors",
      "Quartzite countertops",
      "Floor-to-ceiling thermal glass",
      "Architectural-grade steel framing",
    ],
  },
  {
    id: 9,
    name: "Oakmont Hall",
    sqft: "15,000",
    location: "Southlake, TX",
    bedrooms: 8,
    bathrooms: 7,
    status: "Finished",
    style: "Neoclassical",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    floorplanHighlights: [
      "Columned portico with pediment entry",
      "Two-story library with rolling ladder",
      "Ballroom with crystal chandeliers",
      "Guest wing with private entrance",
    ],
    materialSpecs: [
      "Calacatta gold marble",
      "Crown molding with dentil detail",
      "Solid mahogany doors",
      "Travertine flooring in foyers",
    ],
  },
  {
    id: 10,
    name: "The Meridian",
    sqft: "7,800",
    location: "Allen, TX",
    bedrooms: 5,
    bathrooms: 4,
    status: "Under Construction",
    style: "Modern Farmhouse",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
    floorplanHighlights: [
      "Wraparound porch with swing",
      "Gourmet kitchen with farmhouse sink",
      "Mudroom with built-in storage",
      "Bonus room above garage",
    ],
    materialSpecs: [
      "Wide-plank engineered hardwood",
      "Soapstone countertops",
      "Board-and-batten siding",
      "Standing-seam metal roof",
    ],
  },
  {
    id: 11,
    name: "Savoy Grand",
    sqft: "11,500",
    location: "Prosper, TX",
    bedrooms: 6,
    bathrooms: 5,
    status: "Architectural Concept",
    style: "French Provincial",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
    floorplanHighlights: [
      "Circular driveway with central fountain",
      "Formal living and dining rooms",
      "Country kitchen with breakfast nook",
      "Manicured garden with pergola",
    ],
    materialSpecs: [
      "Limestone exterior cladding",
      "Herringbone-patterned wood floors",
      "Hand-painted tile backsplash",
      "Copper dormer accents",
    ],
  },
  {
    id: 12,
    name: "The Westlake",
    sqft: "10,200",
    location: "Westlake, TX",
    bedrooms: 6,
    bathrooms: 5,
    status: "Finished",
    style: "Transitional",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    floorplanHighlights: [
      "Cantilevered second-story master wing",
      "Infinity-edge pool with spa",
      "Home office with private terrace",
      "Four-car showcase garage",
    ],
    materialSpecs: [
      "Honed marble countertops",
      "White oak engineered flooring",
      "Custom millwork throughout",
      "Bronze window cladding",
    ],
  },
  {
    id: 13,
    name: "Primrose Estate",
    sqft: "13,800",
    location: "McKinney, TX",
    bedrooms: 7,
    bathrooms: 6,
    status: "Architectural Concept",
    style: "Mediterranean Modern",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
    floorplanHighlights: [
      "Central atrium with skylight",
      "Resort-style pool pavilion",
      "Chef's kitchen with outdoor connection",
      "Basement level entertainment suite",
    ],
    materialSpecs: [
      "Venetian plaster walls",
      "Terrazzo flooring",
      "Stucco exterior with stone accents",
      "Hand-forged iron chandeliers",
    ],
  },
];

/* ── Category filter options ── */
const categories = [
  "All",
  "Finished Homes",
  "Under Construction",
  "Architectural Concepts",
] as const;

type Category = (typeof categories)[number];

function statusToCategory(status: BuildStatus): Category {
  if (status === "Finished") return "Finished Homes";
  if (status === "Under Construction") return "Under Construction";
  return "Architectural Concepts";
}

/* ── Status badge color helper ── */
function statusBadgeClasses(status: BuildStatus) {
  if (status === "Finished") return "bg-emerald-600/90 text-white";
  if (status === "Under Construction") return "bg-amber-500/90 text-white";
  return "bg-sky/90 text-navy";
}

/* ════════════════════════════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════════════════════════════ */

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedEstate, setSelectedEstate] = useState<Estate | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // States for gallery slides, plan switching and doc downloads
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activePlanTab, setActivePlanTab] = useState<number>(0);
  const [customGallery, setCustomGallery] = useState<string[] | null>(null);
  const [selectedRelease, setSelectedRelease] = useState<number>(0);
  const [selectedLot, setSelectedLot] = useState<string | null>(null);

  /* Filter estates based on the active category */
  const filteredEstates =
    activeCategory === "All"
      ? estates
      : estates.filter((e) => statusToCategory(e.status) === activeCategory);

  /* Open detail modal */
  const openDetail = (estate: Estate) => {
    setSelectedEstate(estate);
    setCustomGallery(estate.gallery || [estate.image]);
    setActiveImageIndex(0);
    setActivePlanTab(0);
    setSelectedRelease(0);
    setSelectedLot(null);
    setDialogOpen(true);
  };

  const currentGallery = customGallery || (selectedEstate ? selectedEstate.gallery || [selectedEstate.image] : []);

  return (
    <main>
      {/* ═══════════════════════ 1. HERO SECTION ═══════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-navy/90 py-28 sm:py-36 lg:py-44">
        {/* Decorative shapes */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Top-right arc */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-sky/8" />
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-sky/5" />
          {/* Bottom-left arc */}
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-maroon/6" />
          {/* Decorative lines */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky/20 to-transparent" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky/10 to-transparent translate-y-8" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sky text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold mb-6"
          >
            Malladi Homes Portfolio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Exquisite Custom Estates
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-sky text-lg sm:text-xl md:text-2xl tracking-wide"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            A Portfolio of Distinction
          </motion.p>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8 mx-auto w-24 h-0.5 bg-gradient-to-r from-transparent via-maroon to-transparent"
          />
        </div>
      </section>

      {/* ═══════════════════════ 2. CATEGORY TOGGLES ═══════════════════════ */}
      <section className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-accentgray shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-3 py-4 overflow-x-auto custom-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                    isActive
                      ? "bg-maroon text-white shadow-md shadow-maroon/20"
                      : "bg-softgray text-slate hover:bg-accentgray/60 hover:text-navy"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 3. ESTATE CARDS GRID ═══════════════════════ */}
      <section className="py-16 sm:py-24 bg-softgray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-navy mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Our Signature Estates
            </h2>
            <p className="text-slate text-base sm:text-lg max-w-2xl mx-auto">
              Explore our curated collection of luxury custom homes, each a
              masterpiece of design and craftsmanship.
            </p>
          </motion.div>

          {/* Cards grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {filteredEstates.map((estate, i) => (
                <motion.article
                  key={estate.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  onClick={() => openDetail(estate)}
                  className="group cursor-pointer relative rounded-xl overflow-hidden shadow-lg shadow-navy/10 hover:shadow-2xl hover:shadow-navy/15 transition-shadow duration-500"
                >
                  {/* Image container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={estate.image}
                      alt={estate.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Gradient overlay — always subtle, intensifies on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Status badge — top-right */}
                    <span
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${statusBadgeClasses(
                        estate.status
                      )}`}
                    >
                      {estate.status}
                    </span>

                    {/* Hover overlay — slides up from bottom */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out p-5">
                      <div className="flex flex-wrap items-center gap-3 text-white/90 text-sm">
                        <span className="flex items-center gap-1.5">
                          <Maximize2 size={14} strokeWidth={1.5} />
                          {estate.sqft} sq ft
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} strokeWidth={1.5} />
                          {estate.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <BedDouble size={14} strokeWidth={1.5} />
                          {estate.bedrooms} Beds
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Paintbrush size={14} strokeWidth={1.5} />
                          {estate.style}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card bottom — always visible */}
                  <div className="bg-white p-5">
                    <h3
                      className="text-lg font-bold text-navy mb-1"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {estate.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-slate text-sm">
                        <span className="flex items-center gap-1">
                          <Maximize2 size={13} strokeWidth={1.5} />
                          {estate.sqft} sq ft
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={13} strokeWidth={1.5} />
                          {estate.location}
                        </span>
                      </div>
                      <ChevronRight
                        size={18}
                        strokeWidth={1.5}
                        className="text-maroon group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredEstates.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-slate py-20 text-lg"
            >
              No estates found in this category.
            </motion.p>
          )}
        </div>
      </section>

      {/* ═══════════════════════ 4. PROJECT DETAIL MODAL ═══════════════════════ */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar p-0 gap-0"
          showCloseButton
        >
          {selectedEstate && (
            <>
              {/* Image Carousel */}
              <div className="relative w-full h-64 sm:h-96 md:h-[400px] overflow-hidden rounded-t-lg bg-slate-900 group/carousel">
                {currentGallery && currentGallery.length > 0 ? (
                  <>
                    <Image
                      src={currentGallery[activeImageIndex]}
                      alt={selectedEstate.name}
                      fill
                      className="object-cover transition-all duration-500"
                      sizes="(max-width: 768px) 100vw, 768px"
                      priority
                    />
                    
                    {/* Reset Gallery Button */}
                    {customGallery && selectedEstate.gallery && customGallery !== selectedEstate.gallery && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCustomGallery(selectedEstate.gallery || [selectedEstate.image]);
                          setActiveImageIndex(0);
                          setSelectedLot(null);
                        }}
                        className="absolute bottom-4 right-4 z-20 px-3.5 py-1.5 bg-maroon/90 backdrop-blur-sm text-white hover:bg-maroon text-xs font-semibold rounded-full shadow-md transition-all duration-300 flex items-center gap-1.5 hover:scale-105"
                      >
                        <Layers size={12} />
                        Reset to Project Views
                      </button>
                    )}
                    
                    {/* Next/Prev buttons if there's more than one image */}
                    {currentGallery.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIndex((prev) => (prev === 0 ? currentGallery.length - 1 : prev - 1));
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors z-10"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIndex((prev) => (prev === currentGallery.length - 1 ? 0 : prev + 1));
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors z-10"
                        >
                          <ChevronRight size={20} />
                        </button>
                        
                        {/* Page dots indicator */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm z-10">
                          {currentGallery.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveImageIndex(idx);
                              }}
                              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                activeImageIndex === idx ? "bg-white w-3" : "bg-white/50 hover:bg-white/80"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/50 text-sm">
                    No image available
                  </div>
                )}
                
                <span
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${statusBadgeClasses(
                    selectedEstate.status
                  )}`}
                >
                  {selectedEstate.status}
                </span>
              </div>
              
              {/* Thumbnail Gallery (shown if more than 1 image) */}
              {currentGallery && currentGallery.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto bg-slate-900 border-b border-white/10 custom-scrollbar">
                  {currentGallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-10 shrink-0 rounded overflow-hidden border-2 transition-all duration-300 ${
                        activeImageIndex === idx ? "border-sky scale-95" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Content area */}
              <div className="p-6 sm:p-8 bg-white">
                {/* Property name */}
                <DialogTitle
                  className="text-2xl sm:text-3xl font-bold text-navy mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {selectedEstate.name}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Details for {selectedEstate.name} located in{" "}
                  {selectedEstate.location}
                </DialogDescription>

                {/* Key specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  {[
                    {
                      icon: Maximize2,
                      label: "Size",
                      value: `${selectedEstate.sqft} sq ft`,
                    },
                    {
                      icon: BedDouble,
                      label: "Bedrooms",
                      value: `${selectedEstate.bedrooms}`,
                    },
                    {
                      icon: Bath,
                      label: "Bathrooms",
                      value: `${selectedEstate.bathrooms}`,
                    },
                    {
                      icon: MapPin,
                      label: "Location",
                      value: selectedEstate.location,
                    },
                  ].map((spec) => (
                    <div
                      key={spec.label}
                      className="flex flex-col items-center text-center p-3 rounded-lg bg-softgray"
                    >
                      <spec.icon
                        size={20}
                        strokeWidth={1.5}
                        className="text-maroon mb-2"
                      />
                      <span className="text-xs text-slate uppercase tracking-wide mb-0.5">
                        {spec.label}
                      </span>
                      <span className="text-sm font-semibold text-ink">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Style row */}
                <div className="flex items-center gap-2 mb-8 px-4 py-3 rounded-lg bg-sky/20 border border-sky/30">
                  <Paintbrush
                    size={18}
                    strokeWidth={1.5}
                    className="text-navy shrink-0"
                  />
                  <span className="text-sm text-slate">Architectural Style:</span>
                  <span className="text-sm font-semibold text-navy">
                    {selectedEstate.style}
                  </span>
                </div>

                {/* Floorplan Highlights */}
                <div className="mb-8">
                  <h3
                    className="flex items-center gap-2 text-lg font-bold text-navy mb-4"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    <Ruler size={18} strokeWidth={1.5} className="text-maroon" />
                    Floorplan Highlights
                  </h3>
                  <ul className="space-y-3">
                    {selectedEstate.floorplanHighlights.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check
                          size={18}
                          strokeWidth={1.5}
                          className="text-maroon shrink-0 mt-0.5"
                        />
                        <span className="text-slate text-sm leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Material Specifications */}
                <div className="mb-8">
                  <h3
                    className="flex items-center gap-2 text-lg font-bold text-navy mb-4"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    <Gem size={18} strokeWidth={1.5} className="text-maroon" />
                    Material Specifications
                  </h3>
                  <ul className="space-y-3">
                    {selectedEstate.materialSpecs.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check
                          size={18}
                          strokeWidth={1.5}
                          className="text-maroon shrink-0 mt-0.5"
                        />
                        <span className="text-slate text-sm leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Community Documents & Site Plans */}
                {selectedEstate.documents && selectedEstate.documents.length > 0 && (
                  <div className="mb-8 border-t border-accentgray pt-8">
                    <h3
                      className="flex items-center gap-2 text-lg font-bold text-navy mb-4"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      <FileText size={18} strokeWidth={1.5} className="text-maroon" />
                      Community Documents &amp; Site Plans
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedEstate.documents.map((doc, idx) => (
                        <a
                          key={idx}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 rounded-lg bg-softgray hover:bg-accentgray/40 border border-transparent hover:border-slate/20 transition-all duration-300 group"
                        >
                          <div className="flex items-center gap-3">
                            <FileText size={20} className="text-maroon shrink-0" />
                            <span className="text-sm font-medium text-navy group-hover:text-maroon transition-colors text-left">
                              {doc.label}
                            </span>
                          </div>
                          <ExternalLink size={16} className="text-slate group-hover:text-maroon transition-colors shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Site Plan & Release Explorer (only for Phase 01 flagship) */}
                {selectedEstate.id === 1 && (
                  <div className="mb-8 border-t border-accentgray pt-8">
                    <h3
                      className="flex items-center gap-2 text-lg font-bold text-navy mb-4"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      <Layers size={18} strokeWidth={1.5} className="text-maroon" />
                      Interactive Release &amp; Lot Explorer
                    </h3>
                    <p className="text-slate text-sm mb-6">
                      Select a release phase to view the interactive lot layout. Click on any lot to see its allocated floor plan design, view status, download documentations, and explore photos.
                    </p>

                    {/* Release Tabs */}
                    <div className="flex gap-2 mb-6">
                      {oasisMeadowsReleases.map((release, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedRelease(idx);
                            setSelectedLot(null);
                          }}
                          className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg border transition-all duration-300 ${
                            selectedRelease === idx
                              ? "bg-navy text-white border-navy shadow-sm"
                              : "bg-white text-slate border-accentgray hover:border-slate/50"
                          }`}
                        >
                          {release.name}
                        </button>
                      ))}
                    </div>

                    {/* Release PDF Download */}
                    <div className="mb-6">
                      <a
                        href={oasisMeadowsReleases[selectedRelease].documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-maroon hover:text-maroon/80 hover:underline transition-all"
                      >
                        <FileText size={14} />
                        Download {oasisMeadowsReleases[selectedRelease].documentLabel}
                      </a>
                    </div>

                    {/* Lots Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                      {oasisMeadowsReleases[selectedRelease].lots.map((lot) => {
                        const isSelected = selectedLot === lot.id;
                        const statusColors = {
                          Available: "border-emerald-500 text-emerald-800 bg-emerald-50/50 hover:bg-emerald-50",
                          Reserved: "border-amber-500 text-amber-800 bg-amber-50/50 hover:bg-amber-50",
                          Sold: "border-slate-200 text-slate-400 bg-slate-50/30 opacity-60 hover:opacity-100",
                        };
                        
                        return (
                          <button
                            key={lot.id}
                            onClick={() => {
                              setSelectedLot(lot.id);
                              // Switch active plan tab to match this lot's plan
                              setActivePlanTab(lot.planIndex);
                              // Set custom gallery to this lot's plan gallery
                              if (selectedEstate.plans && selectedEstate.plans[lot.planIndex]) {
                                setCustomGallery(selectedEstate.plans[lot.planIndex].gallery);
                                setActiveImageIndex(0);
                              }
                            }}
                            className={`flex flex-col items-center justify-center p-3.5 rounded-xl border-2 transition-all duration-300 text-center relative ${
                              isSelected
                                ? "ring-2 ring-maroon border-maroon bg-maroon/5 text-maroon scale-[1.02] shadow-sm"
                                : statusColors[lot.status]
                            }`}
                          >
                            <span className="text-sm font-bold">{lot.id}</span>
                            <span className="text-[10px] mt-1 font-medium px-2 py-0.5 rounded bg-black/5">
                              {lot.planName.split(" - ")[0]}
                            </span>
                            <span className={`text-[10px] mt-1.5 font-bold ${
                              lot.status === "Available" ? "text-emerald-600" :
                              lot.status === "Reserved" ? "text-amber-600" : "text-slate-500"
                            }`}>
                              {lot.status}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Selected Lot Details Panel */}
                    {selectedLot && (() => {
                      const lot = oasisMeadowsReleases[selectedRelease].lots.find(l => l.id === selectedLot);
                      if (!lot) return null;
                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-5 rounded-xl border border-accentgray bg-softgray/40 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-navy">{lot.id}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                                lot.status === "Available" ? "bg-emerald-100 text-emerald-800" :
                                lot.status === "Reserved" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-800"
                              }`}>
                                {lot.status}
                              </span>
                            </div>
                            <p className="text-xs text-slate">
                              Size: <span className="font-semibold text-navy">{lot.size}</span>
                            </p>
                            <p className="text-sm font-semibold text-navy">
                              Design: {lot.planName}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <a
                              href={`https://wa.me/14695550199?text=${encodeURIComponent(
                                `Hello Malladi Homes! I am interested in ${lot.id} in ${oasisMeadowsReleases[selectedRelease].name} of ${selectedEstate.name} (Design: ${lot.planName}, Size: ${lot.size}, Status: ${lot.status}). Please share details.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-maroon text-white hover:bg-maroon/90 text-xs font-semibold rounded-lg transition-all duration-300 shadow flex items-center gap-1.5"
                            >
                              Inquire About {lot.id}
                              <ChevronRight size={14} />
                            </a>
                          </div>
                        </motion.div>
                      );
                    })()}
                  </div>
                )}

                {/* Plan Variations (only for Phase 01 flagship) */}
                {selectedEstate.plans && selectedEstate.plans.length > 0 && (
                  <div className="mb-8 border-t border-accentgray pt-8">
                    <h3
                      className="flex items-center gap-2 text-lg font-bold text-navy mb-4"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      <Layers size={18} strokeWidth={1.5} className="text-maroon" />
                      Floor Plan Designs
                    </h3>
                    <p className="text-slate text-sm mb-6">
                      Explore the available floor plans for Oasis Meadows. Select a design below to view specifications, highlights, and load its lot-wise photos.
                    </p>
                    
                    {/* Plan Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedEstate.plans.map((plan, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setActivePlanTab(idx);
                          }}
                          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg border transition-all duration-300 ${
                            activePlanTab === idx
                              ? "bg-maroon text-white border-maroon shadow-sm"
                              : "bg-white text-slate border-accentgray hover:border-slate/50"
                          }`}
                        >
                          {plan.name.split(" - ")[0]}
                        </button>
                      ))}
                    </div>

                    {/* Active Plan Detail */}
                    {selectedEstate.plans[activePlanTab] && (
                      <div className="p-5 rounded-lg border border-accentgray bg-softgray/50">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-accentgray">
                          <div>
                            <h4 className="font-bold text-navy text-base" style={{ fontFamily: "var(--font-playfair)" }}>
                              {selectedEstate.plans[activePlanTab].name}
                            </h4>
                            <p className="text-xs text-slate mt-0.5">
                              Architectural Design Option
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold text-navy">
                            <span className="flex items-center gap-1">
                              <Maximize2 size={14} className="text-maroon" />
                              {selectedEstate.plans[activePlanTab].sqft} sq ft
                            </span>
                            <span className="flex items-center gap-1">
                              <BedDouble size={14} className="text-maroon" />
                              {selectedEstate.plans[activePlanTab].bedrooms} Beds
                            </span>
                            <span className="flex items-center gap-1">
                              <Bath size={14} className="text-maroon" />
                              {selectedEstate.plans[activePlanTab].bathrooms} Baths
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="text-xs font-semibold text-slate uppercase tracking-wider mb-2">Design Highlights</h5>
                            <ul className="space-y-2">
                              {selectedEstate.plans[activePlanTab].floorplanHighlights.map((hl, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <Check size={14} className="text-maroon shrink-0 mt-0.5" />
                                  <span className="text-slate text-xs leading-relaxed">{hl}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex flex-col justify-between items-center bg-white p-4 rounded-lg border border-accentgray">
                            <div className="relative w-full h-40 sm:h-48 rounded-lg overflow-hidden mb-3">
                              <Image
                                src={selectedEstate.plans[activePlanTab].image}
                                alt={selectedEstate.plans[activePlanTab].name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <button
                              onClick={() => {
                                setCustomGallery(selectedEstate.plans![activePlanTab].gallery);
                                setActiveImageIndex(0);
                              }}
                              className="w-full py-2 bg-navy text-white hover:bg-navy/90 text-xs font-semibold rounded-lg transition-all duration-300 shadow"
                            >
                              Load Lot-Wise Photos
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Inquire button */}
                <a
                  href={`https://wa.me/14695550199?text=${encodeURIComponent(
                    `Hello Malladi Homes! I'm interested in the ${selectedEstate.name} (${selectedEstate.style}, ${selectedEstate.sqft} sq ft in ${selectedEstate.location}). Please share more details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full mt-6 px-8 py-3.5 bg-maroon text-white text-sm font-semibold tracking-wide rounded-full hover:bg-maroon/90 transition-all duration-300 shadow-lg shadow-maroon/25 hover:shadow-maroon/40 hover:scale-[1.02]"
                >
                  Inquire About This Design / Community
                  <ChevronRight size={16} strokeWidth={1.5} className="ml-2" />
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
