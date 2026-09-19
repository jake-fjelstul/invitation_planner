/**
 * js/screens/confirmation.js - Confirmation Screen: Destination NOLA ("It's a road trip.")
 */

import { CONFIG } from '../config.js';
import { getAnswers } from '../state.js';

let containerEl = null;
let countdownInterval = null;

export function init(el) {
  containerEl = el;
  containerEl.innerHTML = '';

  const answers = getAnswers();
  console.log("==========================================");
  console.log("CONFIRMATION SCREEN LOADED - FULL ANSWERS:");
  console.log(JSON.stringify(answers, null, 2));
  console.log("==========================================");

  // 1. Animate road rail exit & car drive-off
  const roadRail = document.getElementById('road');
  const roadCar = document.getElementById('road-car');
  const bottomNav = document.getElementById('bottom-nav');

  if (roadRail) roadRail.classList.add('is-exited');
  if (roadCar) roadCar.classList.add('is-drived-off');
  if (bottomNav) bottomNav.classList.add('is-hidden');

  // 2. Sequential Tulip Blooming (10 tulips, 60ms apart)
  triggerSequentialTulipBloom();

  // 3. Build Confirmation Card
  const paperCard = document.createElement('div');
  paperCard.className = 'atlas-card atlas-card--confirmation';

  const body = document.createElement('div');
  body.className = 'confirmation-screen__body';

  body.innerHTML = `
    <div class="confirmation-hero">
      <!-- The Single Surviving Bloomed Tulip -->
      <div class="confirmation-tulip-wrap" aria-hidden="true">
        <svg viewBox="0 0 24 38" width="28" height="42" fill="none" stroke="currentColor">
          <path d="M 12 38 Q 10 26 12 14" stroke="#1F5B45" stroke-width="2" stroke-linecap="round" />
          <path d="M 12 30 Q 5 25 3 20 Q 8 22 12 26" stroke="#1F5B45" stroke-width="1.5" fill="#1F5B45" opacity="0.8" />
          <g class="tulip-head">
            <path d="M 6 14 C 4 6 10 2 12 6 C 14 2 20 6 18 14 Z" fill="#C8455A" stroke="#A02F43" stroke-width="1.5" />
          </g>
        </svg>
      </div>

      <!-- Fraunces Centered Headline -->
      <h1 class="confirmation-title">See you Friday.</h1>

      <!-- Subline -->
      <p class="confirmation-subline">3:45pm @ The Connector</p>

      <!-- Odometer Live Countdown -->
      <div class="confirmation-odometer-wrap">
        <div class="odometer-readout" id="live-odometer">
          <span id="countdown-text">-- DAYS &middot; -- HRS &middot; -- MIN</span>
        </div>
      </div>

      <!-- Shrunk 10.jpeg Image Container -->
      <div class="confirmation-image-wrapper">
        <img src="assets/10.jpeg" alt="Destination New Orleans" class="confirmation-screen__img" />
      </div>
    </div>
  `;

  paperCard.appendChild(body);
  containerEl.appendChild(paperCard);

  // Setup Live Odometer Countdown
  const countdownText = body.querySelector('#countdown-text');
  startLiveCountdown(countdownText);
}

/**
 * Sequential Tulip Blooming (60ms apart)
 */
function triggerSequentialTulipBloom() {
  const tulipItems = document.querySelectorAll('.tulip-item');
  tulipItems.forEach((item, idx) => {
    setTimeout(() => {
      item.classList.add('is-bloomed');
    }, idx * 60);
  });
}

/**
 * Calculates live departure countdown to CONFIG dates
 */
function startLiveCountdown(displayEl) {
  if (countdownInterval) clearInterval(countdownInterval);

  // Target departure date calculation using CONFIG.departISO
  let targetDate = new Date(CONFIG.departISO);
  if (isNaN(targetDate.getTime())) {
    // Fallback: 28 days from now
    targetDate = new Date(Date.now() + 28 * 24 * 60 * 60 * 1000);
  }

  function update() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      displayEl.textContent = "00 DAYS \u00B7 00 HRS \u00B7 00 MIN";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);

    const dStr = String(days).padStart(2, '0');
    const hStr = String(hours).padStart(2, '0');
    const mStr = String(mins).padStart(2, '0');

    displayEl.textContent = `${dStr} DAYS \u00B7 ${hStr} HRS \u00B7 ${mStr} MIN`;
  }

  update();
  countdownInterval = setInterval(update, 1000);
}

export function read() {
  const answers = getAnswers();
  return { answers };
}
