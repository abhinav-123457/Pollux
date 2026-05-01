import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, logEvent, type Analytics } from "firebase/analytics";
import { getFirestore, type Firestore } from "firebase/firestore";

/**
 * Firebase configuration — loaded from environment variables.
 * API keys are safe to expose client-side in Firebase projects,
 * security is enforced via Firebase Security Rules + App Check.
 * 
 * Enhanced with:
 * - Analytics for tracking user interactions
 * - Error monitoring
 * - Performance metrics
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
let db: Firestore | null = null;

if (validateConfig()) {
  try {
    app = initializeApp(firebaseConfig);
    // Analytics only available in browser (not SSR)
    if (typeof window !== "undefined") {
      analytics = getAnalytics(app);
    }
    // Firestore database
    db = getFirestore(app);
  } catch (error) {
    console.error("[POLLUX] Firebase initialization failed:", error);
  }
}

export { app, analytics, db };

/**
 * Log a custom analytics event. Safe to call even if analytics
 * is not initialized — it will silently no-op.
 * 
 * @param eventName - Name of the event (e.g., 'ai_question_asked')
 * @param params - Optional event parameters with relevant context
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
