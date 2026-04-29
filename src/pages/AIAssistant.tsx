import { useState, useRef, useEffect, type FormEvent } from "react";
import { askElectionQuestion } from "../lib/gemini";

/**
 * Converts basic markdown from Gemini responses into safe HTML.
 * Handles: **bold**, *italic*, `code`, [links](url), and line breaks.
 *
 * Security:
 *  - HTML entities are escaped FIRST to neutralize raw HTML injection.
 *  - Links are validated against an allowlist of safe protocols.
 *  - Quotes are escaped to prevent attribute breakout.
 */
const SAFE_PROTOCOLS = /^(https?:\/\/|mailto:)/i;

function sanitizeUrl(url: string): string {
  const decoded = url.replace(/&amp;/g, "&");
  if (SAFE_PROTOCOLS.test(decoded)) return url;
  return "#"; // block javascript:, data:, vbscript:, etc.
}

function renderMarkdown(text: string): string {
  return text
    // 1. Escape HTML entities (MUST be first)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    // 2. Bold: **text**
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--pollux-text);font-weight:700">$1</strong>')
    // 3. Italic: *text* (not preceded/followed by *)
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
    // 4. Inline code: `text`
    .replace(/`(.+?)`/g, '<code style="background:var(--surface-container);padding:2px 6px;font-size:0.85em">$1</code>')
    // 5. Links: [text](url) — with protocol allowlist
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      (_match, label: string, url: string) =>
        `<a href="${sanitizeUrl(url)}" target="_blank" rel="noopener noreferrer" style="color:var(--pollux-red);text-decoration:underline">${label}</a>`
    )
    // 6. Line breaks
    .replace(/\n/g, "<br/>");
}

