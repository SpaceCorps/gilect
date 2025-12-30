# Gilect

**Gilect** is a React component library that brings high-performance, "Apple-style" glass UI effects to your web applications using WebGL.

It uses a "Mirror Pattern" to synchronize standard DOM elements with a WebGL overlay, allowing you to build layouts with regular HTML/CSS while getting the visual benefits of advanced shaders (refraction, blur, chromatic aberration).

## Installation

```bash
npm install gilect three @react-three/fiber
```

## Getting Started

### 1. Setup the Root Provider

Wrap your application (or the section using glass effects) with `<GilectRoot>`. This initializes the shared WebGL canvas.

```tsx
import { GilectRoot } from 'gilect';

function App() {
  return (
    <GilectRoot>
      <YourContent />
    </GilectRoot>
  );
}
```

### 2. Use Glass Components

Use `<GlassPane>` to create containers with the glass effect. You can style them using standard CSS or `className` props.

```tsx
import { GlassPane } from 'gilect';

function Card() {
  return (
    <GlassPane className="card">
      <h1>Hello Glass</h1>
      <p>This content floats above a refractive glass plane.</p>
    </GlassPane>
  );
}
```

## Development

To develop locally:

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Run the playground: `cd playground && npm run dev`.

The playground is aliased to the local source code, so changes in `src/` are instantly reflected.
