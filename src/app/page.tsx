"use client";

import { useState } from "react";
import Navbar from "@/components/malladi/Navbar";
import Footer from "@/components/malladi/Footer";
import WhatsAppButton from "@/components/malladi/WhatsAppButton";
import HomePage from "@/components/malladi/HomePage";
import AboutPage from "@/components/malladi/AboutPage";
import ServicesPage from "@/components/malladi/ServicesPage";
import ProjectsPage from "@/components/malladi/ProjectsPage";
import ProcessPage from "@/components/malladi/ProcessPage";
import GalleryPage from "@/components/malladi/GalleryPage";
import NewsPage from "@/components/malladi/NewsPage";
import ContactPage from "@/components/malladi/ContactPage";
import type { PageId } from "@/components/malladi/types";

export default function Home() {
  const [activePage, setActivePage] = useState<PageId>("home");
  const [serviceCategory, setServiceCategory] = useState<string>("architectural");

  const handleNavigate = (page: PageId) => {
    setActivePage(page);
  };

  const handleNavigateToService = (category: string) => {
    setServiceCategory(category);
    setActivePage("services");
  };

  const renderPage = () => {
    switch (activePage) {
      case "about":
        return <AboutPage />;
      case "services":
        return <ServicesPage key={serviceCategory} initialCategory={serviceCategory} />;
      case "projects":
        return <ProjectsPage />;
      case "process":
        return <ProcessPage />;
      case "gallery":
        return <GalleryPage />;
      case "news":
        return <NewsPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage onNavigateToService={handleNavigateToService} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activePage={activePage} onNavigate={handleNavigate} />
      <div className="flex-1">{renderPage()}</div>
      <Footer onNavigate={handleNavigate} />
      <WhatsAppButton />
    </div>
  );
}
