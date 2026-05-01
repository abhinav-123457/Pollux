import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { trackPageView } from "../lib/firebase";
import LanguageSwitcher from "./LanguageSwitcher";

/**
 * Shared layout matching the Stitch-generated HTML structure.
 *
 * Header:  POLLUX logo (bolt icon + wordmark) | TIMELINE · GUIDE nav | ASK AI button
 * Footer:  Powered by … | Terms · Privacy · Transparency
 * Mobile:  Fixed bottom navigation bar
 *
 * Accessibility: ARIA landmarks, roles, labels, keyboard-focusable nav.
 * Analytics: Tracks page views on route changes via Firebase Analytics.
 */

const NAV_LINKS = [
  { to: "/timeline", label: "TIMELINE", icon: "schedule" },
  { to: "/guide",    label: "GUIDE",    icon: "list_alt" },
  { to: "/quiz",     label: "QUIZ",     icon: "quiz" },
  { to: "/analytics", label: "ANALYTICS", icon: "analytics" },
] as const;

const MOBILE_NAV = [
  { to: "/",          label: "Home",          icon: "home" },
  { to: "/timeline",  label: "Timeline",      icon: "schedule" },
  { to: "/guide",     label: "Guide",         icon: "list_alt" },
  { to: "/quiz",      label: "Quiz",          icon: "quiz" },
  { to: "/analytics", label: "Analytics",     icon: "analytics" },
  { to: "/assistant", label: "AI Assistant",  icon: "smart_toy" },
] as const;

const PAGE_TITLES: Record<string, string> = {
  "/":          "Home",
  "/timeline":  "Election Timeline",
  "/guide":     "Voter Guide",
  "/quiz":      "Election Quiz",
  "/analytics": "Analytics Dashboard",
  "/assistant": "AI Assistant",
};

export default function Layout() {
  const location = useLocation();

  // Track page views on route change
  useEffect(() => {
    const title = PAGE_TITLES[location.pathname] ?? "POLLUX";
    trackPageView(location.pathname, title);
    document.title = `${title} — POLLUX Election Guide`;
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--pollux-bg)" }}>
      {/* ════════════ TopAppBar ════════════ */}
      <header
        className="sticky top-0 z-40 flex-shrink-0"
        role="banner"
        style={{
          backgroundColor: "var(--pollux-bg)",
          borderBottom: "1px solid var(--pollux-border)",
        }}
      >
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 no-underline"
            aria-label="POLLUX — Home"
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{ color: "var(--pollux-red)" }}
              aria-hidden="true"
            >
              bolt
            </span>
            <span
              className="text-2xl font-black uppercase"
              style={{
                fontFamily: "var(--font-headline)",
                letterSpacing: "var(--logo-tracking)",
                color: "var(--pollux-text)",
              }}
            >
              POLLUX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={isActive ? "page" : undefined}
                  className="py-2 px-3 text-sm font-bold uppercase no-underline transition-colors duration-150"
                  style={{
                    fontFamily: "var(--font-headline)",
                    letterSpacing: "-0.02em",
                    color: isActive ? "var(--pollux-text)" : "var(--pollux-text-muted)",
                    backgroundColor: isActive ? "var(--pollux-red)" : "transparent",
                    borderRadius: "var(--radius)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "var(--pollux-red)";
                      e.currentTarget.style.color = "var(--pollux-text)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "var(--pollux-text-muted)";
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Ask AI Button */}
          <Link
            to="/assistant"
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase no-underline transition-colors duration-150"
            aria-label="Open AI Assistant"
            style={{
              fontFamily: "var(--font-headline)",
              letterSpacing: "-0.02em",
              backgroundColor: "var(--pollux-red)",
              color: "var(--pollux-text)",
              borderRadius: "var(--radius)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--pollux-red-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--pollux-red)";
            }}
          >
            Ask AI
          </Link>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </header>

      {/* ════════════ Page Content ════════════ */}
      <div id="main-content" role="main">
        <Outlet />
      </div>

      {/* ════════════ Mobile Bottom Nav ════════════ */}
      <nav
        className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3"
        aria-label="Mobile navigation"
        style={{
          backgroundColor: "var(--pollux-bg)",
          borderTop: "1px solid var(--pollux-border)",
        }}
      >
        {MOBILE_NAV.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.label}
              className="flex flex-col items-center justify-center no-underline transition-colors"
              style={{
                color: isActive ? "var(--pollux-text)" : "var(--pollux-text-muted)",
              }}
            >
              <span className="material-symbols-outlined mb-1" aria-hidden="true">
                {item.icon}
              </span>
              <span
                className="text-[10px] uppercase"
                style={{
                  fontFamily: "var(--font-label)",
                  letterSpacing: "var(--label-tracking)",
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* ════════════ Footer ════════════ */}
      <footer
        className="w-full py-8 px-6 flex flex-col md:flex-row justify-between items-center opacity-60 mt-auto md:mb-0 mb-20"
        role="contentinfo"
        style={{
          backgroundColor: "var(--pollux-bg)",
          borderTop: "1px solid var(--pollux-border)",
        }}
      >
        <div
          className="mb-4 md:mb-0 text-[10px] uppercase"
          style={{
            fontFamily: "var(--font-label)",
            letterSpacing: "var(--label-tracking)",
            color: "var(--pollux-text-muted)",
          }}
        >
          Powered by Gemini AI + Google Firebase
        </div>
        <div className="flex gap-6">
          {["Terms", "Privacy", "Transparency"].map((label) => (
            <a
              key={label}
              href="#"
              className="text-[10px] uppercase underline-offset-4 no-underline transition-colors"
              style={{
                fontFamily: "var(--font-label)",
                letterSpacing: "var(--label-tracking)",
                color: "var(--pollux-text-muted)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--pollux-red)";
                e.currentTarget.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--pollux-text-muted)";
                e.currentTarget.style.textDecoration = "none";
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
