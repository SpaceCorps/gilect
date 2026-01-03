import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

// Define the Shader Material
const FastGlassMaterialImpl = shaderMaterial(
  {
    uTexture: null,
    uResolution: new THREE.Vector2(0, 0),
    uIor: 0.1,
    uColor: new THREE.Color("#ffffff"),
    uOpacity: 1.0,
    uSize: new THREE.Vector2(1, 1),
    uRadius: 0.1,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec2 vScreenUV;

    void main() {
      vUv = uv;
      vec4 clipPos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      gl_Position = clipPos;
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
    uniform vec2 uSize;
    uniform float uRadius;

    varying vec2 vScreenUV;
    varying vec2 vUv;

    // SDF for a rounded box in 2D
    // p: position relative to center
    // b: half-extents (width/2, height/2)
    // r: corner radius
    float sdRoundedBox(in vec2 p, in vec2 b, in float r) {
      vec2 q = abs(p) - b + r;
      return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
    }

    void main() {
      // 1. Calculate pixel position in local space centered at 0,0
      vec2 pos = (vUv - 0.5) * uSize;
      vec2 halfSize = uSize * 0.5;
      
      // 2. Compute Signed Distance
      float d = sdRoundedBox(pos, halfSize, uRadius);

      // 3. Hard Clip (discard outside)
      // Small epsilon for anti-aliasing could be added with smoothstep, 
      // but discard is safer for depth sorting if needed. 
      // For pure glass, we can just alpha-clip.
      if (d > 0.0) discard;

      // 4. Synthesize Normal for Edges (Bevel effect)
      // We want the normal to curve at the edges.
      // A simple approximation is using the gradient of the SDF or position.
      
      // Compute 2D gradient of the SDF via finite differences or analytical.
      // Analytical for rounded box is direction towards closest point on border.
      // But simpler: just map the distance to a curve.
      
      // "Edge Factor": 0 at infinite inside, 1 at edge.
      // Let's use the distance field to modulate refraction.
      // The "Deep" part is flat (normal 0,0,1). The "Edge" part curves.
      
      // Thickness of the "bevel" in world units
      // User requested "more of the cards" to have light bending.
      float bevelSize = min(uRadius, 0.20); 
      float bevelFactor = smoothstep(-bevelSize, 0.0, d);
      
      // Calculate a radial normal direction for the corners/edges
      // An approximation is just normalizing 'pos' for a circle, but for a box it's different.
      // Let's stick to a simpler trick: use the dFdx/dFdy of the distance? 
      // Or just standard refraction based on screen coordinates is enough?
      // The original code used vNormal.xy.
      
      // Let's reconstruct a plausible "surface normal" xy.
      // Inside the box, we want flat. Near edge, we want curve.
      // Vector from edge to center?
      // For a rounded box, the gradient of the SDF is exactly the normal direction in 2D!
      // We can compute the SDF gradient numerically or analytically.
      
      // Analytical gradient of sdRoundedBox (approximate):
      vec2 q = abs(pos) - (halfSize - uRadius);
      vec2 grad = normalize(sign(pos) * max(q, 0.0));
      // This is for the sharp box part. The rounded part is simpler.
      
      // Let's use a finite difference for robustness and simplicity in GLSL 100/300 es
      vec2 e = vec2(0.001, 0.0);
      float nx = sdRoundedBox(pos + e.xy, halfSize, uRadius) - d;
      float ny = sdRoundedBox(pos + e.yx, halfSize, uRadius) - d;
      vec2 normal2D = normalize(vec2(nx, ny));
      
      // Apply bevel factor: internal is flat, edge uses the SDF normal
      vec2 distortion = normal2D * bevelFactor * uIor;

      // 5. Sample Texture
      vec4 refractedColor = texture2D(uTexture, vScreenUV + distortion);

      // 6. Tinting logic
      // Add a slight highlight at the edge
      float edgeHighlight = smoothstep(-0.01, 0.0, d) * 0.3; // Tint edges
      
      vec3 finalColor = mix(refractedColor.rgb, uColor, 0.1);
      finalColor += vec3(edgeHighlight);

      gl_FragColor = vec4(finalColor, 1.0);
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
