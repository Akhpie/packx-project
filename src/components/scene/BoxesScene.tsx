import React, { Suspense, useRef, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  ContactShadows,
  Grid,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
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
const LightWithHelper = memo(
  ({ position, intensity, color, castShadow = false }) => {
    const lightRef = useRef();

    return (
      <directionalLight
        ref={lightRef}
        position={position}
        intensity={intensity}
        color={color}
        castShadow={castShadow}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    );
  }
);

// BoxContainer component ensures consistent positioning
const BoxContainer = memo(({ children, position }) => {
  return (
    <group position={position}>
      {/* This ensures all boxes are positioned consistently relative to the grid */}
      <group position={[0, 1.25, 0]}>{children}</group>
    </group>
  );
});

// Individual box components memoized to prevent unnecessary re-renders
const MemoBox = memo(Box);
const MemoLuxuryBox = memo(LuxuryBox);
const MemoGlassBox = memo(GlassBox);
const MemoHolographicBox = memo(HolographicBox);
const MemoWoodenBox = memo(WoodenBox);
const MemoNeonBox = memo(NeonBox);
const MemoGeometricBox = memo(GeometricBox);

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
      <Canvas shadows dpr={[1, 2]} performance={{ min: 0.5 }}>
        {/* Better camera position for viewing all boxes */}
        <PerspectiveCamera makeDefault position={[0, 5, 17]} fov={50} />

        <Suspense fallback={null}>
          {/* Scene environment and lighting */}
          <Environment preset="night" />

          {/* Boxes with consistent positioning */}
          <BoxContainer position={positions[0]}>
            <MemoBox color="#5599ff" scale={1.15} />
          </BoxContainer>

          <BoxContainer position={positions[1]}>
            <MemoLuxuryBox scale={0.85} />
          </BoxContainer>

          <BoxContainer position={positions[2]}>
            <MemoGlassBox scale={1.1} />
          </BoxContainer>

          <BoxContainer position={positions[3]}>
            <MemoHolographicBox scale={1.05} />
          </BoxContainer>

          <BoxContainer position={positions[4]}>
            <MemoWoodenBox scale={1.1} />
          </BoxContainer>

          <BoxContainer position={positions[5]}>
            <MemoNeonBox scale={1.05} />
          </BoxContainer>

          <BoxContainer position={positions[6]}>
            <MemoGeometricBox scale={1.15} />
          </BoxContainer>

          {/* Simplified ground plane */}
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

          {/* Optimized contact shadows */}
          <ContactShadows
            position={[0, 0.01, 0]}
            opacity={0.6}
            scale={50}
            blur={2}
            far={10}
            resolution={512} // Reduced from 1024 for better performance
          />

          {/* Simplified grid */}
          <Grid
            position={[0, 0.02, 0]}
            args={[100, 100]}
            cellSize={1}
            cellThickness={0.6}
            cellColor="#3a64a8"
            sectionColor="#5389df"
            sectionSize={5}
            fadeDistance={25} // Reduced from 50
            fadeStrength={1.5}
          />

          {/* Removed Stars component for better performance */}

          {/* Reduced number of lights */}
          <ambientLight intensity={0.4} />

          {/* Main light */}
          <LightWithHelper
            position={[10, 10, 5]}
            intensity={0.8}
            color="#ffffff"
            castShadow
          />

          {/* Single fill light instead of multiple */}
          <LightWithHelper
            position={[-8, 8, 8]}
            intensity={0.4}
            color="#8ef7ff"
          />

          {/* Simplified post-processing for better performance */}
          <EffectComposer multisampling={0} disableNormalPass={true}>
            <Bloom
              luminanceThreshold={0.2}
              intensity={0.5} // Reduced from 0.8
              levels={3} // Reduced from 9
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>

        {/* Camera controls - simplified */}
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
