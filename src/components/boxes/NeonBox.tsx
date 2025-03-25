import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group, MathUtils, Color } from "three";
import { useSpring, animated } from "@react-spring/three";
import { Sparkles, useIntersect } from "@react-three/drei";

// Neon box energetic animation
const neonFloatAnimation = (mesh: Group | Mesh, time: number) => {
  // Energetic pulsing
  mesh.position.y = Math.sin(time * 0.9) * 0.12;
  mesh.rotation.y += 0.005;
  mesh.position.x = Math.sin(time * 0.7) * 0.05;
};

interface BoxProps {
  position?: [number, number, number];
}

// Neon-lit Modern Box with glowing edges
export function NeonBox({ position = [0, 0, 0] }: BoxProps) {
  const groupRef = useRef<Group>(null!);
  const [glowIntensity, setGlowIntensity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#222222");
  const [neonColor, setNeonColor] = useState("#00FFFF");

  // Box animation
  const springs = useSpring({
    from: { scale: [0, 0, 0] },
    to: { scale: [1, 1, 1] },
    config: { mass: 2, tension: 350, friction: 40 },
  });

  // Lid animation - fast snap
  const lidSpring = useSpring({
    rotation: isOpen ? [0, MathUtils.degToRad(180), 0] : [0, 0, 0],
    position: isOpen ? [0, 0.6, 0] : [0, 0.6, 0],
    config: { mass: 0.8, tension: 500, friction: 15 }, // Quick, responsive
  });

  // Update lid state based on hover
  useEffect(() => {
    setIsOpen(hovered);
  }, [hovered]);

  // Handle random color changes when not hovered
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!hovered) {
      timer = setInterval(() => {
        // Cycle through neon colors only when not being hovered
        const colors = ["#00FFFF", "#FF00FF", "#FFFF00", "#FF3300", "#00FF66"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setNeonColor(randomColor);
      }, 4500);
    }

    return () => clearInterval(timer);
  }, [hovered]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Only apply floating animation when not hovered
    if (!hovered) {
      neonFloatAnimation(groupRef.current, state.clock.getElapsedTime());
    }

    const time = state.clock.getElapsedTime();
    // Pulsing neon effect
    const newIntensity = Math.sin(time * 3) * 0.5 + 1.5;
    setGlowIntensity(newIntensity);

    groupRef.current.traverse((child) => {
      if (
        child instanceof Mesh &&
        child.material.emissiveIntensity !== undefined
      ) {
        child.material.emissiveIntensity = newIntensity;
      }

      // Add subtle pulse to the box itself
      if (
        child instanceof Mesh &&
        child.material.color &&
        child.name === "neonFrame"
      ) {
        child.material.emissive = new Color(neonColor);
      }
    });
  });

  return (
    <animated.group
      ref={groupRef}
      scale={springs.scale}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <group>
        {/* Main matte black box */}
        <mesh scale={[1.4, 1.0, 1.2]} position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={primaryColor}
            roughness={0.9}
            metalness={0.2}
            envMapIntensity={0.5}
          />
        </mesh>

        {/* Interior glow */}
        <mesh scale={[1.35, 0.95, 1.15]} position={[0, 0.01, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#111111" transparent opacity={0.7} />
        </mesh>

        {/* Neon edges - horizontal lines */}
        {[-1, 1].map((y) => (
          <mesh
            key={`h${y}`}
            name="neonFrame"
            position={[0, y * 0.5, 0]}
            scale={[1.42, 0.03, 1.22]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={neonColor}
              roughness={0.3}
              metalness={0.8}
              emissive={neonColor}
              emissiveIntensity={glowIntensity}
            />
          </mesh>
        ))}

        {/* Neon edges - vertical lines */}
        {[-1, 1].map((x) =>
          [-1, 1].map((z) => (
            <mesh
              key={`v${x}${z}`}
              name="neonFrame"
              position={[x * 0.7, 0, z * 0.6]}
              scale={[0.03, 1.0, 0.03]}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                color={neonColor}
                roughness={0.3}
                metalness={0.8}
                emissive={neonColor}
                emissiveIntensity={glowIntensity}
              />
            </mesh>
          ))
        )}

        {/* Animated lid with neon trim */}
        <animated.group
          position={lidSpring.position}
          rotation={lidSpring.rotation}
        >
          <mesh scale={[1.42, 0.15, 1.22]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={primaryColor}
              roughness={0.9}
              metalness={0.2}
              envMapIntensity={0.5}
            />
          </mesh>

          {/* Lid neon trim */}
          <mesh
            name="neonFrame"
            scale={[1.43, 0.03, 1.23]}
            position={[0, -0.06, 0]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={neonColor}
              roughness={0.3}
              metalness={0.8}
              emissive={neonColor}
              emissiveIntensity={glowIntensity}
            />
          </mesh>

          {/* Decorative neon pattern */}
          <mesh
            name="neonFrame"
            scale={[0.7, 0.02, 0.7]}
            position={[0, 0.09, 0]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={neonColor}
              roughness={0.3}
              metalness={0.8}
              emissive={neonColor}
              emissiveIntensity={glowIntensity * 1.2}
            />
          </mesh>

          {/* Central decorative element */}
          <mesh position={[0, 0.15, 0]} scale={[0.1, 0.1, 0.1]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              roughness={0.1}
              metalness={0.9}
              emissive={neonColor}
              emissiveIntensity={glowIntensity * 0.7}
            />
          </mesh>
        </animated.group>

        {/* Add ambient glow particles */}
        <Sparkles
          count={40}
          scale={[1.8, 1.2, 1.6]}
          size={2}
          speed={0.3}
          opacity={0.2}
          color={neonColor}
        />
      </group>
    </animated.group>
  );
}

export default NeonBox;
