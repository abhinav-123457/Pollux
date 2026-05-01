import React from "react";

/**
 * Reusable Card component for consistent styling and accessibility.
 * Used for information blocks, phases, and interactive containers.
 */

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isInteractive?: boolean;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  role?: 'button' | 'region' | 'article' | 'status';
  style?: React.CSSProperties;
}

export default function Card({
  children,
  className = "",
  onClick,
  isInteractive = false,
  ariaLabel,
  ariaExpanded,
  role = "article",
  style = {},
}: CardProps) {
  const baseClasses = "p-4 sm:p-6 transition-all duration-150";
  const interactiveClasses = isInteractive
    ? "cursor-pointer hover:bg-red-50 hover:border-red-500"
    : "";

  const cardStyle: React.CSSProperties = {
    border: "1px solid var(--pollux-border)",
    backgroundColor: "var(--pollux-bg)",
    borderRadius: "var(--radius)",
    ...style,
  };

  return (
    <div
      className={`${baseClasses} ${interactiveClasses} ${className}`}
      style={cardStyle}
      onClick={onClick}
      role={onClick ? "button" : role}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
    >
      {children}
    </div>
  );
}
