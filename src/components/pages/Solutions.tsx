import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link, useNavigate } from "react-router-dom";
import clearViewImg from "../../assets/images/clear view box.png";
import ecoFlexImg from "../../assets/images/ecoflex box.png";
import flexiGridImg from "../../assets/images/Flexi Grid Box.png";
import heritageImg from "../../assets/images/heritage box.png";
import vitalEdgeImg from "../../assets/images/vital edge box.png";
import terraCoreImg from "../../assets/images/terra core box.png";
import spectraPackImg from "../../assets/images/spectra pack box.png";

// Enhanced Solution card with more visual elements
interface SolutionCardProps {
  title: string;
  description: string;
  features: string[];
  image: string;
  delay?: number;
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  title,
  description,
  features,
  image,
  delay = 0,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-emerald-500/20 transition-all group"
    >
      <div className="h-64 overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-70"></div>
        <div className="absolute top-4 right-4">
          <span className="bg-emerald-500/90 text-white text-xs font-bold px-3 py-1 rounded-full">
            Premium
          </span>
        </div>
      </div>
      <div className="p-6 border-t border-emerald-500/20">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-300 mb-5">{description}</p>
        <div className="mb-5 h-px w-full bg-gradient-to-r from-emerald-500/30 via-emerald-400/10 to-transparent"></div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 mt-0.5">
                <svg
                  className="w-3.5 h-3.5 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 pt-5 border-t border-gray-800">
          <button
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="group inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span className="mr-2">Learn more</span>
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Industry solution with more visual flair
interface IndustrySolutionProps {
  industry: string;
  description: string;
  benefits: string[];
  logo: string;
  delay?: number;
}

const IndustrySolution: React.FC<IndustrySolutionProps> = ({
  industry,
  description,
  benefits,
  logo,
  delay = 0,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="flex flex-col md:flex-row gap-6 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg hover:shadow-emerald-500/10 transition-all"
    >
      <div className="w-full md:w-1/4 flex justify-center items-center">
        <div className="p-5 bg-gradient-to-br from-emerald-900/30 to-emerald-900/10 rounded-lg border border-emerald-500/20 shadow-inner">
          <img src={logo} alt={industry} className="w-24 h-24 object-contain" />
        </div>
      </div>
      <div className="w-full md:w-3/4">
        <div className="flex items-center mb-4">
          <h3 className="text-2xl font-bold text-white">{industry}</h3>
          <div className="h-px flex-grow ml-4 bg-gradient-to-r from-emerald-500/50 to-transparent"></div>
        </div>
        <p className="text-gray-300 mb-5">{description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start bg-black/30 rounded-lg p-3 hover:bg-black/50 transition-colors"
            >
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 mt-0.5">
                <svg
                  className="w-3.5 h-3.5 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <span className="text-gray-300">{benefit}</span>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors inline-flex items-center shadow-lg hover:shadow-emerald-500/20 group"
          >
            Request Industry Solution
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const Solutions: React.FC = () => {
  const navigate = useNavigate();

  // Data for solution cards
  const solutions = [
    {
      title: "EcoFlex™ Retail Series",
      description:
        "Sustainable retail packaging with premium presentation and complete recyclability.",
      features: [
        "100% Recycled Materials",
        "Customizable Sizing",
        "Embossing Capabilities",
        "Retail-Ready Design",
      ],
      image: ecoFlexImg,
    },
    {
      title: "Heritage™ Luxury Packaging",
      description:
        "Premium packaging solutions for high-end products that create unforgettable unboxing experiences.",
      features: [
        "FSC-Certified Materials",
        "Gold Foil Detailing",
        "Custom Inserts",
        "Magnetic Closures",
      ],
      image: heritageImg,
    },
    {
      title: "ClearView™ Display Solutions",
      description:
        "Crystal-clear packaging with superior product visibility using our plant-based transparent polymer.",
      features: [
        "High Transparency",
        "Plant-Based Materials",
        "UV Protection",
        "Custom Molding",
      ],
      image: clearViewImg,
    },
    {
      title: "SpectraPack™ Interactive Series",
      description:
        "Revolutionary smart packaging with embedded technology and interactive elements.",
      features: [
        "AR Compatibility",
        "NFC Integration",
        "Color-Shifting Elements",
        "Anti-Counterfeit Features",
      ],
      image: spectraPackImg,
    },
    {
      title: "TerraCore™ Sustainable Series",
      description:
        "Earth-friendly packaging crafted from reclaimed wood and agricultural waste.",
      features: [
        "Zero Chemical Treatments",
        "Compostable Design",
        "Natural Finish Options",
        "Carbon Offset Program",
      ],
      image: terraCoreImg,
    },
    {
      title: "VitalEdge™ Tech Packaging",
      description:
        "High-performance protective packaging designed specifically for electronic and tech products.",
      features: [
        "Superior Impact Protection",
        "ESD-Safe Materials",
        "Minimalist Design",
        "Cable Management",
      ],
      image: vitalEdgeImg,
    },
  ];

  // Data for industry solutions
  const industries = [
    {
      industry: "Food & Beverage",
      description:
        "Our food-grade packaging solutions maintain freshness while showcasing your products with FDA-compliant, sustainable materials.",
      benefits: [
        "Extended shelf life",
        "Recyclable materials",
        "Moisture barriers",
        "Tamper-evident seals",
        "Temperature resistance",
        "Custom windows for visibility",
      ],
      logo: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1215&q=80",
    },
    {
      industry: "Cosmetics & Beauty",
      description:
        "Elevate your beauty products with packaging that's as luxurious as the contents inside, featuring premium finishes and sustainable options.",
      benefits: [
        "Premium shelf presence",
        "Airless preservation systems",
        "Customizable inserts",
        "Refillable designs",
        "Custom color matching",
        "Eco-friendly alternatives",
      ],
      logo: "https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    },
    {
      industry: "E-Commerce",
      description:
        "Optimize your fulfillment with right-sized packaging that reduces shipping costs while enhancing the unboxing experience.",
      benefits: [
        "Dimensional weight optimization",
        "Return-ready designs",
        "Protective inserts",
        "Brand experience focus",
        "Automated assembly compatible",
        "Letterbox-friendly options",
      ],
      logo: "https://images.unsplash.com/photo-1627634777217-c864268db30f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Packaging{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-600 text-transparent bg-clip-text">
                Solutions
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mb-10">
              Discover our comprehensive range of innovative packaging solutions
              engineered for sustainability, protection, and brand enhancement.
              Each solution is fully customizable to meet your unique
              requirements.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("packaging-solutions")}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-lg hover:shadow-emerald-500/20 group flex items-center"
              >
                <span>Explore Solutions</span>
                <span className="ml-2 transform group-hover:translate-y-px transition-transform">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </span>
              </button>
              <button
                onClick={() => scrollToSection("industry-solutions")}
                className="px-6 py-3 bg-transparent hover:bg-white/10 text-white border border-white/20 rounded-lg transition-colors flex items-center"
              >
                <span>Industry-Specific Solutions</span>
                <span className="ml-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packaging solutions section */}
      <section
        id="packaging-solutions"
        className="py-16 px-4 bg-gradient-to-b from-black to-emerald-950/30"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Our Packaging Solutions
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-center">
              From sustainable retail packaging to luxury premium boxes, we
              offer a comprehensive range of solutions tailored to your specific
              needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <SolutionCard
                key={index}
                title={solution.title}
                description={solution.description}
                features={solution.features}
                image={solution.image}
                delay={index}
              />
            ))}
          </div>

          {/* Solution metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <div className="text-emerald-400 text-3xl font-bold mb-2">6+</div>
              <div className="text-white font-medium">Solution Lines</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <div className="text-emerald-400 text-3xl font-bold mb-2">
                24+
              </div>
              <div className="text-white font-medium">Material Options</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <div className="text-emerald-400 text-3xl font-bold mb-2">
                100%
              </div>
              <div className="text-white font-medium">Customizable</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <div className="text-emerald-400 text-3xl font-bold mb-2">
                3-6
              </div>
              <div className="text-white font-medium">Week Lead Time</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry-specific solutions */}
      <section id="industry-solutions" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Industry-Specific Solutions
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-center">
              We understand that different industries have unique packaging
              requirements. Explore our specialized solutions for various
              sectors.
            </p>
          </motion.div>

          <div className="space-y-8">
            {industries.map((industry, index) => (
              <IndustrySolution
                key={index}
                industry={industry.industry}
                description={industry.description}
                benefits={industry.benefits}
                logo={industry.logo}
                delay={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 px-4 bg-gradient-to-t from-black to-emerald-950/30">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need a Custom Solution?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Our packaging experts can help you design the perfect solution for
              your specific product needs, brand identity, and sustainability
              goals.
            </p>
            <button
              onClick={() => {
                navigate("/contact");
                // Ensure page scrolls to top on navigation
                window.scrollTo(0, 0);
              }}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors inline-block font-medium"
            >
              Request Custom Quote
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
