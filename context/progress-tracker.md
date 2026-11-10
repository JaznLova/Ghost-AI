# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- Complete

## Current Goal

- Authentication from `context/feature-specs/03-auth.md` is complete.

## Completed

- Configured Tailwind CSS v4 and shadcn/ui with CSS-variable theming.
- Added Button, Card, Dialog, Input, Tabs, Textarea, and ScrollArea primitives.
- Installed Lucide React and added the reusable `cn()` helper in `lib/utils.ts`.
- Applied dark mode at the root document so no default light theme appears.
- Verified component types/imports, class merging, lint, and production build.
- Added the fixed-height, three-section editor navbar with an accessible sidebar
  toggle and state-specific Lucide icon.
- Added the floating project sidebar with non-displacing slide animation, close
  control, project tabs, empty states, and full-width new-project action.
- Confirmed the existing token-based dialog primitives support composed titles,
  descriptions, and footer actions without adding an actual dialog.
- Installed `@clerk/ui` and wrapped the root layout in `ClerkProvider` using its
  dark theme and the app's existing CSS variables.
- Added root `proxy.ts` with public auth-route matching and default protection
  for all other application and API routes.
- Updated `/` to redirect signed-in users to `/editor` and signed-out users to
  `/sign-in`.
- Added responsive sign-in and sign-up pages with a minimal two-panel desktop
  layout, form-only mobile layout, and Clerk's built-in form components.
- Added Clerk's default `UserButton` to the editor navbar right section without
  replacing or customizing its profile and sign-out flows.

## In Progress

- None.

## Next Up

- Implement the project dialogs from `context/feature-specs/04-project-dialogs.md`.

## Open Questions

- `.env.local` currently contains Clerk's publishable and secret keys but does
  not set the optional sign-in/sign-up URL variables. The implementation reads
  Clerk's canonical variables and safely defaults to the specified `/sign-in`
  and `/sign-up` paths.

## Architecture Decisions

- Use the shadcn `base-nova` preset with Base UI, Tailwind CSS v4, CSS variables,
  and Lucide icons because these are the current shadcn defaults requested by
  the design-system specification.
- Apply the `dark` class and dark color scheme on the root document to keep all
  generated primitives consistently dark without modifying generated files.
- Keep editor chrome state controlled by its future parent: the navbar receives
  the current sidebar state and toggle callback, while the sidebar receives its
  open state and close callback.
- Position the project sidebar below the 3.5rem navbar with fixed positioning so
  opening it overlays the future canvas instead of changing page layout.
- Protect all routes by default in Clerk proxy and treat only the configured
  sign-in/sign-up paths (including nested auth flow paths) as public.
- Keep the auth shell presentation separate from Clerk's built-in forms so
  Clerk continues to own account, profile, and authentication behavior.
- Mark Clerk session-dependent routes as non-instant and wrap Clerk's browser
  auth forms in local Suspense boundaries, following the installed Next.js
  16.4 Cache Components guidance.

## Session Notes

- Design-system implementation completed on 2026-11-09.
- Do not modify generated files under `components/ui/`; add or refresh them with
  the shadcn CLI.
- Validation passed: `npm run lint`, `npx tsc --noEmit --incremental false`,
  `cn()` runtime class-merging check, and `npm run build`.
- Editor chrome implementation completed on 2026-11-09.
- Editor validation passed: `npm run lint`,
  `npx tsc --noEmit --incremental false`, and `npm run build`.
- Authentication implementation started on 2026-11-09. Provider, root redirect,
  dependency, route protection, auth UI, and editor user menu are complete.
- Authentication validation passed: `npm run lint`,
  `npx tsc --noEmit --incremental false`, and `npm run build`.
