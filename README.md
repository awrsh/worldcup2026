# World Cup 2026 Predictions

A Next.js fan prediction app for FIFA World Cup 2026. Pick match scores before kickoff, earn points for correct winners and exact scores, and climb the global leaderboard.

## Features

- Match predictions with kickoff lock
- Dashboard with live / upcoming / completed filters
- Group standings computed from results
- Knockout bracket view
- Global, friends, and country leaderboards
- Team browser with squad details
- Mock API layer ready for Sportmonks integration

## Prerequisites

- Node.js 20+
- npm, yarn, or pnpm

## Install

```bash
cd Wolrd-Cup
npm install
```

## Development

```bash
npm run dev
```

URLها فقط از env خوانده می‌شوند (در کد پیش‌فرضی نیست). کپی `.env.local.example` → `.env.local`.

| Env | مثال (سرور CinnaGen) |
|-----|----------------------|
| `NEXT_PUBLIC_APP_BASE_URL` | `http://cg-gr-wk-iso-01.cinnagen.com:8080` |
| `NEXT_PUBLIC_API_URL` | `http://cg-gr-wk-iso-01.cinnagen.com:8585` (API در **World-Cup-Bk**) |

Copy `.env.local.example` → `.env.local`.

### Backend API

API در ریپوی جداگانه [`World-Cup-Bk`](../World-Cup-Bk) است:

```bash
cd ../World-Cup-Bk
npm install
cp .env.example .env
npx prisma db push
npx prisma db seed
npm run start:dev
```

## Build & production

```bash
npm run build
npm run start
```

### Docker

- **Frontend (این ریپو):** `Dockerfile.frontend` — host `8080`
- **API:** ریپوی `World-Cup-Bk` — `Dockerfile` — پورت `8585`

```bash
sh ci/docker-build.sh
FRONTEND_IMAGE=world-cup-frontend:latest docker compose up -d
```

جزئیات: [`ci/DOCKER.md`](ci/DOCKER.md) و `World-Cup-Bk/README.md`.

## Lint

```bash
npm run lint
```

## Tech stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **Zustand** (persisted predictions)
- **Framer Motion**
- **shadcn/ui** (Radix primitives)
- **Sonner** (toasts)

## Project structure

```
src/
├── app/              # Pages (landing, dashboard, matches, etc.)
├── components/       # UI, layout, feature components
├── data/mock/        # Teams, fixtures, groups, leaderboard
├── hooks/            # useFixtures, useCountdown
└── lib/
    ├── api/          # Types, mock API, Sportmonks adapter
    ├── store/        # Zustand stores
    └── utils/        # Scoring, standings, match status
```

## Data sources

Team names, groups, FIFA rankings (April 2026), match schedule, kickoff times (ET), and stadiums are based on the official [FIFA World Cup 2026 draw](https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/final-draw-results) and [match schedule](https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/match-schedule-fixtures-results-teams-stadiums). Flags use [`country-flag-icons`](https://www.npmjs.com/package/country-flag-icons) SVG components (including `GB_ENG` and `GB_SCT` for England and Scotland).

This app uses mock data via `src/lib/api/mock-api.ts`. To connect live Sportmonks data later, add a **backend proxy** that holds the API token and swap the implementation in `src/lib/api/index.ts` using mappers in `src/lib/api/sportmonks-adapter.ts`. **Never expose API keys in the frontend.**

## Design tokens

- Deep navy background (`--background`)
- Glass cards (`.glass-card`, `.glass-card-light`)
- Electric blue primary (`--primary`)
- Gold accents (`--accent`, `.gold-glow`)
