import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";

/* ── Lazy-loaded pages (code splitting for efficiency) ── */
const Home = lazy(() => import("./pages/Home"));
const Timeline = lazy(() => import("./pages/Timeline"));
const Guide = lazy(() => import("./pages/Guide"));
const AIAssistant = lazy(() => import("./pages/AIAssistant"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Analytics = lazy(() => import("./pages/Analytics"));

/** Loading fallback shown while a page chunk is downloading */
function PageLoader() {
  return (
    <div
      className="flex items-center justify-center flex-grow"
      role="status"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-4">
        <span
          className="material-symbols-outlined animate-pulse"
          style={{ fontSize: 40, color: "var(--pollux-red)" }}
          aria-hidden="true"
        >
          bolt
        </span>
        <span
          className="uppercase"
          style={{
            fontFamily: "var(--font-label)",
            fontSize: "var(--label-size)",
            letterSpacing: "var(--label-tracking)",
            color: "var(--pollux-text-muted)",
          }}
        >
          Loading…
        </span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        {/* Skip-to-content link for keyboard/screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2"
          style={{
            backgroundColor: "var(--pollux-red)",
            color: "var(--pollux-text)",
            fontFamily: "var(--font-label)",
          }}
        >
          Skip to main content
        </a>

        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/assistant" element={<AIAssistant />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/analytics" element={<Analytics />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
