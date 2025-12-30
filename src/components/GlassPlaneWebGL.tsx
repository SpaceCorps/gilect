import React from "react";
import type { MirrorItem } from "../core/MirrorContext";
import { RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import "./FastGlassMaterial"; // Register the shader

interface Props {
  item: MirrorItem;
  viewportSize: { width: number; height: number }; // In Pixels
  pxToWorld: number; // Conversion factor
}

// Same URL as OverlayCanvas
const BG_URL =
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop";

export const GlassPlane = ({ item, viewportSize, pxToWorld }: Props) => {
  const { x, y, width, height } = item.rect;

  // Load texture for fake refraction
  const rawTexture = useTexture(BG_URL);

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
      <RoundedBox args={[wWorld, hWorld, 0.1]} radius={rWorld} smoothness={10}>
        {/* @ts-ignore */}
        <fastGlassMaterial
          uTexture={bgTexture}
          uIor={-0.15} // Negative for "convex" lens feel
          uColor={new THREE.Color("#ffffff")}
        />
      </RoundedBox>

      {/* Outer Border / Glow Frame */}
      <RoundedBox
        args={[wWorld + 4 * pxToWorld, hWorld + 4 * pxToWorld, 0.05]} // Add ~4px border
        radius={rWorld}
        smoothness={32}
        position={[0, 0, -0.06]} // Sit behind the glass
      >
        <meshBasicMaterial
          color="white"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </RoundedBox>
    </group>
  );
};
