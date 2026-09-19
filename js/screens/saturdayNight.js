/**
 * js/screens/saturdayNight.js - Screen 8: Saturday night (After Dinner)
 */

import { SATURDAY_PLANS_CHIPS, NIGHT_DIAL_STOPS } from '../data.js';
import { signHeader, chip } from '../ui.js';
import { setAnswer, getAnswers } from '../state.js';

let containerEl = null;

const COMPANY_OPTIONS = [
  "Stay with the group",
  "Lose them after dinner",
  "See how the night goes"
];

export function init(el) {
  containerEl = el;
  containerEl.innerHTML = '';

  const answers = getAnswers();
  const savedSat = answers.saturdayNight || { plans: [], otherPlans: "", howLate: "Midnight", company: "Stay with the group" };

  let selectedPlans = new Set(savedSat.plans || []);
  let otherPlansText = savedSat.otherPlans || "";
  let selectedHowLateIndex = NIGHT_DIAL_STOPS.indexOf(savedSat.howLate);
  if (selectedHowLateIndex < 0) selectedHowLateIndex = 2; // Default to Midnight

  let selectedCompany = savedSat.company || "Stay with the group";

  const paperCard = document.createElement('div');
  paperCard.className = 'atlas-card atlas-card--sat-night';

  // 1. Sign Header
  const header = signHeader(8, "After dinner");
  paperCard.appendChild(header);

  // 2. Body Container
  const body = document.createElement('div');
  body.className = 'satnight-screen__body';

  function saveSatState() {
    setAnswer('saturdayNight', {
      plans: Array.from(selectedPlans),
      otherPlans: otherPlansText,
      howLate: NIGHT_DIAL_STOPS[selectedHowLateIndex],
      company: selectedCompany
    });
  }

  body.innerHTML = `
    <!-- Section 1: Pick as many as you want -->
    <div class="satnight-section-card">
      <h3 class="satnight-section-title">Pick as many as you want</h3>
      <div class="satnight-chips-grid" id="satnight-chips-grid"></div>
      <div class="satnight-other-group">
        <input type="text" id="satnight-other-input" class="atlas-input" placeholder="Other ideas or options..." value="${otherPlansText}" />
      </div>
    </div>

    <!-- Section 2: How Late Slider (10 PM to 2 AM) -->
    <div class="satnight-section-card">
      <div class="satnight-slider-header">
        <h3 class="satnight-section-title">How late</h3>
        <span class="satnight-slider-readout" id="satnight-slider-readout">${NIGHT_DIAL_STOPS[selectedHowLateIndex]}</span>
      </div>
      <div class="satnight-slider-container">
        <input type="range" min="0" max="4" value="${selectedHowLateIndex}" step="1" id="how-late-slider" class="satnight-range-slider" />
        <div class="satnight-slider-ticks">
          <span>10 PM</span>
          <span>11 PM</span>
          <span>Midnight</span>
          <span>1 AM</span>
          <span>2 AM</span>
        </div>
      </div>
    </div>

    <!-- Section 3: Company Choices (3 options) -->
    <div class="satnight-section-card">
      <h3 class="satnight-section-title">The vibe</h3>
      <div class="satnight-chips-grid" id="company-options-grid"></div>
    </div>

    <!-- Dancing Image Container -->
    <div class="satnight-image-wrapper">
      <img src="assets/dancing.jpeg" alt="Dancing in New Orleans" class="satnight-screen__img" />
    </div>
  `;

  // Render plan chips (multi select)
  const chipsGrid = body.querySelector('#satnight-chips-grid');
  SATURDAY_PLANS_CHIPS.forEach(planTitle => {
    const isSelected = selectedPlans.has(planTitle);
    const chipBtn = chip(planTitle, {
      selected: isSelected,
      value: planTitle,
      onClick: (val, elem) => {
        if (selectedPlans.has(val)) {
          selectedPlans.delete(val);
          elem.classList.remove('is-selected');
          elem.setAttribute('aria-pressed', 'false');
        } else {
          selectedPlans.add(val);
          elem.classList.add('is-selected');
          elem.setAttribute('aria-pressed', 'true');
        }
        saveSatState();
      }
    });
    chipsGrid.appendChild(chipBtn);
  });

  // Other input listener
  const otherInput = body.querySelector('#satnight-other-input');
  otherInput.addEventListener('input', (e) => {
    otherPlansText = e.target.value;
    saveSatState();
  });

  // Slider event listener
  const slider = body.querySelector('#how-late-slider');
  const readout = body.querySelector('#satnight-slider-readout');

  slider.addEventListener('input', (e) => {
    selectedHowLateIndex = parseInt(e.target.value, 10);
    readout.textContent = NIGHT_DIAL_STOPS[selectedHowLateIndex];
    saveSatState();
  });

  // Render 3 Company Options Chips (single select)
  const companyGrid = body.querySelector('#company-options-grid');
  COMPANY_OPTIONS.forEach(optText => {
    const isSelected = (selectedCompany === optText);
    const companyChip = chip(optText, {
      selected: isSelected,
      value: optText,
      onClick: (val) => {
        selectedCompany = val;
        const allChips = companyGrid.querySelectorAll('.atlas-chip');
        allChips.forEach(c => {
          if (c.getAttribute('data-value') === val) {
            c.classList.add('is-selected');
            c.setAttribute('aria-pressed', 'true');
          } else {
            c.classList.remove('is-selected');
            c.setAttribute('aria-pressed', 'false');
          }
        });
        saveSatState();
      }
    });
    companyGrid.appendChild(companyChip);
  });

  saveSatState();

  paperCard.appendChild(body);
  containerEl.appendChild(paperCard);
}

export function read() {
  const answers = getAnswers();
  return {
    saturdayNight: answers.saturdayNight || { plans: [], otherPlans: "", howLate: "Midnight", company: "Stay with the group" }
  };
}
