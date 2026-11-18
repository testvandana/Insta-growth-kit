# Insta Growth Kit

A low-cost kit that helps a small shop turn one Instagram Reel into real enquiries. It takes **3–5 phone photos → three accurate ad images + voiceover → a 15-second Reel with a "Comment PRICE" CTA**, then runs a small **Cloudflare Worker bot**. The bot detects price and link requests in English, Hindi and Hinglish, sends **one compliant private reply** per eligible comment, answers follow-ups **only from owner-approved facts** (handing anything else to the owner), and logs every lead to **Google Sheets**.

## Documentation

| Doc | Purpose |
|-----|---------|
| [Problem statement](docs/problemstatement.md) | What and why |
| [Architecture](docs/architecture.md) | System design, modules, data, flows, safeguards |
| [Implementation plan](docs/implementation-plan.md) | Phase-wise plan and progress tracker |
| [Phase 0 setup guide](docs/phase0-setup-guide.md) | Manual account and platform setup steps |
| [Platform notes](docs/platform-notes.md) | Verified Meta / Google platform rules (V1–V12) |

## Repository layout

```text
docs/        Design docs, platform notes, evidence, handover
creative/    Original photos, ad images, voiceover, Reel, Insights
bot/         Cloudflare Worker (TypeScript), built from Phase 3
sheets/      Google Apps Script for lead capture, built in Phase 7
scripts/     Helper scripts (e.g. Phase 0 token check)
```

## Quick start (Phase 0)

```powershell
Copy-Item .env.example .env   # fill in IG_ACCESS_TOKEN (never commit .env)
node --env-file=.env scripts/verify-graph-token.mjs
```

Requires Node.js 20.6 or newer.

## Status

See the progress tracker in [implementation-plan.md](docs/implementation-plan.md#15-progress-tracker).

## Boundaries

No scraping, no unsolicited or bulk DMs, no invented product facts, no bypassing platform limits. One product, one Reel, one compliant workflow and one lead sheet.