/**
 * POLLUX AI Assistant — converted from stitch-screens/code/3_POLLUX_AI_Assistant.html
 *
 * Sidebar with 4 suggested question pills.
 * Full chat UI: user bubbles (right, red), AI bubbles (left, bordered).
 * Wired to askElectionQuestion() from gemini.ts.
 */

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "When is the next Lok Sabha election?",
  "How do I register to vote?",
  "What is Model Code of Conduct?",
  "How does EVM voting work?",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    // Show user bubble immediately
    const userMsg: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await askElectionQuestion(trimmed);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't get a response. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (q: string) => {
    sendMessage(q);
  };

  return (
    <div
      className="flex-grow flex overflow-hidden"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* ═══════ Sidebar — Suggested Questions (desktop) ═══════ */}
      <aside
        className="hidden md:flex flex-col w-[260px] shrink-0 overflow-y-auto p-4"
        style={{
          backgroundColor: "var(--pollux-bg)",
          borderRight: "1px solid var(--pollux-border)",
        }}
      >
        {/* Suggestions */}
        <div className="mb-8">
          <h2
            className="uppercase mb-4"
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "var(--label-size)",
              fontWeight: "var(--label-weight)" as unknown as number,
              letterSpacing: "var(--label-tracking)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Suggested Questions
          </h2>
          <div className="flex flex-col gap-3">
            {SUGGESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSuggestion(q)}
                disabled={loading}
                className="text-left w-full p-3 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "var(--pollux-bg)",
                  border: "1px solid var(--pollux-border)",
                  borderLeft: "2px solid var(--pollux-red)",
                  borderRadius: "var(--radius)",
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  lineHeight: "1.4",
                  color: "rgba(255,255,255,0.8)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--pollux-border)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--pollux-bg)";
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom identity block */}
        <div
          className="mt-auto pt-6"
          style={{ borderTop: "1px solid var(--pollux-border)" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span
              className="material-symbols-outlined fill"
              style={{ color: "var(--pollux-red)" }}
            >
              chat
            </span>
            <div>
              <div
                className="text-sm font-bold"
                style={{ color: "var(--pollux-text)" }}
              >
                POLLUX AI
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                Voter Intelligence
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setMessages([]);
              setInput("");
            }}
            className="w-full mt-2 py-2 uppercase transition-colors duration-150"
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "var(--label-size)",
              letterSpacing: "var(--label-tracking)",
              border: "1px solid var(--pollux-text)",
              color: "var(--pollux-text)",
              backgroundColor: "transparent",
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
            New Analysis
          </button>
        </div>
      </aside>

      {/* ═══════ Main Chat Area ═══════ */}
      <main
        className="flex-1 flex flex-col relative overflow-hidden"
        style={{ backgroundColor: "var(--pollux-bg)" }}
      >
        {/* ── Chat Header ── */}
        <div
          className="p-4 sm:p-6 flex justify-between items-center shrink-0 z-10"
          style={{
            backgroundColor: "rgba(10,10,15,0.9)",
            borderBottom: "1px solid var(--pollux-border)",
            backdropFilter: "blur(8px)",
          }}
        >
          <h1
            className="flex items-center gap-2 uppercase"
            style={{
              fontFamily: "var(--font-headline)",
              fontSize: "clamp(20px, 3vw, var(--headline-md-size))",
              fontWeight: "var(--headline-md-weight)" as unknown as number,
              letterSpacing: "var(--headline-md-tracking)",
              color: "var(--pollux-text)",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ color: "var(--pollux-red)" }}
            >
              electric_bolt
            </span>
            AI Assistant
          </h1>
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1"
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "var(--label-size)",
              letterSpacing: "var(--label-tracking)",
              border: "1px solid var(--pollux-border)",
              color: "rgba(255,255,255,0.6)",
              borderRadius: "var(--radius)",
            }}
          >
            <span
              className="block w-2 h-2"
              style={{ backgroundColor: "var(--pollux-red)" }}
            />
            Powered by Gemini
          </div>
        </div>

        {/* ── Scrollable Messages ── */}
        <div
          className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 pb-40"
          role="log"
          aria-label="Chat messages"
          aria-live="polite"
        >
          {/* Empty state — mobile suggestions */}
          {messages.length === 0 && (
            <>
              {/* Connection badge */}
              <div className="flex justify-center">
                <span
                  className="uppercase px-3 py-1"
                  style={{
                    fontFamily: "var(--font-label)",
                    fontSize: "var(--label-size)",
                    letterSpacing: "var(--label-tracking)",
                    color: "rgba(255,255,255,0.4)",
                    border: "1px solid var(--pollux-border)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  Secure Connection Established
                </span>
              </div>

              {/* Mobile suggestions */}
              <div className="md:hidden space-y-3">
                <h2
                  className="uppercase"
                  style={{
                    fontFamily: "var(--font-label)",
                    fontSize: "var(--label-size)",
                    letterSpacing: "var(--label-tracking)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  Suggested Questions
                </h2>
                {SUGGESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestion(q)}
                    disabled={loading}
                    className="text-left w-full p-3 text-sm transition-colors"
                    style={{
                      backgroundColor: "var(--pollux-bg)",
                      border: "1px solid var(--pollux-border)",
                      borderLeft: "2px solid var(--pollux-red)",
                      color: "rgba(255,255,255,0.8)",
                      borderRadius: "var(--radius)",
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Chat messages */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex w-full ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex gap-3 sm:gap-4 ${
                  msg.role === "user"
                    ? "max-w-[85%] md:max-w-[60%]"
                    : "max-w-[90%] md:max-w-[70%]"
                }`}
              >
                {/* AI avatar */}
                {msg.role === "assistant" && (
                  <div
                    className="w-8 h-8 shrink-0 flex items-center justify-center"
                    style={{
                      backgroundColor: "var(--pollux-red)",
                      border: "1px solid var(--pollux-red)",
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: 14, color: "var(--pollux-text)" }}
                    >
                      smart_toy
                    </span>
                  </div>
                )}

                {/* Message bubble */}
                <div
                  className="p-4 text-sm leading-relaxed relative"
                  style={
                    msg.role === "user"
                      ? {
                          backgroundColor: "var(--pollux-red)",
                          color: "var(--pollux-text)",
                          borderRadius: "var(--radius)",
                        }
                      : {
                          backgroundColor: "var(--pollux-bg)",
                          border: "1px solid var(--pollux-border)",
                          color: "rgba(255,255,255,0.9)",
                          borderRadius: "var(--radius)",
                        }
                  }
                >
                  {/* Verified Source label */}
                  {msg.role === "assistant" && (
                    <div
                      className="absolute -top-3 -left-1 px-1"
                      style={{ backgroundColor: "var(--pollux-bg)" }}
                    >
                      <span
                        className="uppercase"
                        style={{
                          fontFamily: "var(--font-label)",
                          fontSize: 10,
                          letterSpacing: "0.1em",
                          color: "var(--pollux-red)",
                        }}
                      >
                        Verified Source
                      </span>
                    </div>
                  )}
                  {msg.role === "assistant" ? (
                    <div
                      className="prose-pollux"
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                    />
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>

                {/* User avatar */}
                {msg.role === "user" && (
                  <div
                    className="w-8 h-8 shrink-0 flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: "var(--pollux-text)",
                      color: "var(--pollux-bg)",
                    }}
                  >
                    U
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-start w-full">
              <div className="flex gap-3 sm:gap-4 max-w-[90%] md:max-w-[70%]">
                <div
                  className="w-8 h-8 shrink-0 flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--pollux-red)",
                    border: "1px solid var(--pollux-red)",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 14, color: "var(--pollux-text)" }}
                  >
                    smart_toy
                  </span>
                </div>
                <div
                  className="p-4 text-sm flex items-center gap-1"
                  style={{
                    border: "1px solid var(--pollux-border)",
                    color: "rgba(255,255,255,0.6)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  <span className="inline-block w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "var(--pollux-red)", animationDelay: "0ms" }} />
                  <span className="inline-block w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "var(--pollux-red)", animationDelay: "150ms" }} />
                  <span className="inline-block w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "var(--pollux-red)", animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ── Input Area ── */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4 sm:p-6"
          style={{
            background:
              "linear-gradient(to top, var(--pollux-bg) 60%, transparent)",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto relative flex items-center"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about elections..."
              disabled={loading}
              aria-label="Type your election question"
              autoComplete="off"
              maxLength={500}
              className="w-full p-4 pr-16 transition-colors"
              style={{
                backgroundColor: "var(--pollux-bg)",
                border: "1px solid var(--pollux-border)",
                color: "var(--pollux-text)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--body-size)",
                borderRadius: "var(--radius)",
                outline: "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--pollux-red)";
                e.currentTarget.style.boxShadow =
                  "0 0 0 1px var(--pollux-red)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--pollux-border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-2 top-2 bottom-2 px-4 flex items-center justify-center transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "var(--pollux-red)",
                color: "var(--pollux-text)",
                border: "1px solid transparent",
                borderRadius: "var(--radius)",
              }}
              onMouseEnter={(e) => {
                if (!loading && input.trim()) {
                  e.currentTarget.style.backgroundColor = "var(--pollux-text)";
                  e.currentTarget.style.color = "var(--pollux-bg)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--pollux-red)";
                e.currentTarget.style.color = "var(--pollux-text)";
              }}
            >
              <span className="material-symbols-outlined" aria-hidden="true">send</span>
            </button>
          </form>
          <div className="max-w-4xl mx-auto mt-2 text-center">
            <p
              className="uppercase"
              style={{
                fontFamily: "var(--font-label)",
                fontSize: 10,
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              AI responses may contain inaccuracies. Verify official data.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
