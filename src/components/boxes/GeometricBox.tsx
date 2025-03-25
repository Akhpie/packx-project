// import { useRef, useState, useEffect } from "react";
// import { useFrame } from "@react-three/fiber";
// import { Mesh, Group, MathUtils } from "three";
// import { useSpring, animated } from "@react-spring/three";
// import { Sparkles } from "@react-three/drei";

// // Geometric box complex animation
// const geometricFloatAnimation = (mesh: Group | Mesh, time: number) => {
//   // Complex rotational pattern
//   mesh.rotation.x = Math.sin(time * 0.3) * 0.1;
//   mesh.rotation.y += 0.003;
//   mesh.rotation.z = Math.cos(time * 0.5) * 0.05;
//   mesh.position.y = Math.sin(time * 0.6) * 0.07;
// };

// interface BoxProps {
//   position?: [number, number, number];
// }

// // Geometric Modern Box with interlocking parts
// export function GeometricBox({ position = [0, 0, 0] }: BoxProps) {
//   const groupRef = useRef<Group>(null!);
//   const [rotationPhase, setRotationPhase] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);

//   // Box animation
//   const springs = useSpring({
//     from: { scale: [0, 0, 0] },
//     to: { scale: [1, 1, 1] },
//     config: { mass: 3, tension: 350, friction: 40 },
//   });

//   // Multiple animated parts
//   const partSprings = {
//     top: useSpring({
//       rotation: isOpen ? [0, 0, MathUtils.degToRad(90)] : [0, 0, 0],
//       position: isOpen ? [0.6, 0.6, 0] : [0, 0.6, 0],
//       config: { mass: 1, tension: 250, friction: 25 },
//     }),
//     right: useSpring({
//       rotation: isOpen ? [0, MathUtils.degToRad(90), 0] : [0, 0, 0],
//       position: isOpen ? [0.6, 0, 0.6] : [0.6, 0, 0],
//       config: { mass: 1, tension: 280, friction: 25 },
//     }),
//     left: useSpring({
//       rotation: isOpen ? [0, MathUtils.degToRad(-90), 0] : [0, 0, 0],
//       position: isOpen ? [-0.6, 0, 0.6] : [-0.6, 0, 0],
//       config: { mass: 1, tension: 280, friction: 25 },
//     }),
//     front: useSpring({
//       rotation: isOpen ? [MathUtils.degToRad(90), 0, 0] : [0, 0, 0],
//       position: isOpen ? [0, 0, 0.6] : [0, 0, 0.6],
//       config: { mass: 1, tension: 250, friction: 25 },
//     }),
//     back: useSpring({
//       rotation: isOpen ? [MathUtils.degToRad(-90), 0, 0] : [0, 0, 0],
//       position: isOpen ? [0, 0, -0.6] : [0, 0, -0.6],
//       config: { mass: 1, tension: 250, friction: 25 },
//     }),
//   };

//   // Toggle open/close
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIsOpen((prev) => !prev);
//     }, 6000);
//     return () => clearInterval(timer);
//   }, []);

//   useFrame((state) => {
//     if (!groupRef.current) return;
//     geometricFloatAnimation(groupRef.current, state.clock.getElapsedTime());

//     const time = state.clock.getElapsedTime();
//     setRotationPhase(time * 0.3);
//   });

//   // Color scheme
//   const colors = {
//     primary: "#3366CC",
//     secondary: "#FF6633",
//     tertiary: "#FFCC00",
//     accent: "#66CC99",
//     dark: "#334455",
//   };

//   return (
//     <animated.group ref={groupRef} scale={springs.scale} position={position}>
//       <group>
//         {/* Central core */}
//         <mesh scale={[0.7, 0.7, 0.7]} position={[0, 0, 0]}>
//           <dodecahedronGeometry args={[0.6, 0]} />
//           <meshStandardMaterial
//             color={colors.dark}
//             roughness={0.3}
//             metalness={0.7}
//             envMapIntensity={1.5}
//           />
//         </mesh>

//         {/* Interior glow */}
//         <Sparkles
//           count={20}
//           scale={[0.5, 0.5, 0.5]}
//           size={2}
//           speed={0.5}
//           opacity={0.6}
//           color={colors.secondary}
//         />

