import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Group } from "three";
import * as THREE from "three";
import { useReducedMotion } from "./useReducedMotion";

interface Cross3DProps {
  position?: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
  color?: string;
  metalness?: number;
  roughness?: number;
  emissive?: string;
  emissiveIntensity?: number;
  /** Enables vertical floating drift (drei Float). */
  float?: boolean;
}

const Cross3D = ({
  position = [0, 0, 0],
  scale = 1,
  rotationSpeed = 0.18,
  color = "#f5f5f5",
  metalness = 0.6,
  roughness = 0.35,
  emissive = "#E10600",
  emissiveIntensity = 0.4,
  float = true,
}: Cross3DProps) => {
  const groupRef = useRef<Group>(null);
  const verticalRef = useRef<THREE.Mesh>(null);
  const horizontalRef = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      // Primary slow Y-axis revelation
      groupRef.current.rotation.y += delta * rotationSpeed;
      // Subtle X wobble — like a censer swaying
      groupRef.current.rotation.x = Math.sin(t * 0.6) * 0.08;
      // Subtle Z tilt — like wind on a banner
      groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.05;
      // Breath scale — anointing pulse
      const breath = 1 + Math.sin(t * 1.2) * 0.025;
      groupRef.current.scale.setScalar(scale * breath);
    }

    // Emissive pulse — heartbeat of the cross
    const pulse = emissiveIntensity * (0.7 + Math.sin(t * 1.6) * 0.45);
    if (verticalRef.current) {
      const mat = verticalRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = pulse;
    }
    if (horizontalRef.current) {
      const mat = horizontalRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = pulse;
    }
  });

  const crossMesh = (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Vertical beam */}
      <mesh ref={verticalRef} position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.18, 2.2, 0.18]} />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {/* Horizontal crossbar at upper third */}
      <mesh ref={horizontalRef} position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.18, 0.18]} />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
    </group>
  );

  if (float && !reducedMotion) {
    return (
      <Float
        speed={1.2}
        rotationIntensity={0.15}
        floatIntensity={0.6}
        floatingRange={[-0.15, 0.15]}
      >
        {crossMesh}
      </Float>
    );
  }

  return crossMesh;
};

export default Cross3D;
