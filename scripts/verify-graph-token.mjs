#!/usr/bin/env node
/**
 * Phase 0 exit check: "A test Graph API call succeeds with the token."
 *
 * Usage (Node 20.6+):
 *   node --env-file=.env scripts/verify-graph-token.mjs
 *
 * What it does (read-only, sends nothing):
 *   1. GET /me                -> confirms the token works and shows the account type
 *   2. GET /me/media          -> lists recent posts so you can copy a Reel's media ID
 *   3. GET /{IG_MEDIA_ID}/comments (optional) -> confirms comment-read permission
 *
 * The token is never printed.
 */

const BASE = (process.env.GRAPH_BASE_URL || 'https://graph.instagram.com').replace(/\/+$/, '');
const VERSION = (process.env.GRAPH_API_VERSION || '').trim();
const TOKEN = (process.env.IG_ACCESS_TOKEN || '').trim();
const MEDIA_ID = (process.env.IG_MEDIA_ID || '').trim();

const root = VERSION ? `${BASE}/${VERSION}` : BASE;
const isInstagramLogin = BASE.includes('graph.instagram.com');

function fail(msg) {
  console.error(`\n❌ ${msg}`);
  process.exit(1);
}

async function call(path, params = {}) {
  const url = new URL(`${root}/${path.replace(/^\/+/, '')}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  url.searchParams.set('access_token', TOKEN);

  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    throw new Error(`Network error calling ${path}: ${err.message}`);
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.error) {
    const e = body.error || {};
    throw new Error(
      `${path} -> HTTP ${res.status}` +
        (e.code ? ` | code ${e.code}` : '') +
        (e.error_subcode ? ` / subcode ${e.error_subcode}` : '') +
        (e.type ? ` | ${e.type}` : '') +
        (e.message ? `\n   ${e.message}` : '')
    );
  }
  return body;
}

async function main() {
  console.log('Insta Growth Kit — Phase 0 token check');
  console.log(`Endpoint root : ${root}`);
  console.log(`Login flow    : ${isInstagramLogin ? 'Instagram Login' : 'Facebook Login (Page-linked)'}`);

  if (!TOKEN) fail('IG_ACCESS_TOKEN is empty. Copy .env.example to .env and fill it in.');
  console.log(`Token         : present (${TOKEN.length} chars, hidden)`);

  // 1. Profile
  const meFields = isInstagramLogin
    ? 'user_id,username,account_type,media_count'
    : 'id,name'; // With Facebook Login, /me is the FB user; IG account is reached via the Page.
  const me = await call('me', { fields: meFields });
  console.log('\n✅ 1/3 Token works. Profile:');
  console.log(JSON.stringify(me, null, 2));

  if (isInstagramLogin) {
    if (me.account_type && !['BUSINESS', 'MEDIA_CREATOR', 'CREATOR'].includes(me.account_type)) {
      console.warn(`⚠️  account_type is "${me.account_type}". A Professional (Business/Creator) account is required.`);
    }
    if (me.user_id) console.log(`   → Use IG_USER_ID=${me.user_id} in the Worker config.`);
  } else {
    console.log('   → Facebook Login: find the IG Business account via GET /{page-id}?fields=instagram_business_account');
  }

  // 2. Media
  if (isInstagramLogin) {
    const media = await call('me/media', {
      fields: 'id,caption,media_type,media_product_type,timestamp,permalink',
      limit: '10',
    });
    const rows = (media.data || []).map((m) => ({
      id: m.id,
      type: `${m.media_type}/${m.media_product_type || '-'}`,
      timestamp: m.timestamp,
      caption: (m.caption || '').slice(0, 40).replace(/\s+/g, ' '),
    }));
    console.log(`\n✅ 2/3 Recent media (${rows.length}). REELS rows give you IG_MEDIA_ID:`);
    if (rows.length) console.table(rows);
    else console.log('   (no posts yet — publish a test Reel, then re-run)');
  } else {
    console.log('\n⏭️  2/3 Skipped media listing (needs the IG user ID for Facebook Login flow).');
  }

  // 3. Comments (optional)
  if (MEDIA_ID) {
    const comments = await call(`${MEDIA_ID}/comments`, {
      fields: 'id,text,timestamp,username',
      limit: '5',
    });
    console.log(`\n✅ 3/3 Comment read works on media ${MEDIA_ID}: ${comments.data?.length ?? 0} comment(s) returned.`);
    for (const c of comments.data || []) {
      console.log(`   - [${c.timestamp}] ${(c.text || '').slice(0, 60)}`);
    }
  } else {
    console.log('\n⏭️  3/3 Skipped comment check (set IG_MEDIA_ID in .env to test comment permission).');
  }

  console.log('\nRecord these results in docs/platform-notes.md (V1, V2, V3) and tick the Phase 0 exit criterion.');
}

main().catch((err) => fail(err.message));
