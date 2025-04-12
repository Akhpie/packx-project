import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

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
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  // Function to close the detailed view
  const handleCloseDetailedView = () => {
    setSelectedStudy(null);
    // Restore body scrolling when modal is closed
    document.body.style.overflow = "auto";
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero section */}
      <section className="pt-32 md:pt-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Our Case{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-600 text-transparent bg-clip-text">
                Studies
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-6 md:mb-10">
              Explore our successful packaging solutions across various
              industries. See how we've helped businesses overcome challenges
              and achieve remarkable results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter and case studies section */}
      <section className="py-10 md:py-16 px-4 bg-gradient-to-b from-black to-emerald-950/30">
        <div className="max-w-7xl mx-auto">
          {/* Case Studies Filter */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-12"
          >
            <Tabs defaultValue="all" className="w-full">
              <div className="flex mb-6 overflow-x-auto px-1 py-2 w-full">
                <TabsList className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 p-1 flex-nowrap min-w-min mx-auto">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-emerald-600 whitespace-nowrap text-xs md:text-sm px-3"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="sustainability"
                    className="data-[state=active]:bg-emerald-600 whitespace-nowrap text-xs md:text-sm px-3"
                  >
                    Sustainability
                  </TabsTrigger>
                  <TabsTrigger
                    value="food"
                    className="data-[state=active]:bg-emerald-600 whitespace-nowrap text-xs md:text-sm px-3"
                  >
                    Food & Beverage
                  </TabsTrigger>
                  <TabsTrigger
                    value="ecommerce"
                    className="data-[state=active]:bg-emerald-600 whitespace-nowrap text-xs md:text-sm px-3"
                  >
                    E-Commerce
                  </TabsTrigger>
                  <TabsTrigger
                    value="other"
                    className="data-[state=active]:bg-emerald-600 whitespace-nowrap text-xs md:text-sm px-3"
                  >
                    Other
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* All case studies content */}
              <TabsContent value="all">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {caseStudies.map((study, index) => (
                    <motion.div
                      key={study.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="cursor-pointer"
                      onClick={() => handleSelectStudy(study)}
                    >
                      <Card className="overflow-hidden h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-emerald-500/50 transition-all duration-300">
                        <CardContent className="p-4 md:p-6">
                          <Badge className="mb-2 md:mb-3 bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                            {study.category}
                          </Badge>
                          <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">
                            {study.title}
                          </h3>
                          <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4 line-clamp-3">
                            {study.problem}
                          </p>
                          <div className="flex items-center text-emerald-400 text-sm md:text-base">
                            <span>Read case study</span>
                            <svg
                              className="w-3 h-3 md:w-4 md:h-4 ml-2"
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
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Filter by category content */}
              {["sustainability", "food", "ecommerce", "other"].map(
                (category) => (
                  <TabsContent key={category} value={category}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {caseStudies
                        .filter((study) =>
                          category === "other"
                            ? !["sustainability", "food", "ecommerce"].includes(
                                study.category.toLowerCase()
                              )
                            : study.category.toLowerCase() === category
                        )
                        .map((study, index) => (
                          <motion.div
                            key={study.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="cursor-pointer"
                            onClick={() => handleSelectStudy(study)}
                          >
                            <Card className="overflow-hidden h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-emerald-500/50 transition-all duration-300">
                              <CardContent className="p-4 md:p-6">
                                <Badge className="mb-2 md:mb-3 bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                                  {study.category}
                                </Badge>
                                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">
                                  {study.title}
                                </h3>
                                <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4 line-clamp-3">
                                  {study.problem}
                                </p>
                                <div className="flex items-center text-emerald-400 text-sm md:text-base">
                                  <span>Read case study</span>
                                  <svg
                                    className="w-3 h-3 md:w-4 md:h-4 ml-2"
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
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                    </div>
                  </TabsContent>
                )
              )}
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Selected Case Study Modal */}
      {selectedStudy && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-4 md:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <div>
                <Badge className="mb-2 md:mb-3 bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                  {selectedStudy.category}
                </Badge>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white pr-6">
                  {selectedStudy.title}
                </h2>
              </div>
              <button
                onClick={handleCloseDetailedView}
                className="text-gray-400 hover:text-white transition-colors p-1 -mt-1 -mr-1"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
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
            </div>

            <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-emerald-400 mb-1 md:mb-2">
                  The Challenge
                </h3>
                <p className="text-sm md:text-base text-gray-300">
                  {selectedStudy.problem}
                </p>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold text-emerald-400 mb-1 md:mb-2">
                  Our Solution
                </h3>
                <p className="text-sm md:text-base text-gray-300">
                  {selectedStudy.solution}
                </p>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold text-emerald-400 mb-1 md:mb-2">
                  The Outcome
                </h3>
                <p className="text-sm md:text-base text-gray-300">
                  {selectedStudy.outcome}
                </p>
              </div>
            </div>

            <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">
              Key Metrics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6">
              {selectedStudy.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-black/30 border border-gray-800 rounded-lg p-3 md:p-4 text-center"
                >
                  <div className="text-xl md:text-2xl font-bold text-emerald-400 mb-1">
                    {metric.value}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6 md:mt-8">
              <button
                onClick={handleCloseDetailedView}
                className="px-4 py-2 md:px-6 md:py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors text-sm md:text-base"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-t from-black to-emerald-950/30">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
              Ready to Transform Your Packaging?
            </h2>
            <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto">
              Let's work together to create packaging solutions that enhance
              your products, delight your customers, and align with your
              sustainability goals.
            </p>
            <Link
              to="/contact"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors inline-block font-medium text-sm md:text-base"
            >
              Contact Us Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
