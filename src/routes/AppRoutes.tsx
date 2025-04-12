import React from "react";
import { Routes, Route } from "react-router-dom";

// Import page components
import Home from "../components/pages/Home";
import Solutions from "../components/pages/Solutions";
import PackagingInnovationLab from "../components/scene/PackagingInnovationLab";
import Sustainability from "../components/pages/Sustainability";
import CaseStudies from "../components/pages/CaseStudies";
import Contact from "../components/pages/Contact";
import NotFound from "../components/pages/NotFound";
import Experience from "@/components/pages/Experience";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/solutions" element={<Solutions />} />
      <Route path="/innovation-lab" element={<PackagingInnovationLab />} />
      <Route path="/sustainability" element={<Sustainability />} />
      <Route path="/case-studies" element={<CaseStudies />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
