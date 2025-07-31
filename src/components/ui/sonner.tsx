"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-center"
      className="toaster group"
      style={
        {
          "--normal-bg": "rgba(31, 41, 55, 0.8)",
          "--normal-text": "#d1d5db",
          "--normal-border": "rgba(55, 65, 81, 0.8)",
          "--normal-shadow": "0 4px 20px rgba(59, 130, 246, 0.6)",
          "--normal-radius": "0.75rem",
          "--success-bg": "linear-gradient(90deg, #3b82f6, #f97316, #ec4899)",
          "--success-text": "white",
          "--error-bg": "#ef4444",
          "--error-text": "white",
          "--warning-bg": "#fbbf24",
          "--warning-text": "black",
          "--info-bg": "#3b82f6",
          "--info-text": "white",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
