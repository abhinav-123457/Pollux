import { useState } from "react";

/**
 * POLLUX Election Timeline — converted from stitch-screens/code/2_POLLUX_Election_Timeline.html
 *
 * Vertical red timeline with 6 election phases.
 * Click any phase to expand 2-3 detail sentences. Hover adds red left border + bg lift.
 */

interface Phase {
  num: number;
  title: string;
  desc: string;
  week: string;
  highlight?: boolean;
  details: string[];
}

const PHASES: Phase[] = [
  {
    num: 1,
    title: "Election Announcement",
    desc: "Election Commission sets dates, Model Code of Conduct begins",
    week: "WEEK 1",
    details: [
      "The Election Commission of India (ECI) announces the schedule for upcoming elections, including key dates for nominations, voting, and counting.",
      "The Model Code of Conduct (MCC) comes into effect immediately, restricting government announcements and new policy decisions.",
      "Political parties begin strategizing and selecting candidates for their respective constituencies.",
    ],
  },
  {
    num: 2,
    title: "Voter Registration Closes",
    desc: "Final date to register on electoral rolls",
    week: "WEEK 2",
    details: [
      "Citizens can verify their registration status on voters.eci.gov.in using their EPIC number or personal details.",
      "New voter registrations and corrections to existing entries must be submitted before the deadline.",
      "Special registration drives are conducted in remote areas to ensure maximum electoral participation.",
    ],
  },
  {
    num: 3,
    title: "Candidate Nomination",
    desc: "Parties file candidates, scrutiny and withdrawal period",
    week: "WEEK 3-4",
    details: [
      "Candidates file nomination papers with the Returning Officer along with a security deposit and affidavit of assets.",
      "Scrutiny of nominations takes place to verify eligibility, criminal records, and financial disclosures.",
      "Candidates may withdraw their nominations up to 3 days after the scrutiny date.",
    ],
  },
  {
    num: 4,
    title: "Campaign Period",
    desc: "Rallies, manifesto releases, 48hr silence before polling",
    week: "WEEK 5-6",
    details: [
      "Parties release manifestos outlining their governance agenda, social programs, and economic policies.",
      "Campaigning must cease 48 hours before polling day — the 'silence period' — to allow voters to reflect.",
      "The ECI monitors campaign spending and enforces limits per candidate as per the Representation of the People Act.",
    ],
  },
  {
    num: 5,
    title: "Polling Day",
    desc: "EVM voting, VVPAT verification, exit polls released after close",
    week: "WEEK 7",
    highlight: true,
    details: [
      "Voters authenticate their identity at polling booths and cast votes on Electronic Voting Machines (EVMs).",
      "The Voter Verifiable Paper Audit Trail (VVPAT) prints a slip for each vote, providing a physical verification layer.",
      "Exit polls are released after the last phase of voting concludes, offering early projections of results.",
    ],
  },
  {
    num: 6,
    title: "Results & Formation",
    desc: "Vote counting, winner declared, government formation begins",
    week: "WEEK 8-10",
    details: [
      "Counting of votes happens simultaneously across all constituencies under strict security and observer supervision.",
      "The party or coalition securing a majority of seats (272 in Lok Sabha) is invited by the President to form the government.",
      "Elected representatives take the oath of office, and the new Council of Ministers is sworn in.",
    ],
  },
];

