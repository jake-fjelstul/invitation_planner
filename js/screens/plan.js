/**
 * js/screens/plan.js - Screen 1: The Plan (Timeline, Napkin Map, Hotel Card)
 */

import { CONFIG } from '../config.js';
import { MAP_PINS_DATA } from '../data.js';
import { signHeader, sheet } from '../ui.js';
import { getAnswers } from '../state.js';

let containerEl = null;

export function init(el) {
  containerEl = el;
  containerEl.innerHTML = '';

  const paperCard = document.createElement('div');
  paperCard.className = 'atlas-card atlas-card--plan';

  // 1. Sign Header
  const header = signHeader(1, "THE PLAN");
  paperCard.appendChild(header);

  // 2. Body Container
  const body = document.createElement('div');
  body.className = 'plan-screen__body';

  // --- Section A: Napkin Map ---
  const mapSection = document.createElement('div');
  mapSection.className = 'plan-map-card';

  mapSection.innerHTML = `
    <div class="napkin-map-header">
      <span class="napkin-map-title">HIGHWAY ATLAS SKETCH</span>
      <span class="napkin-map-subtitle">Tap pins for stop details</span>
    </div>
    <div class="napkin-map-wrapper">
      <svg class="napkin-map-svg" viewBox="0 0 340 180" fill="none" stroke="currentColor">
        <!-- Gulf Coastline Strokes -->
        <path d="M 60 165 C 100 150, 160 155, 200 170 C 240 180, 280 160, 330 165" stroke="#6B6459" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.6" />
        <path d="M 120 172 C 160 162, 210 166, 260 175" stroke="#6B6459" stroke-width="1" opacity="0.4" />
        <text x="210" y="160" font-family="'Caveat', cursive" font-size="14" fill="#6B6459">Gulf of Mexico</text>

        <!-- Animated Napkin Route Path: ATL -> Montgomery -> Mobile -> NOLA -->
        <path class="napkin-route-path" d="M 280 30 Q 210 50, 170 85 T 90 135 T 50 145" stroke="#F2C14E" stroke-width="4" stroke-linecap="round" fill="none" />
        <path class="napkin-route-path-inner" d="M 280 30 Q 210 50, 170 85 T 90 135 T 50 145" stroke="#C8455A" stroke-width="2" stroke-linecap="round" fill="none" />

        <!-- Pin 1: Atlanta -->
        <g class="map-pin-group" data-pin-id="atlanta" transform="translate(280, 30)">
          <circle r="8" fill="#1F5B45" stroke="#FFFFFF" stroke-width="2" />
          <circle r="3" fill="#FFFFFF" />
          <text x="-5" y="-12" font-family="'Overpass', sans-serif" font-size="12" font-weight="700" fill="#24262B">ATL</text>
        </g>

        <!-- Pin 2: Montgomery / Halfway -->
        <g class="map-pin-group" data-pin-id="midway" transform="translate(170, 85)">
          <circle r="7" fill="#F2C14E" stroke="#24262B" stroke-width="2" />
          <circle r="2.5" fill="#24262B" />
          <text x="10" y="4" font-family="'Overpass', sans-serif" font-size="11" font-weight="700" fill="#24262B">I-85 / I-65</text>
        </g>

        <!-- Pin 3: New Orleans -->
        <g class="map-pin-group" data-pin-id="nola" transform="translate(50, 145)">
          <circle r="9" fill="#C8455A" stroke="#FFFFFF" stroke-width="2" />
          <circle r="3.5" fill="#FFFFFF" />
          <text x="-15" y="22" font-family="'Overpass', sans-serif" font-size="12" font-weight="800" fill="#C8455A">NOLA</text>
        </g>
      </svg>
    </div>
  `;

  // Attach pin click handlers
  const pinGroups = mapSection.querySelectorAll('.map-pin-group');
  pinGroups.forEach(pinEl => {
    pinEl.style.cursor = 'pointer';
    pinEl.addEventListener('click', () => {
      const pinId = pinEl.getAttribute('data-pin-id');
      const pinInfo = MAP_PINS_DATA.find(p => p.id === pinId);
      if (pinInfo) {
        sheet(pinInfo.name, `
          <p class="sheet-sub"><strong>${pinInfo.sub}</strong></p>
          <p class="sheet-desc">${pinInfo.desc}</p>
        `);
      }
    });
  });

  body.appendChild(mapSection);

  // --- Section B: Timeline ---
  const timelineSection = document.createElement('div');
  timelineSection.className = 'plan-timeline-card';

  timelineSection.innerHTML = `
    <ul class="timeline-list">
      <li class="timeline-row">
        <span class="timeline-time">FRI 3:15 PM</span>
        <span class="timeline-desc">Class ends</span>
      </li>
      <li class="timeline-row">
        <span class="timeline-time">FRI 3:45 PM</span>
        <span class="timeline-desc">Pick you up from The Connector</span>
      </li>
      <li class="timeline-row">
        <span class="timeline-time">FRI 6:00 PM CT</span>
        <span class="timeline-desc">Dinner stop</span>
      </li>
      <li class="timeline-row">
        <span class="timeline-time">FRI 10:45 PM CT</span>
        <span class="timeline-desc">Hampton Inn, 501 Elysian Fields</span>
      </li>
      <li class="timeline-row">
        <span class="timeline-time">SAT</span>
        <span class="timeline-desc">Yours to Plan</span>
      </li>
      <li class="timeline-row">
        <span class="timeline-time">SUN 10:00 AM CT</span>
        <span class="timeline-desc">Head home</span>
      </li>
    </ul>
  `;

  body.appendChild(timelineSection);

  // --- Section C: Hotel Card ---
  const hotelSection = document.createElement('div');
  hotelSection.className = 'plan-hotel-card';

  hotelSection.innerHTML = `
    <div class="hotel-card__paper">
      <h4 class="hotel-card__name">${CONFIG.hotelShort}</h4>
      <p class="hotel-card__address">${CONFIG.hotelAddress}</p>
      <a href="${CONFIG.hotelMapsUrl}" target="_blank" rel="noopener noreferrer" class="hotel-card__link">
        Open in Maps
      </a>
      <p class="hotel-card__note">${CONFIG.hotelNote}</p>
    </div>
  `;

  body.appendChild(hotelSection);

  paperCard.appendChild(body);
  containerEl.appendChild(paperCard);
}

export function read() {
  const answers = getAnswers();
  return {
    visited: true
  };
}
