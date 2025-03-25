import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BorderBeam } from "../magicui/border-beam";
import { ShineBorder } from "../magicui/shine-border";

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
  const ScrollToAnchor = () => {
    useEffect(() => {
      // Function to handle smooth scrolling
      const handleAnchorClick = (e) => {
        const target = e.target.closest("a");
        if (!target) return;

        // Check if the link is an anchor link
        const href = target.getAttribute("href");
        if (!href || !href.startsWith("#")) return;

        // Prevent default anchor behavior
        e.preventDefault();

        // Get the target element
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Scroll smoothly to the target
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Update URL without reload
          window.history.pushState(null, "", href);
        }
      };

      // Add event listener to the document
      document.addEventListener("click", handleAnchorClick);

      // Clean up
      return () => document.removeEventListener("click", handleAnchorClick);
    }, []);

    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: delay * 0.1 }}
      className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-emerald-500/20 transition-all group"
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
          <a
            href="#contact"
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
          </a>
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: delay * 0.1 }}
      className="flex flex-col md:flex-row gap-6 p-8 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg hover:shadow-emerald-500/10 transition-all"
    >
      <div className="w-full md:w-1/4 flex justify-center items-center">
        <div className="p-5 bg-gradient-to-br from-emerald-900/30 to-blue-900/30 rounded-lg border border-emerald-500/20 shadow-inner">
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
              className="flex items-start bg-gray-800/40 rounded-lg p-3 hover:bg-gray-800/60 transition-colors"
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
          <a
            href="#contact"
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
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const Solutions: React.FC = () => {
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
      image: "/images/solutions/eco-retail.jpg",
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
      image: "/images/solutions/luxury.jpg",
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
      image: "/images/solutions/clear-view.jpg",
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
      image: "/images/solutions/interactive.jpg",
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
      image: "/images/solutions/sustainable.jpg",
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
      image: "/images/solutions/tech.jpg",
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
      logo: "/images/industries/food.svg",
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
      logo: "/images/industries/cosmetics.svg",
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
      logo: "/images/industries/ecommerce.svg",
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      {/* Unified design approach for both sections */}
      <div className="relative">
        {/* Shared background that spans both sections */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Single gradient background for both sections - darker, less green */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-blue-950/30 to-black/95"></div>

          {/* Single radial gradient that spans both sections - more subtle */}
          <div className="absolute h-full w-full bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.05),rgba(0,0,0,0))]"></div>

          {/* Single continuous grid pattern for both sections */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
              backgroundSize: "50px 50px",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%)",
            }}
          ></div>
        </div>

        {/* Hero section - reduced padding */}
        <div className="relative py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="mb-6 inline-block mt-16">
                <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Innovative Solutions
                </span>
              </div>
              <h1 className="text-5xl font-bold text-white mb-6">
                Packaging Solutions
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto mb-8"></div>
              <p className="text-xl text-gray-300 mb-10">
                Discover our comprehensive range of innovative packaging
                solutions engineered for sustainability, protection, and brand
                enhancement. Each solution is fully customizable to meet your
                unique requirements.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#packaging-solutions"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(
                      "packaging-solutions"
                    );
                    if (element) {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
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
                </a>
                <a
                  href="#industry-solutions"
                  onClick={(e) => {
                    e.preventDefault();
                    const element =
                      document.getElementById("industry-solutions");
                    if (element) {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                  className="px-6 py-3 bg-transparent hover:bg-white/10 text-white border border-emerald-500/30 rounded-lg transition-colors flex items-center"
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
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced "Packaging solutions" grid section - no separate background and reduced top padding */}
        <section id="packaging-solutions" className="relative pt-12 pb-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
            >
              <span className="inline-block text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-4">
                Product Line
              </span>
              <h2 className="text-3xl font-bold text-white mb-4">
                Our Packaging Solutions
              </h2>
              <div className="w-20 h-1 bg-emerald-500/50 mx-auto mb-6"></div>
              <p className="text-gray-300 max-w-3xl mx-auto">
                From sustainable retail packaging to luxury premium boxes, we
                offer a comprehensive range of solutions tailored to your
                specific needs.
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

            {/* Added feature counts summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center shadow-lg">
                <div className="text-emerald-400 text-3xl font-bold mb-2">
                  6+
                </div>
                <div className="text-white font-medium">Solution Lines</div>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center shadow-lg">
                <div className="text-emerald-400 text-3xl font-bold mb-2">
                  24+
                </div>
                <div className="text-white font-medium">Material Options</div>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center shadow-lg">
                <div className="text-emerald-400 text-3xl font-bold mb-2">
                  100%
                </div>
                <div className="text-white font-medium">Customizable</div>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center shadow-lg">
                <div className="text-emerald-400 text-3xl font-bold mb-2">
                  3-6
                </div>
                <div className="text-white font-medium">Week Lead Time</div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Enhanced "Industry-specific solutions" with better visuals */}
      <section id="industry-solutions" className="py-24 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/40"></div>

          {/* Subtle grid pattern with fade from bottom */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 85%)",
              WebkitMaskImage:
                "linear-gradient(to top, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 85%)",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <span className="inline-block text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-4">
              By Industry
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">
              Industry-Specific Solutions
            </h2>
            <div className="w-20 h-1 bg-emerald-500/50 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-3xl mx-auto">
              We understand that different industries have unique packaging
              requirements. Explore our specialized solutions for various
              sectors.
            </p>
          </motion.div>

          <div className="space-y-10">
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

      {/* Enhanced Call to action with more visual interest */}
      <section className="py-24 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-gray-900/40"></div>

          {/* Subtle grid pattern with fade from bottom */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 85%)",
              WebkitMaskImage:
                "linear-gradient(to top, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 85%)",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gradient-to-r from-emerald-950/50 to-blue-950/10 rounded-2xl border-emerald-950/80 shadow-xl backdrop-blur-lg">
              <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
              <CardHeader className="text-center pb-0">
                <div className="flex justify-center mb-4">
                  <span className="inline-block text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-900/20 px-3 py-1 rounded-full border border-emerald-500/30">
                    Custom Projects
                  </span>
                </div>
                <CardTitle className="text-4xl font-bold text-white mb-4">
                  Need a Custom Solution?
                </CardTitle>
                <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto mb-6"></div>
              </CardHeader>

              <CardContent className="text-center">
                <CardDescription className="text-gray-200 max-w-2xl mx-auto mb-8 mt-4 text-lg">
                  Our packaging experts can help you design the perfect solution
                  for your specific product needs, brand identity, and
                  sustainability goals.
                </CardDescription>
              </CardContent>

              <CardFooter className="flex flex-wrap justify-center gap-6">
                <a
                  href="/contact"
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg duration-300 inline-flex items-center shadow-lg hover:shadow-emerald-500/30 group"
                >
                  <span className="mr-2">Request Custom Quote</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">
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
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/30 rounded-lg transition-colors inline-flex items-center"
                >
                  <span className="mr-2">Talk to an Expert</span>
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                </a>
              </CardFooter>
              {/* <BorderBeam duration={8} size={300} /> */}
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
