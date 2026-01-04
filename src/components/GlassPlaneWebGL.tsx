import React from "react";
import type { MirrorItem } from "../core/MirrorContext";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import "./FastGlassMaterial"; // Register the shader

interface Props {
  item: MirrorItem;
  viewportSize: { width: number; height: number }; // In Pixels
  pxToWorld: number; // Conversion factor
  bgTextureUrl: string;
}

export const GlassPlane = ({
  item,
  viewportSize,
  pxToWorld,
  bgTextureUrl,
}: Props) => {
  const { x, y, width, height } = item.rect;

  // Load texture for fake refraction
  const rawTexture = useTexture(bgTextureUrl);

  // Clone and configure texture efficiently
  const bgTexture = React.useMemo(() => {
    const texture = rawTexture.clone();
    texture.wrapS = THREE.MirroredRepeatWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.needsUpdate = true;
    return texture;
  }, [rawTexture]);

  // Convert dimensions to World Units
  const wWorld = width * pxToWorld;
  const hWorld = height * pxToWorld;
  const rWorld = item.borderRadius * pxToWorld;

  // Convert Position to World Space (Center Origin)
  const xCenter = x + width / 2;
  const yCenter = y + height / 2;

  const xWorld = (xCenter - viewportSize.width / 2) * pxToWorld;
  const yWorld = -(yCenter - viewportSize.height / 2) * pxToWorld;

  return (
    <group position={[xWorld, yWorld, 0]}>
      {/* Main Glass Volume - Using Custom Fast Shader */}
      <mesh>
        <planeGeometry args={[wWorld, hWorld]} />
        {/* @ts-expect-error: fastGlassMaterial is not in JSX intrinsic elements yet */}
        <fastGlassMaterial
          uTexture={bgTexture}
          uIor={-0.15} // Negative for "convex" lens feel
          uColor={new THREE.Color("#000000")}
          uSize={new THREE.Vector2(wWorld, hWorld)}
          uRadius={rWorld}
        />
      </mesh>
    </group>
  );
};
