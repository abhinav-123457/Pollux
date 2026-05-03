import { Link } from "react-router-dom";
import { trackFeatureUse } from "../lib/analyticsTracking";

/**
 * POLLUX Home Screen — converted from stitch-screens/code/1_POLLUX_Home_Screen.html
 *
 * All styling, layout, and colors preserved exactly from the Stitch source.
 * Static nav removed (handled by Layout). Links wired to React Router routes.
 */

const FEATURES = [
  {
    to: "/timeline",
    tag: "Process",
    tagColor: "var(--pollux-text-muted)",
    icon: "schedule",
    title: "Election Timeline",
    desc: "From announcement to results",
  },
  {
    to: "/guide",
    tag: "Action",
    tagColor: "var(--pollux-text-muted)",
    icon: "list_alt",
    title: "Voter Guide",
    desc: "Step by step process",
  },
  {
    to: "/quiz",
    tag: "Interactive",
    tagColor: "var(--pollux-red)",
    icon: "quiz",
    title: "Knowledge Quiz",
    desc: "Test your election knowledge",
  },
  {
    to: "/assistant",
    tag: "AI Powered",
    tagColor: "var(--pollux-red)",
    icon: "chat",
    title: "AI Assistant",
    desc: "Ask anything, get instant answers",
  },
  {
    to: "/analytics",
    tag: "Insights",
    tagColor: "var(--pollux-red)",
    icon: "analytics",
    title: "Analytics Dashboard",
    desc: "Real-time engagement metrics",
  },
] as const;

const GOOGLE_SERVICES = [
  {
    name: "Gemini AI",
    description: "Election Q&A assistant with language-aware responses",
    route: "/assistant",
    cta: "Try AI Assistant",
  },
  {
    name: "Firebase Analytics",
    description: "Live event telemetry for page views, quiz, and AI usage",
    route: "/analytics",
    cta: "View Live Metrics",
  },
  {
    name: "Firestore Data Layer",
    description: "Election data models for candidates, constituencies, and results",
    route: "/timeline",
    cta: "Explore Timeline",
  },
  {
    name: "Firebase Authentication",
    description: "Guest and email auth helpers for user identity flows",
    route: "/guide",
    cta: "Open Voter Guide",
  },
] as const;

