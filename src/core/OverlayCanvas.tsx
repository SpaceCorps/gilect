import { Canvas, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMirrorStore } from "./MirrorContext";
import { GlassPlane } from "../components/GlassPlaneWebGL";

const SceneContent = () => {
  const { viewport, size } = useThree();
  const items = useMirrorStore((state) => state.items);

  // Conversion factor: Pixels to World Units
  const pxToWorld = viewport.width / size.width;

  return (
    <>
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
