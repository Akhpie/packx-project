import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group, MathUtils } from "three";
import { useSpring, animated } from "@react-spring/three";

// Wooden box natural animation
const woodenFloatAnimation = (mesh: Group | Mesh, time: number) => {
  // Natural, gentle swaying
  mesh.position.y = Math.sin(time * 0.4) * 0.06;
  mesh.rotation.y = Math.sin(time * 0.2) * 0.05;
  mesh.rotation.x = Math.sin(time * 0.3) * 0.02;
};

interface BoxProps {
  position?: [number, number, number];
}

// Ancient Wooden Box with intricate carvings
export default function WoodenBox({ position = [0, 0, 0] }: BoxProps) {
  const groupRef = useRef<Group>(null!);
  const [isOpen, setIsOpen] = useState(false);

  // Box scale animation
  const boxSpring = useSpring({
    from: { scale: [0, 0, 0] as [number, number, number] },
    to: { scale: [1, 1, 1] as [number, number, number] },
    config: { mass: 4, tension: 300, friction: 70 },
  });

  // Lid animation - slow, creaking
  const lidSpring = useSpring({
    rotation: isOpen
      ? ([MathUtils.degToRad(-110), 0, 0] as [number, number, number])
      : ([0, 0, 0] as [number, number, number]),
    position: isOpen
      ? ([0, 0.7, -0.45] as [number, number, number])
      : ([0, 0.5, 0] as [number, number, number]),
    config: { mass: 5, tension: 100, friction: 30 }, // Heavy, slow-moving lid
  });

  // Toggle box open/close
  useEffect(() => {
    const timer = setInterval(() => {
      setIsOpen((prev) => !prev);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    woodenFloatAnimation(groupRef.current, state.clock.getElapsedTime());
  });

  return (
    <animated.group
      ref={groupRef}
      scale={boxSpring.scale as unknown as [number, number, number]}
      position={position}
    >
      <group>
        {/* Main wooden container */}
        <mesh scale={[1.3, 0.9, 1.1]} position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#8B4513" // SaddleBrown
            roughness={0.8}
            metalness={0.1}
            envMapIntensity={0.5}
          />
        </mesh>

        {/* Decorative carved patterns (simplified with colored bands) */}
        {[0, 1, 2, 3].map((i) => (
          <mesh
            key={i}
            position={[i % 2 ? 0.65 : -0.65, -0.05, i < 2 ? 0.55 : -0.55]}
            scale={[0.06, 0.8, 0.06]}
            rotation={[0, Math.PI / 4, 0]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#654321" roughness={0.9} />
          </mesh>
        ))}

        {/* Aged metal hinges and decorations */}
        <mesh scale={[1.31, 0.05, 0.2]} position={[0, 0.3, -0.45]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#B87333" // Copper
            roughness={0.6}
            metalness={0.7}
          />
        </mesh>

        {/* Metal lock */}
        <mesh scale={[0.2, 0.2, 0.1]} position={[0, 0.2, 0.56]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#B87333" // Copper
            roughness={0.5}
            metalness={0.8}
          />
        </mesh>

        {/* Interior */}
        <mesh scale={[1.2, 0.8, 1]} position={[0, 0.01, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#A0522D" // Sienna
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>

        {/* Animated wooden lid */}
        <animated.group
          position={lidSpring.position as unknown as [number, number, number]}
          rotation={lidSpring.rotation as unknown as [number, number, number]}
        >
          <mesh scale={[1.31, 0.15, 1.12]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color="#8B4513" // SaddleBrown
              roughness={0.8}
              metalness={0.1}
              envMapIntensity={0.5}
            />
          </mesh>

          {/* Lid carvings */}
          <mesh scale={[1, 0.05, 0.9]} position={[0, 0.1, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color="#654321" // DarkBrown
              roughness={0.9}
              metalness={0.1}
            />
          </mesh>

          {/* Lid handle */}
          <mesh scale={[0.15, 0.07, 0.3]} position={[0, 0.12, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color="#B87333" // Copper
              roughness={0.5}
              metalness={0.7}
            />
          </mesh>
        </animated.group>
      </group>
    </animated.group>
  );
}
