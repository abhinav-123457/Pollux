import React from "react";

/**
 * Reusable Button component with accessibility and consistent styling.
 * Supports primary, secondary, and icon variants.
 */

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "icon";
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  title?: string;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  ariaLabel,
  className = "",
  type = "button",
  title,
}: ButtonProps) {
  const baseClasses =
    "px-8 py-4 uppercase no-underline transition-colors duration-150 font-label text-label tracking-wider rounded";
  const variantClasses = {
    primary:
      "bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed",
    secondary:
      "border-2 border-red-600 text-red-600 hover:bg-red-50 disabled:border-gray-400 disabled:text-gray-400",
    icon: "p-2 hover:bg-gray-100 disabled:opacity-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label={ariaLabel}
      title={title}
      style={{
        fontFamily: "var(--font-label)",
        fontSize: "var(--label-size)",
        fontWeight: "var(--label-weight)" as unknown as number,
        letterSpacing: "0.1em",
      }}
    >
      {children}
    </button>
  );
}
