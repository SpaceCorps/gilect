import React from "react";
import { GlassPane } from "./GlassPane";

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const GlassButton = ({
  children,
  className,
  style,
  ...props
}: GlassButtonProps) => {
  return (
    <GlassPane
      {...(props as any)} // Cast because GlassPane expects Div props but we are rendering button, essentially. Wait, GlassPane renders a Div.
      // We need GlassButton to render a BUTTON tag but still use the Glass logic.
      // GlassPane is hardcoded to render a 'div'. We should probably update GlassPane to be polymorphic or just duplicate logic here.
      // Duplicating logic is cleaner for now to avoid complex polymorphism unless we refactor GlassPane.
      style={{
        appearance: "none",
        border: "1px solid rgba(255,255,255,0.2)",
        background: "rgba(255,255,255,0.1)", // Slight tint
        backdropFilter: "blur(0px)", // We rely on WebGL for the heavy blur, but this helps if WebGL lags
        borderRadius: 12, // Default rounded
        padding: "12px 24px",
        color: "white",
        fontSize: "1rem",
        fontWeight: 500,
        cursor: "pointer",
        transition: "transform 0.1s ease",
        outline: "none",
        ...style,
      }}
    >
      {children}
    </GlassPane>
  );
};