export default function Timeline() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (num: number) => {
    setExpanded((prev) => (prev === num ? null : num));
  };

  return (
    <main
      className="flex-grow w-full"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* ═══════ Title Section ═══════ */}
        <div className="mb-12 md:mb-16">
          <span
            className="uppercase mb-4 block"
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "var(--label-size)",
              fontWeight: "var(--label-weight)" as unknown as number,
              letterSpacing: "var(--label-tracking)",
              color: "var(--pollux-text-muted)",
            }}
          >
            Election Process
          </span>
          <h1
            className="uppercase whitespace-pre-line"
            style={{
              fontFamily: "var(--font-headline)",
              fontSize: "clamp(32px, 5vw, var(--headline-lg-size))",
              fontWeight: "var(--headline-lg-weight)" as unknown as number,
              lineHeight: "var(--headline-lg-leading)",
              letterSpacing: "var(--headline-lg-tracking)",
              color: "var(--pollux-text)",
            }}
          >
            {"From Announcement\nto Results."}
          </h1>
          <p
            className="mt-4 max-w-2xl"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--body-size)",
              lineHeight: "var(--body-leading)",
              color: "var(--pollux-text-muted)",
            }}
          >
            Track every phase of a general election in sequence.
          </p>
        </div>

        {/* ═══════ Timeline ═══════ */}
        <div className="relative">
          {/* Vertical red line */}
          <div
            className="absolute hidden sm:block top-4 bottom-4 w-0.5"
            style={{
              left: 24,
              backgroundColor: "var(--pollux-red)",
            }}
          />

          {/* Phases */}
          <div className="space-y-6">
            {PHASES.map((phase) => {
              const isExpanded = expanded === phase.num;
              const isHighlight = phase.highlight;

              return (
                <div
                  key={phase.num}
                  className="relative flex items-start group"
                >
                  {/* Numbered dot on timeline */}
                  <div
                    className="hidden sm:flex absolute items-center justify-center w-6 h-6 z-10"
                    style={{
                      left: 12,
                      top: 24,
                      backgroundColor: "var(--pollux-bg)",
                      border: "2px solid var(--pollux-red)",
                      fontFamily: "var(--font-label)",
                      fontSize: 10,
                      color: "var(--pollux-red)",
                    }}
                  >
                    {phase.num}
                  </div>

                  {/* Phase card */}
                  <div
                    className="w-full sm:ml-16 cursor-pointer transition-all duration-200"
                    onClick={() => toggle(phase.num)}
                    style={{
                      backgroundColor: isHighlight
                        ? "var(--surface-variant)"
                        : "var(--surface-dim)",
                      border: `1px solid ${
                        isExpanded
                          ? "var(--pollux-red)"
                          : "var(--pollux-border)"
                      }`,
                      borderLeft: isExpanded || isHighlight
                        ? "4px solid var(--pollux-red)"
                        : `1px solid ${
                            isExpanded
                              ? "var(--pollux-red)"
                              : "var(--pollux-border)"
                          }`,
                      borderRadius: "var(--radius)",
                      padding: "var(--space-md)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isExpanded) {
                        e.currentTarget.style.borderColor = "var(--pollux-red)";
                        e.currentTarget.style.borderLeft =
                          "4px solid var(--pollux-red)";
                        e.currentTarget.style.backgroundColor =
                          "var(--surface-variant)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isExpanded) {
                        e.currentTarget.style.borderColor =
                          isHighlight
                            ? "var(--pollux-red)"
                            : "var(--pollux-border)";
                        e.currentTarget.style.borderLeft =
                          isHighlight
                            ? "4px solid var(--pollux-red)"
                            : "1px solid var(--pollux-border)";
                        e.currentTarget.style.backgroundColor =
                          isHighlight
                            ? "var(--surface-variant)"
                            : "var(--surface-dim)";
                      }
                    }}
                  >
                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        {/* Mobile-only number badge */}
                        <span
                          className="sm:hidden flex items-center justify-center w-6 h-6 shrink-0"
                          style={{
                            border: "2px solid var(--pollux-red)",
                            fontFamily: "var(--font-label)",
                            fontSize: 10,
                            color: "var(--pollux-red)",
                          }}
                        >
                          {phase.num}
                        </span>
                        <h3
                          className="uppercase"
                          style={{
                            fontFamily: "var(--font-headline)",
                            fontSize: "clamp(18px, 2.5vw, 20px)",
                            fontWeight: "var(--headline-md-weight)" as unknown as number,
                            color: "var(--pollux-text)",
                          }}
                        >
                          {phase.title}
                        </h3>
                      </div>
                      <span
                        className="inline-block shrink-0 uppercase"
                        style={{
                          fontFamily: "var(--font-label)",
                          fontSize: "var(--label-size)",
                          fontWeight: "var(--label-weight)" as unknown as number,
                          letterSpacing: "var(--label-tracking)",
                          backgroundColor: "var(--pollux-red)",
                          color: "var(--pollux-text)",
                          padding: "4px 12px",
                          borderRadius: "var(--radius)",
                        }}
                      >
                        {phase.week}
                      </span>
                    </div>

                    {/* Brief description */}
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                        lineHeight: "var(--body-leading)",
                        color: "var(--pollux-text-muted)",
                      }}
                    >
                      {phase.desc}
                    </p>

                    {/* Expand/collapse indicator */}
                    <div
                      className="flex items-center gap-1 mt-3"
                      style={{
                        fontFamily: "var(--font-label)",
                        fontSize: "var(--label-size)",
                        letterSpacing: "var(--label-tracking)",
                        color: "var(--pollux-red)",
                      }}
                    >
                      <span
                        className="material-symbols-outlined transition-transform duration-200"
                        style={{
                          fontSize: 16,
                          transform: isExpanded
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      >
                        expand_more
                      </span>
                      <span className="uppercase">
                        {isExpanded ? "Collapse" : "Details"}
                      </span>
                    </div>

                    {/* ── Expanded Details ── */}
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{
                        maxHeight: isExpanded ? "500px" : "0px",
                        opacity: isExpanded ? 1 : 0,
                        marginTop: isExpanded ? "var(--space-md)" : "0",
                      }}
                    >
                      <div
                        className="pt-4 space-y-3"
                        style={{
                          borderTop: "1px solid var(--pollux-border)",
                        }}
                      >
                        {phase.details.map((detail, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span
                              className="shrink-0 mt-1"
                              style={{
                                width: 6,
                                height: 6,
                                backgroundColor: "var(--pollux-red)",
                                display: "block",
                              }}
                            />
                            <p
                              style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "14px",
                                lineHeight: "1.7",
                                color: "var(--on-surface)",
                              }}
                            >
                              {detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
