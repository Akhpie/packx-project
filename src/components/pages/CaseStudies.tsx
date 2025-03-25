import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  outcome: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

const CaseStudies: React.FC = () => {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  // Just two case studies as examples
  const caseStudies: CaseStudy[] = [
    {
      id: "eco-friendly-retail",
      title: "Eco-Friendly Packaging for Retail Products",
      category: "Sustainability",
      problem:
        "A retail chain wanted to reduce its carbon footprint by replacing plastic packaging with sustainable materials.",
      solution:
        "Developed biodegradable paper-based packaging for their products, ensuring durability and brand appeal.",
      outcome:
        "Achieved a 60% reduction in plastic usage and gained customer trust for their eco-conscious approach.",
      metrics: [
        { label: "Plastic Reduction", value: "60%" },
        { label: "Customer Trust", value: "↑35%" },
        { label: "Implementation Time", value: "3 months" },
      ],
    },
    {
      id: "food-delivery-packaging",
      title: "Customized Packaging for Food Delivery",
      category: "Food",
      problem:
        "A food delivery service faced challenges with leakage and maintaining food freshness during delivery.",
      solution:
        "Designed customized corrugated boxes with grease-resistant coating and insulation to preserve food temperature.",
      outcome:
        "Improved customer satisfaction by 40% and reduced spillage complaints by 25%.",
      metrics: [
        { label: "Customer Satisfaction", value: "↑40%" },
        { label: "Spillage Complaints", value: "↓25%" },
        { label: "Food Freshness", value: "↑45%" },
      ],
    },
    {
      id: "lightweight-ecommerce",
      title: "Lightweight Packaging for E-commerce",
      category: "e-commerce",
      problem:
        "A leading e-commerce company needed lightweight but durable packaging to reduce shipping costs.",
      solution:
        "Created recyclable cardboard boxes with reinforced edges, optimized for lightweight shipping.",
      outcome:
        "Reduced shipping costs by 20% and improved recyclability of their packaging materials.",
      metrics: [
        { label: "Shipping Cost Reduction", value: "20%" },
        { label: "Material Weight", value: "↓30%" },
        { label: "Recyclability", value: "95%" },
      ],
    },
    {
      id: "compostable-organic",
      title: "Compostable Packaging for Organic Products",
      category: "sustainability",
      problem:
        "An organic food brand needed compostable packaging to align with their eco-friendly branding.",
      solution:
        "Introduced compostable pouches made of plant-based materials, fully biodegradable within 90 days.",
      outcome:
        "Increased customer loyalty among environmentally conscious buyers and reduced packaging waste by 75%.",
      metrics: [
        { label: "Packaging Waste", value: "↓75%" },
        { label: "Biodegradability", value: "90 days" },
        { label: "Brand Alignment", value: "↑60%" },
      ],
    },
    {
      id: "reusable-electronics",
      title: "Reusable Packaging for Electronics",
      category: "electronics",
      problem:
        "An electronics company wanted to reduce packaging waste for its products.",
      solution:
        "Developed reusable packaging made from durable, recyclable materials that doubled as product storage.",
      outcome:
        "Reduced packaging waste by 50% and added value for customers by offering reusable storage options.",
      metrics: [
        { label: "Waste Reduction", value: "50%" },
        { label: "Customer Value", value: "↑40%" },
        { label: "Reuse Rate", value: "65%" },
      ],
    },
    {
      id: "sustainable-cosmetics",
      title: "Sustainable Packaging for Cosmetic Products",
      category: "cosmetics",
      problem:
        "A luxury cosmetics brand sought sustainable packaging to reflect their commitment to sustainability.",
      solution:
        "Designed elegant glass containers with bamboo lids and eco-friendly outer packaging.",
      outcome:
        "Enhanced brand perception and achieved 40% reuse of the packaging by customers.",
      metrics: [
        { label: "Package Reuse", value: "40%" },
        { label: "Brand Perception", value: "↑45%" },
        { label: "Material Sustainability", value: "85%" },
      ],
    },
    {
      id: "minimalist-fashion",
      title: "Minimalist Packaging for Fast Fashion",
      category: "fashion",
      problem:
        "A fast fashion brand wanted to reduce its environmental impact with less packaging material.",
      solution:
        "Developed foldable kraft paper packaging with minimal ink usage, which also doubled as a hanger.",
      outcome:
        "Saved 30% in material costs and significantly reduced packaging waste.",
      metrics: [
        { label: "Material Cost Savings", value: "30%" },
        { label: "Ink Usage", value: "↓70%" },
        { label: "Design Versatility", value: "↑50%" },
      ],
    },
    {
      id: "temperature-controlled-pharma",
      title: "Temperature-Controlled Packaging for Pharmaceuticals",
      category: "pharmaceutical",
      problem:
        "A pharmaceutical company needed packaging to maintain temperature-sensitive vaccines during transportation.",
      solution:
        "Created insulated packaging with thermal liners and gel packs to ensure temperature stability.",
      outcome:
        "Successfully transported vaccines with a 99% effectiveness rate and reduced spoilage by 15%.",
      metrics: [
        { label: "Effectiveness Rate", value: "99%" },
        { label: "Spoilage Reduction", value: "15%" },
        { label: "Temperature Stability", value: "±0.5°C" },
      ],
    },
    {
      id: "recyclable-beverage",
      title: "Recyclable Packaging for Beverage Bottles",
      category: "beverages",
      problem:
        "A beverage company faced criticism for using single-use plastic bottles.",
      solution:
        "Introduced 100% recyclable aluminum cans and paper-based bottle carriers with water-resistant coating.",
      outcome:
        "Achieved 90% recyclability of their packaging and received positive media coverage.",
      metrics: [
        { label: "Recyclability", value: "90%" },
        { label: "Media Sentiment", value: "↑70%" },
        { label: "Consumer Approval", value: "↑55%" },
      ],
    },
    {
      id: "compact-subscription",
      title: "Compact Packaging for Subscription Boxes",
      category: "subscription",
      problem:
        "A subscription box service struggled with oversized packaging that led to higher shipping costs and wasted space.",
      solution:
        "Designed compact, foldable boxes tailored to fit the exact contents of each subscription box.",
      outcome:
        "Reduced shipping costs by 25% and increased packaging efficiency by 30%.",
      metrics: [
        { label: "Shipping Cost Reduction", value: "25%" },
        { label: "Packaging Efficiency", value: "↑30%" },
        { label: "Material Usage", value: "↓40%" },
      ],
    },
  ];

  // Function to handle selecting a case study
  const handleSelectStudy = (study: CaseStudy) => {
    setSelectedStudy(study);
  };

  // Function to close the detailed view
  const handleCloseDetailedView = () => {
    setSelectedStudy(null);
  };

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="relative py-20 overflow-hidden">
        {/* Background layers - matching the hero section from Contact */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient background that fades from top to bottom with completely black bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 via-blue-900/20 to-black"></div>

          {/* Radial gradient overlay */}
          <div className="absolute h-full w-full bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.15),rgba(0,0,0,0))]"></div>

          {/* Grid pattern with smooth fade to completely black */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "40px 40px",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 85%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 85%)",
            }}
          ></div>
        </div>

        {/* Header content */}
        <div className="container mx-auto px-4 relative mb-16 mt-16">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-bold text-white mb-6"
            >
              Case Studies
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl text-gray-300"
            >
              Explore our successful packaging solutions across various
              industries. See how we've helped businesses overcome challenges
              and achieve remarkable results.
            </motion.p>
          </div>
        </div>

        {/* Case Studies Grid - Visible when no study is selected */}
        {!selectedStudy && (
          <div className="container mx-auto px-4 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="cursor-pointer"
                  onClick={() => handleSelectStudy(study)}
                >
                  <Card className="h-full bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden">
                    <div className="h-full flex flex-col">
                      <div className="p-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20"></div>
                      <CardContent className="p-6 flex-grow">
                        <div className="flex justify-between items-start mb-4">
                          <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border-none">
                            {study.category}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                          {study.title}
                        </h3>
                        <p className="text-gray-400 mb-4 line-clamp-3">
                          {study.problem}
                        </p>
                        <div className="mt-auto pt-4 border-t border-gray-800">
                          <p className="text-emerald-400 flex items-center space-x-1 text-sm">
                            <span>Read full case study</span>
                            <svg
                              className="w-4 h-4 ml-1"
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
                          </p>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Case Study View - Visible when a study is selected */}
        {selectedStudy && (
          <div className="container mx-auto px-4 pb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative max-w-4xl mx-auto bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl overflow-hidden"
            >
              {/* Top accent border */}
              <div className="h-1 bg-gradient-to-r from-emerald-500 to-blue-500"></div>

              {/* Close button */}
              <button
                onClick={handleCloseDetailedView}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                aria-label="Close case study"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>

              <div className="p-8">
                <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border-none mb-4">
                  {selectedStudy.category}
                </Badge>

                <h2 className="text-3xl font-bold text-white mb-6">
                  {selectedStudy.title}
                </h2>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-800/70">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="solution">Solution</TabsTrigger>
                    <TabsTrigger value="results">Results</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                      <h3 className="text-xl font-semibold text-emerald-400 mb-3">
                        Challenge
                      </h3>
                      <p className="text-gray-300">{selectedStudy.problem}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {selectedStudy.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-800/30 p-5 rounded-lg border border-gray-700/50 text-center"
                        >
                          <p className="text-gray-400 text-sm mb-1">
                            {metric.label}
                          </p>
                          <p className="text-2xl font-bold text-emerald-400">
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="solution" className="space-y-6">
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                      <h3 className="text-xl font-semibold text-emerald-400 mb-3">
                        Our Approach
                      </h3>
                      <p className="text-gray-300">{selectedStudy.solution}</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="results" className="space-y-6">
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                      <h3 className="text-xl font-semibold text-emerald-400 mb-3">
                        Outcome
                      </h3>
                      <p className="text-gray-300">{selectedStudy.outcome}</p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-8 flex justify-between items-center pt-6 border-t border-gray-800">
                  <button
                    onClick={handleCloseDetailedView}
                    className="flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      ></path>
                    </svg>
                    Back to all case studies
                  </button>

                  <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center">
                    Request Similar Solution
                    <svg
                      className="w-4 h-4 ml-2"
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
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseStudies;