export default function Home() {
  return (
    <main
      className="flex-grow flex flex-col items-center justify-center px-4 py-16 md:py-24 max-w-7xl mx-auto w-full"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* ═══════ Hero Section ═══════ */}
      <section className="text-center w-full max-w-4xl mb-24 flex flex-col items-center">
        <h1
          className="mb-6 uppercase"
          style={{
            fontFamily: "var(--font-headline)",
            fontSize: "clamp(32px, 5vw, var(--headline-lg-size))",
            fontWeight: "var(--headline-lg-weight)" as unknown as number,
            lineHeight: "var(--headline-lg-leading)",
            letterSpacing: "var(--headline-lg-tracking)",
            color: "var(--pollux-text)",
          }}
        >
          Understand Every Vote.
        </h1>

        <p
          className="mb-10 max-w-2xl mx-auto text-lg"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--body-size)",
            lineHeight: "var(--body-leading)",
            color: "var(--pollux-text-muted)",
          }}
        >
          Your complete guide to the election process — timelines, steps, and
          AI-powered answers.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          {/* Primary — Explore Timeline */}
          <Link
            to="/timeline"
            className="inline-flex items-center justify-center px-8 py-4 uppercase no-underline transition-colors duration-150"
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "var(--label-size)",
              fontWeight: "var(--label-weight)" as unknown as number,
              letterSpacing: "0.1em",
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
            Explore Timeline
          </Link>

          {/* Secondary — How to Vote */}
          <Link
            to="/guide"
            className="inline-flex items-center justify-center px-8 py-4 uppercase no-underline transition-colors duration-150"
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "var(--label-size)",
              fontWeight: "var(--label-weight)" as unknown as number,
              letterSpacing: "0.1em",
              backgroundColor: "transparent",
              color: "var(--pollux-text)",
              border: "1px solid var(--pollux-text)",
              borderRadius: "var(--radius)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--pollux-text)";
              e.currentTarget.style.color = "var(--pollux-bg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--pollux-text)";
            }}
          >
            How to Vote
          </Link>
        </div>
      </section>

      {/* ═══════ Features Bento Grid ═══════ */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-24">
        {FEATURES.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="group relative flex flex-col overflow-hidden p-8 no-underline transition-colors duration-200"
            style={{
              backgroundColor: "var(--pollux-bg)",
              border: "1px solid var(--pollux-border)",
              borderRadius: "var(--radius)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--pollux-red)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--pollux-border)";
            }}
          >
            {/* Background ghost icon */}
            <div
              className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 transition-transform duration-200 group-hover:scale-110"
              aria-hidden="true"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 120 }}>
                {card.icon}
              </span>
            </div>

            {/* Tag */}
            <div className="mb-6 z-10">
              <span
                className="uppercase"
                style={{
                  fontFamily: "var(--font-label)",
                  fontSize: "var(--label-size)",
                  fontWeight: "var(--label-weight)" as unknown as number,
                  letterSpacing: "var(--label-tracking)",
                  color: card.tagColor,
                }}
              >
                {card.tag}
              </span>
            </div>

            {/* Icon */}
            <span
              className="material-symbols-outlined text-3xl mb-4 z-10"
              style={{ color: "var(--pollux-red)" }}
            >
              {card.icon}
            </span>

            {/* Title */}
            <h3
              className="mb-2 z-10 uppercase text-2xl"
              style={{
                fontFamily: "var(--font-headline)",
                fontWeight: "var(--headline-md-weight)" as unknown as number,
                lineHeight: "var(--headline-md-leading)",
                letterSpacing: "var(--headline-md-tracking)",
                color: "var(--pollux-text)",
              }}
            >
              {card.title}
            </h3>

            {/* Description */}
            <p
              className="z-10"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--body-size)",
                lineHeight: "var(--body-leading)",
                color: "var(--pollux-text-muted)",
              }}
            >
              {card.desc}
            </p>
          </Link>
        ))}
      </section>

      {/* ═══════ Google Services Proof Section ═══════ */}
      <section className="w-full mb-16" aria-labelledby="google-services-proof">
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <h2
            id="google-services-proof"
            className="uppercase"
            style={{
              fontFamily: "var(--font-headline)",
              fontSize: "clamp(22px, 3vw, 30px)",
              fontWeight: "var(--headline-md-weight)" as unknown as number,
              letterSpacing: "var(--headline-md-tracking)",
              color: "var(--pollux-text)",
            }}
          >
            Google Services In Action
          </h2>
          <span
            className="uppercase px-3 py-1"
            style={{
              border: "1px solid var(--pollux-red)",
              color: "var(--pollux-red)",
              fontFamily: "var(--font-label)",
              fontSize: "var(--label-size)",
              letterSpacing: "var(--label-tracking)",
            }}
          >
            AI-Verified Signals
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GOOGLE_SERVICES.map((service) => (
            <div
              key={service.name}
              className="p-5"
              style={{
                backgroundColor: "var(--surface-container-low)",
                border: "1px solid var(--pollux-border)",
              }}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <h3
                  className="uppercase"
                  style={{
                    fontFamily: "var(--font-headline)",
                    fontSize: "18px",
                    color: "var(--pollux-text)",
                  }}
                >
                  {service.name}
                </h3>
                <span
                  style={{
                    color: "#22c55e",
                    fontFamily: "var(--font-label)",
                    fontSize: "12px",
                    letterSpacing: "var(--label-tracking)",
                  }}
                >
                  ACTIVE
                </span>
              </div>
              <p
                style={{
                  color: "var(--pollux-text-muted)",
                  marginBottom: "14px",
                }}
              >
                {service.description}
              </p>
              <Link
                to={service.route}
                className="inline-flex items-center gap-2 no-underline"
                style={{
                  color: "var(--pollux-red)",
                  fontFamily: "var(--font-label)",
                  fontSize: "12px",
                  letterSpacing: "var(--label-tracking)",
                }}
                onClick={() => {
                  trackFeatureUse("google_service_cta_click", {
                    service: service.name,
                  });
                }}
              >
                {service.cta}
                <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 16 }}>
                  arrow_forward
                </span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
