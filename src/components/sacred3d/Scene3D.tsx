import { Suspense, lazy } from "react";
import type { ReactNode } from "react";

interface Scene3DProps {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  dpr?: [number, number];
  camera?: { position?: [number, number, number]; fov?: number };
  interactive?: boolean;
}

const LazyCanvas = lazy(() => import("./LazyCanvasInner"));

const Scene3D = ({
  children,
  className,
  fallback = null,
  dpr,
  camera,
  interactive = false,
}: Scene3DProps) => {
  return (
    <div className={className}>
      <Suspense fallback={fallback}>
        <LazyCanvas dpr={dpr} camera={camera} interactive={interactive}>
          {children}
        </LazyCanvas>
      </Suspense>
    </div>
  );
};

export default Scene3D;
