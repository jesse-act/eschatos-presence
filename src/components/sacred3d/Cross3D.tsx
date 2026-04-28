import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { useReducedMotion } from "./useReducedMotion";

interface Cross3DProps {
  position?: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
  color?: string;
  metalness?: number;
  roughness?: number;
}

const Cross3D = ({
  position = [0, 0, 0],
  scale = 1,
  rotationSpeed = 0.15,
  color = "#1a1a1a",
  metalness = 0.2,
  roughness = 0.65,
}: Cross3DProps) => {
  const groupRef = useRef<Group>(null);
  const reducedMotion = useReducedMotion();

  useFrame((_state, delta) => {
    if (reducedMotion) return;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Vertical beam — slightly tapered */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.18, 2.2, 0.18]} />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      {/* Horizontal crossbar at upper third */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.18, 0.18]} />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
    </group>
  );
};

export default Cross3D;
