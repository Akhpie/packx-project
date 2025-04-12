import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group, MathUtils, Color } from "three";
import { useSpring, animated } from "@react-spring/three";
import { Sparkles } from "@react-three/drei";

// Holographic dynamic animation
const holographicFloatAnimation = (mesh: Group | Mesh, time: number) => {
  // More dynamic, flashy movements
  mesh.position.y = Math.sin(time * 1.2) * 0.15;
  mesh.rotation.y += 0.007;
  mesh.rotation.z = Math.sin(time * 0.8) * 0.07;
};

const randomFloat = (min: number, max: number) =>
  Math.random() * (max - min) + min;

interface BoxProps {
  position?: [number, number, number];
}

// Holographic Box with dynamic color changing and emission
export function HolographicBox({ position = [0, 0, 0] }: BoxProps) {
  const groupRef = useRef<Group>(null!);
  const decorativeElementRef = useRef<Mesh>(null!);
  const [colorPhase, setColorPhase] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Box animation - fixed to use object format for scale
  const springs = useSpring({
    from: { scale: [0, 0, 0] as [number, number, number] },
    to: { scale: [1, 1, 1] as [number, number, number] },
    config: { mass: 3, tension: 380, friction: 40 },
  });

  // Lid animation - fixed to use proper types
  const lidSpring = useSpring({
    rotation: isOpen
      ? ([0, MathUtils.degToRad(180), 0] as [number, number, number])
      : ([0, 0, 0] as [number, number, number]),
    position: isOpen
      ? ([0, 0.7, 0] as [number, number, number])
      : ([0, 0.65, 0] as [number, number, number]),
    config: { mass: 0.5, tension: 300, friction: 20 },
  });

  // Toggle the lid with random timing for unpredictable effect
  useEffect(() => {
    const timer = setInterval(() => {
      setIsOpen((prev) => !prev);
    }, randomFloat(3000, 7000));
    return () => clearInterval(timer);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    holographicFloatAnimation(groupRef.current, state.clock.getElapsedTime());

    const time = state.clock.getElapsedTime();
    setColorPhase(time * 0.1);

    // Rotate the decorative element
    if (decorativeElementRef.current) {
      decorativeElementRef.current.rotation.y = time * 0.5;
    }

    // Update holographic effect
    groupRef.current.traverse((child) => {
      if (child instanceof Mesh) {
        // Create shifting holographic colors
        if (child.material.color) {
          child.material.color.setHSL((time * 0.1) % 1, 0.8, 0.5);
        }

        // Pulse opacity
        if (child.material.opacity !== undefined) {
          child.material.opacity = Math.sin(time * 1.5) * 0.2 + 0.8;
        }

        // Dynamic emissive properties
        if (child.material.emissive) {
          child.material.emissive.setHSL((time * 0.15 + 0.5) % 1, 0.9, 0.6);
          child.material.emissiveIntensity = Math.sin(time) * 0.5 + 1;
        }
      }
    });
  });

  return (
    <animated.group
      ref={groupRef}
      scale={springs.scale as unknown as [number, number, number]}
      position={position}
    >
      <group>
        {/* Main container with distortion effect */}
        <mesh scale={[1.3, 1.1, 1.3]} position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial
            color={new Color().setHSL(colorPhase % 1, 0.8, 0.5)}
            metalness={0.7}
            roughness={0.1}
            transparent
            opacity={0.85}
            envMapIntensity={3}
            emissive={new Color().setHSL((colorPhase + 0.5) % 1, 0.9, 0.5)}
            emissiveIntensity={1.2}
          />
        </mesh>

        {/* Inner glow layer */}
        <mesh scale={[1.2, 1, 1.2]} position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            color={new Color().setHSL((colorPhase + 0.33) % 1, 0.9, 0.6)}
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Holographic particles */}
        <Sparkles
          count={100}
          scale={[1.5, 1.3, 1.5]}
          size={4}
          speed={0.8}
          opacity={0.6}
          color={new Color().setHSL((colorPhase + 0.2) % 1, 1, 0.5)}
        />

        {/* Animated holographic lid */}
        <animated.group
          position={lidSpring.position as unknown as [number, number, number]}
          rotation={lidSpring.rotation as unknown as [number, number, number]}
        >
          <mesh scale={[1.35, 0.2, 1.35]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshPhysicalMaterial
              color={new Color().setHSL((colorPhase + 0.1) % 1, 0.8, 0.5)}
              metalness={0.7}
              roughness={0.1}
              transparent
              opacity={0.85}
              envMapIntensity={3}
              emissive={new Color().setHSL((colorPhase + 0.6) % 1, 0.9, 0.5)}
              emissiveIntensity={1.2}
            />
          </mesh>

          {/* Decorative lid element - Now uses ref instead of accessing state directly */}
          <mesh
            ref={decorativeElementRef}
            position={[0, 0.15, 0]}
            scale={[0.5, 0.1, 0.5]}
          >
            <tetrahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={new Color().setHSL((colorPhase + 0.5) % 1, 1, 0.5)}
              emissive={new Color().setHSL((colorPhase + 0.7) % 1, 1, 0.7)}
              emissiveIntensity={2}
              transparent
              opacity={0.9}
            />
          </mesh>
        </animated.group>
      </group>
    </animated.group>
  );
}

export default HolographicBox;
