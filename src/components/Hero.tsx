import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Stars,
  useTexture,
  Text3D,
  Float,
  Environment,
} from "@react-three/drei";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Globe } from "./magicui/globe";
import { AuroraText } from "./magicui/aurora-text";
import { ShineBorder } from "./magicui/shine-border";
import { Card, CardHeader } from "./ui/card";
import { Meteors } from "./magicui/meteors";

// Animated grid for the floor
const AnimatedGrid = () => {
  const gridRef = useRef();

  useFrame(({ clock }) => {
    if (gridRef.current) {
      const t = clock.getElapsedTime();
      gridRef.current.position.z = (t * 0.5) % 5;
    }
  });

  return (
    <group
      position={[0, -12, -40]}
      rotation={[-Math.PI / 2.5, 0, 0]}
      ref={gridRef}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={`grid-x-${i}`}>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attachObject={["attributes", "position"]}
              count={2}
              array={new Float32Array([-50, i * 5 - 50, 0, 50, i * 5 - 50, 0])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#00d87d"
            transparent
            opacity={0.15 + (i / 20) * 0.2}
          />
        </line>
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={`grid-y-${i}`}>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attachObject={["attributes", "position"]}
              count={2}
              array={new Float32Array([i * 5 - 50, -50, 0, i * 5 - 50, 50, 0])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#00d87d"
            transparent
            opacity={0.15 + (i / 20) * 0.2}
          />
        </line>
      ))}
    </group>
  );
};

// Animated particles effect
const Particles = ({ count = 500 }) => {
  const mesh = useRef();
  const [positions] = useState(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 10;
    }
    return positions;
  });

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    mesh.current.rotation.y = time * 0.05;
    mesh.current.rotation.x = time * 0.03;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#00ff88"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
};

// 3D logo text
const LogoText = () => {
  const textRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    textRef.current.position.y = Math.sin(t * 0.5) * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
      <group ref={textRef} position={[0, 0, -5]}>
        <Text3D
          font="/fonts/inter_bold.json"
          size={1.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          PACKX
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </Text3D>
      </group>
    </Float>
  );
};

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="relative h-screen max-full bg-black overflow-hidden"
      ref={containerRef}
    >
      <Meteors
        number={25}
        color="#00ff88"
        tailLength={120}
        sizeMin={0.8}
        sizeMax={2}
        minDuration={4}
        maxDuration={12}
      />
      {/* 3D background canvas */}
      <Globe className="top-60 opacity-85 w-full max-w-[1200px]" />

      {/* Main hero content with parallax effect */}
      <div
        className="relative z-10 flex h-full items-center justify-center px-4"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="text-center">
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="inline-block"
            >
              <div className="text-white font-bold px-6 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-cyan-800 mb-6 inline-block">
                INNOVATE · PROTECT · SUSTAIN
              </div>
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
          >
            The Future of <br />
            <div className="text-5xl font-extrabold tracking-tighter md:text-5xl lg:text-7xl z-auto">
              <div className="bg-gradient-to-b from-blue-400 via-blue-400 to-purple-600 text-transparent bg-clip-text inline-block pb-4 pt-4">
                Packaging
              </div>
            </div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white max-w-2xl mx-auto mb-10 font-medium text-shadow-md"
          >
            Innovative sustainable solutions engineered for tomorrow's world,
            delivering premium protection with minimal environmental impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/solutions"
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors text-center font-medium shadow-lg"
            >
              Explore Solutions
            </Link>
            <Link
              to="/sustainability"
              className="px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-2 border-white/40 rounded-lg transition-colors text-center font-medium shadow-lg"
            >
              Our Sustainability Commitment
            </Link>
          </motion.div>

          {/* Call to action buttons */}
        </div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5L12 19M12 19L18 13M12 19L6 13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
