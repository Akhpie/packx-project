import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Grid,
  Stars,
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
} from "./boxes/index";
import { Suspense, useState, memo, useCallback } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BoxProps } from "../types/BoxTypes";

// Redefining products with industry-specific packaging solutions
const products = [
  {
    name: "EcoFlex™ Retail Series",
    component: Box,
    color: "#8eac7a", // Eco-friendly green
    description:
      "Our flagship retail packaging solution featuring 100% recycled materials with premium presentation. Perfect for consumer electronics and cosmetics brands seeking sustainable options without compromising on appearance.",
    features: [
      "100% Recycled Materials",
      "Custom Brand Embossing",
      "Drop-Safe Design",
      "Retail-Ready",
    ],
    sustainability: 95, // sustainability score out of 100
    caseStudy:
      "Helped BeautyNow reduce packaging waste by 74% while increasing unboxing satisfaction scores by 28%",
    industry: "Retail, Cosmetics, Electronics",
  },
  {
    name: "Heritage™ Luxury Packaging",
    component: LuxuryBox,
    description:
      "Premium packaging crafted for luxury brands with FSC-certified wood and responsible metal accents. Creates an unforgettable unboxing experience with tactile elements and meticulous detailing.",
    features: [
      "FSC-Certified Materials",
      "Embossed Gold Detailing",
      "Hand-Crafted Finishes",
      "Custom Inlays",
    ],
    sustainability: 75,
    caseStudy:
      "Implemented by Timepiece International for their collector series, increasing perceived value by 45% and social media unboxing mentions by 230%",
    industry: "Luxury Retail, Jewelry, Premium Spirits",
  },
  {
    name: "ClearView™ Display Solution",
    component: GlassBox,
    description:
      "Crystal-clear packaging with superior product visibility using our revolutionary plant-based transparent polymer. Ideal for showcasing products that sell on visual appeal.",
    features: [
      "Plant-Based Polymer",
      "UV Protection",
      "Shatter-Resistant",
      "Optical Clarity",
    ],
    sustainability: 85,
    caseStudy:
      "Helped OrganicFarms increase shelf-life of produce by 40% while showcasing product freshness, resulting in 23% sales lift",
    industry: "Food & Beverage, Cosmetics, Consumer Goods",
  },
  {
    name: "SpectraPack™ Interactive Series",
    component: HolographicBox,
    description:
      "Revolutionary smart packaging with embedded color-shifting technology and optional NFC integration. Creates an interactive experience that extends beyond the physical product.",
    features: [
      "AR Compatible",
      "NFC Integration",
      "Anti-Counterfeit Technology",
      "Interactive Elements",
    ],
    sustainability: 70,
    caseStudy:
      "Implemented by GameVerse for limited edition releases, resulting in 4.2M social media impressions and 318% increase in unboxing content",
    industry: "Entertainment, Limited Editions, High-Tech Products",
  },
  {
    name: "TerraCore™ Sustainable Series",
    component: WoodenBox,
    description:
      "Handcrafted from reclaimed wood and agricultural waste, our TerraCore packaging offers a rustic, authentic presentation while maintaining a minimal environmental footprint.",
    features: [
      "Reclaimed Materials",
      "Compostable",
      "Zero Chemical Treatments",
      "Artisanal Craftsmanship",
    ],
    sustainability: 98,
    caseStudy:
      "Enabled Farm-to-Table Organics to eliminate plastic packaging completely while strengthening brand loyalty among environmentally-conscious consumers",
    industry: "Organic Products, Farm-to-Table, Artisanal Goods",
  },
  {
    name: "VitalEdge™ Tech Packaging",
    component: NeonBox,
    description:
      "Contemporary packaging designed for tech products with modular protection systems and striking aesthetic. Features reactive inks that respond to touch and temperature.",
    features: [
      "Impact-Resistant Structure",
      "Reactive Design Elements",
      "Modular Architecture",
      "Tech-Integrated",
    ],
    sustainability: 82,
    caseStudy:
      "Reduced return rates for SonicAudio by 47% through enhanced protection while creating a 'wow factor' that boosted repeat purchases",
    industry: "Consumer Electronics, Gaming, Smart Devices",
  },
  {
    name: "FlexiGrid™ Adaptive System",
    component: GeometricBox,
    description:
      "Revolutionary modular packaging system that adapts to product dimensions, minimizing material waste and maximizing protection through intelligent geometric design.",
    features: [
      "Size-Adaptive",
      "Interlocking Modules",
      "Space-Efficient",
      "Minimal Material Usage",
    ],
    sustainability: 93,
    caseStudy:
      "Helped GlobalShip reduce packaging material by 62% and dimensional weight costs by 35% across their e-commerce fulfillment network",
    industry: "E-commerce, Logistics, Varied Product Lines",
  },
  {
    name: "InterScroll™ Dynamic Package",
    component: ScrollableBox,
    color: "#4d61ff",
    description:
      "Our most visually striking packaging solution with patent-pending dynamic opening mechanism. Provides exceptional unboxing experience and superior protection while turning heads at every unveiling. Integrated sensors enable product authentication and digital content access.",
    features: [
      "Interactive Reveal Technology",
      "Tamper-Evident Design",
      "Digital Content Integration",
      "Premium Material Construction",
    ],
    sustainability: 88,
    caseStudy:
      'Implemented by LuxeTech for their flagship smartphone line, resulting in 84% reduction in counterfeit products and a 42% increase in customer engagement with digital manuals and setup guides. Customers rated it as "the most memorable unboxing experience" in industry surveys.',
    industry:
      "Luxury Electronics, Pharmaceuticals, Premium Cosmetics, Collectibles",
  },
];

