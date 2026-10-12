# Pratham Nemade · Portfolio

Personal portfolio of Pratham Nemade, Product Engineer. A single-page site
built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4,
shadcn/ui, Motion and Lenis.

## Scripts

```bash
npm run dev        # start the dev server on http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint (includes the React Compiler rules)
npm run typecheck  # TypeScript, no emit
npm run format     # Prettier (sorts Tailwind classes too)
```

## Structure

```
src/
  app/                  layout, page, 404 and error pages, global styles,
                        SEO files (icons, Open Graph image, manifest,
                        robots, sitemap)
  components/
    layout/header/      site header, its controls and the mobile menu
    layout/footer/      the "Console" footer and its pixel display
    sections/<name>/    one folder per page section (hero, about, skills,
                        projects, contact) with its private parts
    shared/             building blocks used across sections
    providers/          theme, smooth scroll, analytics events and
                        the on-demand toast host
    ui/                 shadcn/ui primitives
  config/site.ts        name, links, navigation, résumé path, site URL,
                        EmailJS settings for the contact form
  data/                 all written content (about, skills, projects)
  hooks/                reusable React hooks (one hook per file)
  lib/                  plain helpers: motion presets, formatting,
                        DOM utilities, project deep links and the
                        pixel canvas engine
  types/                shared TypeScript types
```

Content lives in `src/data` and `src/config`, so copy changes never touch
components.

Conventions: files and folders are kebab-case, components are PascalCase
named exports, hooks start with `use` and live one per file. `ui/` holds
shadcn/ui primitives exactly as generated, so they can be updated with the
shadcn CLI. House style: no em dashes in visible copy.

## Deploying

1. Deploy to Vercel. The production URL is detected automatically; for a
   custom domain set `NEXT_PUBLIC_SITE_URL` (e.g. `https://example.com`),
   which feeds canonical links, Open Graph tags and the sitemap.
2. The contact form sends through EmailJS. If messages stop arriving,
   reconnect the email account under Email Services in the EmailJS
   dashboard. See `.env.example` for optional overrides.
3. To update the résumé, replace `public/documents/Pratham-Nemade-Resume.pdf`
   and `resumeUpdated` in `src/config/site.ts`.
