import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import heritageImg from "../../assets/images/Heritage Box.png";
import vitalEdgeImg from "../../assets/images/Vital Edge Box.png";
import terraCoreImg from "../../assets/images/Terra Core Box.png";
import spectraPackImg from "../../assets/images/Spectra pack box.png";
import interscrollImg from "../../assets/images/interscroll box.png";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import {
  Box,
  LuxuryBox,
  GlassBox,
  HolographicBox,
  WoodenBox,
  NeonBox,
  GeometricBox,
  ScrollableBox,
} from "../boxes/index";

// Modal component for displaying 3D box
interface BoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  boxData: {
    title: string;
    description: string;
    features: string[];
    component: React.ComponentType<any>;
    color?: string;
  };
  navigate: (path: string) => void;
}

const BoxModal: React.FC<BoxModalProps> = ({
  isOpen,
  onClose,
  boxData,
  navigate,
}) => {
  if (!isOpen) return null;

  const BoxComponent = boxData.component;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-xl w-full max-w-5xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row h-[80vh] max-h-[700px]">
              {/* 3D View Section */}
              <div className="w-full md:w-3/5 h-1/2 md:h-full relative">
                <Canvas className="w-full h-full">
                  <PerspectiveCamera
                    makeDefault
                    position={[0, 0, 5]}
                    fov={50}
                  />
                  <OrbitControls
                    enableZoom={true}
                    maxDistance={10}
                    minDistance={2}
                    autoRotate
                    autoRotateSpeed={0.5}
                  />
                  <Environment preset="studio" />
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1.5} />
                  <spotLight position={[-10, -10, -10]} intensity={0.5} />
                  <group position={[0, 0, 0]}>
                    {boxData.title === "InterScroll™ Dynamic Package" ? (
                      <ScrollableBox color="#4d61ff" />
                    ) : boxData.title === "EcoFlex™ Retail Series" ? (
                      <Box color="#8eac7a" />
                    ) : boxData.title === "Heritage™ Luxury Packaging" ? (
                      <LuxuryBox />
                    ) : boxData.title === "ClearView™ Display Solutions" ? (
                      <GlassBox />
                    ) : boxData.title === "SpectraPack™ Interactive Series" ? (
                      <HolographicBox />
                    ) : boxData.title === "TerraCore™ Sustainable Series" ? (
                      <WoodenBox />
                    ) : boxData.title === "VitalEdge™ Tech Packaging" ? (
                      <NeonBox />
                    ) : boxData.title === "FlexiGrid™ Adaptive System" ? (
                      <GeometricBox />
                    ) : (
                      <BoxComponent color={boxData.color} />
                    )}
                    <ContactShadows
                      position={[0, -1.5, 0]}
                      opacity={0.4}
                      scale={5}
                      blur={2.4}
                    />
                  </group>
                </Canvas>

                {/* Interaction info for ScrollableBox */}
                {boxData.title === "InterScroll™ Dynamic Package" && (
                  <div className="absolute top-4 left-0 right-0 flex justify-center">
                    <div className="bg-black/70 backdrop-blur-sm p-3 rounded-lg border border-blue-400/30 flex items-center gap-3 shadow-lg shadow-blue-500/20">
                      <div className="text-blue-400 text-sm">
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                          <span>Hover and scroll to interact</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Scroll hint animation for InterScroll box */}
                {boxData.title === "InterScroll™ Dynamic Package" && (
                  <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center pointer-events-none">
                    <div className="flex flex-col items-center">
                      <div className="text-emerald-400 text-sm mb-2 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                        Try scrolling!
                      </div>
                      <div className="w-6 h-10 border-2 border-emerald-400/50 rounded-full flex items-start justify-center p-1">
                        <div className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce mt-1"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Details Section */}
              <div className="w-full md:w-2/5 p-8 overflow-y-auto bg-black/40 modal-content">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    {boxData.title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <p className="text-gray-300 mb-6">{boxData.description}</p>

                <div className="mb-4">
                  <h3 className="text-lg font-medium text-white mb-3">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {boxData.features.map((feature, index) => (
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
                </div>

                {boxData.title === "InterScroll™ Dynamic Package" && (
                  <div className="mt-4 p-4 border border-blue-400/20 rounded-lg bg-blue-900/10">
                    <h4 className="text-blue-400 text-lg mb-2 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      How To Interact
                    </h4>
                    <ol className="text-gray-300 list-decimal pl-5 space-y-1">
                      <li>Hover your mouse over the box to activate</li>
                      <li>
                        Scroll <span className="text-blue-400">upward</span> to
                        open
                      </li>
                      <li>
                        Scroll <span className="text-blue-400">downward</span>{" "}
                        to close
                      </li>
                    </ol>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-800 flex justify-between">
                  <button
                    onClick={() => navigate("/contact")}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-lg"
                  >
                    Request Quote
                  </button>
                  <button
                    onClick={() => navigate("/innovation-lab")}
                    className="px-6 py-3 border border-white/20 hover:bg-white/10 text-white rounded-lg transition-colors"
                  >
                    View in Lab
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Enhanced Solution card with more visual elements
interface SolutionCardProps {
  title: string;
  description: string;
  features: string[];
  image: string;
  delay?: number;
  component: React.ComponentType<any>;
  color?: string;
  onOpenModal: (boxData: any) => void;
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  title,
  description,
  features,
  image,
  delay = 0,
  component,
  color,
  onOpenModal,
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
            onClick={() =>
              onOpenModal({ title, description, features, component, color })
            }
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState<any>(null);

  const onOpenModal = (boxData: any) => {
    setSelectedBox(boxData);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

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
      component: Box,
      color: "#8eac7a",
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
      component: LuxuryBox,
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
      component: GlassBox,
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
      component: HolographicBox,
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
      component: WoodenBox,
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
      component: NeonBox,
    },
    {
      title: "InterScroll™ Dynamic Package",
      description:
        "Our most visually striking packaging solution with patent-pending dynamic opening mechanism. Provides exceptional unboxing experience and superior protection.",
      features: [
        "Interactive Reveal Technology",
        "Tamper-Evident Design",
        "Digital Content Integration",
        "Premium Material Construction",
      ],
      image: interscrollImg,
      component: ScrollableBox,
      color: "#4d61ff",
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
      logo: "https://www.3pconsultants.co.in/wp-content/uploads/2022/10/food-and-beverages.jpg",
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
      logo: "https://burst.shopifycdn.com/photos/makeup-beauty-flatlay.jpg?width=1000&format=pjpg&exif=0&iptc=0",
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
      logo: "https://ebz-static.s3.ap-south-1.amazonaws.com/easebuzz-static/upi-credit-cards-v1.png",
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
      {/* Modal component */}
      {selectedBox && (
        <BoxModal
          isOpen={isModalOpen}
          onClose={onCloseModal}
          boxData={selectedBox}
          navigate={navigate}
        />
      )}

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
                component={solution.component}
                color={solution.color}
                onOpenModal={onOpenModal}
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
              <div className="text-emerald-400 text-3xl font-bold mb-2">7+</div>
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
