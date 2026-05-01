import { describe, it, expect } from 'vitest';
import { renderMarkdown, sanitizeUrl } from './markdown';

describe('Markdown Security & Rendering', () => {
  describe('sanitizeUrl', () => {
    it('allows https URLs', () => {
      const result = sanitizeUrl('https://example.com');
      expect(result).toBe('https://example.com');
    });

    it('allows http URLs', () => {
      const result = sanitizeUrl('http://example.com');
      expect(result).toBe('http://example.com');
    });

    it('allows mailto links', () => {
      const result = sanitizeUrl('mailto:test@example.com');
      expect(result).toBe('mailto:test@example.com');
    });

    it('blocks javascript: protocol', () => {
      const result = sanitizeUrl('javascript:alert("xss")');
      expect(result).toBe('#');
    });

    it('blocks data: URLs', () => {
      const result = sanitizeUrl('data:text/html,<script>alert("xss")</script>');
      expect(result).toBe('#');
    });

    it('blocks vbscript: URLs', () => {
      const result = sanitizeUrl('vbscript:msgbox("xss")');
      expect(result).toBe('#');
    });
  });

  describe('renderMarkdown', () => {
    it('escapes HTML entities first', () => {
      const result = renderMarkdown('Testing <script>alert("xss")</script>');
      expect(result).toContain('&lt;script&gt;');
      expect(result).not.toContain('<script>');
    });

    it('renders bold text', () => {
      const result = renderMarkdown('**bold text**');
      expect(result).toContain('<strong');
      expect(result).toContain('bold text</strong>');
    });

    it('renders italic text', () => {
      const result = renderMarkdown('*italic text*');
      expect(result).toContain('<em>italic text</em>');
    });

    it('renders inline code', () => {
      const result = renderMarkdown('Use `const x = 5` in code');
      expect(result).toContain('<code');
      expect(result).toContain('const x = 5</code>');
    });

    it('renders links with safe URLs', () => {
      const result = renderMarkdown('[Click here](https://voters.eci.gov.in)');
      expect(result).toContain('href="https://voters.eci.gov.in"');
      expect(result).toContain('target="_blank"');
      expect(result).toContain('rel="noopener noreferrer"');
    });

    it('sanitizes links with unsafe URLs', () => {
      const result = renderMarkdown('[Click here](javascript:alert("xss"))');
      expect(result).toContain('href="#"');
    });

    it('converts newlines to br tags', () => {
      const result = renderMarkdown('Line 1\nLine 2');
      expect(result).toContain('<br/>');
    });
  });
});
