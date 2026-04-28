import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  dpr?: [number, number];
  camera?: { position?: [number, number, number]; fov?: number };
  interactive?: boolean;
}

const LazyCanvasInner = ({
  children,
  dpr = [1, 1.5],
  camera = { position: [0, 0, 5], fov: 45 },
  interactive,
}: Props) => {
  return (
    <Canvas
      dpr={dpr}
      camera={camera}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: interactive ? "auto" : "none" }}
      tabIndex={interactive ? 0 : -1}
    >
      {children}
    </Canvas>
  );
};

export default LazyCanvasInner;