//         {/* Top panel */}
//         <animated.group
//           position={partSprings.top.position}
//           rotation={partSprings.top.rotation}
//         >
//           <mesh scale={[0.6, 0.1, 0.6]} position={[0, 0, 0]}>
//             <boxGeometry args={[1, 1, 1]} />
//             <meshPhysicalMaterial
//               color={colors.primary}
//               roughness={0.2}
//               metalness={0.8}
//               clearcoat={1}
//               clearcoatRoughness={0.2}
//             />
//           </mesh>
//           <mesh
//             position={[0, 0.1, 0]}
//             rotation={[0, rotationPhase, 0]}
//             scale={[0.3, 0.1, 0.3]}
//           >
//             <cylinderGeometry args={[0.8, 0.8, 1, 6]} />
//             <meshStandardMaterial
//               color={colors.secondary}
//               roughness={0.3}
//               metalness={0.7}
//             />
//           </mesh>
//         </animated.group>

//         {/* Right panel */}
//         <animated.group
//           position={partSprings.right.position}
//           rotation={partSprings.right.rotation}
//         >
//           <mesh scale={[0.1, 0.6, 0.6]} position={[0, 0, 0]}>
//             <boxGeometry args={[1, 1, 1]} />
//             <meshPhysicalMaterial
//               color={colors.primary}
//               roughness={0.2}
//               metalness={0.8}
//               clearcoat={1}
//               clearcoatRoughness={0.2}
//             />
//           </mesh>
//           <mesh
//             position={[0.1, 0, 0]}
//             rotation={[rotationPhase, 0, 0]}
//             scale={[0.05, 0.3, 0.3]}
//           >
//             <boxGeometry args={[1, 1, 1]} />
//             <meshStandardMaterial
//               color={colors.tertiary}
//               roughness={0.3}
//               metalness={0.7}
//             />
//           </mesh>
//         </animated.group>

//         {/* Left panel */}
//         <animated.group
//           position={partSprings.left.position}
//           rotation={partSprings.left.rotation}
//         >
//           <mesh scale={[0.1, 0.6, 0.6]} position={[0, 0, 0]}>
//             <boxGeometry args={[1, 1, 1]} />
//             <meshPhysicalMaterial
//               color={colors.primary}
//               roughness={0.2}
//               metalness={0.8}
//               clearcoat={1}
//               clearcoatRoughness={0.2}
//             />
//           </mesh>
//           <mesh
//             position={[-0.1, 0, 0]}
//             rotation={[0, 0, rotationPhase]}
//             scale={[0.05, 0.3, 0.3]}
//           >
//             <boxGeometry args={[1, 1, 1]} />
//             <meshStandardMaterial
//               color={colors.tertiary}
//               roughness={0.3}
//               metalness={0.7}
//             />
//           </mesh>
//         </animated.group>

//         {/* Front panel */}
//         <animated.group
//           position={partSprings.front.position}
//           rotation={partSprings.front.rotation}
//         >
//           <mesh scale={[0.6, 0.6, 0.1]} position={[0, 0, 0]}>
//             <boxGeometry args={[1, 1, 1]} />
//             <meshPhysicalMaterial
//               color={colors.primary}
//               roughness={0.2}
//               metalness={0.8}
//               clearcoat={1}
//               clearcoatRoughness={0.2}
//             />
//           </mesh>
//           <mesh
//             position={[0, 0, 0.1]}
//             rotation={[0, rotationPhase, 0]}
//             scale={[0.25, 0.25, 0.05]}
//           >
//             <octahedronGeometry args={[1, 0]} />
//             <meshStandardMaterial
//               color={colors.accent}
//               roughness={0.3}
//               metalness={0.7}
//             />
//           </mesh>
//         </animated.group>