// Memoized 3D scene to prevent unnecessary re-renders
interface Scene3DProps {
  currentProduct: number;
  viewingSustainability: boolean;
  woodColor: string;
  interiorColor: string;
  trimColor: string;
  gemColor: string;
}

const Scene3D = memo(
  ({
    currentProduct,
    viewingSustainability,
    woodColor,
    interiorColor,
    trimColor,
    gemColor,
  }: Scene3DProps) => {
    const ProductComponent = products[currentProduct].component;

    // Get the appropriate environment preset based on the product type
    const getEnvironmentPreset = useCallback(() => {
      if (currentProduct === 4) return "sunset"; // Wooden box
      if (currentProduct === 5) return "night"; // Neon box
      if (currentProduct === 2) return "studio"; // Glass box
      if (currentProduct === 7) return "night"; // ScrollableBox
      return "night"; // Default
    }, [currentProduct]);

    // Get the appropriate grid color based on the product type
    const getGridColor = useCallback(() => {
      if (currentProduct === 5) return "#5272d6"; // Tech blue for neon box
      if (currentProduct === 4) return "#8B4513"; // Brown for wooden box
      if (currentProduct === 0) return "#8eac7a"; // Green for eco box
      if (currentProduct === 1) return "#c9a959"; // Gold for luxury box
      if (currentProduct === 7) return "#4d61ff"; // Blue for scrollable box
      return "#00ff88"; // Default
    }, [currentProduct]);

    return (
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls
          enableZoom={true}
          maxDistance={10}
          minDistance={2}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <Environment preset={getEnvironmentPreset()} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, -10, -10]} intensity={0.5} />
        <Suspense fallback={null}>
          {currentProduct === 1 ? (
            <LuxuryBox
              position={[0, 0, 0]}
              woodColor={woodColor}
              interiorColor={interiorColor}
              trimColor={trimColor}
              gemColor={gemColor}
            />
          ) : currentProduct === 7 ? (
            <ScrollableBox position={[0, 0, 0]} color={products[7].color} />
          ) : (
            <ProductComponent position={[0, 0, 0]} />
          )}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={5}
            blur={2.4}
          />
          <Grid
            position={[0, -2, 0]}
            args={[10, 10]}
            cellSize={0.5}
            cellThickness={0.5}
            cellColor={getGridColor()}
            sectionSize={2}
            fadeDistance={20}
            fadeStrength={1}
          />
          {/* Reduced number of stars for better performance */}
          <Stars radius={50} depth={50} count={500} factor={4} />
          {/* Simplified post-processing with just essential effects */}
          <EffectComposer>
            <Bloom
              intensity={0}
              luminanceThreshold={0.6}
              luminanceSmoothing={0.9}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    );
  }
);

