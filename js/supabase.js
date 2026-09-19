// js/supabase.js
// Backend for the New Orleans invitation.
//
// Contract with the rest of the app:
//   saveInvitationResponse(answers) -> Promise<{ success, dormant?, id?, queued?, error? }>
//   It never throws. It never blocks the confirmation screen.
//
// Requires supabase-js v2 loaded from the CDN tag in index.html (window.supabase).

import { CONFIG } from './config.js';

const PENDING_KEY = 'nola-weekend-pending';
const SESSION_KEY = 'nola-weekend-session';
const COUNT_KEY = 'nola-weekend-submits';
const CLIENT_VERSION = 'v1';

let _client = null;

/* ─── client ────────────────────────────────────────────────────── */

function getClient() {
  if (_client) return _client;

  const url = (CONFIG.supabaseUrl || '').trim();
  const key = (CONFIG.supabaseAnonKey || '').trim();

  if (!url.startsWith('https://') || key.length < 20) return null;

  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    console.warn('[supabase] supabase-js did not load — check the CDN tag in index.html');
    return null;
  }

  _client = window.supabase.createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
  return _client;
}

export function isConfigured() {
  return getClient() !== null;
}

/* ─── identity ──────────────────────────────────────────────────── */

function sessionId() {
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = (crypto.randomUUID && crypto.randomUUID()) ||
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
          const r = Math.random() * 16 | 0;
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

function bumpSubmitCount() {
  try {
    const n = (parseInt(localStorage.getItem(COUNT_KEY) || '0', 10) || 0) + 1;
    localStorage.setItem(COUNT_KEY, String(n));
    return n;
  } catch {
    return 1;
  }
}

/* ─── mapping ───────────────────────────────────────────────────── */

const arr = v => (Array.isArray(v) ? v.filter(x => typeof x === 'string') : []);
const text = v => {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  return t.length ? t.slice(0, 5000) : null;   // fields are unbounded in the UI
};
const bool = v => (typeof v === 'boolean' ? v : null);
const num = v => (Number.isFinite(v) ? v : null);

/**
 * Maps the answers object onto table columns.
 * Every screen is optional — a skipped screen leaves its key undefined,
 * so everything here is optional-chained and defaulted.
 */
export function buildRow(answers = {}, meta = {}) {
  const suitcase = { dressColor: "", packItems: [], snacks: [], userQuestions: "", ...(answers.suitcase || {}) };
  const cooler = { items: [], barOrder: "", ...(answers.cooler || {}) };
  const vibe = { choices: [], other: "", ...(answers.vibe || {}) };
  const acts = { liked: [], maybe: [], passed: [], lastFilter: 'all', ...(answers.activities || {}) };
  const food = {
    fridayDinner: null,
    fridayBackup: null,
    cravings: "",
    satLunch: null,
    satLunchBackup: null,
    groupDinner: "Tujague's @ 7:00 PM (Brotherhood & dates)",
    sundayBeignets: true,
    ...(answers.food || {})
  };
  const night = { plans: [], otherPlans: "", howLate: "Midnight", company: "Stay with the group", ...(answers.saturdayNight || {}) };
  const notes = { text: "", wantsSurprise: true, ...(answers.notes || {}) };

  return {
    guest_name: text(CONFIG.guestName),
    session_id: sessionId(),
    submit_count: meta.submitCount ?? 1,
    screen_progress: num(meta.screenProgress),

    dress_color: text(suitcase.dressColor),
    pack_items: arr(suitcase.packItems),
    snacks: arr(suitcase.snacks),
    questions_request: text(suitcase.userQuestions),

    cooler_items: arr(cooler.items),
    bar_order: text(cooler.barOrder),

    vibe_choices: arr(vibe.choices),
    vibe_other: text(vibe.other),

    activities_liked: arr(acts.liked),
    activities_maybe: arr(acts.maybe),
    activities_passed: arr(acts.passed),

    friday_dinner: text(food.fridayDinner),
    friday_backup: text(food.fridayBackup),
    sat_lunch: text(food.satLunch),
    sat_lunch_backup: text(food.satLunchBackup),
    group_dinner: text(food.groupDinner),
    cravings: text(food.cravings),
    sunday_beignets: bool(food.sundayBeignets),

    night_plans: arr(night.plans),
    night_other: text(night.otherPlans),
    how_late: text(night.howLate),
    company: text(night.company),

    notes_text: text(notes.text),
    wants_surprise: bool(notes.wantsSurprise),

    answers: answers || {},
    user_agent: (navigator.userAgent || '').slice(0, 500),
    client_version: CLIENT_VERSION
  };
}

/* ─── offline queue ─────────────────────────────────────────────── */

function queue(row) {
  try {
    const pending = JSON.parse(localStorage.getItem(PENDING_KEY) || '[]');
    pending.push(row);
    localStorage.setItem(PENDING_KEY, JSON.stringify(pending.slice(-5)));
  } catch (e) {
    console.warn('[supabase] could not queue row', e);
  }
}

/**
 * Retries anything that failed earlier. Call once on page load.
 * Silent by design — she should never see this happen.
 */
export async function flushPending() {
  const client = getClient();
  if (!client) return;

  let pending;
  try {
    pending = JSON.parse(localStorage.getItem(PENDING_KEY) || '[]');
  } catch {
    return;
  }
  if (!pending.length) return;

  const stillFailing = [];
  for (const row of pending) {
    const { error } = await client.from(CONFIG.tableName).insert([row]);
    if (error) stillFailing.push(row);
  }

  try {
    if (stillFailing.length) {
      localStorage.setItem(PENDING_KEY, JSON.stringify(stillFailing));
    } else {
      localStorage.removeItem(PENDING_KEY);
      console.log('[supabase] queued response(s) sent');
    }
  } catch { /* ignore */ }
}

/* ─── state reconciliation ──────────────────────────────────────── */

const STATE_KEY = 'nola-weekend-v1';
const SCREEN_KEYS = ['suitcase','cooler','vibe','activities','food','saturdayNight','notes'];

function readPersisted() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return { answers: {}, screenProgress: null };
    const parsed = JSON.parse(raw);
    return {
      answers: parsed.answers && typeof parsed.answers === 'object' ? parsed.answers : {},
      screenProgress: Number.isFinite(parsed.currentScreenIndex) ? parsed.currentScreenIndex : null
    };
  } catch {
    return { answers: {}, screenProgress: null };
  }
}

