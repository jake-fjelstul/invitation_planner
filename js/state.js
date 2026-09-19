/**
 * js/state.js - State management with localStorage autosave for Two Lanes to New Orleans
 */

import { SCREENS } from './data.js';

const STORAGE_KEY = "nola-weekend-v1";
let saveTimeout = null;
const listeners = new Set();

export const state = {
  currentScreenIndex: 0,
  completedScreens: new Set(),
  answers: {}
};

/**
 * Register state change listener
 */
export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify(changeType) {
  listeners.forEach(fn => fn(state, changeType));
}

/**
 * Debounced save to localStorage
 */
function scheduleSave() {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    try {
      const payload = {
        currentScreenIndex: state.currentScreenIndex,
        completedScreens: Array.from(state.completedScreens),
        answers: state.answers
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn("Failed to save to localStorage:", e);
    }
  }, 300);
}

/**
 * Load saved answers & screen state on boot
 */
export function loadAnswers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed.currentScreenIndex === 'number' && parsed.currentScreenIndex < SCREENS.length) {
        state.currentScreenIndex = Math.max(0, parsed.currentScreenIndex);
      }
      if (Array.isArray(parsed.completedScreens)) {
        state.completedScreens = new Set(parsed.completedScreens);
      }
      if (parsed.answers && typeof parsed.answers === 'object') {
        state.answers = parsed.answers;
      }
    }
  } catch (e) {
    console.warn("Failed to parse localStorage nola-weekend-v1:", e);
  }
  notify('boot');
  return state;
}

/**
 * Update answer for a screen key
 */
export function setAnswer(screenKey, value) {
  state.answers[screenKey] = value;
  scheduleSave();
  notify('answer');
}

/**
 * Mark a screen as completed (blooms tulip on progress rail)
 */
export function markScreenCompleted(screenIndex) {
  state.completedScreens.add(screenIndex);
  scheduleSave();
  notify('rail');
}

/**
 * Navigate to a specific screen index
 */
export function setScreenIndex(index) {
  if (index >= 0 && index < SCREENS.length) {
    state.currentScreenIndex = index;
    scheduleSave();
    notify('navigation');
  }
}

/**
 * Get current answers, guaranteed to merge complete screen structure & defaults
 */
export function getAnswers() {
  const current = state.answers || {};
  return {
    suitcase: { dressColor: "", packItems: [], snacks: [], userQuestions: "", ...(current.suitcase || {}) },
    cooler: { items: [], barOrder: "", ...(current.cooler || {}) },
    vibe: { choices: [], other: "", ...(current.vibe || {}) },
    activities: { liked: [], maybe: [], passed: [], lastFilter: "all", ...(current.activities || {}) },
    food: {
      fridayDinner: null,
      fridayBackup: null,
      cravings: "",
      satLunch: null,
      satLunchBackup: null,
      groupDinner: "Tujague's @ 7:00 PM (Brotherhood & dates)",
      sundayBeignets: true,
      ...(current.food || {})
    },
    saturdayNight: { plans: [], otherPlans: "", howLate: "Midnight", company: "Stay with the group", ...(current.saturdayNight || {}) },
    notes: { text: "", wantsSurprise: true, ...(current.notes || {}) }
  };
}

/**
 * Reset all answers, screen progress, and storage keys for a fresh run
 */
export function resetAnswers() {
  state.currentScreenIndex = 0;
  state.completedScreens = new Set();
  state.answers = {};
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("nola-weekend-session");
    localStorage.removeItem("nola-weekend-submits");
    localStorage.removeItem("nola-weekend-pending");
  } catch (e) {
    console.warn("Failed to clear localStorage keys:", e);
  }
  notify('navigation');
}