// Memoized product info component to prevent unnecessary re-renders
interface ProductInfoProps {
  currentProduct: number;
  setCurrentProduct: (index: number) => void;
  viewingSustainability: boolean;
  setViewingSustainability: (value: boolean) => void;
  woodColor: string;
  setWoodColor: (color: string) => void;
  interiorColor: string;
  setInteriorColor: (color: string) => void;
  trimColor: string;
  setTrimColor: (color: string) => void;
  gemColor: string;
  setGemColor: (color: string) => void;
}

const ProductInfo = memo(
  ({
    currentProduct,
    setCurrentProduct,
    viewingSustainability,
    setViewingSustainability,
    woodColor,
    setWoodColor,
    interiorColor,
    setInteriorColor,
    trimColor,
    setTrimColor,
    gemColor,
    setGemColor,
  }: ProductInfoProps) => {
    return (
      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-white">
              {products[currentProduct].name}
            </h3>
            <span className="px-3 py-1 bg-emerald-600/20 text-emerald-400 text-sm rounded-full">
              {products[currentProduct].sustainability}% Sustainable
            </span>
          </div>

          <p className="text-gray-400 mb-6">
            {products[currentProduct].description}
          </p>

          <div className="mb-6">
            <h4 className="text-white text-lg mb-3">Key Features</h4>
            <div className="grid grid-cols-2 gap-2">
              {products[currentProduct].features.map((feature, i) => (
                <div key={i} className="flex items-center text-gray-300">
                  <svg
                    className="w-4 h-4 mr-2 text-emerald-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-white text-lg mb-2">Case Study</h4>
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="text-gray-300 italic">
                "{products[currentProduct].caseStudy}"
              </p>
            </div>
          </div>

          {currentProduct === 1 && (
            <div className="mb-6">
              <h4 className="text-white text-lg mb-3">Customize</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 text-sm">Wood</label>
                  <div className="flex space-x-2 mt-1">
                    {["#5C0000", "#8B4513", "#3D2B1F", "#D4A76A"].map(
                      (color) => (
                        <button
                          key={color}
                          className={`w-6 h-6 rounded-full ${
                            woodColor === color ? "ring-2 ring-white" : ""
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setWoodColor(color)}
                        />
                      )
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-gray-300 text-sm">Interior</label>
                  <div className="flex space-x-2 mt-1">
                    {["#800020", "#046307", "#000080", "#4B0082"].map(
                      (color) => (
                        <button
                          key={color}
                          className={`w-6 h-6 rounded-full ${
                            interiorColor === color ? "ring-2 ring-white" : ""
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setInteriorColor(color)}
                        />
                      )
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-gray-300 text-sm">Trim</label>
                  <div className="flex space-x-2 mt-1">
                    {["#FFD700", "#C0C0C0", "#B76E79", "#CD7F32"].map(
                      (color) => (
                        <button
                          key={color}
                          className={`w-6 h-6 rounded-full ${
                            trimColor === color ? "ring-2 ring-white" : ""
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setTrimColor(color)}
                        />
                      )
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-gray-300 text-sm">Gem</label>
                  <div className="flex space-x-2 mt-1">
                    {["#ff0000", "#50C878", "#0F52BA", "#9966CC"].map(
                      (color) => (
                        <button
                          key={color}
                          className={`w-6 h-6 rounded-full ${
                            gemColor === color ? "ring-2 ring-white" : ""
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setGemColor(color)}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="text-sm text-gray-500 mb-6">
            <span className="font-medium">Ideal for: </span>
            {products[currentProduct].industry}
          </div>

          <button className="w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors">
            Request Custom Quote
          </button>
        </div>

        <div>
          <h4 className="text-white text-lg mb-3">Explore Our Solutions</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {products.map((product, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setCurrentProduct(index)}
                className={`p-3 rounded-lg text-center transition-all transform hover:scale-105 ${
                  currentProduct === index
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 backdrop-blur-sm"
                }`}
              >
                <span className="text-xs block">
                  {product.name.split(" ")[0]}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <p className="text-sm text-emerald-400 italic">
          All packaging solutions can be customized to your specific
          requirements and brand guidelines.
        </p>
      </div>
    );
  }
);

export const ProductViewer = () => {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [viewingSustainability, setViewingSustainability] = useState(false);
  const [woodColor, setWoodColor] = useState("#8B4513");
  const [interiorColor, setInteriorColor] = useState("#800020");
  const [trimColor, setTrimColor] = useState("#FFD700");
  const [gemColor, setGemColor] = useState("#ff0000");

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, #00ff8822 1px, transparent 1px), linear-gradient(to bottom, #00ff8822 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-2">
            Packaging Solutions
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Explore our innovative packaging designs that combine
            sustainability, protection, and brand enhancement. Each solution is
            customizable to your specific needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="h-[600px] bg-black/50 rounded-xl overflow-hidden backdrop-blur-sm border border-emerald-500/20 relative">
            <Scene3D
              currentProduct={currentProduct}
              viewingSustainability={viewingSustainability}
              woodColor={woodColor}
              interiorColor={interiorColor}
              trimColor={trimColor}
              gemColor={gemColor}
            />

            {/* ScrollableBox instruction overlay */}
            {currentProduct === 7 && !viewingSustainability && (
              <div className="absolute top-4 left-0 right-0 flex justify-center">
                <div className="bg-black/70 backdrop-blur-sm p-3 rounded-lg border border-blue-400/30 flex items-center gap-3 shadow-lg shadow-blue-500/20">
                  <div className="text-blue-400 text-sm">
                    <div className="flex items-center gap-2 mb-1">
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
                      <span>Hover over box</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
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
                      <span>Scroll up to open box</span>
                    </div>
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
                      <span>Scroll down to close box</span>
                    </div>
                  </div>
                  <div className="h-12 w-10 flex flex-col items-center justify-center border border-blue-400/30 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-400 animate-bounce"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 11l5-5m0 0l5 5m-5-5v12"
                      />
                    </svg>
                    <div className="w-3 h-5 border border-blue-400/50 rounded-full mt-1"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Sustainability overlay */}
            {viewingSustainability && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-32 h-32 rounded-full border-8 border-emerald-500 flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-white">
                    {products[currentProduct].sustainability}%
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Sustainability Score
                </h3>
                <p className="text-gray-300 mb-6 max-w-md">
                  Our packaging solutions are rated based on recyclability,
                  material sourcing, production impact, and end-of-life
                  considerations.
                </p>
                <button
                  onClick={() => setViewingSustainability(false)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-500"
                >
                  Back to 3D View
                </button>
              </div>
            )}

            {/* 3D view controls */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={() => setViewingSustainability(!viewingSustainability)}
                className="p-2 bg-emerald-600/80 text-white rounded hover:bg-emerald-500 text-sm backdrop-blur-sm"
              >
                {viewingSustainability ? "3D View" : "Sustainability"}
              </button>
            </div>
          </div>

          <div>
            <ProductInfo
              currentProduct={currentProduct}
              setCurrentProduct={setCurrentProduct}
              viewingSustainability={viewingSustainability}
              setViewingSustainability={setViewingSustainability}
              woodColor={woodColor}
              setWoodColor={setWoodColor}
              interiorColor={interiorColor}
              setInteriorColor={setInteriorColor}
              trimColor={trimColor}
              setTrimColor={setTrimColor}
              gemColor={gemColor}
              setGemColor={setGemColor}
            />

            {currentProduct === 7 && (
              <div className="mt-4 p-4 border border-blue-400/20 rounded-lg bg-blue-900/10 backdrop-blur-sm">
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
                <p className="text-gray-300 mb-2">
                  The InterScroll™ Dynamic Package features our revolutionary
                  scroll-activated opening mechanism:
                </p>
                <ol className="text-gray-300 list-decimal pl-5 space-y-1">
                  <li>Hover your mouse over the box to activate</li>
                  <li>
                    Scroll <span className="text-blue-400">upward</span> with
                    your mouse wheel to watch the box open dramatically
                  </li>
                  <li>
                    Scroll <span className="text-blue-400">downward</span> to
                    close the box again
                  </li>
                  <li>
                    The smooth, satisfying animation creates an unforgettable
                    unboxing experience
                  </li>
                </ol>
                <p className="text-gray-400 text-sm mt-2 italic">
                  This same technology is integrated into all customer-facing
                  digital experiences when featuring products using our
                  InterScroll™ packaging.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductViewer;
