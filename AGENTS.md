# Repository Guidelines

## Project Structure & Module Organization
`src/main.tsx` is the entry point; `src/app.tsx` is the root component. UI components live in `src/components/`. Global state is in `src/store/store.ts` (Zustand). Custom hooks are in `src/hooks/`, utilities in `src/util/`. Scouting form configs are JSON files in `config/<year>/config.json`, validated against `config/schema.json`. Static assets are in `public/` and `src/assets/`.

## Build, Test, and Development Commands
Use Node 18+ and npm.
1. `npm run dev`
   Starts the Vite dev server at `http://localhost:5173`.
1. `npm run build`
   Type-checks with `tsc` then produces a production bundle in `dist/`.
1. `npm run preview`
   Serves the production build locally for final verification.

There is no test framework configured. Verify behavior manually in the browser before submitting changes.

## Coding Style & Naming Conventions
Use Prettier (80-char width, 2-space indent, single quotes, trailing commas, no tab characters) and format before committing. Follow these conventions:
- **Components:** PascalCase filenames and function names with an explicit `Props` interface (e.g., `CounterInput.tsx`, `CounterInputProps`).
- **Utilities/hooks:** camelCase filenames (e.g., `classNames.ts`, `useQRCode.ts`).
- **Store functions:** `update*` / `reset*` / `set*` for mutations; `get*` for queries.
- **Event handlers:** prefix with `handle` (e.g., `handleChange`).
- **Boolean props:** prefix with `is`, `has`, or `show`.
- Use Tailwind utility classes directly in JSX. Avoid inline `style` props.
- Use Immer's `produce()` for nested state mutations in the Zustand store.

## Config File Guidelines
Each FRC season gets its own directory: `config/<year>/config.json`. The file must validate against `config/schema.json`. Key rules:
- `code` values must be short, unique strings (used as QR data keys — keep them brief).
- `type` must be one of: `text`, `number`, `boolean`, `range`, `select`, `counter`, `image`.
- Set `preserveDataOnReset: true` on Prematch fields that should survive a form reset (e.g., scouter initials, robot position).
- Set `autoIncrementOnReset: true` on the match number field.
- Test every new config by loading it in the app via the config upload UI before committing.

## Commit & Pull Request Guidelines
Commit messages are short, imperative sentences (e.g., "Add 2025 ball-counting config"). Keep them focused on the change.

PRs should include:
1. A clear summary of what changed and why.
1. Steps to manually verify the change in the browser.
1. Screenshots when the UI layout changes.

## Deployment Notes
Pushing to `main` automatically deploys to GitHub Pages via `.github/workflows/bioDeploy.yml`. The live URL is `https://team841.github.io/QRScout/`. The Vite build uses `/QRScout/` as the base path — do not change this without updating the workflow and GitHub Pages settings.
