import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * React Error Boundary — catches render errors and shows a fallback UI
 * instead of crashing the entire application.
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("[POLLUX] Uncaught error:", error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <span
            className="material-symbols-outlined mb-4"
            style={{ fontSize: 48, color: "var(--pollux-red)" }}
            aria-hidden="true"
          >
            error
          </span>
          <h2
            className="uppercase mb-2"
            style={{
              fontFamily: "var(--font-headline)",
              fontSize: "var(--headline-md-size)",
              fontWeight: 600,
              color: "var(--pollux-text)",
            }}
          >
            Something went wrong
          </h2>
          <p style={{ color: "var(--pollux-text-muted)", maxWidth: 400 }}>
            An unexpected error occurred. Please refresh the page or try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 uppercase"
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "var(--label-size)",
              letterSpacing: "0.1em",
              backgroundColor: "var(--pollux-red)",
              color: "var(--pollux-text)",
              border: "none",
              cursor: "pointer",
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
