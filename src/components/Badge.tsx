import React from "react";

/**
 * Badge component for categorization and status indication.
 * Used for tags, status badges, and phase indicators.
 */

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "highlight";
  className?: string;
}

export default function Badge({
  children,
  variant = "secondary",
  className = "",
}: BadgeProps) {
  const variantStyles = {
    primary: {
      backgroundColor: "var(--pollux-red)",
      color: "var(--pollux-text)",
    },
    secondary: {
      backgroundColor: "transparent",
      color: "var(--pollux-text-muted)",
      border: "1px solid var(--pollux-border)",
    },
    highlight: {
      backgroundColor: "var(--pollux-red)",
      color: "var(--pollux-text)",
    },
  };

  return (
    <span
      className={`self-start uppercase px-3 py-1.5 rounded inline-block text-sm ${className}`}
      style={{
        fontFamily: "var(--font-label)",
        fontSize: "var(--label-size)",
        fontWeight: "var(--label-weight)" as unknown as number,
        letterSpacing: "var(--label-tracking)",
        ...variantStyles[variant],
      }}
    >
      {children}
    </span>
  );
}
