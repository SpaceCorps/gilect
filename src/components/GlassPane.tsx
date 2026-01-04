import React, { useRef } from "react";
import { useMirror } from "../core/useMirror";

export interface GlassPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  // Add custom glass props here later (blur amount, color, etc)
  blur?: number;
}

export const GlassPane = ({
  children,
  className,
  style,
  ...props
}: GlassPaneProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useMirror(ref);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        // position: "relative", // Removed to allow className="fixed" or other positioning to work. Defaulting to standard layout.
        // The DOM element itself should be transparent so we see the WebGL glass behind/integrated?
        // Actually, if WebGL is 'overlay' (z-index 9999), it will cover the DOM content.
        // We need WebGL to be UNDER the content if we want content to be readable on top of glass.
        // But OverlayCanvas calls it 'Overlay'.

        // If the WebGL glass is opaque/transmissive, and it's on TOP (z 9999),
        // then the DOM content inside THIS div will be covered by the glass mesh!
        // This is wrong for a "Container". Ideally:
        // [Glass Background] -> [DOM Content]

        // If Canvas is fixed at z-index 9999, it covers everything.
        // Maybe Canvas should be negative z-index?
        // Or we just don't put content inside GlassPane? No, it's a pane.

        // Current Plan: OverlayCanvas is z-index: -1 (Background).
        // But then it won't be "Apple Glass" blurring the *entire* app if the app has opaque background.

        // Let's assume for now Canvas is at z-index -1, and this div has transparent background.
        background: "transparent",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
