/**
 * js/screens/menu.js - Screen 7: Where we eat (The Menu)
 */

import { CONFIG } from '../config.js';
import { FOOD_DATA } from '../data.js';
import { signHeader, optionCard, chip } from '../ui.js';
import { setAnswer, getAnswers } from '../state.js';

let containerEl = null;

export function init(el) {
  containerEl = el;
  containerEl.innerHTML = '';

  const answers = getAnswers();
  const savedFood = answers.food || {
    fridayDinner: null,
    fridayBackup: null,
    cravings: "",
    satLunch: null,
    satLunchBackup: null,
    groupDinner: "Tujague's @ 7:00 PM (Brotherhood & dates)",
    sundayBeignets: true
  };

  let foodState = { ...savedFood };

  const paperCard = document.createElement('div');
  paperCard.className = 'atlas-card atlas-card--menu';

  // 1. Sign Header
  const header = signHeader(7, "Where we eat");
  paperCard.appendChild(header);

  // 2. Body Container
  const body = document.createElement('div');
  body.className = 'menu-screen__body';

  // Helper text
  const helper = document.createElement('p');
  helper.className = 'menu-helper-text';
  helper.textContent = "Tap once to pick, twice to make it a backup.";
  body.appendChild(helper);

  function saveMenuState() {
    setAnswer('food', foodState);
  }

  // --- Helper to build a section with primary/backup tap logic ---
  function buildMenuSection(sectionTitle, optionsArray, primaryKey, backupKey) {
    const sectionWrap = document.createElement('div');
    sectionWrap.className = 'menu-section';

    sectionWrap.innerHTML = `
      <h3 class="menu-section-title">${sectionTitle}</h3>
      <div class="menu-cards-list" id="cards-${primaryKey}"></div>
    `;

    const cardsList = sectionWrap.querySelector(`#cards-${primaryKey}`);

    function renderCards() {
      cardsList.innerHTML = '';
      const primaryVal = foodState[primaryKey];
      const backupVal = foodState[backupKey];

      optionsArray.forEach(dataItem => {
        const isPrimary = (primaryVal === dataItem.title);
        const isBackup = (backupVal === dataItem.title);

        const cardElem = optionCard(dataItem, {
          id: dataItem.id,
          title: dataItem.title,
          subtitle: dataItem.subtitle,
          meta: dataItem.meta,
          selected: isPrimary,
          onSelect: () => {
            if (!primaryVal) {
              // Set primary
              foodState[primaryKey] = dataItem.title;
            } else if (primaryVal === dataItem.title) {
              // Tapped primary again: if backup exists, clear primary or backup
              if (backupVal) {
                foodState[primaryKey] = backupVal;
                foodState[backupKey] = null;
              } else {
                foodState[primaryKey] = null;
              }
            } else if (!backupVal) {
              // Set backup
              foodState[backupKey] = dataItem.title;
            } else if (backupVal === dataItem.title) {
              // Clear backup
              foodState[backupKey] = null;
            } else {
              // Replace backup with new selection
              foodState[backupKey] = dataItem.title;
            }

            renderCards();
            saveMenuState();
          }
        });

        // Add backup badge if this card is backup choice
        if (isBackup) {
          cardElem.classList.add('is-backup-choice');
          const paperInner = cardElem.querySelector('.option-card__paper');
          const backupBadge = document.createElement('span');
          backupBadge.className = 'backup-badge';
          backupBadge.textContent = '(backup)';
          paperInner.appendChild(backupBadge);
        }

        cardsList.appendChild(cardElem);
      });
    }

    renderCards();
    return sectionWrap;
  }

  // --- Section 1: Friday on the road ---
  const sec1 = buildMenuSection(
    "Friday, on the road",
    FOOD_DATA.fridayDinner,
    'fridayDinner',
    'fridayBackup'
  );
  body.appendChild(sec1);

  // --- Section: Food Cravings (before Saturday lunch) ---
  const cravingsSec = document.createElement('div');
  cravingsSec.className = 'menu-section';
  cravingsSec.innerHTML = `
    <h3 class="menu-section-title">Any specific food you're craving?</h3>
    <div class="menu-input-group">
      <input type="text" id="menu-cravings-input" class="atlas-input" placeholder="Gumbo, oysters, po-boys, muffuletta..." value="${foodState.cravings || ''}" />
    </div>
  `;
  body.appendChild(cravingsSec);

  const cravingsInput = cravingsSec.querySelector('#menu-cravings-input');
  cravingsInput.addEventListener('input', (e) => {
    foodState.cravings = e.target.value;
    saveMenuState();
  });

  // --- Section 2: Saturday lunch ---
  const sec2 = buildMenuSection(
    "Saturday lunch",
    FOOD_DATA.satLunch,
    'satLunch',
    'satLunchBackup'
  );
  body.appendChild(sec2);

  // --- Section 3: Saturday dinner ---
  const sec3 = document.createElement('div');
  sec3.className = 'menu-section';
  sec3.innerHTML = `
    <h3 class="menu-section-title">Saturday dinner</h3>
    <div class="fixed-dinner-card">
      <h4 class="fixed-dinner-title">Tujague's @ 7:00 PM</h4>
      <p class="fixed-dinner-sub">Entire brotherhood & dates</p>
    </div>
  `;
  body.appendChild(sec3);
  foodState.groupDinner = "Tujague's @ 7:00 PM (Brotherhood & dates)";
  saveMenuState();

  // --- Section 4: Sunday Beignets Toggle ---
  const toggleSection = document.createElement('div');
  toggleSection.className = 'menu-beignets-toggle-section';

  toggleSection.innerHTML = `
    <h4 class="beignets-toggle-title">Beignets before we drive home Sunday?</h4>
    <div class="beignets-toggle-group" id="beignets-chips"></div>
  `;

  const beignetsChipsGroup = toggleSection.querySelector('#beignets-chips');
  const beignetsOptions = [
    { label: "Yes", val: true },
    { label: "Sleep in", val: false }
  ];

  beignetsOptions.forEach(opt => {
    const isSel = (foodState.sundayBeignets === opt.val);
    const chipBtn = chip(opt.label, {
      selected: isSel,
      value: opt.label,
      onClick: () => {
        foodState.sundayBeignets = opt.val;
        const allChips = beignetsChipsGroup.querySelectorAll('.atlas-chip');
        allChips.forEach(c => c.classList.remove('is-selected'));
        chipBtn.classList.add('is-selected');
        saveMenuState();
      }
    });
    beignetsChipsGroup.appendChild(chipBtn);
  });

  body.appendChild(toggleSection);

  paperCard.appendChild(body);
  containerEl.appendChild(paperCard);
}

export function read() {
  const answers = getAnswers();
  return {
    food: answers.food || {
      fridayDinner: null,
      fridayBackup: null,
      cravings: "",
      satLunch: null,
      satLunchBackup: null,
      groupDinner: "Tujague's @ 7:00 PM (Brotherhood & dates)",
      sundayBeignets: true
    }
  };
}