//         {/* Back panel */}
//         <animated.group
//           position={partSprings.back.position}
//           rotation={partSprings.back.rotation}
//         >
//           <mesh scale={[0.6, 0.6, 0.1]} position={[0, 0, 0]}>
//             <boxGeometry args={[1, 1, 1]} />
//             <meshPhysicalMaterial
//               color={colors.primary}
//               roughness={0.2}
//               metalness={0.8}
//               clearcoat={1}
//               clearcoatRoughness={0.2}
//             />
//           </mesh>
//           <mesh
//             position={[0, 0, -0.1]}
//             rotation={[0, -rotationPhase, 0]}
//             scale={[0.25, 0.25, 0.05]}
//           >
//             <tetrahedronGeometry args={[1, 0]} />
//             <meshStandardMaterial
//               color={colors.accent}
//               roughness={0.3}
//               metalness={0.7}
//             />
//           </mesh>
//         </animated.group>
//       </group>
//     </animated.group>
//   );
// }

// export default GeometricBox;

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group, MathUtils, Vector3 } from "three";
import { useSpring, animated, config } from "@react-spring/three";
import { Text, Sparkles, useTexture } from "@react-three/drei";

interface ModularBoxProps {
  position?: [number, number, number];
  dimensions?: [number, number, number]; // Width, Height, Depth
  adaptiveMode?: boolean;
}

