import React from "react";
import { Routes, Route } from "react-router-dom";

// Import page components
import Home from "../components/pages/Home";
import Solutions from "../components/pages/Solutions";
import PackagingInnovationLab from "../components/scene/PackagingInnovationLab";
// import { Sustainability } from "./pages/Sustainability";
// import { CaseStudies } from "./pages/CaseStudies";
import Contact from "../components/pages/Contact";
import CaseStudies from "../components/pages/CaseStudies";
// import { NotFound } from "./pages/NotFound";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/solutions" element={<Solutions />} />
      <Route path="/innovation-lab" element={<PackagingInnovationLab />} />
      {/* <Route path="/sustainability" element={<Sustainability />} /> */}
      <Route path="/case-studies" element={<CaseStudies />} />
      <Route path="/contact" element={<Contact />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
