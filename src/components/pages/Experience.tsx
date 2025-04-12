import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Stars, Text } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { ScrollableBox } from "../boxes";

const HomeButton: React.FC = () => {
  const handleHomeClick = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error("Error exiting fullscreen:", err);
      });
    }

    window.location.href = "/";
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      onClick={handleHomeClick}
      className="fixed top-4 right-4 z-50 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white p-2 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
      title="Return to Home"
    >
      <Home size={24} />
    </motion.button>
  );
};

const LuxuryBox: React.FC<{ position: [number, number, number] }> = ({
  position,
}) => (
  <mesh position={position} castShadow receiveShadow>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
  </mesh>
);

const GlassBox: React.FC<{ position: [number, number, number] }> = ({
  position,
}) => (
  <mesh position={position} castShadow receiveShadow>
    <boxGeometry args={[1, 1, 1]} />
    <meshPhysicalMaterial
      color="#88ccff"
      roughness={0.1}
      metalness={0.2}
      transparent
      opacity={0.6}
      clearcoat={1}
      clearcoatRoughness={0.1}
    />
  </mesh>
);

const HolographicBox: React.FC<{ position: [number, number, number] }> = ({
  position,
}) => (
  <mesh position={position} castShadow receiveShadow>
    <boxGeometry args={[1, 1, 1]} />
    <meshPhysicalMaterial
      color="#00ffaa"
      roughness={0.2}
      metalness={0.5}
      transparent
      opacity={0.8}
      emissive="#00ffaa"
      emissiveIntensity={0.5}
    />
  </mesh>
);

const WoodenBox: React.FC<{ position: [number, number, number] }> = ({
  position,
}) => (
  <mesh position={position} castShadow receiveShadow>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#8B4513" roughness={0.9} metalness={0.1} />
  </mesh>
);

const NeonBox: React.FC<{ position: [number, number, number] }> = ({
  position,
}) => (
  <mesh position={position} castShadow receiveShadow>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial
      color="#ff00ff"
      emissive="#ff00ff"
      emissiveIntensity={0.5}
      roughness={0.3}
      metalness={0.7}
    />
  </mesh>
);

const GeometricBox: React.FC<{ position: [number, number, number] }> = ({
  position,
}) => (
  <mesh position={position} castShadow receiveShadow>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#4682B4" roughness={0.4} metalness={0.6} />
  </mesh>
);
interface KeyState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

const PlayerControls: React.FC = () => {
  const { camera } = useThree();
  const moveSpeed = 0.15;
  const [keys, setKeys] = useState<KeyState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const direction = useRef(new THREE.Vector3());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Update key states
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          setKeys((prev) => ({ ...prev, forward: true }));
          break;
        case "KeyS":
        case "ArrowDown":
          setKeys((prev) => ({ ...prev, backward: true }));
          break;
        case "KeyA":
        case "ArrowLeft":
          setKeys((prev) => ({ ...prev, left: true }));
          break;
        case "KeyD":
        case "ArrowRight":
          setKeys((prev) => ({ ...prev, right: true }));
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Update key states
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          setKeys((prev) => ({ ...prev, forward: false }));
          break;
        case "KeyS":
        case "ArrowDown":
          setKeys((prev) => ({ ...prev, backward: false }));
          break;
        case "KeyA":
        case "ArrowLeft":
          setKeys((prev) => ({ ...prev, left: false }));
          break;
        case "KeyD":
        case "ArrowRight":
          setKeys((prev) => ({ ...prev, right: false }));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Handle movement in animation frame
  useFrame(() => {
    // Reset direction
    direction.current.set(0, 0, 0);

    // Calculate movement direction
    if (keys.forward) direction.current.z -= 1;
    if (keys.backward) direction.current.z += 1;
    if (keys.left) direction.current.x -= 1;
    if (keys.right) direction.current.x += 1;

    // Normalize the direction vector to keep consistent speed in all directions
    if (direction.current.length() > 0) {
      direction.current.normalize();
    }

    // Move the camera based on current direction
    camera.position.x += direction.current.x * moveSpeed;
    camera.position.z += direction.current.z * moveSpeed;

    // Keep the camera within factory boundaries
    const maxDistance = 20;
    if (camera.position.x > maxDistance) camera.position.x = maxDistance;
    if (camera.position.x < -maxDistance) camera.position.x = -maxDistance;
    if (camera.position.z > maxDistance) camera.position.z = maxDistance;
    if (camera.position.z < -maxDistance) camera.position.z = -maxDistance;

    // Keep player at a fixed height
    camera.position.y = 2;
  });

  return null;
};

