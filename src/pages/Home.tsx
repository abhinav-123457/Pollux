import { Link } from "react-router-dom";

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
    to: "/assistant",
    tag: "AI Powered",
    tagColor: "var(--pollux-red)",
    icon: "chat",
    title: "AI Assistant",
    desc: "Ask anything, get instant answers",
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
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-24">
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
    </main>
  );
}
