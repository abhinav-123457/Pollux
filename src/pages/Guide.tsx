import { useState } from "react";

/**
 * POLLUX Voter Guide — converted from stitch-screens/code/4_POLLUX_Voter_Guide.html
 *
 * Two-column layout: Eligibility checklist (interactive) + Polling Day steps.
 * Bottom CTA: "Register to Vote" with external link to voters.eci.gov.in.
 */

interface CheckItem {
  label: string;
  checked: boolean;
}

const INITIAL_CHECKLIST: CheckItem[] = [
  { label: "Indian citizen aged 18 or above", checked: false },
  { label: "Registered in electoral rolls", checked: false },
  { label: "Valid Voter ID (EPIC card) or alternative ID", checked: false },
];

const POLLING_STEPS = [
  "Carry your Voter ID or approved alternate ID",
  "Go to your designated polling booth",
  "Get your finger inked, collect ballot slip",
  "Vote on EVM, verify on VVPAT screen",
];

export default function Guide() {
  const [checklist, setChecklist] = useState<CheckItem[]>(INITIAL_CHECKLIST);

  const toggleCheck = (index: number) => {
    setChecklist((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const allChecked = checklist.every((item) => item.checked);

  return (
    <main
      className="flex-grow flex flex-col w-full"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-12 md:py-20 flex flex-col gap-12">
        {/* ═══════ Header ═══════ */}
        <header className="flex flex-col gap-2">
          <span
            className="uppercase"
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "var(--label-size)",
              fontWeight: "var(--label-weight)" as unknown as number,
              letterSpacing: "var(--label-tracking)",
              color: "var(--pollux-text-muted)",
            }}
          >
            How to Vote
          </span>
          <h1
            className="uppercase"
            style={{
              fontFamily: "var(--font-headline)",
              fontSize: "clamp(32px, 5vw, var(--headline-lg-size))",
              fontWeight: "var(--headline-lg-weight)" as unknown as number,
              lineHeight: "var(--headline-lg-leading)",
              letterSpacing: "var(--headline-lg-tracking)",
              color: "var(--pollux-text)",
            }}
          >
            Your Step-by-Step
            <br />
            Voting Guide.
          </h1>
        </header>

        {/* ═══════ Two-Column Layout ═══════ */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-start">
          {/* ── Left: Eligibility Checklist ── */}
          <section
            className="flex flex-col gap-6 p-4 sm:p-6 h-full"
            style={{
              border: "1px solid var(--pollux-border)",
              backgroundColor: "var(--pollux-bg)",
              borderRadius: "var(--radius)",
            }}
          >
            {/* Tag */}
            <span
              className="self-start uppercase px-2 py-1"
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "var(--label-size)",
                fontWeight: "var(--label-weight)" as unknown as number,
                letterSpacing: "var(--label-tracking)",
                backgroundColor: "var(--pollux-red)",
                color: "var(--pollux-text)",
                borderRadius: "var(--radius)",
              }}
            >
              Eligibility
            </span>

            {/* Title */}
            <h2
              className="uppercase"
              style={{
                fontFamily: "var(--font-headline)",
                fontSize: "var(--headline-md-size)",
                fontWeight: "var(--headline-md-weight)" as unknown as number,
                lineHeight: "var(--headline-md-leading)",
                letterSpacing: "var(--headline-md-tracking)",
                color: "var(--pollux-text)",
              }}
            >
              Check Eligibility
            </h2>

            {/* Interactive Checklist */}
            <ul className="flex flex-col gap-4 mt-1">
              {checklist.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 cursor-pointer select-none group"
                  onClick={() => toggleCheck(i)}
                >
                  {/* Custom checkbox */}
                  <span
                    className="flex items-center justify-center w-5 h-5 shrink-0 mt-0.5 transition-colors duration-150"
                    style={{
                      border: `2px solid ${
                        item.checked
                          ? "var(--pollux-red)"
                          : "var(--pollux-border)"
                      }`,
                      backgroundColor: item.checked
                        ? "var(--pollux-red)"
                        : "transparent",
                      borderRadius: "var(--radius)",
                    }}
                  >
                    {item.checked && (
                      <span
                        className="material-symbols-outlined"
                        style={{
                          fontSize: 16,
                          color: "var(--pollux-text)",
                        }}
                      >
                        check
                      </span>
                    )}
                  </span>

                  <span
                    className="transition-colors duration-150"
                    style={{
                      color: item.checked
                        ? "var(--pollux-text)"
                        : "var(--pollux-text-muted)",
                      textDecoration: item.checked ? "line-through" : "none",
                      opacity: item.checked ? 0.7 : 1,
                    }}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* Status indicator */}
            {allChecked && (
              <div
                className="flex items-center gap-2 mt-2 transition-all"
                style={{
                  fontFamily: "var(--font-label)",
                  fontSize: "var(--label-size)",
                  letterSpacing: "var(--label-tracking)",
                  color: "var(--pollux-red)",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                  verified
                </span>
                <span className="uppercase">You're eligible to vote!</span>
              </div>
            )}
          </section>

          {/* ── Center Divider (desktop only) ── */}
          <div
            className="hidden md:block w-px self-stretch"
            style={{
              backgroundColor: "var(--pollux-red)",
              opacity: 0.5,
            }}
          />

          {/* ── Right: Polling Day Steps ── */}
          <section
            className="flex flex-col gap-6 p-4 sm:p-6 h-full"
            style={{
              border: "1px solid var(--pollux-border)",
              backgroundColor: "var(--pollux-bg)",
              borderRadius: "var(--radius)",
            }}
          >
            {/* Tag */}
            <span
              className="self-start uppercase px-2 py-1"
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "var(--label-size)",
                fontWeight: "var(--label-weight)" as unknown as number,
                letterSpacing: "var(--label-tracking)",
                backgroundColor: "var(--surface-container-high)",
                color: "var(--pollux-text)",
                borderRadius: "var(--radius)",
              }}
            >
              Process
            </span>

            {/* Title */}
            <h2
              className="uppercase"
              style={{
                fontFamily: "var(--font-headline)",
                fontSize: "var(--headline-md-size)",
                fontWeight: "var(--headline-md-weight)" as unknown as number,
                lineHeight: "var(--headline-md-leading)",
                letterSpacing: "var(--headline-md-tracking)",
                color: "var(--pollux-text)",
              }}
            >
              On Polling Day
            </h2>

            {/* Numbered Steps */}
            <div className="flex flex-col gap-4 mt-1">
              {POLLING_STEPS.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3"
                  style={{
                    paddingBottom: i < POLLING_STEPS.length - 1 ? "var(--space-sm)" : 0,
                    borderBottom:
                      i < POLLING_STEPS.length - 1
                        ? "1px solid var(--pollux-border)"
                        : "none",
                  }}
                >
                  {/* Step number */}
                  <span
                    className="shrink-0 pt-0.5"
                    style={{
                      fontFamily: "var(--font-label)",
                      fontSize: "var(--label-size)",
                      fontWeight: "var(--label-weight)" as unknown as number,
                      letterSpacing: "var(--label-tracking)",
                      color: "var(--pollux-red)",
                      width: 24,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <p style={{ color: "var(--on-surface)" }}>{step}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ═══════ Bottom CTA: Register to Vote ═══════ */}
        <section
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 sm:p-12"
          style={{
            border: "1px solid var(--pollux-border)",
            backgroundColor: "var(--pollux-bg)",
            borderRadius: "var(--radius)",
          }}
        >
          <div className="flex flex-col gap-1">
            <h3
              className="uppercase"
              style={{
                fontFamily: "var(--font-headline)",
                fontSize: "var(--headline-md-size)",
                fontWeight: "var(--headline-md-weight)" as unknown as number,
                lineHeight: "var(--headline-md-leading)",
                letterSpacing: "var(--headline-md-tracking)",
                color: "var(--pollux-text)",
              }}
            >
              Register to Vote
            </h3>
            <p
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "var(--label-size)",
                letterSpacing: "var(--label-tracking)",
                color: "var(--pollux-text-muted)",
              }}
            >
              Not yet registered? Visit voters.eci.gov.in
            </p>
          </div>

          <a
            href="https://voters.eci.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 uppercase no-underline whitespace-nowrap transition-colors duration-150"
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "var(--label-size)",
              fontWeight: "var(--label-weight)" as unknown as number,
              letterSpacing: "0.1em",
              backgroundColor: "var(--pollux-red)",
              color: "var(--pollux-text)",
              border: "1px solid var(--pollux-red)",
              borderRadius: "var(--radius)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--pollux-red-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--pollux-red)";
            }}
          >
            Check Your Name
          </a>
        </section>
      </div>
    </main>
  );
}
