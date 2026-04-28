import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { useReducedMotion } from "./useReducedMotion";

interface HeartbeatSphereProps {
  position?: [number, number, number];
  color?: string;
  baseScale?: number;
}

const HeartbeatSphere = ({
  position = [0, 0, 0],
  color = "#E10600",
  baseScale = 1,
}: HeartbeatSphereProps) => {
  const meshRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);
  const reducedMotion = useReducedMotion();

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;
    // Heartbeat: lub-dub pattern over 1.4s cycle
    const cycle = (t % 1.4) / 1.4;
    let pulse = 1;
    if (cycle < 0.18) pulse = 1 + Math.sin(cycle / 0.18 * Math.PI) * 0.18; // first beat
    else if (cycle < 0.32) pulse = 1 + Math.sin((cycle - 0.18) / 0.14 * Math.PI) * 0.10; // second beat
    if (meshRef.current) {
      meshRef.current.scale.setScalar(baseScale * pulse);
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(baseScale * pulse * 1.6);
    }
  });

  return (
    <group position={position}>
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
      {/* Inner core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          metalness={0.1}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
};

export default HeartbeatSphere;
