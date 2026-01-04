import React from "react";
import { MirrorProvider } from "./MirrorContext";
import { OverlayCanvas } from "./OverlayCanvas";

const DEFAULT_BG =
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop";

export interface GilectRootProps {
  children: React.ReactNode;
  backgroundImage?: string;
  renderBackground?: boolean;
}

export const GilectRoot = ({
  children,
  backgroundImage = DEFAULT_BG,
  renderBackground = false,
}: GilectRootProps) => {
  return (
    <MirrorProvider config={{ backgroundImage, renderBackground }}>
      {children}
      <OverlayCanvas />
    </MirrorProvider>
  );
};
