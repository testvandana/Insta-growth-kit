# Platform Notes — Verification Log (Phase 0)

> **Purpose:** Record what the platforms *actually* allow **today**, before writing live bot code (architecture §14).
> **Rule:** Every row must have a **Verified value** and a **Source + date** before Phase 5. "Expected" values come from the course plan and public docs, and are a starting point only.
> **Last updated:** 2026-11-18 · **Verified by:** _your name_

---

## Status Summary

| ID | Item | Status |
|----|------|--------|
| V1 | Account type | ⬜ Not verified |
| V2 | Login flow / base URL / API version | ⬜ Not verified |
| V3 | Permissions and app review | ⬜ Not verified |
| V4 | Private-reply endpoint and limits | 🟨 Pre-filled, confirm live |
| V5 | Comment eligibility window | 🟨 Pre-filled, confirm live |
| V6 | Messaging window | 🟨 Pre-filled, confirm live |
| V7 | Webhooks for `messages` | ⬜ Not verified |
| V8 | Rate limits | ⬜ Not verified |
| V9 | Token lifetime and refresh | 🟨 Pre-filled, confirm live |
| V10 | Gemini model for classification | ⬜ Not verified |
| V11 | AI Studio speech (TTS) model | ⬜ Not verified |
| V12 | Messaging for testers in development mode | ⬜ Not verified |

Legend: ⬜ Not verified · 🟨 Pre-filled from research, confirm live · ✅ Verified · 🟥 Blocked

---

## V1 — Instagram account type

| | |
|---|---|
| **Expected** | Public **Professional** account (Business or Creator). Personal accounts cannot use these APIs. |
| **How to check** | Instagram app → Settings → *Account type and tools*. Then run `scripts/verify-graph-token.mjs` and check `account_type`. |
| **Verified value** | |
| **IG username / IG_USER_ID** | |
| **Source + date** | |

## V2 — Login flow, base URL, API version

| | |
|---|---|
| **Options** | **A. Instagram API with Instagram Login.** Base `https://graph.instagram.com`. No Facebook Page needed. Simplest for this project. **B. Instagram API with Facebook Login.** Base `https://graph.facebook.com`. Needs the IG account linked to a Facebook Page. |
| **Recommendation** | **A**, unless the shop already manages Instagram through a Facebook Page and Business Manager. |
| **Chosen flow** | |
| **GRAPH_BASE_URL** | |
| **GRAPH_API_VERSION** | (current version shown in the Meta app dashboard / docs changelog) |
| **Source + date** | |

## V3 — Permissions and app review

| | |
|---|---|
| **Expected scopes (Instagram Login)** | `instagram_business_basic`, `instagram_business_manage_comments`, `instagram_business_manage_messages` |
| **Expected scopes (Facebook Login)** | `instagram_basic`, `instagram_manage_comments`, `instagram_manage_messages`, `pages_show_list`, `pages_read_engagement` (+ `pages_manage_metadata` for webhooks) |
| **Questions** | Does the app need **App Review / Advanced Access** before it can message people who don't have a role on the app? (Usually yes for real customers. Testers work in development mode.) |
| **Verified scopes granted** | |
| **App mode** | Development / Live |
| **App review needed? Submitted on** | |
| **Source + date** | |

## V4 — Private reply to a comment

| | |
|---|---|
| **Expected endpoint** | `POST {GRAPH_BASE_URL}/{GRAPH_API_VERSION}/{ig-user-id}/messages` |
| **Expected body** | `{ "recipient": { "comment_id": "<COMMENT_ID>" }, "message": { "text": "..." } }` |
| **Expected limits** | **One** private reply per comment. The message automatically links back to the post. |
| **Known pitfall** | Sending to `recipient.id` (the user) after only a comment fails with an "outside of allowed window" error (code 10, subcode 2534022). A comment does **not** open the 24h DM window. Use `comment_id`. |
| **Verified endpoint/body** | |
| **Test result (tester account)** | |
| **Source + date** | Meta docs: Instagram Platform → Private Replies (re-check) |

