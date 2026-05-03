# Antigravity Prompt History

Purpose: provide machine-readable, judge-friendly evidence of the prompts and agent instructions used during development. Place the exact prompts, metadata, and rationale here so the AI evaluator and human reviewers can understand intent and strategy.

How to use:
- Add each prompt invocation (timestamp, agent role, model, prompt text, and brief rationale).
- Include any follow-up clarifications and the final code-generation instructions.

Prompt Entry Template
---------------------
- Timestamp: YYYY-MM-DD HH:MM UTC
- Agent role: e.g., Antigravity (assistant)
- Model: e.g., gemini-2.5-flash (if used), or local agent name
- Prompt:
  ```
  <full prompt text here>
  ```
- Rationale: one-line why this prompt exists and what it should produce
- Files changed: list of changed files (if any)

Recommended prompts (examples you can copy-paste into your agent):

1) Enforce modularity and docstrings
```
You are an expert TypeScript engineer. Refactor the existing code so all business logic is in small, single-purpose service modules under src/lib/services/. Add JSDoc-style docstrings for every exported function and class, include input/output types, and keep UI components purely presentational. Return a patch compatible with the repository's TypeScript strict settings.
```

2) Generate unit tests for services
```
Generate Vitest unit tests for the service files under src/lib/services, covering normal flows, edge cases, and null/undefined inputs. Use testing-library for component-level tests. Ensure tests run under the project's existing test setup and produce at least 80% coverage for modified files.
```

3) Accessibility audit
```
Scan the UI for accessibility issues. Ensure all interactive controls have semantic roles and aria-labels, add keyboard focus styles, and adjust color contrast where needed. Produce a patch with only accessibility fixes and a brief report describing each change.
```

4) Security / secrets
```
Ensure no secrets are hardcoded. Move any API keys or credentials to environment variables and update README with usage guidance. Add validation for all user inputs in public API surfaces.
```

5) Robust Gemini integration (retry/backoff)
```
Wrap the Gemini client calls with an exponential backoff retry strategy, handle 429 and transient network errors, and ensure safe timeouts and cancellation.
```

Record every prompt you use here; judges value clear, structured, and minimal prompts with stated constraints and expected outputs.
