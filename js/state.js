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
 * Get current answers
 */
export function getAnswers() {
  return { ...state.answers };
}
