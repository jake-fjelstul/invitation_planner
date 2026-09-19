/**
 * js/screens/cooler.js - Screen 3: What's coming in the cooler (The Cooler)
 */

import { COOLER_ITEMS } from '../data.js';
import { signHeader, chip } from '../ui.js';
import { setAnswer, getAnswers } from '../state.js';

let containerEl = null;

export function init(el) {
  containerEl = el;
  containerEl.innerHTML = '';

  const answers = getAnswers();
  const savedCooler = answers.cooler || { items: [], barOrder: "" };

  let selectedItems = new Set(
    Array.isArray(savedCooler.items)
      ? savedCooler.items.map(i => (typeof i === 'string' ? i : i.name))
      : []
  );
  let barOrderText = savedCooler.barOrder || "";

  const paperCard = document.createElement('div');
  paperCard.className = 'atlas-card atlas-card--cooler';

  // 1. Sign Header
  const header = signHeader(3, "The cooler");
  paperCard.appendChild(header);

  // 2. Body Container
  const body = document.createElement('div');
  body.className = 'cooler-screen__body';

  function saveCoolerState() {
    setAnswer('cooler', {
      items: Array.from(selectedItems),
      barOrder: barOrderText
    });
  }

  body.innerHTML = `
    <div class="cooler-section-header">
      <h3 class="cooler-section-title">What do you want in the back seat?</h3>
      <p class="cooler-section-sub">Select your favorites</p>
    </div>

    <!-- Drinks Selectable Chip Grid -->
    <div class="cooler-chips-grid" id="cooler-chips-grid"></div>

    <!-- Bar Order Field -->
    <div class="cooler-input-group">
      <label for="barorder-input" class="cooler-input-label">Your usual bar order?</label>
      <input type="text" id="barorder-input" class="atlas-input" placeholder="e.g. Tequila soda, Espresso martini..." value="${barOrderText}" />
    </div>
  `;

  // Render drink chips
  const chipsGrid = body.querySelector('#cooler-chips-grid');
  COOLER_ITEMS.forEach(drinkName => {
    const isSelected = selectedItems.has(drinkName);
    const drinkChip = chip(drinkName, {
      selected: isSelected,
      value: drinkName,
      onClick: (val, elem) => {
        if (selectedItems.has(val)) {
          selectedItems.delete(val);
          elem.classList.remove('is-selected');
          elem.setAttribute('aria-pressed', 'false');
        } else {
          selectedItems.add(val);
          elem.classList.add('is-selected');
          elem.setAttribute('aria-pressed', 'true');
        }
        saveCoolerState();
      }
    });
    chipsGrid.appendChild(drinkChip);
  });

  // Attach bar order input listener
  const barInput = body.querySelector('#barorder-input');
  barInput.addEventListener('input', (e) => {
    barOrderText = e.target.value;
    saveCoolerState();
  });

  paperCard.appendChild(body);
  containerEl.appendChild(paperCard);
}

export function read() {
  const answers = getAnswers();
  return {
    cooler: answers.cooler || { items: [], barOrder: "" }
  };
}