function hasContent(v) {
  if (v == null) return false;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === 'string') return v.trim().length > 0;
  if (typeof v === 'object') return Object.values(v).some(hasContent);
  return true;                       // numbers and booleans count
}

/** Per screen, keep whichever copy actually has something in it. */
function reconcile(memory = {}, persisted = {}) {
  const out = {};
  for (const key of SCREEN_KEYS) {
    const m = memory?.[key];
    const p = persisted?.[key];
    out[key] = hasContent(m) ? m : (hasContent(p) ? p : (m ?? p));
    if (out[key] === undefined) delete out[key];
  }
  return out;
}

/* ─── submit ────────────────────────────────────────────────────── */

export async function saveInvitationResponse(answers, meta = {}) {
  const persisted = readPersisted();
  const merged = reconcile(answers, persisted.answers);

  const filledScreens = SCREEN_KEYS.filter(k => hasContent(merged[k]));
  console.log('[supabase] submitting screens with content:', filledScreens);

  if (filledScreens.length === 0) {
    // Nothing anywhere. Record it rather than silently writing a blank row.
    console.error('[supabase] ABORTED: both in-memory and stored answers are empty.', {
      memoryKeys: Object.keys(answers || {}),
      storedKeys: Object.keys(persisted.answers || {})
    });
    return { success: false, error: 'empty-answers' };
  }

  const row = buildRow(merged, {
    ...meta,
    screenProgress: meta.screenProgress ?? persisted.screenProgress,
    submitCount: bumpSubmitCount()
  });

  const client = getClient();
  if (!client) {
    console.log('[supabase] dormant — keys not set. Payload would have been:', row);
    return { success: true, dormant: true };
  }

  try {
    const { data, error } = await client
      .from(CONFIG.tableName)
      .insert([row])
      .select('id')
      .single();

    if (error) {
      console.warn('[supabase] insert failed, queued for retry:', error.message);
      queue(row);
      return { success: false, queued: true, error: error.message };
    }

    console.log('[supabase] saved, row id:', data?.id);
    return { success: true, id: data?.id };
  } catch (err) {
    console.warn('[supabase] network error, queued for retry:', err);
    queue(row);
    return { success: false, queued: true, error: String(err) };
  }
}

/* ─── debug view, reachable at index.html#answers ───────────────── */

export function renderAnswersDebug(targetEl) {
  let raw = null;
  try { raw = localStorage.getItem('nola-weekend-v1'); } catch { /* ignore */ }

  let body;
  if (!raw) {
    body = 'Nothing saved on this device yet.';
  } else {
    try {
      const parsed = JSON.parse(raw);
      body =
        'Supabase: ' + (isConfigured() ? 'configured' : 'DORMANT — keys not set') + '\n' +
        'Session:  ' + sessionId() + '\n' +
        'Submits:  ' + (localStorage.getItem(COUNT_KEY) || '0') + '\n' +
        'Pending:  ' + (JSON.parse(localStorage.getItem(PENDING_KEY) || '[]').length) + '\n\n' +
        '--- ANSWERS ---\n' +
        JSON.stringify(parsed.answers ?? parsed, null, 2) + '\n\n' +
        '--- ROW AS IT WOULD BE INSERTED ---\n' +
        JSON.stringify(buildRow(parsed.answers ?? {}, { screenProgress: parsed.currentScreenIndex }), null, 2);
    } catch (e) {
      body = 'Could not parse saved state:\n' + String(e);
    }
  }

  targetEl.textContent = body;
}