## V5 — Comment eligibility window

| | |
|---|---|
| **Expected** | Private replies allowed within **7 days** of the comment's creation time (course plan and current public docs agree). Live-video comments: only during the broadcast. |
| **Config** | `REPLY_WINDOW_DAYS=7` |
| **Verified value** | |
| **Source + date** | |

## V6 — Messaging window (follow-ups)

| | |
|---|---|
| **Expected** | When the customer **replies** to the private reply (or messages the account), a standard **24-hour** window opens for normal replies. |
| **Config** | `MESSAGING_WINDOW_HOURS=24` |
| **Message tags (e.g. human agent)** | Check whether any tag allows the *owner* to answer after 24h. The bot must never use one to send automated messages. |
| **Verified value** | |
| **Source + date** | |

## V7 — Webhooks for incoming messages

| | |
|---|---|
| **Expected** | Webhook callback URL (HTTPS) + verify token. Subscribe to the `messages` field. Payloads are signed with `X-Hub-Signature-256` (HMAC-SHA256 with the app secret). |
| **Verify handshake** | `GET ?hub.mode=subscribe&hub.verify_token=...&hub.challenge=...` → respond with `hub.challenge` |
| **Verified fields subscribed** | |
| **Works in development mode for testers?** | |
| **Fallback if not** | Poll conversations on the 1-minute cron (architecture AD-3) |
| **Source + date** | |

## V8 — Rate limits

| | |
|---|---|
| **Expected** | Per-app/per-account call limits (check the `X-App-Usage` / `X-Business-Use-Case-Usage` response headers) and messaging send limits per account. |
| **Our planned usage** | 1,440 comment-list calls/day + small number of sends |
| **Config chosen** | `MAX_COMMENTS_PER_RUN=25`, `MAX_SENDS_PER_HOUR=100` (lower if docs say so) |
| **Verified limits** | |
| **Source + date** | |

## V9 — Token lifetime and refresh

| | |
|---|---|
| **Expected (Instagram Login)** | Short-lived token (~1 hour) → exchange for a **long-lived token (~60 days)**. Refresh before expiry with `GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=...` (the token must be at least 24h old and not expired). |
| **Expected (Facebook Login)** | Long-lived user token → Page token. Refresh/regenerate before expiry. |
| **Token generated on** | |
| **Expires on** | |
| **Calendar reminder set for** | (10 days before expiry) |
| **Source + date** | |

## V10 — Gemini model (classification and fact-key selection)

| | |
|---|---|
| **Need** | A fast, low-cost model with **JSON / structured output** support |
| **How to check** | Google AI Studio → model list, or `GET https://generativelanguage.googleapis.com/v1beta/models?key=...` |
| **Chosen `GEMINI_MODEL`** | |
| **Free-tier limits (RPM / RPD)** | |
| **Source + date** | |

## V11 — AI Studio speech (voiceover)

| | |
|---|---|
| **Need** | A currently available TTS model and voice that reads Indian prices and Hinglish clearly |
| **Note** | The course PDF uses different model labels in different places. Pick from what AI Studio shows today, and don't hard-code a version. |
| **Chosen model / voice** | |
| **Source + date** | |

## V12 — Messaging for testers in development mode

| | |
|---|---|
| **Question** | Can the bot send private replies and DMs to a **tester** account while the app is in development mode? |
| **Test** | Tester comments on a test Reel → manually call the private-reply endpoint once (Postman / curl) → check the tester's inbox |
| **Result** | |
| **If blocked** | Add the account as a tester role, accept the invite in the tester's Instagram settings, re-check scopes. Otherwise start App Review. |
| **Source + date** | |

---

## Decisions Log

| Date | Decision | Reason |
|------|----------|--------|
| | Login flow: | |
| | Publish the real Reel before or after the bot is live: | (implementation plan, Phase 2) |
| | | |

## Open Questions

- [ ] 
