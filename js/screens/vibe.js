/**
 * js/screens/vibe.js - Screen 4: The vibe
 */

import { VIBE_CHIPS } from '../data.js';
import { signHeader, chip } from '../ui.js';
import { setAnswer, getAnswers } from '../state.js';

let containerEl = null;

export function init(el) {
  containerEl = el;
  containerEl.innerHTML = '';

  const answers = getAnswers();
  const savedVibe = answers.vibe || { choices: [], other: "" };

  let selectedChoices = new Set(
    Array.isArray(savedVibe.choices) ? savedVibe.choices : []
  );
  let otherVibeText = savedVibe.other || "";

  const paperCard = document.createElement('div');
  paperCard.className = 'atlas-card atlas-card--vibe';

  // 1. Sign Header
  const header = signHeader(4, "The vibe");
  paperCard.appendChild(header);

  // 2. Body Container
  const body = document.createElement('div');
  body.className = 'vibe-screen__body';

  function saveVibeState() {
    setAnswer('vibe', {
      choices: Array.from(selectedChoices),
      other: otherVibeText
    });
  }

  body.innerHTML = `
    <div class="vibe-section-card">
      <h3 class="vibe-section-title">What's the vibe for this trip?</h3>
      <p class="vibe-section-sub">Pick as many as you want</p>
      
      <!-- Selectable Vibe Options Chips -->
      <div class="vibe-chips-grid" id="vibe-chips-grid"></div>

      <!-- Other Options Field -->
      <div class="vibe-input-group">
        <label for="vibe-other-input" class="vibe-input-label">Other options or ideas?</label>
        <input type="text" id="vibe-other-input" class="atlas-input" placeholder="Anything else you want to do..." value="${otherVibeText}" />
      </div>
    </div>

    <div class="vibe-image-wrapper">
      <img src="assets/vibe.jpeg" alt="The Vibe" class="vibe-screen__img" />
    </div>
  `;

  // Render Vibe Chips (multi-select)
  const chipsGrid = body.querySelector('#vibe-chips-grid');
  VIBE_CHIPS.forEach(vibeText => {
    const isSelected = selectedChoices.has(vibeText);
    const vibeChip = chip(vibeText, {
      selected: isSelected,
      value: vibeText,
      onClick: (val, elem) => {
        if (selectedChoices.has(val)) {
          selectedChoices.delete(val);
          elem.classList.remove('is-selected');
          elem.setAttribute('aria-pressed', 'false');
        } else {
          selectedChoices.add(val);
          elem.classList.add('is-selected');
          elem.setAttribute('aria-pressed', 'true');
        }
        saveVibeState();
      }
    });
    chipsGrid.appendChild(vibeChip);
  });

  // Attach Other input listener
  const otherInput = body.querySelector('#vibe-other-input');
  otherInput.addEventListener('input', (e) => {
    otherVibeText = e.target.value;
    saveVibeState();
  });

  paperCard.appendChild(body);
  containerEl.appendChild(paperCard);
}

export function read() {
  const answers = getAnswers();
  return {
    vibe: answers.vibe || { choices: [], other: "" }
  };
}
