import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  ContactShadows,
  Grid,
  Stars,
  Html,
  Text,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import {
  Box,
  LuxuryBox,
  GlassBox,
  HolographicBox,
  WoodenBox,
  NeonBox,
  GeometricBox,
} from "../boxes/index"; // Adjust this import path to match your file structure
import { motion } from "framer-motion";

// Package data with industry applications
const packagingData = [
  {
    id: "ecoflex",
    name: "EcoFlex™ Retail Series",
    component: Box,
    color: "#8eac7a", // Eco-friendly green
    description: "100% recyclable premium retail packaging",
    sustainability: 95,
    industries: ["Retail", "Cosmetics", "Electronics"],
  },
  {
    id: "heritage",
    name: "Heritage™ Luxury Packaging",
    component: LuxuryBox,
    description: "FSC-certified premium unboxing experience",
    sustainability: 75,
    industries: ["Luxury", "Jewelry", "Premium Spirits"],
  },
  {
    id: "clearview",
    name: "ClearView™ Display Solution",
    component: GlassBox,
    description: "Plant-based transparent polymer packaging",
    sustainability: 85,
    industries: ["Food", "Cosmetics", "Consumer Goods"],
  },
  {
    id: "spectrapack",
    name: "SpectraPack™ Interactive Series",
    component: HolographicBox,
    description: "Smart packaging with embedded technology",
    sustainability: 70,
    industries: ["Entertainment", "Limited Editions", "Tech"],
  },
  {
    id: "terracore",
    name: "TerraCore™ Sustainable Series",
    component: WoodenBox,
    description: "Reclaimed materials with zero chemical treatments",
    sustainability: 98,
    industries: ["Organic Products", "Farm-to-Table", "Artisanal"],
  },
  {
    id: "vitaledge",
    name: "VitalEdge™ Tech Packaging",
    component: NeonBox,
    description: "Impact-resistant with reactive design elements",
    sustainability: 82,
    industries: ["Electronics", "Gaming", "Smart Devices"],
  },
  {
    id: "flexigrid",
    name: "FlexiGrid™ Adaptive System",
    component: GeometricBox,
    description: "Modular design that minimizes material waste",
    sustainability: 93,
    industries: ["E-commerce", "Logistics", "Varied Products"],
  },
];

// Interactive annotation component for displaying details
const PackageAnnotation = ({ position, label, details, visible }) => {
  if (!visible) return null;

  return (
    <Html position={position} distanceFactor={10}>
      <div
        className="bg-black/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-emerald-500/30 text-white"
        style={{ width: "180px" }}
      >
        <h4 className="text-sm font-bold mb-1 text-emerald-400">{label}</h4>
        <p className="text-xs text-gray-300">{details}</p>
      </div>
    </Html>
  );
};

