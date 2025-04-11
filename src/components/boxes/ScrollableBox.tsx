import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh, Group, MathUtils, Vector3 } from "three";
import { useSpring, animated, SpringValue } from "@react-spring/three";
import {
  RoundedBox,
  Text,
  useScroll,
  Sparkles,
  Float,
  MeshDistortMaterial,
} from "@react-three/drei";

// Scroll interaction values
const SCROLL_SENSITIVITY = 0.01;
const MAX_SCROLL_VALUE = 1.0;

interface ScrollableBoxProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}

// Animation for subtle floating effect
const floatAnimation = (mesh: Group | Mesh, time: number) => {
  mesh.position.y += Math.sin(time * 0.5) * 0.001;
  mesh.rotation.y += 0.001;
};

export function ScrollableBox({
  position = [0, 0, 0],
  scale = 1,
  color = "#4d61ff",
}: ScrollableBoxProps) {
  const groupRef = useRef<Group>(null!);
  const [openAmount, setOpenAmount] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();

  // Handle scroll wheel events
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (!hovered) return;

      // Normalize scroll delta
      const scrollDelta = event.deltaY * SCROLL_SENSITIVITY;

      // Update open amount, clamped between 0 and MAX_SCROLL_VALUE
      setOpenAmount((prev) => {
        const newValue = prev + scrollDelta;
        return Math.max(0, Math.min(MAX_SCROLL_VALUE, newValue));
      });

      // Store last scroll direction for animation
      setLastScrollY(event.deltaY);

      // Prevent default scrolling behavior when interacting
      event.preventDefault();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [hovered]);

  // Box animation spring
  const springs = useSpring({
    // Initial scale animation
    scale: scale,
    // React to hover state
    glow: hovered ? 1 : 0,
    config: { mass: 2, tension: 200, friction: 25 },
  });

  // Box parts animations based on scroll
  const partsSpring = useSpring({
    // Map openAmount to rotation and position values
    lidRotation: (-openAmount * Math.PI) / 2,
    lidPosition: openAmount * 0.8,
    leftFlapRotation: (openAmount * Math.PI) / 3,
    rightFlapRotation: (-openAmount * Math.PI) / 3,
    frontFlapRotation: (openAmount * Math.PI) / 2.5,
    backFlapRotation: (-openAmount * Math.PI) / 2.5,
    innerObjectRise: openAmount * 1.2,
    innerObjectRotation: openAmount * Math.PI * 4,
    innerObjectScale: 0.2 + openAmount * 0.8,
    // Spring physics
    config: { mass: 1, tension: 160, friction: 26 },
  });

  // Update light intensity based on open state
  const lightIntensity = openAmount * 2.5;

  // Animation loop
  useFrame((state) => {
    if (!groupRef.current) return;

    // Apply subtle floating animation
    floatAnimation(groupRef.current, state.clock.getElapsedTime());

    // Face camera for better interaction
    const lookAtVector = new Vector3(...position);
    lookAtVector.y += 2;
    camera.lookAt(lookAtVector);
  });

  return (
    <animated.group
      ref={groupRef}
      position={position}
      scale={springs.scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Base/Bottom of the box */}
      <RoundedBox args={[1.5, 0.3, 1.5]} radius={0.1} smoothness={8}>
        <meshPhysicalMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.2}
        />
      </RoundedBox>

      {/* Inner box content - glowing orb that rises when opened */}
      <animated.group
        position-y={partsSpring.innerObjectRise}
        rotation-y={partsSpring.innerObjectRotation}
        scale={partsSpring.innerObjectScale}
      >
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.4}>
          <mesh scale={[0.5, 0.5, 0.5]}>
            <sphereGeometry args={[1, 32, 32]} />
            <MeshDistortMaterial
              color="#ffffff"
              emissive={color}
              emissiveIntensity={1.5}
              roughness={0.1}
              metalness={0.5}
              distort={0.3}
              speed={2}
            />
          </mesh>
          <Sparkles
            count={20}
            scale={[1.5, 1.5, 1.5]}
            size={6}
            speed={0.4}
            opacity={0.7}
            color={color}
          />
        </Float>

        {/* Point light that increases intensity as box opens */}
        <pointLight color={color} intensity={lightIntensity} distance={5} />
      </animated.group>

      {/* Box sides - create the walls */}
      <group position={[0, 0.7, 0]}>
        {/* Left side flap */}
        <animated.mesh
          position={[-0.75, 0, 0]}
          rotation-z={partsSpring.leftFlapRotation}
          scale={[0.05, 0.8, 1.5]}
        >
          <boxGeometry />
          <meshPhysicalMaterial
            color={color}
            roughness={0.3}
            metalness={0.7}
            clearcoat={0.5}
          />
        </animated.mesh>

        {/* Right side flap */}
        <animated.mesh
          position={[0.75, 0, 0]}
          rotation-z={partsSpring.rightFlapRotation}
          scale={[0.05, 0.8, 1.5]}
        >
          <boxGeometry />
          <meshPhysicalMaterial
            color={color}
            roughness={0.3}
            metalness={0.7}
            clearcoat={0.5}
          />
        </animated.mesh>

        {/* Front flap */}
        <animated.mesh
          position={[0, 0, 0.75]}
          rotation-x={partsSpring.frontFlapRotation}
          scale={[1.5, 0.8, 0.05]}
        >
          <boxGeometry />
          <meshPhysicalMaterial
            color={color}
            roughness={0.3}
            metalness={0.7}
            clearcoat={0.5}
          />
        </animated.mesh>

        {/* Back flap */}
        <animated.mesh
          position={[0, 0, -0.75]}
          rotation-x={partsSpring.backFlapRotation}
          scale={[1.5, 0.8, 0.05]}
        >
          <boxGeometry />
          <meshPhysicalMaterial
            color={color}
            roughness={0.3}
            metalness={0.7}
            clearcoat={0.5}
          />
        </animated.mesh>

        {/* Top lid */}
        <animated.group
          position-y={partsSpring.lidPosition}
          rotation-x={partsSpring.lidRotation}
        >
          <RoundedBox
            args={[1.5, 0.1, 1.5]}
            radius={0.1}
            smoothness={4}
            position={[0, 0.4, 0]}
          >
            <meshPhysicalMaterial
              color={color}
              roughness={0.2}
              metalness={0.8}
              clearcoat={0.8}
              clearcoatRoughness={0.2}
            />
          </RoundedBox>

          {/* Top lid decoration */}
          <mesh position={[0, 0.45, 0]} scale={[0.8, 0.05, 0.8]}>
            <boxGeometry />
            <meshStandardMaterial
              color="#ffffff"
              emissive={color}
              emissiveIntensity={0.7}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
        </animated.group>
      </group>

      {/* Instruction Text */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.12}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#00000080"
        visible={hovered}
      >
        {openAmount < 0.1
          ? "↑ Scroll Up to Reveal ↑"
          : openAmount > 0.9
          ? "↓ Scroll Down to Close ↓"
          : "Keep Scrolling for Magic!"}
      </Text>

      {/* Additional hint text */}
      {hovered && openAmount < 0.1 && (
        <Text
          position={[0, -1.0, 0]}
          fontSize={0.08}
          color="#ffffff80"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.005}
          outlineColor="#00000040"
        >
          Our most stunning packaging design
        </Text>
      )}
    </animated.group>
  );
}

export default ScrollableBox;
