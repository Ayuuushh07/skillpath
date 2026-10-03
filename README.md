# SkillPath — AI Roadmap Prompt Builder

SkillPath is a client-side React app for students who want better learning plans from AI assistants. It collects the context a good roadmap needs, then generates a detailed, copy-ready prompt for Claude, ChatGPT, Gemini, or any compatible AI tool.

> SkillPath does not call an AI API or generate a roadmap itself. It creates high-quality instructions from the learner's own inputs.

## Features

- Five-step responsive intake flow with validation and progress tracking.
- Learning goal, background, availability, resource preferences, language, and approach inputs.
- Claude, ChatGPT, Gemini, and Universal Prompt output styles.
- Pure TypeScript prompt generation with resource-verification safeguards.
- Copy, edit, regenerate, and start-again actions.
- LocalStorage draft save/restore with reset confirmation.
- Keyboard-friendly controls, focus-visible styling, reduced-motion support, and mobile-first layout.

## Tech stack

React 19, Vite 6, TypeScript, Tailwind CSS, Lucide React, and browser LocalStorage. No server, database, authentication, or API key is required.

## Screenshots

Add screenshots of the intake flow and generated prompt workspace here when publishing the project to GitHub.

## Local development

```bash
pnpm install
pnpm dev
```

The app runs on `http://localhost:3000` by default.

## Production build

```bash
pnpm build
pnpm preview
```

The static output is written to `dist/` and is suitable for Vercel, Netlify, GitHub Pages (with SPA fallback), or any static host. For Vercel, import the repository, keep the framework preset as Vite, and use `pnpm build` with `dist` as the output directory.

## Project structure

- `src/App.tsx` — app state, navigation, persistence, and screen composition.
- `src/components/` — reusable brand, progress, form, and prompt workspace components.
- `src/lib/promptGenerator.ts` — pure prompt generation logic.
- `src/lib/storage.ts` — safe browser persistence helpers.
- `public/manus-routes.json` — route manifest for the managed preview.

## License

MIT. See [LICENSE](./LICENSE).
