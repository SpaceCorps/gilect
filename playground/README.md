# Gilect Playground

This is the development playground for the **Gilect** library.

It is configured to directly import the source code from `../src`, enabling a fast feedback loop ("Hot Module Replacement") when developing the library.

## Getting Started

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Run Development Server**:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Structure

- `src/App.tsx`: The main demo application. Add new examples here to test components.
- `vite.config.ts`: Configured with an alias mapping `gilect` -> `../src`.
