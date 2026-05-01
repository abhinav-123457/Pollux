import React from "react";

/**
 * Heading component with semantic HTML and consistent styling.
 * Supports h1-h6 with automatic style application.
 */

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "large" | "medium" | "small";
}

export default function Heading({
  level,
  children,
  className = "",
  id,
  variant,
}: HeadingProps) {
  const headingProps = {
    className: `uppercase ${className}`,
    id,
    style: {
      fontFamily: "var(--font-headline)",
      fontSize:
        variant === "small"
          ? "var(--headline-sm-size)"
          : variant === "medium"
            ? "var(--headline-md-size)"
            : "clamp(32px, 5vw, var(--headline-lg-size))",
      fontWeight:
        variant === "small"
          ? "var(--headline-sm-weight)"
          : variant === "medium"
            ? "var(--headline-md-weight)"
            : "var(--headline-lg-weight)",
      lineHeight:
        variant === "small"
          ? "var(--headline-sm-leading)"
          : variant === "medium"
            ? "var(--headline-md-leading)"
            : "var(--headline-lg-leading)",
      letterSpacing:
        variant === "small"
          ? "var(--headline-sm-tracking)"
          : variant === "medium"
            ? "var(--headline-md-tracking)"
            : "var(--headline-lg-tracking)",
      color: "var(--pollux-text)",
    } as React.CSSProperties,
  };

  switch (level) {
    case 1:
      return <h1 {...headingProps}>{children}</h1>;
    case 2:
      return <h2 {...headingProps}>{children}</h2>;
    case 3:
      return <h3 {...headingProps}>{children}</h3>;
    case 4:
      return <h4 {...headingProps}>{children}</h4>;
    case 5:
      return <h5 {...headingProps}>{children}</h5>;
    case 6:
      return <h6 {...headingProps}>{children}</h6>;
    default:
      return <div {...headingProps}>{children}</div>;
  }
}
