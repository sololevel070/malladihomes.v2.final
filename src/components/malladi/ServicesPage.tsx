"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Send,
  CheckCircle,
  Ruler,
  Wrench,
  Palette,
  Scale,
  TreePine,
  Sparkles,
} from "lucide-react";

/* ────────────────────────── Types ────────────────────────── */

interface TableRow {
  name: string;
  scope: string;
  delivery: string;
  output: string;
}

interface CategoryData {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  highlights: string[];
  table: TableRow[];
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  category: string;
  message: string;
}

/* ────────────────────────── Data ────────────────────────── */

const categories: CategoryData[] = [
  {
    id: "architectural",
    label: "Architectural Designs",
    icon: Ruler,
    description:
      "Our architectural design division creates bespoke residential plans that seamlessly blend aesthetic vision with structural integrity. Every design is customized to reflect the client's lifestyle while maintaining the highest standards of luxury construction.",
    highlights: [
      "Custom Floor Plans",
      "3D Visualization",
      "Vastu-Aligned Layouts",
      "Sustainable Design Integration",
      "Material Specification",
    ],
    table: [
      {
        name: "Conceptual Design Sketch",
        scope: "Initial vision & layout",
        delivery: "Collaborative",
        output: "Hand-drawn + Digital Sketch",
      },
      {
        name: "Schematic Floor Plan",
        scope: "Room layout & flow",
        delivery: "Iterative Review",
        output: "2D CAD Drawings",
      },
      {
        name: "3D Architectural Render",
        scope: "Visual representation",
        delivery: "Client Walkthrough",
        output: "Photorealistic Renderings",
      },
      {
        name: "Elevation Drawings",
        scope: "Exterior facade design",
        delivery: "Design Review",
        output: "Detailed Elevations",
      },
      {
        name: "Vastu Compliance Report",
        scope: "Energy flow alignment",
        delivery: "Specialist Audit",
        output: "Vastu Certification",
      },
      {
        name: "Construction Documents",
        scope: "Build-ready plans",
        delivery: "Engineering Sign-off",
        output: "Permit-Ready Sets",
      },
    ],
  },
  {
    id: "engineering",
    label: "Engineering Services",
    icon: Wrench,
    description:
      "Our engineering teams ensure every structural element meets rigorous safety standards while enabling bold architectural expression. From foundation design to load calculations, we engineer homes built to endure generations.",
    highlights: [
      "Structural Analysis",
      "Foundation Engineering",
      "MEP Design",
      "Load Calculations",
      "Seismic Compliance",
    ],
    table: [
      {
        name: "Soil & Site Analysis",
        scope: "Ground condition assessment",
        delivery: "Field Investigation",
        output: "Geotechnical Report",
      },
      {
        name: "Foundation Design",
        scope: "Structural base engineering",
        delivery: "Code Review",
        output: "Foundation Plans",
      },
      {
        name: "Structural Framing Plan",
        scope: "Load-bearing framework",
        delivery: "Engineering Calculation",
        output: "Framing Diagrams",
      },
      {
        name: "MEP Engineering",
        scope: "Mechanical/Electrical/Plumbing",
        delivery: "System Design",
        output: "MEP Schematics",
      },
      {
        name: "Energy Compliance",
        scope: "Efficiency verification",
        delivery: "Performance Testing",
        output: "Energy Report",
      },
      {
        name: "Structural Integrity Report",
        scope: "Safety certification",
        delivery: "Final Inspection",
        output: "Signed Engineering Certificate",
      },
    ],
  },
  {
    id: "interiors",
    label: "Interiors & Decor",
    icon: Palette,
    description:
      "Our interior design division transforms spaces into immersive experiences. From material selection to custom furniture curation, we create interiors that are both functional and breathtakingly beautiful.",
    highlights: [
      "Custom Millwork",
      "Luxury Material Selection",
      "Lighting Design",
      "Color Consultation",
      "Furniture Curation",
    ],
    table: [
      {
        name: "Interior Concept Board",
        scope: "Design direction",
        delivery: "Mood Session",
        output: "Digital + Physical Board",
      },
      {
        name: "Material Palette Selection",
        scope: "Surface & finish choices",
        delivery: "Tactile Review",
        output: "Sample Kit + Specs",
      },
      {
        name: "Custom Millwork Design",
        scope: "Built-in cabinetry",
        delivery: "Precision Drafting",
        output: "Shop Drawings",
      },
      {
        name: "Lighting Layout Plan",
        scope: "Illumination design",
        delivery: "Photometric Analysis",
        output: "Lighting Schedule",
      },
      {
        name: "Furniture & Decor Curation",
        scope: "Furnishing selection",
        delivery: "Styling Session",
        output: "Curated Product List",
      },
      {
        name: "Final Interior Styling",
        scope: "Move-in readiness",
        delivery: "Walkthrough",
        output: "Styled Photography",
      },
    ],
  },
  {
    id: "legal",
    label: "Legal & Approvals",
    icon: Scale,
    description:
      "Navigating the complex landscape of building permits and regulatory compliance requires expertise and experience. Our legal division manages all approvals, ensuring your project proceeds without delays or complications.",
    highlights: [
      "Permit Acquisition",
      "Zoning Compliance",
      "Environmental Clearance",
      "Code Adherence",
      "HOA Approvals",
    ],
    table: [
      {
        name: "Zoning Verification",
        scope: "Land use compliance",
        delivery: "Municipal Review",
        output: "Zoning Certificate",
      },
      {
        name: "Building Permit Application",
        scope: "Construction authorization",
        delivery: "Agency Filing",
        output: "Approved Building Permit",
      },
      {
        name: "Environmental Clearance",
        scope: "Impact assessment",
        delivery: "Regulatory Review",
        output: "Environmental Compliance",
      },
      {
        name: "HOA Approval Package",
        scope: "Community compliance",
        delivery: "Design Review",
        output: "HOA Approval Letter",
      },
      {
        name: "Utility Connection Permits",
        scope: "Service authorization",
        delivery: "Provider Coordination",
        output: "Connection Approvals",
      },
      {
        name: "Occupancy Certificate",
        scope: "Final authorization",
        delivery: "Municipal Inspection",
        output: "Certificate of Occupancy",
      },
    ],
  },
  {
    id: "landscape",
    label: "Landscape & Vastu",
    icon: TreePine,
    description:
      "Our landscape and Vastu division creates harmonious outdoor living spaces that complement the architectural vision while honoring traditional principles of spatial energy and natural balance.",
    highlights: [
      "Garden Design",
      "Hardscape Planning",
      "Vastu Site Analysis",
      "Irrigation Systems",
      "Outdoor Living",
    ],
    table: [
      {
        name: "Vastu Site Analysis",
        scope: "Energy flow assessment",
        delivery: "Compass Survey",
        output: "Vastu Report",
      },
      {
        name: "Landscape Master Plan",
        scope: "Overall outdoor design",
        delivery: "Collaborative",
        output: "Master Plan Drawings",
      },
      {
        name: "Hardscape Design",
        scope: "Patios, walkways, features",
        delivery: "Material Selection",
        output: "Hardscape Layout",
      },
      {
        name: "Planting & Garden Design",
        scope: "Vegetation & garden beds",
        delivery: "Seasonal Planning",
        output: "Planting Schedule",
      },
      {
        name: "Irrigation & Drainage",
        scope: "Water management",
        delivery: "Engineering Design",
        output: "System Schematics",
      },
      {
        name: "Outdoor Living Spaces",
        scope: "Kitchen, firepit, pool",
        delivery: "Lifestyle Design",
        output: "Amenity Plans",
      },
    ],
  },
];

