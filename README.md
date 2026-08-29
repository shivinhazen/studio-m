# Studio M — Soluções Visuais

Production website for Studio M, a boutique visual-design studio. The project translates the brand into an editorial web experience with a reusable design system, portfolio presentation, legal pages and a complete project-contact flow.

**Live:** https://studio-m-pearl.vercel.app

## Overview

Studio M is built as a modern Next.js application with a strong emphasis on visual consistency, accessibility, performance and maintainable content structure. Motion and interaction are treated as progressive enhancement rather than core dependencies.

## Engineering highlights

- Next.js 16 App Router with React 19 and TypeScript.
- Reusable UI primitives and design tokens built with Tailwind CSS 4 and CVA.
- Theme-aware interface with light/dark persistence.
- Framer Motion interactions with reduced-motion support.
- Server-side contact endpoint using Nodemailer/SMTP, validation and honeypot protection.
- Route-level metadata, canonical URLs, sitemap, robots and structured data.
- Image optimization workflow for portfolio assets.
- Automated accessibility and performance checks with Axe and Lighthouse CI.

## Stack

| Area | Technologies |
| --- | --- |
| Application | Next.js 16, React 19, TypeScript |
| UI | Tailwind CSS 4, CVA, Lucide, Framer Motion |
| Server | Next.js Route Handlers, Nodemailer, SMTP |
| Quality | ESLint, Axe, Lighthouse CI, dependency audit |
| Deployment | Vercel |

## Project structure

```text
app/
├── (site)/              # Public experience and landing-page sections
├── api/contato/         # Server-side contact delivery
├── contato/             # Contact form and project intake
├── portfolio/           # Work showcase
├── servicos/            # Services
├── sobre/               # Studio information
└── politica-de-privacidade/ + termos-de-uso/

components/              # Shared layout and UI primitives
hooks/                   # Media-query and interaction hooks
lib/                     # Shared utilities and constants
public/assets/           # Brand and portfolio assets
scripts/                 # QA and image tooling
```

## Local development

Requirements: Node.js 18+ and npm.

```bash
git clone https://github.com/shivinhazen/studio-m.git
cd studio-m
npm install
npm run dev
```

For the contact flow, configure the SMTP variables used by the application in `.env.local`.

## Useful commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create the production build |
| `npm run lint` | Run ESLint |
| `npm run lint:deps` | Check for unexpected unused dependencies |
| `npm run optimize:images` | Optimize portfolio imagery |
| `npm run qa:axe` | Run accessibility checks against the deployed site |
| `npm run qa:lhci` | Run Lighthouse CI against the deployed site |
| `npm run qa:full` | Run the complete quality pipeline |

## Design and quality principles

The implementation favors semantic tokens, reusable components and explicit accessibility behavior. Interactive elements preserve keyboard navigation and visible focus, motion respects user preferences, and below-the-fold effects are isolated from critical rendering paths.

## Contact

[Studio M website](https://studio-m-pearl.vercel.app) · [Lucas Leão on LinkedIn](https://www.linkedin.com/in/lucas-leao-shvzn)
