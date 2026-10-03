# SkillPath Implementation Plan

## Product intent
SkillPath students ke scattered learning goals ko ek structured, copy-ready AI roadmap prompt mein translate karta hai. It is a client-only utility: no AI API, account, backend, database, or fake generation layer.

## Design direction

- **Design movement:** Gitingest-inspired technical editorial dashboard: utilitarian, crisp, token-led, and content-first rather than decorative SaaS.
- **Core principles:**
  1. One clear decision per step; dense information is broken into calm, scannable panels.
  2. Strong visual hierarchy through near-black type, warm paper surfaces, and pale-blue form blocks.
  3. Every interaction is explicit: visible progress, clear validation, labelled actions, and honest client-side generation language.
  4. Small screens are first-class: controls stack, cards remain readable, and prompt output stays editable.
- **Color philosophy:** Warm paper tones make a technical tool feel approachable; pale blue marks active/input context; black text and dark ink controls deliver confident contrast; amber is reserved for validation and notices.
- **Layout paradigm:** A narrow left rail establishes the product/workflow context while a wide, asymmetric workbench holds the active step. On mobile the rail compresses into a top strip and the workbench becomes a single scroll flow.
- **Signature elements:** a two-tone square mark made of offset blocks, 3px hard-edged shadows on key actions/cards, and compact mono eyebrow labels that feel like implementation metadata.
- **Interaction philosophy:** Actions feel immediate and grounded. Hover shifts the hard shadow by one pixel, focus-visible uses a clear blue ring, selected choices fill with ink/blue rather than relying on a checkmark alone, and every step saves silently to localStorage.
- **Animation:** 150ms–300ms transitions only; page/step content uses a short upward fade, the progress bar eases, and generation uses a restrained shimmer/spinner. No bouncing or distracting continuous motion.
- **Typography system:** ui-sans-serif, system-ui, sans-serif for all copy with uppercase mono-like eyebrow labels via letter spacing. Hero title is responsive and tight; body stays 16px/24px. Prompt output uses a readable 15px line-height with deliberate whitespace.
- **Brand essence:** The practical prompt builder for students who want a realistic learning path, not vague AI advice. Personality: direct, optimistic, technical.
- **Brand voice:** Headlines are concise and outcome-led; CTAs describe the next action. Examples: “Turn a skill goal into a plan.” and “Build the prompt I can actually use.”
- **Wordmark/logo:** “SP” split-square mark plus a bold SkillPath wordmark; the mark uses an offset blue block to signal the path from input to output.
- **Signature brand color:** #1d4ed8 cobalt blue, used sparingly for active progress and the primary action.

## Application architecture

- `src/App.tsx`: app state machine, step navigation, persistence, generation, and screen composition.
- `src/types.ts`: strongly typed form, platform, step, and toast contracts.
- `src/lib/promptGenerator.ts`: pure prompt-building function. It receives form data and selected platform and returns a complete prompt string without hardcoded student answers.
- `src/lib/storage.ts`: localStorage read/write/clear helpers with safe browser guards.
- `src/components/BrandMark.tsx`: reusable SkillPath mark/wordmark.
- `src/components/ProgressRail.tsx`: desktop rail and compact mobile progress header.
- `src/components/FormFields.tsx`: reusable labelled inputs, choice cards, chips, and checkbox groups.
- `src/components/StepPanel.tsx`: step-specific form content and validation message surface.
- `src/components/PromptWorkspace.tsx`: generated prompt output, edit state, copy, regenerate, reset, and empty/error states.
- `src/main.tsx` and `src/index.css`: Vite entry, Tailwind layers, tokens, responsive layout, focus and motion rules.
- `public/manus-routes.json`: complete static route manifest for `/`.

## Behavior decisions

- Five visible stages: goal, background, availability, preferences, then review/generate.
- Steps 1–4 have required fields; optional context is never blocked.
- Back preserves data. Next validates only the current step and focuses the first invalid control.
- Form state is restored from localStorage after refresh, with a dismissible “saved draft” notice.
- The review stage shows a platform selector and concise profile summary before generation.
- Prompt generation is synchronous in logic but presented with a short loading state to communicate the transition.
- Clipboard uses `navigator.clipboard.writeText` with a fallback message if unavailable.
- “Start again” confirms before clearing the draft and returning to step 1.

## Hosting and constraints

- Vite static build to `dist`, deployable to Vercel or any static host.
- No server or database capabilities are needed.
- The app listens on the WebDev-configured port 3000 and binds to `0.0.0.0`.
- The implementation uses React, TypeScript, Tailwind CSS, Lucide React, and browser localStorage only.