const ROWS_PER_PAGE = 5;

/* ────────────────────────── ProductTable Component ────────────────────────── */

function ProductTable({ data }: { data: TableRow[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase();
    return data.filter(
      (row) =>
        row.name.toLowerCase().includes(q) ||
        row.scope.toLowerCase().includes(q) ||
        row.delivery.toLowerCase().includes(q) ||
        row.output.toLowerCase().includes(q)
    );
  }, [data, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / ROWS_PER_PAGE));

  // Reset page when search changes
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedData = filteredData.slice(
    (safeCurrentPage - 1) * ROWS_PER_PAGE,
    safeCurrentPage * ROWS_PER_PAGE
  );

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search
          size={18}
          strokeWidth={1.5}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate"
        />
        <input
          type="text"
          placeholder="Search deliverables..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-10 pr-4 py-2.5 border border-accentgray rounded-lg text-sm text-ink placeholder:text-slate/60 focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-all duration-200 bg-white"
        />
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg border border-accentgray">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                Deliverable Name
              </th>
              <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                Scope
              </th>
              <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                Delivery Method
              </th>
              <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                Deliverable Output
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-slate text-sm"
                >
                  No matching deliverables found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, i) => (
                <tr
                  key={row.name}
                  className={`border-t border-accentgray transition-colors duration-150 ${
                    i % 2 === 0 ? "bg-white" : "bg-softgray"
                  } hover:bg-sky/20`}
                >
                  <td className="px-4 py-3 font-medium text-ink whitespace-nowrap">
                    {row.name}
                  </td>
                  <td className="px-4 py-3 text-slate whitespace-nowrap">
                    {row.scope}
                  </td>
                  <td className="px-4 py-3 text-slate whitespace-nowrap">
                    {row.delivery}
                  </td>
                  <td className="px-4 py-3 text-slate whitespace-nowrap">
                    {row.output}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={safeCurrentPage === 1}
            className="p-2 rounded-lg border border-accentgray text-slate hover:border-navy hover:text-navy disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>

          {pageNumbers.map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                num === safeCurrentPage
                  ? "bg-navy text-white shadow-md"
                  : "border border-accentgray text-slate hover:border-navy hover:text-navy"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={safeCurrentPage === totalPages}
            className="p-2 rounded-lg border border-accentgray text-slate hover:border-navy hover:text-navy disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Next page"
          >
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────── ServicesPage Component ────────────────────────── */

export default function ServicesPage({
  initialCategory = "architectural",
}: {
  initialCategory?: string;
}) {
  const validCategory = categories.some((c) => c.id === initialCategory) ? initialCategory : "architectural";
  const [activeCategory, setActiveCategory] = useState<string>(validCategory);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<FormState>>({});

  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    category: "architectural",
    message: "",
  });

  const activeData = categories.find((c) => c.id === activeCategory)!;

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (formErrors[name as keyof FormState]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<FormState> = {};
    if (!form.fullName.trim()) errors.fullName = "Full name is required";
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Invalid email format";
    if (!form.phone.trim()) errors.phone = "Phone number is required";
    if (!form.category) errors.category = "Please select a category";
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
        setForm({
          fullName: "",
          email: "",
          phone: "",
          category: "architectural",
          message: "",
        });
      }, 3000);
    }
  };

  return (
    <main>
      {/* ═══════════════════════ 1. HERO SECTION ═══════════════════════ */}
      <section className="relative py-28 sm:py-36 lg:py-44 overflow-hidden bg-navy">
        {/* Gradient glow effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-maroon/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy/50 rounded-full blur-3xl" />
        </div>

        {/* Decorative accent elements */}
        <div className="absolute top-12 left-12 w-20 h-20 border border-sky/20 rounded-full" />
        <div className="absolute bottom-16 right-16 w-16 h-16 border border-maroon/20 rounded-full" />
        <div className="absolute top-1/3 right-20 w-2 h-2 bg-sky/40 rounded-full" />
        <div className="absolute bottom-1/3 left-24 w-3 h-3 bg-sky/30 rounded-full" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sky text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold mb-6"
          >
            What We Offer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Service Portfolio
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sky text-lg sm:text-xl font-medium tracking-wide"
          >
            Comprehensive Solutions Under One Roof
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

      {/* ═══════════════════════ 2. CATEGORY FILTER BAR ═══════════════════════ */}
      <section className="relative z-20 -mt-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl shadow-navy/5 p-2"
          >
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-maroon text-white shadow-md shadow-maroon/20"
                        : "text-slate border border-accentgray hover:border-navy hover:text-navy bg-transparent"
                    }`}
                  >
                    <Icon size={16} strokeWidth={1.5} />
                    <span className="hidden sm:inline">{cat.label}</span>
                    <span className="sm:hidden">{cat.label.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ 3. SPLIT LAYOUT ═══════════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20 bg-softgray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            {/* ──── Left Sidebar: Service Inquiry Form ──── */}
            <aside className="w-full lg:w-[380px] shrink-0">
              <div className="lg:sticky lg:top-28">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg shadow-navy/5 p-6"
                >
                  {/* Form Header */}
                  <div className="mb-6">
                    <h2
                      className="text-xl sm:text-2xl font-bold text-navy"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      Service Inquiry
                    </h2>
                    <div className="mt-2 w-12 h-0.5 bg-maroon rounded-full" />
                  </div>

                  {formSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-10 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                        <CheckCircle
                          size={32}
                          strokeWidth={1.5}
                          className="text-green-600"
                        />
                      </div>
                      <h3
                        className="text-lg font-bold text-navy mb-2"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        Inquiry Submitted!
                      </h3>
                      <p className="text-slate text-sm">
                        We&apos;ll get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium text-ink mb-1.5"
                        >
                          Full Name <span className="text-maroon">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={form.fullName}
                          onChange={handleFormChange}
                          placeholder="Your full name"
                          className={`w-full px-4 py-2.5 border rounded-lg text-sm text-ink placeholder:text-slate/50 outline-none transition-all duration-200 ${
                            formErrors.fullName
                              ? "border-maroon focus:ring-1 focus:ring-maroon"
                              : "border-accentgray focus:border-navy focus:ring-1 focus:ring-navy"
                          }`}
                        />
                        {formErrors.fullName && (
                          <p className="mt-1 text-xs text-maroon">
                            {formErrors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-ink mb-1.5"
                        >
                          Email Address <span className="text-maroon">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={form.email}
                          onChange={handleFormChange}
                          placeholder="you@example.com"
                          className={`w-full px-4 py-2.5 border rounded-lg text-sm text-ink placeholder:text-slate/50 outline-none transition-all duration-200 ${
                            formErrors.email
                              ? "border-maroon focus:ring-1 focus:ring-maroon"
                              : "border-accentgray focus:border-navy focus:ring-1 focus:ring-navy"
                          }`}
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-xs text-maroon">
                            {formErrors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-ink mb-1.5"
                        >
                          Phone Number <span className="text-maroon">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={form.phone}
                          onChange={handleFormChange}
                          placeholder="+1 (555) 000-0000"
                          className={`w-full px-4 py-2.5 border rounded-lg text-sm text-ink placeholder:text-slate/50 outline-none transition-all duration-200 ${
                            formErrors.phone
                              ? "border-maroon focus:ring-1 focus:ring-maroon"
                              : "border-accentgray focus:border-navy focus:ring-1 focus:ring-navy"
                          }`}
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-xs text-maroon">
                            {formErrors.phone}
                          </p>
                        )}
                      </div>

                      {/* Service Category */}
                      <div>
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-ink mb-1.5"
                        >
                          Service Category <span className="text-maroon">*</span>
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={form.category}
                          onChange={handleFormChange}
                          className={`w-full px-4 py-2.5 border rounded-lg text-sm text-ink outline-none transition-all duration-200 bg-white appearance-none cursor-pointer ${
                            formErrors.category
                              ? "border-maroon focus:ring-1 focus:ring-maroon"
                              : "border-accentgray focus:border-navy focus:ring-1 focus:ring-navy"
                          }`}
                        >
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                        {formErrors.category && (
                          <p className="mt-1 text-xs text-maroon">
                            {formErrors.category}
                          </p>
                        )}
                      </div>

                      {/* Project Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-ink mb-1.5"
                        >
                          Project Message <span className="text-maroon">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={form.message}
                          onChange={handleFormChange}
                          placeholder="Tell us about your project..."
                          rows={4}
                          className={`w-full px-4 py-2.5 border rounded-lg text-sm text-ink placeholder:text-slate/50 outline-none transition-all duration-200 resize-none ${
                            formErrors.message
                              ? "border-maroon focus:ring-1 focus:ring-maroon"
                              : "border-accentgray focus:border-navy focus:ring-1 focus:ring-navy"
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
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-maroon text-white text-sm font-semibold tracking-wide rounded-lg hover:bg-maroon/90 transition-all duration-300 shadow-lg shadow-maroon/20 hover:shadow-maroon/30 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Send size={16} strokeWidth={1.5} />
                        Submit Request
                      </button>
                    </form>
                  )}
                </motion.div>
              </div>
            </aside>

            {/* ──── Right Content Panel ──── */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {/* Category Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center">
                        <activeData.icon
                          size={24}
                          strokeWidth={1.5}
                          className="text-navy"
                        />
                      </div>
                      <h2
                        className="text-2xl sm:text-3xl font-bold text-navy"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {activeData.label}
                      </h2>
                    </div>

                    <p className="text-slate text-base leading-relaxed mb-6">
                      {activeData.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {activeData.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-accentgray rounded-full text-xs sm:text-sm font-medium text-ink"
                        >
                          <Sparkles
                            size={12}
                            strokeWidth={1.5}
                            className="text-maroon"
                          />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-accentgray via-accentgray/50 to-transparent mb-8" />

                  {/* Product Table */}
                  <div>
                    <h3
                      className="text-lg sm:text-xl font-bold text-navy mb-4"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      Service Deliverables
                    </h3>
                    <ProductTable data={activeData.table} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