export function GeometricBox({
  position = [0, 0, 0],
  dimensions = [1, 1, 1],
  adaptiveMode = true,
}: ModularBoxProps) {
  const groupRef = useRef<Group>(null!);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [adaptiveDimensions, setAdaptiveDimensions] = useState(dimensions);

  // Color scheme - eco-friendly, modern palette
  const colors = {
    primary: "#3DA5D9", // Blue
    secondary: "#73BFB8", // Teal
    accent: "#2EC4B6", // Bright teal
    highlight: "#FEC601", // Yellow
    neutral: "#EFF1F3", // Light gray
  };

  // Box animation spring
  const springs = useSpring({
    scale: expanded
      ? [
          adaptiveDimensions[0] * 1.2,
          adaptiveDimensions[1] * 1.2,
          adaptiveDimensions[2] * 1.2,
        ]
      : [adaptiveDimensions[0], adaptiveDimensions[1], adaptiveDimensions[2]],
    position: [position[0], position[1] + (expanded ? 0.5 : 0), position[2]],
    config: { mass: 2, tension: 400, friction: 30 },
  });

  // Modular pieces animation
  const moduleSprings = {
    top: useSpring({
      position: expanded
        ? [0, adaptiveDimensions[1] * 0.7, 0]
        : [0, adaptiveDimensions[1] * 0.5, 0],
      rotation: expanded ? [0, Math.PI * 0.5, 0] : [0, 0, 0],
      config: config.wobbly,
    }),
    sides: Array(4)
      .fill(null)
      .map((_, index) => {
        const angle = (Math.PI / 2) * index;
        const xPos = Math.sin(angle) * (adaptiveDimensions[0] * 0.5);
        const zPos = Math.cos(angle) * (adaptiveDimensions[2] * 0.5);

        return useSpring({
          position: expanded ? [xPos * 1.5, 0, zPos * 1.5] : [xPos, 0, zPos],
          rotation: expanded ? [0, angle, Math.PI * 0.25] : [0, angle, 0],
          config: { mass: 1, tension: 400, friction: 35 },
        });
      }),
    modules: Array(8)
      .fill(null)
      .map((_, index) => {
        // Calculate positions for corner modules
        const xSign = index % 2 === 0 ? -1 : 1;
        const ySign = index < 4 ? -1 : 1;
        const zSign = index < 2 || (index > 3 && index < 6) ? -1 : 1;

        const xPos = xSign * adaptiveDimensions[0] * 0.4;
        const yPos = ySign * adaptiveDimensions[1] * 0.4;
        const zPos = zSign * adaptiveDimensions[2] * 0.4;

        return useSpring({
          position: expanded
            ? [xPos * 1.5, yPos * 1.5, zPos * 1.5]
            : [xPos, yPos, zPos],
          scale: expanded ? [0.3, 0.3, 0.3] : [0.2, 0.2, 0.2],
          rotation: expanded
            ? [(Math.PI * 0.5 * index) % 3, (Math.PI * 0.25 * index) % 4, 0]
            : [0, 0, 0],
          config: { mass: 0.8, tension: 380, friction: 25 },
        });
      }),
  };

  // Size adaptation effect
  useEffect(() => {
    if (adaptiveMode) {
      // Simulate product dimension sensing
      const interval = setInterval(() => {
        if (!expanded && !hovered) {
          // Randomly adjust dimensions to simulate adapting to different products
          const newWidth = dimensions[0] * (0.8 + Math.random() * 0.4);
          const newHeight = dimensions[1] * (0.8 + Math.random() * 0.4);
          const newDepth = dimensions[2] * (0.8 + Math.random() * 0.4);

          setAdaptiveDimensions([newWidth, newHeight, newDepth]);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [adaptiveMode, dimensions, expanded, hovered]);

  // Hover/expand effect
  useEffect(() => {
    // When hovered, expand after a short delay
    let timeout: NodeJS.Timeout;
    if (hovered && !expanded) {
      timeout = setTimeout(() => {
        setExpanded(true);
      }, 300);
    } else if (!hovered && expanded) {
      timeout = setTimeout(() => {
        setExpanded(false);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [hovered, expanded]);

  // Gentle floating animation
  useFrame((state) => {
    if (!groupRef.current || expanded) return;

    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.05;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.4) * 0.05;
  });

  // Render a feature label
  const Feature = ({ text, position, rotation = [0, 0, 0] }: any) => (
    <Text
      position={position}
      rotation={rotation}
      fontSize={0.15}
      color={colors.highlight}
      anchorX="center"
      anchorY="middle"
      visible={expanded}
    >
      {text}
    </Text>
  );

  return (
    <animated.group
      ref={groupRef}
      position={springs.position as any}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Base module - adapts to dimensions */}
      <animated.mesh scale={springs.scale as any}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={colors.neutral}
          roughness={0.7}
          metalness={0.1}
          transparent
          opacity={0.5}
        />
      </animated.mesh>

      {/* Internal structure - adaptive grid */}
      <animated.mesh scale={springs.scale as any}>
        <boxGeometry args={[0.95, 0.95, 0.95]} />
        <meshStandardMaterial
          color={colors.primary}
          wireframe={true}
          transparent
          opacity={0.3}
        />
      </animated.mesh>

      {/* Top module */}
      <animated.group
        position={moduleSprings.top.position as any}
        rotation={moduleSprings.top.rotation as any}
      >
        <mesh
          scale={[
            adaptiveDimensions[0] * 0.9,
            0.05,
            adaptiveDimensions[2] * 0.9,
          ]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={colors.primary}
            roughness={0.5}
            metalness={0.2}
          />
        </mesh>
        <Feature
          text="Size-Adaptive"
          position={[0, 0.1, 0]}
          rotation={[0, Math.PI * 0.5, 0]}
        />
      </animated.group>

      {/* Side modules */}
      {moduleSprings.sides.map((spring, index) => (
        <animated.group
          key={`side-${index}`}
          position={spring.position as any}
          rotation={spring.rotation as any}
        >
          <mesh
            scale={[
              0.6 * adaptiveDimensions[0],
              0.8 * adaptiveDimensions[1],
              0.05,
            ]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? colors.primary : colors.secondary}
              roughness={0.6}
              metalness={0.2}
            />
          </mesh>
          {index === 0 && (
            <Feature text="Space-Efficient" position={[0, 0.5, 0.1]} />
          )}
          {index === 1 && (
            <Feature
              text="Minimal Material"
              position={[0, 0.5, 0.1]}
              rotation={[0, Math.PI * 0.5, 0]}
            />
          )}
        </animated.group>
      ))}

      {/* Corner connector modules */}
      {moduleSprings.modules.map((spring, index) => (
        <animated.group
          key={`module-${index}`}
          position={spring.position as any}
          scale={spring.scale as any}
          rotation={spring.rotation as any}
        >
          <mesh>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={colors.accent}
              roughness={0.4}
              metalness={0.3}
            />
          </mesh>
          {index === 0 && expanded && (
            <Feature text="Interlocking" position={[0, 1.2, 0]} />
          )}
        </animated.group>
      ))}

      {/* Decorative elements - only visible when expanded */}
      {expanded && (
        <Sparkles
          count={20}
          scale={[2, 2, 2]}
          size={0.5}
          speed={0.2}
          opacity={0.7}
          color={colors.highlight}
        />
      )}
    </animated.group>
  );
}

export default GeometricBox;
