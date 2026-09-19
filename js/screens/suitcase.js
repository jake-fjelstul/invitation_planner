/**
 * js/screens/suitcase.js - Screen 2: What to wear and pack (The Suitcase)
 */

import { signHeader, chip } from '../ui.js';
import { setAnswer, getAnswers } from '../state.js';

let containerEl = null;

const DRESS_COLORS = [
  "Black", "Red", "Pink", "Navy", "Green", "Blue", "White", "Gold", "Silver", "Other"
];

const PACK_ITEMS = [
  "Camera",
  "Sunglasses",
  "Going out shoes",
  "Walking shoes",
  "New Orleans exploration clothes",
  "Swimsuit",
  "Comfy roadtrip car clothes"
];

const SNACK_ITEMS = [
  "Trader Joe's tree bark",
  "Chocolate truffles",
  "M&Ms"
];

export function init(el) {
  containerEl = el;
  containerEl.innerHTML = '';

  const answers = getAnswers();
  const savedSuitcase = answers.suitcase || {};

  let selectedDressColor = savedSuitcase.dressColor || "";
  let selectedPackItems = new Set(savedSuitcase.packItems || []);
  let selectedSnacks = new Set(savedSuitcase.snacks || []);
  let userQuestionsText = savedSuitcase.userQuestions || "";

  const paperCard = document.createElement('div');
  paperCard.className = 'atlas-card atlas-card--suitcase';

  // 1. Sign Header
  const header = signHeader(2, "What to pack");
  paperCard.appendChild(header);

  // 2. Body Container
  const body = document.createElement('div');
  body.className = 'suitcase-screen__body';

  function saveSuitcaseState() {
    setAnswer('suitcase', {
      dressColor: selectedDressColor,
      packItems: Array.from(selectedPackItems),
      snacks: Array.from(selectedSnacks),
      userQuestions: userQuestionsText
    });
  }

  body.innerHTML = `
    <!-- Section 1: Formal Fits -->
    <div class="suitcase-section-card">
      <h3 class="suitcase-section-title">Formal Fits</h3>
      <p class="suitcase-section-sub">
        Short dress — I will be wearing my navy suit and blue collared shirt, and will match my tie to your dress color.
      </p>
      <div class="color-select-label">Select your dress color:</div>
      <div class="suitcase-chips-grid" id="dress-color-grid"></div>
    </div>

    <!-- Section 2: Pack list -->
    <div class="suitcase-section-card">
      <h3 class="suitcase-section-title">Pack list</h3>
      <div class="suitcase-chips-grid" id="pack-list-grid"></div>
    </div>

    <!-- Section 3: Snack section -->
    <div class="suitcase-section-card">
      <h3 class="suitcase-section-title">Snacks</h3>
      <div class="suitcase-chips-grid" id="snack-list-grid"></div>
    </div>

    <!-- Section 4: Questions & Requests -->
    <div class="suitcase-section-card">
      <h3 class="suitcase-section-title">Anything I can bring for you?</h3>
      <textarea id="suitcase-questions-input" class="atlas-textarea" rows="2" placeholder="Questions or requests...">${userQuestionsText}</textarea>
    </div>
  `;

  // Render Dress Color Chips (single select)
  const colorGrid = body.querySelector('#dress-color-grid');
  DRESS_COLORS.forEach(colorName => {
    const isSelected = (selectedDressColor === colorName);
    const colorChip = chip(colorName, {
      selected: isSelected,
      value: colorName,
      onClick: (val) => {
        selectedDressColor = val;
        const allChips = colorGrid.querySelectorAll('.atlas-chip');
        allChips.forEach(c => {
          if (c.getAttribute('data-value') === val) {
            c.classList.add('is-selected');
            c.setAttribute('aria-pressed', 'true');
          } else {
            c.classList.remove('is-selected');
            c.setAttribute('aria-pressed', 'false');
          }
        });
        saveSuitcaseState();
      }
    });
    colorGrid.appendChild(colorChip);
  });

  // Render Pack List Chips (multi select)
  const packGrid = body.querySelector('#pack-list-grid');
  PACK_ITEMS.forEach(itemName => {
    const isSelected = selectedPackItems.has(itemName);
    const itemChip = chip(itemName, {
      selected: isSelected,
      value: itemName,
      onClick: (val, elem) => {
        if (selectedPackItems.has(val)) {
          selectedPackItems.delete(val);
          elem.classList.remove('is-selected');
          elem.setAttribute('aria-pressed', 'false');
        } else {
          selectedPackItems.add(val);
          elem.classList.add('is-selected');
          elem.setAttribute('aria-pressed', 'true');
        }
        saveSuitcaseState();
      }
    });
    packGrid.appendChild(itemChip);
  });

  // Render Snack List Chips (multi select)
  const snackGrid = body.querySelector('#snack-list-grid');
  SNACK_ITEMS.forEach(snackName => {
    const isSelected = selectedSnacks.has(snackName);
    const snackChip = chip(snackName, {
      selected: isSelected,
      value: snackName,
      onClick: (val, elem) => {
        if (selectedSnacks.has(val)) {
          selectedSnacks.delete(val);
          elem.classList.remove('is-selected');
          elem.setAttribute('aria-pressed', 'false');
        } else {
          selectedSnacks.add(val);
          elem.classList.add('is-selected');
          elem.setAttribute('aria-pressed', 'true');
        }
        saveSuitcaseState();
      }
    });
    snackGrid.appendChild(snackChip);
  });

  // Attach Questions textarea listener
  const questionsInput = body.querySelector('#suitcase-questions-input');
  questionsInput.addEventListener('input', (e) => {
    userQuestionsText = e.target.value;
    saveSuitcaseState();
  });

  saveSuitcaseState();

  paperCard.appendChild(body);
  containerEl.appendChild(paperCard);
}

export function read() {
  const answers = getAnswers();
  return {
    suitcase: answers.suitcase || {}
  };
}
