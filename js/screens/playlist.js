/**
 * js/screens/playlist.js - Screen 5: The car playlist (The Aux - Apple Music Link & Image)
 */

import { CONFIG } from '../config.js';
import { signHeader } from '../ui.js';
import { getAnswers } from '../state.js';

let containerEl = null;

export function init(el) {
  containerEl = el;
  containerEl.innerHTML = '';

  const paperCard = document.createElement('div');
  paperCard.className = 'atlas-card atlas-card--playlist';

  // 1. Sign Header
  const header = signHeader(5, "THE AUX");
  paperCard.appendChild(header);

  // 2. Body Container
  const body = document.createElement('div');
  body.className = 'playlist-screen__body';

  const appleMusicUrl = CONFIG.playlistUrl || "https://music.apple.com/us/playlist/pl.u-KVXBkl3TLeMkLRk?a=join&it=ZN48lnaiMmJGMvGSX7jK6";

  body.innerHTML = `
    <div class="playlist-card-container">
      <a href="${appleMusicUrl}" target="_blank" rel="noopener noreferrer" class="apple-music-box" id="apple-music-link">
        <div class="apple-music-box__icon-badge">
          <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.87 6.13a.625.625 0 0 1 .63.62v5.772a2.38 2.38 0 1 1-1.25-2.072V8.988l-5 1.428v5.084a2.38 2.38 0 1 1-1.25-2.072V9.623a.625.625 0 0 1 .454-.601l6.416-1.833a.625.625 0 0 1 .17-.024z"/>
          </svg>
        </div>
        <div class="apple-music-box__content">
          <span class="apple-music-box__tag">APPLE MUSIC</span>
          <h3 class="apple-music-box__title">Road Trip Playlist</h3>
          <p class="apple-music-box__sub">Tap to join and add your songs</p>
        </div>
        <div class="apple-music-box__cta">
          <span>JOIN PLAYLIST</span>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </div>
      </a>
    </div>

    <div class="playlist-image-wrapper">
      <img src="assets/music.jpeg" alt="Road trip music" class="playlist-screen__img" />
    </div>
  `;

  paperCard.appendChild(body);
  containerEl.appendChild(paperCard);
}

export function read() {
  const answers = getAnswers();
  return {
    playlist: answers.playlist || { joinedAppleMusic: true }
  };
}
