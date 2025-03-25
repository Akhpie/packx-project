import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";
import { useSpring, animated } from "@react-spring/three";
import { Text } from "@react-three/drei";

// Simple box with clean rendering and minimal dependencies
export function SimpleProductBox({ position = [0, 0, 0] }) {
  const groupRef = useRef<Group>(null!);
  const [hovered, setHovered] = useState(false);
  const [opened, setOpened] = useState(false);

  // Basic color palette - simple, solid colors
  const colors = {
    primary: "#7A5195", // Purple - main box color
    neutral: "#F2F2F2", // Light gray - inserts
    accent: "#FFD166", // Yellow - highlights
    dark: "#333333", // Dark gray - details
  };

  // Simple box animation
  const boxSpring = useSpring({
    scale: hovered ? [1.05, 1.05, 1.05] : [1, 1, 1],
    config: { tension: 350, friction: 30 },
  });

  // Lid animation - simple rotation
  const lidSpring = useSpring({
    rotation: opened ? [-Math.PI / 2, 0, 0] : [0, 0, 0],
    position: opened ? [0, 0.05, -0.75] : [0, 0.6, 0],
    config: { tension: 200, friction: 20 },
  });

  // Handle click to open/close
  const handleClick = () => {
    setOpened(!opened);
  };

  // Simple gentle rotation
  useFrame(() => {
    if (!groupRef.current || hovered || opened) return;

    // Very subtle rotation for visual interest
    groupRef.current.rotation.y += 0.002;
  });

  return (
    <animated.group
      ref={groupRef}
      position={position}
      scale={boxSpring.scale as any}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Main box - simple rectangular shape */}
      <mesh position={[0, 0.3, 0]} scale={[1.5, 0.6, 1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={colors.primary}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Box interior - simple shape */}
      <mesh position={[0, 0.3, 0]} scale={[1.4, 0.55, 0.9]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={colors.neutral}
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* Product insert - visible when opened */}
      {opened && (
        <mesh position={[0, 0.2, 0]} scale={[0.4, 0.1, 0.4]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={colors.accent}
            roughness={0.7}
            metalness={0.0}
          />
        </mesh>
      )}

      {/* Box lid - simple shape */}
      <animated.group
        position={lidSpring.position as any}
        rotation={lidSpring.rotation as any}
      >
        <mesh scale={[1.5, 0.1, 1]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={colors.primary}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>

        {/* Simple brand text */}
        <Text
          position={[0, 0.06, 0]}
          fontSize={0.15}
          color={colors.accent}
          anchorX="center"
          anchorY="middle"
        >
          PRODUCT BOX
        </Text>
      </animated.group>

      {/* Feature label - only visible when opened */}
      {opened && (
        <Text
          position={[0, 0.4, 0.5]}
          fontSize={0.1}
          color={colors.dark}
          anchorX="center"
          anchorY="middle"
        >
          Custom Packaging
        </Text>
      )}
    </animated.group>
  );
}

export default SimpleProductBox;
