# ⚡ POLLUX — AI-Powered Election Guide

> An interactive web application that helps users understand the Indian election process, timelines, and voting steps with the power of Google Gemini AI.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)
![Firebase](https://img.shields.io/badge/Firebase-Analytics-orange?logo=firebase)
![Gemini](https://img.shields.io/badge/Gemini_AI-2.0_Flash-green?logo=google)

---

## 📋 Problem Statement

Create an assistant that helps users understand the election process, timelines, and steps in an interactive and easy-to-follow way.

## 🎯 Solution

**POLLUX** is a brutalist-themed, fully responsive web app that serves as a one-stop election guide for Indian citizens. It combines structured content (timeline, voter guide) with a real-time AI assistant powered by Google Gemini to answer any election-related question instantly.

---

## 🖥️ Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Hero section with feature overview and quick-access bento grid |
| **Election Timeline** | `/timeline` | Interactive 6-phase election timeline with expand/collapse details |
| **Voter Guide** | `/guide` | Two-column eligibility checklist + polling day steps |
| **AI Assistant** | `/assistant` | Real-time chat powered by Gemini AI with suggested questions |

---

## 🏗️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 19 + TypeScript | Component architecture with strict type safety |
| **Build Tool** | Vite 8 | Fast dev server, HMR, and optimized production builds |
| **Styling** | Tailwind CSS 4 + CSS Variables | Design token system with "Pollux Noir" theme |
| **Routing** | React Router 7 | Client-side SPA navigation |
| **AI Engine** | Google Gemini 2.0 Flash | Real-time election Q&A with system instruction guardrails |
| **Analytics** | Firebase Analytics | Page view tracking and AI usage metrics |
| **Design System** | Google Stitch | UI screens designed in Stitch and converted to React |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A **Google Gemini API key** ([Get one here](https://aistudio.google.com/apikey))
- A **Firebase project** ([Create one here](https://console.firebase.google.com/))

### Installation

```bash
# 1. Clone the repository
git clone <repo-url> (url of the repo)
cd pollux

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
```

### Environment Variables

Edit `.env` with your actual keys:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id_here
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
pollux/
├── index.html                  # Entry HTML with CSP headers
├── .env                        # Environment variables (git-ignored)
├── .env.example                # Template for env setup
├── vite.config.ts              # Vite + Tailwind plugin config
├── tsconfig.json               # TypeScript configuration
├── eslint.config.js            # ESLint rules
│
├── public/                     # Static assets
│
└── src/
    ├── main.tsx                # React entry point (StrictMode)
    ├── App.tsx                 # Router + ErrorBoundary + lazy loading
    ├── index.css               # Tailwind imports + design tokens
    │
    ├── components/
    │   ├── Layout.tsx          # Shared header, footer, mobile nav
    │   └── ErrorBoundary.tsx   # Graceful crash recovery
    │
    ├── lib/
    │   ├── gemini.ts           # Gemini AI client + sanitization + rate limiting
    │   └── firebase.ts         # Firebase Analytics initialization
    │
    ├── pages/
    │   ├── Home.tsx            # Landing page with hero + feature grid
    │   ├── Timeline.tsx        # Interactive election phases timeline
    │   ├── Guide.tsx           # Voter eligibility checklist + polling steps
    │   └── AIAssistant.tsx     # Chat UI with markdown rendering
    │
    └── styles/
        └── globals.css         # CSS custom properties (design tokens)
```

---

## 🔒 Security

POLLUX implements defense-in-depth security across multiple layers:

### Content Security Policy (CSP)
- `script-src 'self'` — blocks inline scripts and third-party JS injection
- `connect-src` — restricts API calls to Google services only
- `frame-ancestors 'none'` — prevents clickjacking via iframes

### Input Protection
- **Sanitization** — Control characters stripped, 500-character limit enforced
- **Rate Limiting** — Max 10 AI requests per minute (client-side)
- **XSS Prevention** — HTML entities escaped before markdown rendering; `javascript:` / `data:` URIs blocked in link allowlist

### AI Safety
- **Prompt Injection Defense** — System instruction blocks role-override attempts, off-topic queries, code output, and instruction disclosure
- **Low Temperature** — `temperature: 0.3` reduces hallucination
- **Token Cap** — `maxOutputTokens: 300` prevents response abuse

### Environment
- `.env` files are git-ignored — API keys never enter version control
- `rel="noopener noreferrer"` on all external links

---

## ♿ Accessibility

- **Skip-to-content** link for keyboard navigation
- **ARIA landmarks** — `role="banner"`, `role="main"`, `role="contentinfo"`
- **`aria-current="page"`** on active navigation items
- **`aria-label`** on all interactive elements
- **`aria-live="polite"`** on chat message region
- **`aria-hidden`** on decorative icons
- Dynamic **`document.title`** updates per route

---

## ⚡ Performance

- **Code Splitting** — `React.lazy()` + `Suspense` for all 4 pages
- **Tree Shaking** — Vite automatically removes unused code
- **Preconnect** — Google Fonts loaded via `rel="preconnect"`
- **Minimal Bundle** — Each page is a separate chunk:
  - Home: ~4.4 KB gzipped
  - Timeline: ~7.7 KB gzipped
  - Guide: ~6.6 KB gzipped
  - AI Assistant: ~30 KB gzipped (includes chat logic)

---

## 🔥 Google Services Integration

| Service | Usage |
|---------|-------|
| **Gemini 2.0 Flash** | Powers the AI Assistant with election-specific knowledge |
| **Firebase Analytics** | Tracks page views, AI question events, response metrics |
| **Google Fonts** | Inter (body) + Space Grotesk (headlines) |
| **Material Symbols** | Icon system for navigation and UI elements |
| **Google Stitch** | Design system and screen prototyping |

---

## 🧪 Quality Checks

```bash
# TypeScript type checking
npx tsc --noEmit

# ESLint
npm run lint

# Dependency audit
npm audit

# Production build validation
npm run build
```

All checks pass with **0 errors, 0 warnings, 0 vulnerabilities**.

---

## 🎨 Design System — Pollux Noir

| Token | Value | Usage |
|-------|-------|-------|
| `--pollux-bg` | `#0A0A0F` | App background |
| `--pollux-red` | `#E63946` | Primary accent, buttons, links |
| `--pollux-text` | `#F1FAEE` | Primary text |
| `--pollux-border` | `#23232A` | Borders, dividers |
| `--radius` | `0px` | Brutalist — no rounded corners |
| Font (Headline) | Space Grotesk | Bold, uppercase headlines |
| Font (Body) | Inter | Clean, readable body text |

---

## 📜 License

This project was built for the Prompt Wars hackathon. All rights reserved.

---

<p align="center">
  <strong>⚡ POLLUX</strong> — Powered by Gemini AI + Google Firebase
</p>
