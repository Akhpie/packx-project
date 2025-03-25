import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  ContactShadows,
  Grid,
  Stars,
  useHelper,
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

// Optional component to visualize lights for debugging
const LightWithHelper = ({
  position,
  intensity,
  color,
  castShadow = false,
}) => {
  const lightRef = useRef();
  // Uncomment the next line to see light helpers during development
  // useHelper(lightRef, THREE.DirectionalLightHelper, 1, 'red');

  return (
    <directionalLight
      ref={lightRef}
      position={position}
      intensity={intensity}
      color={color}
      castShadow={castShadow}
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
    />
  );
};

// BoxContainer component ensures consistent positioning
const BoxContainer = ({ children, position }) => {
  return (
    <group position={position}>
      {/* This ensures all boxes are positioned consistently relative to the grid */}
      <group position={[0, 1.25, 0]}>{children}</group>
    </group>
  );
};

const BoxesScene = () => {
  // Spacing between boxes
  const spacing = 3.5;

  // Box positions (centered, with consistent spacing)
  const positions = [
    [-spacing * 3, 0, 0], // Basic Box
    [-spacing * 2, 0, 0], // Luxury Box
    [-spacing, 0, 0], // Glass Box
    [0, 0, 0], // Holographic Box
    [spacing, 0, 0], // Wooden Box
    [spacing * 2, 0, 0], // Neon Box
    [spacing * 3, 0, 0], // Geometric Box
  ];

  return (
    <div className="w-full h-screen bg-black">
      <Canvas shadows>
        {/* Better camera position for viewing all boxes */}
        <PerspectiveCamera makeDefault position={[0, 5, 17]} fov={50} />

        <Suspense fallback={null}>
          {/* Scene environment and lighting */}
          <Environment preset="night" />

          {/* Boxes with consistent positioning */}
          <BoxContainer position={positions[0]}>
            <Box color="#5599ff" scale={1.15} />
          </BoxContainer>

          <BoxContainer position={positions[1]}>
            <LuxuryBox scale={0.85} />
          </BoxContainer>

          <BoxContainer position={positions[2]}>
            <GlassBox scale={1.1} />
          </BoxContainer>

          <BoxContainer position={positions[3]}>
            <HolographicBox scale={1.05} />
          </BoxContainer>

          <BoxContainer position={positions[4]}>
            <WoodenBox scale={1.1} />
          </BoxContainer>

          <BoxContainer position={positions[5]}>
            <NeonBox scale={1.05} />
          </BoxContainer>

          <BoxContainer position={positions[6]}>
            <GeometricBox scale={1.15} />
          </BoxContainer>

          {/* Improved ground plane */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial
              color="#444444"
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>

          {/* Better contact shadows */}
          <ContactShadows
            position={[0, 0.01, 0]}
            opacity={0.6}
            scale={50}
            blur={2}
            far={10}
            resolution={1024}
          />

          {/* Improved grid */}
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

          {/* Improved lighting */}
          <ambientLight intensity={0.4} />

          {/* Main light */}
          <LightWithHelper
            position={[10, 10, 5]}
            intensity={0.8}
            color="#ffffff"
            castShadow
          />

          {/* Fill lights from other angles */}
          <LightWithHelper
            position={[-8, 8, 8]}
            intensity={0.4}
            color="#8ef7ff"
          />
          <LightWithHelper
            position={[8, 6, -8]}
            intensity={0.4}
            color="#ffd0b0"
          />

          {/* Additional accent lights */}
          <pointLight position={[-5, 5, 5]} intensity={0.3} color="#ff9900" />
          <pointLight position={[5, 3, -5]} intensity={0.3} color="#0066ff" />

          {/* Enhanced post-processing for better visuals */}
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
          autoRotate
          autoRotateSpeed={0.3}
          minDistance={5}
          maxDistance={30}
          minPolarAngle={Math.PI / 6} // Limit how low the camera can go
          maxPolarAngle={Math.PI / 2.5} // Limit how high the camera can go
          enablePan={false}
          target={[0, 2, 0]} // Look at the center, slightly above the ground
        />
      </Canvas>

      {/* Optional: Add UI overlay with box names */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 text-white text-xs font-medium">
        <div className="px-2 py-1 bg-black/70 rounded">Basic</div>
        <div className="px-2 py-1 bg-black/70 rounded">Luxury</div>
        <div className="px-2 py-1 bg-black/70 rounded">Glass</div>
        <div className="px-2 py-1 bg-black/70 rounded">Holographic</div>
        <div className="px-2 py-1 bg-black/70 rounded">Wooden</div>
        <div className="px-2 py-1 bg-black/70 rounded">Neon</div>
        <div className="px-2 py-1 bg-black/70 rounded">Geometric</div>
      </div>
    </div>
  );
};

export default BoxesScene;
