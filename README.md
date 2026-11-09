# FinPath

**FinPath — Financial Planning Workspace**

Advisor-first financial planning PWA, designed for Malaysia-first financial planning workflows.

## Technology foundation

- React + TypeScript + Vite
- IndexedDB via Dexie
- Progressive Web App foundation
- Recharts for future financial visualizations
- Lucide icons
- Vercel deployment planned

## Development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run typecheck
npm run build
```

## Architecture principles

- Local-first in Phase 1; no cloud database dependency.
- Customer and family identities use stable UUIDs.
- Calculation engines remain separate from UI components.
- Financial records preserve ownership, responsibility, currency, timing and history.
- Simulations use input snapshots and versioned assumptions.
- Backup and restore operations must be explicit, inspectable and safe.

## Project status

Milestone 1 — Project Foundation in progress.

This repository is currently public. Do not commit real client data, personal identifiers, credentials, API keys or production backups.