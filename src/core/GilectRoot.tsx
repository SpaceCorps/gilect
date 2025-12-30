import React from "react";
import { MirrorProvider } from "./MirrorContext";
import { OverlayCanvas } from "./OverlayCanvas";

export const GilectRoot = ({ children }: { children: React.ReactNode }) => {
  return (
    <MirrorProvider>
      {children}
      <OverlayCanvas />
    </MirrorProvider>
  );
};
