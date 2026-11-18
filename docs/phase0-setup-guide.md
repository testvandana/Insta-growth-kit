# Phase 0 — Setup Guide (Manual Steps)

> Follow these in order. Tick each box here **and** in [implementation-plan.md](./implementation-plan.md#phase-0--setup-and-platform-verification).
> Record findings in [platform-notes.md](./platform-notes.md). **Never paste tokens or secrets into any committed file.**

---

## Step 1 — Owner consent and product choice

- [ ] Pick **one** real product and the shop.
- [ ] Fill in [permissions/owner-consent-template.md](./permissions/owner-consent-template.md), get it signed (paper photo or e-signature) and save it as `docs/permissions/owner-consent.pdf` (or `.png`). This folder is git-ignored.

## Step 2 — Instagram accounts

- [ ] **Shop account:** Instagram → Settings → *Account type and tools* → **Switch to professional account** (Business or Creator). Make sure the account is **public**.
- [ ] **Test customer account:** a second personal Instagram account that will act as the customer during testing.
- [ ] Optionally, a second test customer account (needed for live test #4 in Phase 5).

## Step 3 — Meta developer app

1. [ ] Go to developers.facebook.com → log in → **My Apps → Create App**.
2. [ ] Use case: choose the option to **manage messaging and content on Instagram** (wording changes over time). App type: **Business**.
3. [ ] In the app dashboard, add the **Instagram** product. Choose **API setup with Instagram login** (recommended, see platform-notes V2).
4. [ ] Under *Generate access tokens*, add the **shop account** and log in. Grant the comment and messaging permissions.
5. [ ] Copy the generated token into your local `.env` only (Step 6).
6. [ ] **App roles → Roles → Add people → Instagram Tester:** add the test customer account(s). Accept the invite from the tester's Instagram: *Settings → Website permissions / Apps and websites → Tester invites* (location varies).
7. [ ] Note the **App ID** and where to find the **App Secret** (*App settings → Basic*). The secret is used in Phase 6 and stays secret.
8. [ ] Fill in platform-notes **V2, V3, V9**.

## Step 4 — Cloudflare

- [ ] Create a free account at dash.cloudflare.com.
- [ ] Wrangler will be installed as a project dependency in Phase 3. To check it now, run:
  ```powershell
  npx wrangler --version
  npx wrangler login
  ```
- [ ] Optionally note your `*.workers.dev` subdomain (Workers and Pages → Overview).

## Step 5 — Google

- [ ] **Gemini API key:** aistudio.google.com → *Get API key* → create a key. Keep it for Phase 3 (`bot/.dev.vars`). Fill in platform-notes **V10**.
- [ ] **Speech model:** open AI Studio → speech generation. Note an available model and voice in **V11**.
- [ ] **Lead sheet:** create a Google Sheet named `Insta Growth Kit — Leads` with three tabs: `Leads`, `Alerts`, `ReadMe`. Share it only with yourself and the owner. (Columns are set up in Phase 7.)

## Step 6 — Run the token check (Phase 0 exit criterion)

```powershell
cd d:\INSTA-REEL
Copy-Item .env.example .env
notepad .env          # paste IG_ACCESS_TOKEN, set GRAPH_BASE_URL / GRAPH_API_VERSION
node --env-file=.env scripts/verify-graph-token.mjs
```

Expected result:
- `✅ 1/3 Token works`, with `account_type` = BUSINESS or MEDIA_CREATOR.
- `✅ 2/3 Recent media`, a table of your posts.
- Optionally, set `IG_MEDIA_ID` to a test Reel's ID and re-run. You should see `✅ 3/3 Comment read works`.

Copy `IG_USER_ID` and the account type into platform-notes **V1**.

## Step 7 — Private-reply smoke test for V4/V12 (one manual call)

> This is the riskiest assumption in the project. Prove it once by hand before building the bot.

1. [ ] Post a **test Reel** (any short clip) on the shop account. Get its ID from the token check output.
2. [ ] From the **tester** account, comment `PRICE` on it.
3. [ ] Re-run the token check with `IG_MEDIA_ID` set and copy the comment `id` from the output (or add `id` to what you note down).
4. [ ] Send one private reply manually (PowerShell):
   ```powershell
   $token = (Get-Content .env | Select-String '^IG_ACCESS_TOKEN=').ToString().Split('=',2)[1]
   $igUserId = '<IG_USER_ID>'
   $commentId = '<COMMENT_ID>'
   $body = @{ recipient = @{ comment_id = $commentId }; message = @{ text = 'Test private reply from Insta Growth Kit setup' } } | ConvertTo-Json
   Invoke-RestMethod -Method Post -Uri "https://graph.instagram.com/$igUserId/messages" `
     -Headers @{ Authorization = "Bearer $token" } -ContentType 'application/json' -Body $body
   ```
   (Add `/<GRAPH_API_VERSION>` after the host if you are using a pinned version.)
5. [ ] Check the tester's DM inbox, including *Message requests*.
6. [ ] Send the same request again. It should be **rejected**, which confirms the one-reply-per-comment rule.
7. [ ] Record the results in platform-notes **V4, V5, V12**.

## Step 8 — Webhook and rate-limit research (V7, V8)

- [ ] Read the current Meta docs for Instagram webhooks (`messages` field) and note the steps in **V7**. You will actually register the webhook in Phase 6, once the Worker URL exists.
- [ ] Note the rate limits in **V8**.

## Step 9 — Close Phase 0

- [ ] Every V1–V12 row in platform-notes is ✅, or 🟥 with a fallback written down.
- [ ] `git status` shows no `.env` or other secrets.
- [ ] Update the Progress Tracker in implementation-plan.md: Phase 0 → ✅.
- [ ] Commit: `git add -A; git commit -m "Phase 0: platform verification complete"`.

> [!IMPORTANT]
> If Step 7 fails because of permissions or development-mode limits, **do not move on to Phase 5**. Phases 1–4 can still go ahead in parallel while you fix access or wait for App Review.
