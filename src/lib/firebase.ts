import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, logEvent, type Analytics } from "firebase/analytics";

/**
 * Firebase configuration — loaded from environment variables.
 * API keys are safe to expose client-side in Firebase projects,
 * security is enforced via Firebase Security Rules + App Check.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "",
};

/** Validate that required config is present */
function validateConfig(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
}

let app: FirebaseApp | null = null;
let analytics: Analytics | null = null;

if (validateConfig()) {
  try {
    app = initializeApp(firebaseConfig);
    // Analytics only available in browser (not SSR)
    if (typeof window !== "undefined") {
      analytics = getAnalytics(app);
    }
  } catch (error) {
    console.error("[POLLUX] Firebase initialization failed:", error);
  }
}

export { app, analytics };

/**
 * Log a custom analytics event. Safe to call even if analytics
 * is not initialized — it will silently no-op.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
}

/**
 * Log a page view. Call from Layout on route changes.
 */
export function trackPageView(pagePath: string, pageTitle: string): void {
  if (analytics) {
    logEvent(analytics, "page_view", {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
}
