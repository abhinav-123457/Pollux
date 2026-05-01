import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "./i18n/config";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

/**
 * Register Service Worker for offline support and caching.
 * Only registers if the browser supports service workers.
 */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("[POLLUX] Service Worker registered:", registration);
      })
      .catch((error) => {
        console.warn("[POLLUX] Service Worker registration failed:", error);
      });
  });
}