// Floor component
const Floor: React.FC = () => {
  return (
    <group>
      {/* Main floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#252525" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Grid lines */}
      {Array.from({ length: 11 }).map((_, i) => {
        const pos = -25 + i * 5;
        return (
          <group key={`grid-${i}`}>
            {/* Horizontal grid lines */}
            <mesh position={[0, 0.01, pos]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[50, 0.05]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
            {/* Vertical grid lines */}
            <mesh
              position={[pos, 0.01, 0]}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            >
              <planeGeometry args={[50, 0.05]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// Factory walls
const FactoryWalls: React.FC = () => {
  return (
    <group>
      {/* Back wall */}
      <mesh position={[0, 5, -25]} receiveShadow castShadow>
        <boxGeometry args={[50, 10, 0.5]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.7} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-25, 5, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.5, 10, 50]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.7} />
      </mesh>
      {/* Right wall */}
      <mesh position={[25, 5, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.5, 10, 50]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.7} />
      </mesh>
      {/* Front wall with entrance */}
      <mesh position={[-12.5, 5, 25]} receiveShadow castShadow>
        <boxGeometry args={[25, 10, 0.5]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.7} />
      </mesh>
      <mesh position={[12.5, 5, 25]} receiveShadow castShadow>
        <boxGeometry args={[25, 10, 0.5]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.7} />
      </mesh>
      {/* Ceiling */}
      <mesh position={[0, 10, 0]} receiveShadow>
        <boxGeometry args={[50, 0.5, 50]} />
        <meshStandardMaterial color="#252525" roughness={0.8} />
      </mesh>
    </group>
  );
};

// Factory setup with conveyor belts
const FactorySetup: React.FC = () => {
  return (
    <group>
      {/* Main conveyor belt */}
      <mesh position={[0, 0.75, 0]} receiveShadow castShadow>
        <boxGeometry args={[20, 0.5, 3]} />
        <meshStandardMaterial color="#444444" roughness={0.5} metalness={0.8} />
      </mesh>

      {/* Conveyor belt sides */}
      <mesh position={[-10, 0.75, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.2, 0.5, 3]} />
        <meshStandardMaterial color="#555555" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[10, 0.75, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.2, 0.5, 3]} />
        <meshStandardMaterial color="#555555" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Side conveyor belts */}
      <mesh
        position={[-15, 0.75, -10]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
        castShadow
      >
        <boxGeometry args={[15, 0.5, 3]} />
        <meshStandardMaterial color="#444444" roughness={0.5} metalness={0.8} />
      </mesh>

      <mesh
        position={[15, 0.75, -10]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
        castShadow
      >
        <boxGeometry args={[15, 0.5, 3]} />
        <meshStandardMaterial color="#444444" roughness={0.5} metalness={0.8} />
      </mesh>

      {/* Factory machinery */}
      <group position={[-15, 0, -15]}>
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[4, 5, 4]} />
          <meshStandardMaterial
            color="#444444"
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>
        {/* Machine details */}
        <mesh position={[0, 2.5, 2.01]} castShadow receiveShadow>
          <boxGeometry args={[3, 1.5, 0.1]} />
          <meshStandardMaterial
            color="#222222"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
        <mesh position={[0, 4, 2.01]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.8, 0.1]} />
          <meshStandardMaterial
            color="#990000"
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
      </group>

      <group position={[15, 0, -15]}>
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[4, 5, 4]} />
          <meshStandardMaterial
            color="#444444"
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>
        {/* Machine details */}
        <mesh position={[0, 2.5, 2.01]} castShadow receiveShadow>
          <boxGeometry args={[3, 1.5, 0.1]} />
          <meshStandardMaterial
            color="#222222"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
        <mesh position={[0, 4, 2.01]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.8, 0.1]} />
          <meshStandardMaterial
            color="#009900"
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
      </group>

      {/* Add overhead lighting fixtures */}
      {[
        [-10, 0],
        [0, 0],
        [10, 0],
        [-10, -10],
        [10, -10],
      ].map(([x, z], i) => (
        <group key={`light-${i}`} position={[x, 9.5, z]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.5, 0.5, 0.2, 16]} />
            <meshStandardMaterial
              color="#333333"
              roughness={0.5}
              metalness={0.8}
            />
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <cylinderGeometry args={[0.4, 0.3, 0.8, 16]} />
            <meshStandardMaterial
              color="#ffff99"
              emissive="#ffff66"
              emissiveIntensity={2}
            />
          </mesh>
          <group position={[0, 0, 0]}>
            <mesh>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial
                color="#ffffaa"
                emissive="#ffffaa"
                emissiveIntensity={2}
              />
            </mesh>
            {/* Simulate light */}
            <ambientLight color="#ffffaa" intensity={0.5} />
          </group>
        </group>
      ))}
    </group>
  );
};

const SpawnPlatform: React.FC = () => {
  return (
    <group position={[0, 0, 18]}>
      {/* Spawn platform */}
      <mesh position={[0, 0.25, 0]} receiveShadow>
        <cylinderGeometry args={[3, 3, 0.5, 32]} />
        <meshStandardMaterial
          color="#1a6e5a"
          roughness={0.4}
          metalness={0.6}
          emissive="#1a6e5a"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Platform edge lighting */}
      <mesh position={[0, 0.25, 0]} receiveShadow>
        <torusGeometry args={[3, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#00ffaa"
          emissive="#00ffaa"
          emissiveIntensity={0.8}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Spawn zone indicator */}
      <mesh
        position={[0, 0.51, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <ringGeometry args={[0.8, 1, 32]} />
        <meshBasicMaterial color="#00ffaa" transparent opacity={0.7} />
      </mesh>

      {/* Spawn text */}
      <group position={[0, 1.5, 0]}>
        <Text
          position={[0, 0, 0]}
          color="#00ffaa"
          fontSize={0.5}
          maxWidth={10}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          anchorX="center"
          anchorY="middle"
        >
          EXPLORE
        </Text>
      </group>

      {/* Light above spawn */}
      <group position={[0, 4, 0]}>
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color="#00ffaa"
            emissive="#00ffaa"
            emissiveIntensity={2}
          />
        </mesh>
        <ambientLight color="#00ffaa" intensity={0.5} />
      </group>
    </group>
  );
};

// Box display with all box types properly positioned
const BoxDisplay: React.FC = () => {
  return (
    <group>
      {/* Boxes on the main conveyor belt */}
      <LuxuryBox position={[-8, 1.5, 0]} />
      <GlassBox position={[-5, 1.5, 0]} />
      <HolographicBox position={[-2, 1.5, 0]} />
      <WoodenBox position={[1, 1.5, 0]} />
      <NeonBox position={[4, 1.5, 0]} />
      <GeometricBox position={[7, 1.5, 0]} />

      {/* Boxes on side conveyors */}
      <LuxuryBox position={[-15, 1.5, -5]} />
      <GlassBox position={[-15, 1.5, -8]} />
      <NeonBox position={[-15, 1.5, -12]} />

      <WoodenBox position={[15, 1.5, -5]} />
      <HolographicBox position={[15, 1.5, -8]} />
      <GeometricBox position={[15, 1.5, -12]} />

      {/* Display pedestals in corners */}
      <group position={[-15, 0, 15]}>
        {/* Display pedestal */}
        <mesh position={[0, 0.75, 0]} receiveShadow>
          <boxGeometry args={[6, 1.5, 6]} />
          <meshStandardMaterial
            color="#333333"
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
        <LuxuryBox position={[0, 2.25, 0]} />
        <NeonBox position={[2, 2.25, 0]} />
        <GeometricBox position={[0, 2.25, 2]} />
      </group>

      <group position={[15, 0, 15]}>
        {/* Display pedestal */}
        <mesh position={[0, 0.75, 0]} receiveShadow>
          <boxGeometry args={[6, 1.5, 6]} />
          <meshStandardMaterial
            color="#333333"
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
        <GlassBox position={[0, 2.25, 0]} />
        <WoodenBox position={[-2, 2.25, 0]} />
        <HolographicBox position={[0, 2.25, 2]} />
      </group>

      {/* Elevated display */}
      <group position={[0, 0, -15]}>
        {/* Display platform */}
        <mesh position={[0, 4, 0]} receiveShadow castShadow>
          <boxGeometry args={[8, 0.5, 4]} />
          <meshStandardMaterial
            color="#444444"
            roughness={0.5}
            metalness={0.7}
          />
        </mesh>

        {/* Platform supports */}
        {[
          [-3, -1.5],
          [3, -1.5],
          [-3, 1.5],
          [3, 1.5],
        ].map(([x, z], i) => (
          <mesh
            key={`support-${i}`}
            position={[x, 2, z]}
            receiveShadow
            castShadow
          >
            <cylinderGeometry args={[0.2, 0.2, 4, 8]} />
            <meshStandardMaterial
              color="#666666"
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
        ))}

        {/* Premium product display */}
        <LuxuryBox position={[-2, 5, 0]} />
        <NeonBox position={[0, 5, 0]} />
        <GlassBox position={[2, 5, 0]} />

        {/* Spotlights for premium display */}
        {[-2, 0, 2].map((x, i) => (
          <group key={`spotlight-${i}`} position={[x, 7, 0]}>
            <mesh rotation={[Math.PI / 4, 0, 0]}>
              <coneGeometry args={[0.3, 0.6, 16]} />
              <meshStandardMaterial
                color="#333333"
                roughness={0.3}
                metalness={0.8}
              />
            </mesh>
            <group>
              <mesh>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial
                  color={i === 0 ? "#ff6666" : i === 1 ? "#66ffff" : "#ffff66"}
                  emissive={
                    i === 0 ? "#ff6666" : i === 1 ? "#66ffff" : "#ffff66"
                  }
                  emissiveIntensity={2}
                />
              </mesh>
              {/* Simulate light */}
              <ambientLight
                color={i === 0 ? "#ff6666" : i === 1 ? "#66ffff" : "#ffff66"}
                intensity={0.8}
              />
            </group>
          </group>
        ))}
      </group>

      {/* Special center showcase with ScrollableBox */}
      <group position={[0, 0.5, 10]}>
        {/* Display podium */}
        <mesh position={[0, 0.5, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[2, 2.5, 1, 24]} />
          <meshStandardMaterial
            color="#222222"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Scrollable box on display */}
        <ScrollableBox position={[0, 2, 0]} />

        {/* Circular light ring */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.2, 2.5, 24]} />
          <meshBasicMaterial color="#00ffff" />
        </mesh>
      </group>
    </group>
  );
};

// Controls overlay component
interface ControlsOverlayProps {
  isVisible: boolean;
  onEnter: () => void;
}

const ControlsOverlay: React.FC<ControlsOverlayProps> = ({
  isVisible,
  onEnter,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black/70 backdrop-blur-md p-6 rounded-lg max-w-md text-white border border-white/20"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-emerald-400">
          Welcome to the BoxX Factory
        </h2>
        <p className="mb-4 text-center">
          You're about to enter a first-person view of our factory where we
          craft and manufacture our premium boxes. Explore the production floor
          and see how our boxes are made!
        </p>
        <p className="mb-4 text-center">
          For the best experience, please view on Desktop.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-black/50 p-3 rounded-lg">
            <h3 className="text-sm font-semibold mb-2 text-emerald-400">
              Movement
            </h3>
            <ul className="text-sm">
              <li className="mb-1">
                <span className="inline-block bg-white/20 px-2 py-1 rounded mr-2 text-xs">
                  W
                </span>
                Move forward
              </li>
              <li className="mb-1">
                <span className="inline-block bg-white/20 px-2 py-1 rounded mr-2 text-xs">
                  S
                </span>
                Move backward
              </li>
              <li className="mb-1">
                <span className="inline-block bg-white/20 px-2 py-1 rounded mr-2 text-xs">
                  A
                </span>
                Move left
              </li>
              <li className="mb-1">
                <span className="inline-block bg-white/20 px-2 py-1 rounded mr-2 text-xs">
                  D
                </span>
                Move right
              </li>
            </ul>
          </div>
          <div className="bg-black/50 p-3 rounded-lg">
            <h3 className="text-sm font-semibold mb-2 text-emerald-400">
              Looking Around
            </h3>
            <p className="text-sm">
              Move your mouse to look around the factory.
            </p>
            <p className="text-sm mt-2">
              Click the screen to enable mouse controls.
            </p>
          </div>
        </div>
        <button
          className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 transition-colors rounded-lg font-semibold pointer-events-auto"
          onClick={onEnter}
        >
          Enter Experience
        </button>
      </motion.div>
    </div>
  );
};

const Experience: React.FC = () => {
  const [showControls, setShowControls] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Hide navbar and other site elements
  useEffect(() => {
    // Hide the navbar
    const navbar = document.querySelector("nav");
    const footer = document.querySelector("footer");

    if (navbar) navbar.style.display = "none";
    if (footer) footer.style.display = "none";

    // Set body styles to ensure full screen
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    // Restore on unmount
    return () => {
      if (navbar) navbar.style.display = "";
      if (footer) footer.style.display = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflow = "";
    };
  }, []);

  // Handle enter experience button
  const handleEnterExperience = () => {
    setShowControls(false);
    setIsLocked(true);

    // Request fullscreen
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    }
  };

  return (
    <div
      className="w-full h-screen bg-black relative"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <Canvas
        ref={canvasRef}
        shadows
        camera={{ position: [0, 2, 20], fov: 75 }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <fog attach="fog" args={["#000", 20, 50]} />
        <ambientLight intensity={0.4} />

        {/* Main lighting */}
        <hemisphereLight
          intensity={0.5}
          color="#ffffff"
          groundColor="#222222"
        />
        <directionalLight
          position={[10, 15, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-25}
          shadow-camera-right={25}
          shadow-camera-top={25}
          shadow-camera-bottom={-25}
        />

        {/* Colored accent lights */}
        <group position={[-15, 8, -15]}>
          <mesh>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color="#6666ff"
              emissive="#6666ff"
              emissiveIntensity={2}
            />
          </mesh>
          <ambientLight color="#6666ff" intensity={0.4} />
        </group>

        <group position={[15, 8, -15]}>
          <mesh>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color="#66ff66"
              emissive="#66ff66"
              emissiveIntensity={2}
            />
          </mesh>
          <ambientLight color="#66ff66" intensity={0.4} />
        </group>

        <FactoryWalls />
        <Floor />
        <FactorySetup />
        <BoxDisplay />
        <SpawnPlatform />
        <PlayerControls />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <Environment preset="warehouse" />
      </Canvas>

      <HomeButton />

      <ControlsOverlay
        isVisible={showControls}
        onEnter={handleEnterExperience}
      />

      {isLocked && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm z-50">
          Move: W, A, S, D &nbsp;|&nbsp; Look: Mouse
        </div>
      )}

      {/* Permanent controls help in bottom right corner */}
      {isLocked && (
        <div className="fixed bottom-4 right-4 bg-black/40 backdrop-blur-sm p-2 rounded-lg text-white text-xs z-50 opacity-60 hover:opacity-100 transition-opacity">
          <div className="mb-1 font-semibold">Controls:</div>
          <div className="flex flex-col space-y-1">
            <div>
              <span className="inline-block bg-white/20 px-1 w-6 text-center rounded mr-1">
                W
              </span>{" "}
              Forward
            </div>
            <div>
              <span className="inline-block bg-white/20 px-1 w-6 text-center rounded mr-1">
                S
              </span>{" "}
              Backward
            </div>
            <div>
              <span className="inline-block bg-white/20 px-1 w-6 text-center rounded mr-1">
                A
              </span>{" "}
              Left
            </div>
            <div>
              <span className="inline-block bg-white/20 px-1 w-6 text-center rounded mr-1">
                D
              </span>{" "}
              Right
            </div>
            <div>
              <span className="inline-block bg-white/20 px-1 w-6 text-center rounded mr-1">
                ESC
              </span>{" "}
              Exit
            </div>
          </div>
        </div>
      )}

      {!isLocked && !showControls && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/70 z-50">
          <div className="bg-black/80 p-4 rounded-lg text-white max-w-md text-center">
            <h3 className="text-xl mb-2">Controls Locked</h3>
            <p className="mb-4">Click anywhere to resume exploration</p>
            <button
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 transition-colors rounded-lg"
              onClick={() => setIsLocked(true)}
            >
              Resume
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;
