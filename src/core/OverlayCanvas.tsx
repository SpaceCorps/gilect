import { Canvas, useThree } from "@react-three/fiber";
import { Environment, useTexture } from "@react-three/drei";
import { useMirrorStore } from "./MirrorContext";
import { GlassPlane } from "../components/GlassPlaneWebGL";

// Preload the background texture for the WebGL scene
const BG_URL =
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop";

const BackgroundPlane = () => {
  const texture = useTexture(BG_URL);
  const { viewport, camera } = useThree();

  // Calculate generic scale factor to fill frustum at depth -5
  // Start Z = 10 (Camera default). Target Z = -5.
  // Distance Ratio = 15 / 10 = 1.5
  const depth = -5;
  const distance = camera.position.z - depth;
  const scaleFactor = distance / camera.position.z;

  const width = viewport.width * scaleFactor;
  const height = viewport.height * scaleFactor;

  return (
    <mesh position={[0, 0, depth]} scale={[width, height, 1]}>
      <planeGeometry />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
};

const SceneContent = () => {
  const { viewport, size } = useThree();
  const items = useMirrorStore((state) => state.items);

  // Conversion factor: Pixels to World Units
  const pxToWorld = viewport.width / size.width;

  return (
    <>
      <BackgroundPlane />
      {/* Render a plane for each mirrored item */}
      {Object.values(items).map((item) => (
        <GlassPlane
          key={item.id}
          item={item}
          pxToWorld={pxToWorld}
          viewportSize={size} // Passing raw pixel size if needed
        />
      ))}
    </>
  );
};

export const OverlayCanvas = () => {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
      }}
      gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
      camera={{ position: [0, 0, 10], fov: 45 }} // Perspective Camera
      dpr={[1, 2]} // Handle DPI for crisp quality
    >
      <Environment preset="city" />
      <SceneContent />
    </Canvas>
  );
};
