import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { useReducedMotion } from "./useReducedMotion";

interface Flame3DProps {
  position?: [number, number, number];
  scale?: number;
}

const Flame3D = ({ position = [0, 0, 0], scale = 1 }: Flame3DProps) => {
  const meshRef = useRef<Mesh>(null);
  const innerRef = useRef<Mesh>(null);
  const reducedMotion = useReducedMotion();

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.scale.x = 1 + Math.sin(t * 4) * 0.05;
      meshRef.current.scale.y = 1 + Math.sin(t * 5) * 0.08;
    }
    if (innerRef.current) {
      innerRef.current.scale.y = 1 + Math.sin(t * 6) * 0.1;
    }
  });

  return (
    <group position={position} scale={scale}>
      <mesh ref={meshRef}>
        <coneGeometry args={[0.3, 0.9, 16]} />
        <meshBasicMaterial color="#E10600" transparent opacity={0.5} />
      </mesh>
      <mesh ref={innerRef} position={[0, 0.05, 0]}>
        <coneGeometry args={[0.18, 0.7, 16]} />
        <meshBasicMaterial color="#FF8C00" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <coneGeometry args={[0.08, 0.5, 16]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={1} />
      </mesh>
    </group>
  );
};

export default Flame3D;
