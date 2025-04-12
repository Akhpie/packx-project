import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group, MathUtils } from "three";
import { useSpring, animated } from "@react-spring/three";
import { RoundedBox } from "@react-three/drei";

// Luxury box-specific animation
const luxuryFloatAnimation = (mesh: Group | Mesh, time: number) => {
  // Elegant slow rotation with minimal vertical movement
  mesh.position.y = Math.sin(time * 0.5) * 0.001;
  mesh.rotation.y += 0.002;
  mesh.rotation.z = Math.sin(time * 0.3) * 0.02;
};

interface BoxProps {
  position?: [number, number, number];
  woodColor?: string;
  interiorColor?: string;
  trimColor?: string;
  gemColor?: string;
}

// Luxury Box with wood, gold and jewel decoration
export function LuxuryBox({
  position = [0, 0, 0],
  woodColor = "#8B4513", // Default: Brown wood
  interiorColor = "#800020", // Default: Burgundy velvet
  trimColor = "#FFD700", // Default: Gold
  gemColor = "#ff0000", // Default: Ruby red
}: BoxProps) {
  const groupRef = useRef<Group>(null!);
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Box animation
  const springs = useSpring({
    from: { scale: [0, 0, 0] },
    to: { scale: [1, 1, 1] },
    config: { mass: 5, tension: 400, friction: 50 },
  });

  // Lid animation
  const lidSpring = useSpring({
    rotation: isOpen ? [MathUtils.degToRad(-90), 0, 0] : [0, 0, 0],
    position: isOpen ? [0, 1.6, -0.9] : [0, 0.9, 0],
    config: { mass: 2, tension: 200, friction: 40 },
  });

  // Update isOpen state based on hover
  useEffect(() => {
    setIsOpen(hovered);
  }, [hovered]);

  useFrame((state) => {
    if (!groupRef.current) return;
    luxuryFloatAnimation(groupRef.current, state.clock.getElapsedTime());
  });

  return (
    <animated.group
      ref={groupRef}
      scale={springs.scale}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      // Add cursor pointer style on hover
      onClick={() => console.log("Box clicked!")}
    >
      <group>
        {/* Main container */}
        <RoundedBox args={[1.5, 1.6, 1.5]} radius={0.1} smoothness={8}>
          <meshPhysicalMaterial
            color={woodColor}
            roughness={0.4}
            metalness={0.2}
            envMapIntensity={1}
          />
        </RoundedBox>

        {/* Interior velvet */}
        <mesh scale={[1.4, 1.4, 1.4]} position={[0, 0.1, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={interiorColor}
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>

        {/* Gold trim top */}
        <mesh scale={[1.52, 0.08, 1.52]} position={[0, 0.8, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={trimColor}
            roughness={0.1}
            metalness={1}
            envMapIntensity={3}
          />
        </mesh>

        {/* Gold trim middle */}
        <mesh scale={[1.52, 0.05, 1.52]} position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#FFD700"
            roughness={0.1}
            metalness={1}
            envMapIntensity={3}
          />
        </mesh>

        {/* Animated Lid with gold inlay */}
        <animated.group
          position={lidSpring.position}
          rotation={lidSpring.rotation}
        >
          <RoundedBox args={[1.55, 0.2, 1.55]} radius={0.08} smoothness={4}>
            <meshPhysicalMaterial
              color={woodColor}
              roughness={0.4}
              metalness={0.2}
              envMapIntensity={1}
            />
          </RoundedBox>

          {/* Gold inlay on lid */}
          <mesh scale={[1.4, 0.05, 1.4]} position={[0, 0.1, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={trimColor}
              roughness={0.1}
              metalness={1}
              envMapIntensity={3}
            />
          </mesh>

          {/* Gem in center */}
          <mesh position={[0, 0.18, 0]} scale={[0.3, 0.15, 0.3]}>
            <octahedronGeometry args={[1, 0]} />
            <meshPhysicalMaterial
              color={gemColor}
              metalness={0.3}
              roughness={0.1}
              transmission={0.5}
              thickness={2}
              envMapIntensity={5}
            />
          </mesh>
        </animated.group>
      </group>
    </animated.group>
  );
}

export default LuxuryBox;
