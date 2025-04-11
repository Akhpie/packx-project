import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group, MathUtils } from "three";
import { useSpring, animated } from "@react-spring/three";
import { RoundedBox } from "@react-three/drei";

// Animation helper
const floatAnimation = (mesh: Group | Mesh, time: number) => {
  mesh.position.y = Math.sin(time) * 0.1;
  mesh.rotation.y += 0.005;
  mesh.rotation.z = Math.sin(time * 0.5) * 0.05;
  mesh.rotation.x = Math.sin(time * 0.3) * 0.1;
};

interface BoxProps {
  position?: [number, number, number];
  color?: string;
  scale?: number;
}

// Box with split effect on hover
export function Box({
  position = [0, 0, 0],
  color = "#8844ff",
  scale = 1,
}: BoxProps) {
  const groupRef = useRef<Group>(null!);
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [autoAnimationActive, setAutoAnimationActive] = useState(true);

  // Lid animation
  const lidSpring = useSpring({
    rotation: isOpen ? [0, 0, MathUtils.degToRad(-105)] : [0, 0, 0],
    position: isOpen ? [0, 0.8 * scale, -0.4 * scale] : [0, 0.45 * scale, 0],
    config: { mass: 1, tension: 280, friction: 60 },
  });

  // Box scale animation
  const boxSpring = useSpring({
    from: { scale: [0, 0, 0] },
    to: { scale: [scale, scale, scale] },
    config: { mass: 4, tension: 400, friction: 50 },
  });

  // Split animation for the four sides
  const topLeftSpring = useSpring({
    position: hovered ? [-0.5 * scale, 0, -0.5 * scale] : [0, 0, 0],
    rotation: hovered ? [0, MathUtils.degToRad(-15), 0] : [0, 0, 0],
    config: { mass: 1, tension: 240, friction: 30 },
  });

  const topRightSpring = useSpring({
    position: hovered ? [0.5 * scale, 0, -0.5 * scale] : [0, 0, 0],
    rotation: hovered ? [0, MathUtils.degToRad(15), 0] : [0, 0, 0],
    config: { mass: 1, tension: 240, friction: 30 },
  });

  const bottomLeftSpring = useSpring({
    position: hovered ? [-0.5 * scale, 0, 0.5 * scale] : [0, 0, 0],
    rotation: hovered ? [0, MathUtils.degToRad(-15), 0] : [0, 0, 0],
    config: { mass: 1, tension: 240, friction: 30 },
  });

  const bottomRightSpring = useSpring({
    position: hovered ? [0.5 * scale, 0, 0.5 * scale] : [0, 0, 0],
    rotation: hovered ? [0, MathUtils.degToRad(15), 0] : [0, 0, 0],
    config: { mass: 1, tension: 240, friction: 30 },
  });

  // Toggle box open/close when hovered
  useEffect(() => {
    if (hovered) {
      setIsOpen(true);
      setAutoAnimationActive(false);
    } else if (!autoAnimationActive) {
      setIsOpen(false);
      // Restart auto animation after a delay
      const timer = setTimeout(() => {
        setAutoAnimationActive(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hovered, autoAnimationActive]);

  // Auto animation effect - toggle open/close every few seconds
  useEffect(() => {
    if (!autoAnimationActive) return;

    const timer = setInterval(() => {
      setIsOpen((prev) => !prev);
    }, 4000);

    return () => clearInterval(timer);
  }, [autoAnimationActive]);

  useFrame((state) => {
    if (!groupRef.current) return;
    floatAnimation(groupRef.current, state.clock.getElapsedTime());
  });

  // Create a quarter segment of the box
  const BoxQuarter = ({
    springProps,
    position: segmentPos = [0, 0, 0],
    segmentColor = color,
  }) => (
    <animated.group
      position={springProps.position}
      rotation={springProps.rotation}
    >
      <RoundedBox
        args={[0.5 * scale, 0.8 * scale, 0.5 * scale]}
        radius={0.05}
        smoothness={4}
        position={segmentPos}
      >
        <meshPhysicalMaterial
          color={segmentColor}
          metalness={0.4}
          roughness={0.3}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          envMapIntensity={2}
        />
      </RoundedBox>
    </animated.group>
  );

  return (
    <animated.group
      ref={groupRef}
      scale={boxSpring.scale}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <group>
        {/* Split box into 4 quarters */}
        <BoxQuarter
          springProps={topLeftSpring}
          position={[-0.25 * scale, 0, -0.25 * scale]}
        />
        <BoxQuarter
          springProps={topRightSpring}
          position={[0.25 * scale, 0, -0.25 * scale]}
        />
        <BoxQuarter
          springProps={bottomLeftSpring}
          position={[-0.25 * scale, 0, 0.25 * scale]}
        />
        <BoxQuarter
          springProps={bottomRightSpring}
          position={[0.25 * scale, 0, 0.25 * scale]}
        />

        {/* Interior */}
        <mesh
          scale={[0.9 * scale, 0.5 * scale, 0.9 * scale]}
          position={[0, 0.01 * scale, 0]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial
            color="#000000"
            metalness={0.1}
            roughness={0.9}
            transparent={true}
            opacity={0.8}
            envMapIntensity={0.5}
          />
        </mesh>

        {/* Decorative edges - one for each corner */}
        {[0, 1, 2, 3].map((i) => (
          <animated.mesh
            key={i}
            position={[
              (i % 2 ? 0.46 : -0.46) * scale,
              0.1 * scale,
              (i < 2 ? 0.46 : -0.46) * scale,
            ]}
            scale={[0.08 * scale, 0.7 * scale, 0.08 * scale]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color="#ffffff"
              metalness={0.9}
              roughness={0.1}
            />
          </animated.mesh>
        ))}

        {/* Animated Lid */}
        <animated.group
          position={lidSpring.position}
          rotation={lidSpring.rotation}
        >
          <RoundedBox
            args={[1.05 * scale, 0.1 * scale, 1.05 * scale]}
            radius={0.03}
            smoothness={4}
          >
            <meshPhysicalMaterial
              color={color}
              metalness={0.5}
              roughness={0.2}
              clearcoat={1}
              clearcoatRoughness={0.1}
              envMapIntensity={2.5}
            />
          </RoundedBox>

          {/* Lid handle */}
          <mesh
            position={[0, 0.1 * scale, 0]}
            scale={[0.2 * scale, 0.1 * scale, 0.2 * scale]}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </animated.group>
      </group>
    </animated.group>
  );
}

export default Box;