// BoxContainer component for consistent positioning and interactions
const BoxContainer = ({
  children,
  position,
  data,
  hoveredBox,
  setHoveredBox,
  showLabels,
}) => {
  const groupRef = useRef();

  // Add subtle hover effect and animation
  useFrame(() => {
    if (!groupRef.current) return;

    // When box is hovered, make it float slightly higher
    if (hoveredBox === data.id) {
      groupRef.current.position.y =
        position[1] + 0.2 + Math.sin(Date.now() * 0.003) * 0.1;
    } else {
      groupRef.current.position.y = position[1];
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setHoveredBox(data.id)}
      onPointerOut={() => setHoveredBox(null)}
    >
      {/* Box positioned consistently */}
      <group position={[0, 1.25, 0]}>{children}</group>

      {/* Box label */}
      {showLabels && (
        <Text
          position={[0, 0.2, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#00000080"
        >
          {data.name.split("™")[0]}
        </Text>
      )}

      {/* Sustainability indicator ring */}
      {showLabels && (
        <>
          <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.4, 0.5, 32]} />
            <meshBasicMaterial color="#111111" transparent opacity={0.7} />
          </mesh>

          <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry
              args={[
                0.4,
                0.5,
                32,
                1,
                0,
                (data.sustainability / 100) * Math.PI * 2,
              ]}
            />
            <meshBasicMaterial color="#4ade80" />
          </mesh>
        </>
      )}

      {/* Annotations that appear on hover */}
      <PackageAnnotation
        position={[0, 2.8, 0]}
        label="Key Features"
        details={data.description}
        visible={hoveredBox === data.id}
      />

      <PackageAnnotation
        position={[1.5, 1.5, 0]}
        label="Sustainability"
        details={`${data.sustainability}% score based on recyclability, sourcing, and production impact`}
        visible={hoveredBox === data.id}
      />

      <PackageAnnotation
        position={[-1.5, 1.5, 0]}
        label="Industry Applications"
        details={data.industries.join(", ")}
        visible={hoveredBox === data.id}
      />
    </group>
  );
};

const PackagingInnovationLab = () => {
  const [hoveredBox, setHoveredBox] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [showLabels, setShowLabels] = useState(true);

  // Spacing between boxes
  const spacing = 3.8;

  // Industry filter options
  const industries = [
    "All",
    "Retail",
    "Luxury",
    "Food",
    "Cosmetics",
    "Electronics",
    "E-commerce",
    "Sustainable",
    "Tech",
  ];

  // Filter packages by selected industry
  const getVisiblePackages = () => {
    if (selectedIndustry === "All") return packagingData;
    return packagingData.filter((pkg) =>
      pkg.industries.some((ind) =>
        ind.toLowerCase().includes(selectedIndustry.toLowerCase())
      )
    );
  };

  const visiblePackages = getVisiblePackages();

  // Calculate optimal camera position based on number of visible boxes
  const cameraPosition = [0, 5, Math.max(15, visiblePackages.length * 2.2)];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-2">
            Packaging Innovation Lab
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Explore our complete range of innovative packaging solutions. Hover
            over each design to learn more about its features, sustainability
            metrics, and industry applications.
          </p>
        </motion.div>

        {/* Industry filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setSelectedIndustry(industry)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedIndustry === industry
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {industry}
            </button>
          ))}
        </div>

        {/* 3D Canvas */}
        <div className="h-[700px] bg-black/50 rounded-xl overflow-hidden backdrop-blur-sm border border-emerald-500/20 relative">
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
            <Suspense fallback={null}>
              <Environment preset="night" />

              {/* Render visible packages with proper positioning */}
              {visiblePackages.map((pkg, index) => {
                // Calculate position based on index and total visible packages
                const totalWidth = (visiblePackages.length - 1) * spacing;
                const xPos = -totalWidth / 2 + index * spacing;

                return (
                  <BoxContainer
                    key={pkg.id}
                    position={[xPos, 0, 0]}
                    data={pkg}
                    hoveredBox={hoveredBox}
                    setHoveredBox={setHoveredBox}
                    showLabels={showLabels}
                  >
                    {pkg.id === "ecoflex" ? (
                      <pkg.component color={pkg.color} scale={1.15} />
                    ) : (
                      <pkg.component
                        scale={pkg.id === "heritage" ? 0.85 : 1.1}
                      />
                    )}
                  </BoxContainer>
                );
              })}

              {/* Ground plane */}
              <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
                receiveShadow
              >
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial
                  color="#111111"
                  metalness={0.7}
                  roughness={0.2}
                />
              </mesh>

              {/* Contact shadows */}
              <ContactShadows
                position={[0, 0.01, 0]}
                opacity={0.5}
                scale={50}
                blur={2}
                far={10}
                resolution={1024}
              />

              {/* Grid */}
              <Grid
                position={[0, 0.02, 0]}
                args={[100, 100]}
                cellSize={1}
                cellThickness={0.6}
                cellColor="#3a64a8"
                sectionColor="#5389df"
                sectionSize={5}
                fadeDistance={50}
                fadeStrength={1.5}
              />

              {/* Stars in the background */}
              <Stars radius={100} depth={50} count={5000} factor={4} />

              {/* Lighting */}
              <ambientLight intensity={0.4} />
              <directionalLight
                position={[10, 10, 5]}
                intensity={0.8}
                castShadow
              />
              <pointLight
                position={[-5, 5, 5]}
                intensity={0.3}
                color="#ff9900"
              />
              <pointLight
                position={[5, 3, -5]}
                intensity={0.3}
                color="#0066ff"
              />

              {/* Post-processing */}
              <EffectComposer>
                <Bloom
                  luminanceThreshold={0.2}
                  intensity={0.8}
                  levels={9}
                  mipmapBlur
                />
                <ChromaticAberration offset={[0.0005, 0.0005]} />
              </EffectComposer>
            </Suspense>

            {/* Camera controls */}
            <OrbitControls
              autoRotate={!hoveredBox}
              autoRotateSpeed={0.3}
              minDistance={5}
              maxDistance={50}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2.5}
              enablePan={false}
              target={[0, 2, 0]}
            />
          </Canvas>

          {/* UI Controls */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button
              onClick={() => setShowLabels(!showLabels)}
              className="p-2 bg-emerald-600/80 text-white rounded hover:bg-emerald-500 text-sm backdrop-blur-sm"
            >
              {showLabels ? "Hide Labels" : "Show Labels"}
            </button>
          </div>

          {/* Hover instruction */}
          <div className="absolute bottom-4 left-4 text-sm text-gray-400 backdrop-blur-sm bg-black/30 p-2 rounded">
            Hover over packages to see details. Click and drag to rotate.
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-white mb-4">
            Ready to explore custom packaging solutions?
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Our packaging experts can help you design the perfect solution for
            your specific product needs, brand identity, and sustainability
            goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#contact"
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors text-center"
            >
              Request Custom Solution
            </a>
            <a
              href="#case-studies"
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-center"
            >
              View Case Studies
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagingInnovationLab;
