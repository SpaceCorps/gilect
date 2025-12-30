import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

// Define the Shader Material
const FastGlassMaterialImpl = shaderMaterial(
  {
    uTexture: null, // The background texture
    uResolution: new THREE.Vector2(0, 0), // Screen resolution
    uIor: 0.1, // Refraction strength (displacement amount)
    uColor: new THREE.Color("#ffffff"),
    uOpacity: 1.0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec2 vScreenUV;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      vec4 clipPos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      gl_Position = clipPos;
      
      // Calculate Screen UVs (0 to 1) from Clip Space (-1 to 1)
      vScreenUV = clipPos.xy / clipPos.w * 0.5 + 0.5;
    }
  `,
  // Fragment Shader
  `
    uniform sampler2D uTexture;
    uniform vec2 uResolution;
    uniform float uIor;
    uniform vec3 uColor;
    uniform float uOpacity;

    varying vec3 vNormal;
    varying vec2 vScreenUV;

    void main() {
      // Calculate refraction offset based on View-Space Normal
      // Edges (high normal X/Y) will distort more.
      // Centers (normal Z) will distort less or not at all.
      vec2 distortion = vNormal.xy * uIor;

      // Sample texture at distorted UV
      vec4 refractedColor = texture2D(uTexture, vScreenUV + distortion);

      // Simple Fresnel-ish alpha or tint
      // Stronger white tint at edges could be nice, but keeping it simple first.
      
      gl_FragColor = vec4(mix(refractedColor.rgb, uColor, 0.1), 1.0);
      
      // Hardware tone mapping (optional, usually handled by composer)
      // gl_FragColor = linearToOutputTexel(gl_FragColor);
    }
  `
);

// Register it with R3F
extend({ FastGlassMaterial: FastGlassMaterialImpl });

// Type definition for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      fastGlassMaterial: any;
    }
  }
}

export { FastGlassMaterialImpl };
