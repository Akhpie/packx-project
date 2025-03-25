import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group, MathUtils } from "three";
import { useSpring, animated } from "@react-spring/three";
import { RoundedBox, Sparkles } from "@react-three/drei";

// Glass-specific smooth animation
const glassFloatAnimation = (mesh: Group | Mesh, time: number) => {
  // Smoother, more subtle movements
  mesh.position.y = Math.sin(time * 0.7) * 0.08;
  mesh.rotation.y = Math.sin(time * 0.2) * 0.1;
  mesh.rotation.z = Math.sin(time * 0.4) * 0.03;
};

interface BoxProps {
  position?: [number, number, number];
}

// Glass Box with realistic glass properties
export function GlassBox({ position = [0, 0, 0] }: BoxProps) {
  const groupRef = useRef<Group>(null!);
  const [isOpen, setIsOpen] = useState(false);

  // Box animation
  const springs = useSpring({
    from: { scale: [0, 0, 0] },
    to: { scale: [1, 1, 1] },
    config: { mass: 2, tension: 300, friction: 30 },
  });

  // Lid animation - more subtle for glass
  const lidSpring = useSpring({
    rotation: isOpen ? [MathUtils.degToRad(-80), 0, 0] : [0, 0, 0],
    position: isOpen ? [0, 0.8, -0.3] : [0, 0.575, 0],
    config: { mass: 0.8, tension: 280, friction: 20 },
  });

  // Toggle the lid
  useEffect(() => {
    const timer = setInterval(() => {
      setIsOpen((prev) => !prev);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Reflections and refractions
  useFrame((state) => {
    if (!groupRef.current) return;
    glassFloatAnimation(groupRef.current, state.clock.getElapsedTime());

    // Add subtle color shifts based on viewing angle
    groupRef.current.traverse((child) => {
      if (child instanceof Mesh && child.material.color) {
        const time = state.clock.getElapsedTime();
        child.material.opacity = Math.max(
          0.7,
          Math.sin(time * 0.5) * 0.1 + 0.9
        );
      }
    });
  });

  return (
    <animated.group ref={groupRef} scale={springs.scale} position={position}>
      <group>
        {/* Main glass container */}
        <RoundedBox args={[1.2, 1, 1.2]} radius={0.1} smoothness={8}>
          <meshPhysicalMaterial
            color="#a0d8ef" // Light blue tint
            metalness={0.1}
            roughness={0}
            transmission={0.95}
            thickness={0.5}
            envMapIntensity={3}
            ior={1.5} // Glass IOR
            transparent
          />
        </RoundedBox>

        {/* Interior content: a small floating object */}
        <mesh position={[0, 0.2, 0]} scale={[0.3, 0.3, 0.3]}>
          <torusKnotGeometry args={[1, 0.2, 128, 32]} />
          <meshStandardMaterial
            color="#ff88cc"
            roughness={0.2}
            metalness={0.8}
            emissive="#ff2266"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Very subtle glass particles */}
        <Sparkles
          count={20}
          scale={[0.8, 0.6, 0.8]}
          size={6}
          speed={0.2}
          opacity={0.2}
        />

        {/* Animated glass lid */}
        <animated.group
          position={lidSpring.position}
          rotation={lidSpring.rotation}
        >
          <RoundedBox args={[1.25, 0.15, 1.25]} radius={0.05} smoothness={4}>
            <meshPhysicalMaterial
              color="#a0d8ef"
              metalness={0.1}
              roughness={0}
              transmission={0.95}
              thickness={0.5}
              envMapIntensity={3}
              ior={1.5}
              transparent
            />
          </RoundedBox>

          {/* Glass handle */}
          <mesh
            position={[0, 0.12, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.15, 0.15, 0.1]}
          >
            <cylinderGeometry args={[1, 0.7, 1, 16]} />
            <meshPhysicalMaterial
              color="#ffffff"
              metalness={0.1}
              roughness={0}
              transmission={0.95}
              thickness={1.5}
              envMapIntensity={4}
              ior={1.6}
              transparent
            />
          </mesh>
        </animated.group>
      </group>
    </animated.group>
  );
}

export default GlassBox;
