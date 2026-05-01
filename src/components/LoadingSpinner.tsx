/**
 * Accessible loading spinner component with proper ARIA attributes.
 */

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "medium" | "large";
}

export default function LoadingSpinner({
  message = "Loading…",
  size = "medium",
}: LoadingSpinnerProps) {
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 56,
  };

  return (
    <div
      className="flex items-center justify-center flex-col gap-4"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <span
        className="material-symbols-outlined animate-pulse"
        style={{
          fontSize: sizeMap[size],
          color: "var(--pollux-red)",
        }}
        aria-hidden="true"
      >
        bolt
      </span>
      <span
        className="uppercase text-sm"
        style={{
          fontFamily: "var(--font-label)",
          fontSize: "var(--label-size)",
          letterSpacing: "var(--label-tracking)",
          color: "var(--pollux-text-muted)",
        }}
      >
        {message}
      </span>
    </div>
  );
}
