/**
 * Markdown rendering utilities for safe HTML output from Gemini responses.
 * IMPORTANT: This is a UTILITY module, not a React component.
 * 
 * Security:
 *  - HTML entities are escaped FIRST to neutralize raw HTML injection.
 *  - Links are validated against an allowlist of safe protocols.
 *  - Quotes are escaped to prevent attribute breakout.
 */

const SAFE_PROTOCOLS = /^(https?:\/\/|mailto:)/i;

export function sanitizeUrl(url: string): string {
  const decoded = url.replace(/&amp;/g, '&');
  if (SAFE_PROTOCOLS.test(decoded)) return url;
  return '#'; // block javascript:, data:, vbscript:, etc.
}

export function renderMarkdown(text: string): string {
  return text
    // 1. Escape HTML entities (MUST be first)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    // 2. Bold: **text**
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--pollux-text);font-weight:700">$1</strong>')
    // 3. Italic: *text* (not preceded/followed by *)
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
    // 4. Inline code: `text`
    .replace(/`(.+?)`/g, '<code style="background:var(--surface-container);padding:2px 6px;font-size:0.85em">$1</code>')
    // 5. Links: [text](url) — with protocol allowlist
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      (_match, label: string, url: string) =>
        `<a href="${sanitizeUrl(url)}" target="_blank" rel="noopener noreferrer" style="color:var(--pollux-red);text-decoration:underline">${label}</a>`
    )
    // 6. Line breaks
    .replace(/\n/g, '<br/>');
}
