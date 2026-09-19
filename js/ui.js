/**
 * js/ui.js - Shared, reusable components for Two Lanes to New Orleans
 */

/**
 * signHeader(number, title)
 * Highway guide-sign green header block with white Overpass caps and rounded white border.
 */
export function signHeader(number, title) {
  const container = document.createElement('div');
  container.className = 'sign-header';
  
  // Format title to sentence case if all caps
  let displayTitle = title;
  if (title === title.toUpperCase()) {
    displayTitle = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
  }

  container.innerHTML = `
    <div class="sign-header__tab" aria-hidden="true">${number}</div>
    <h1 class="sign-header__title">${displayTitle}</h1>
  `;
  return container;
}

/**
 * chip(label, opts = {})
 * Tappable pill, selected state, optional icon slot
 */
export function chip(label, opts = {}) {
  const { selected = false, icon = null, onClick = null, value = label } = opts;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `atlas-chip ${selected ? 'is-selected' : ''}`;
  btn.setAttribute('data-value', value);
  btn.setAttribute('aria-pressed', selected ? 'true' : 'false');
  
  let iconHtml = '';
  if (icon) {
    iconHtml = `<span class="atlas-chip__icon">${icon}</span>`;
  }
  
  btn.innerHTML = `${iconHtml}<span class="atlas-chip__label">${label}</span>`;
  
  if (onClick) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      onClick(value, btn);
    });
  }
  
  return btn;
}

/**
 * optionCard(data, opts = {})
 * Paper card with title, subtitle, small meta line, selected state
 */
export function optionCard(data, opts = {}) {
  const { id, title, subtitle, meta, selected = false, onSelect = null } = opts;
  const card = document.createElement('div');
  card.className = `option-card ${selected ? 'is-selected' : ''}`;
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'checkbox');
  card.setAttribute('aria-checked', selected ? 'true' : 'false');
  if (id) card.setAttribute('data-id', id);

  card.innerHTML = `
    <div class="option-card__paper">
      <div class="option-card__header">
        <h3 class="option-card__title">${title || data.title}</h3>
        <div class="option-card__radio" aria-hidden="true"></div>
      </div>
      ${subtitle || data.subtitle ? `<p class="option-card__subtitle">${subtitle || data.subtitle}</p>` : ''}
      ${meta || data.meta ? `<div class="option-card__meta">${meta || data.meta}</div>` : ''}
    </div>
  `;

  const toggle = (e) => {
    e.preventDefault();
    if (onSelect) onSelect(data || { id, title }, card);
  };

  card.addEventListener('click', toggle);
  card.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      toggle(e);
    }
  });

  return card;
}

/**
 * stepper(label, min, max, initialValue, onChange)
 * Quantity control with hand-drawn buttons
 */
export function stepper(label, min = 0, max = 6, initialValue = 0, onChange = null) {
  let val = initialValue;
  const container = document.createElement('div');
  container.className = 'stepper-control';

  container.innerHTML = `
    <span class="stepper-control__label">${label}</span>
    <div class="stepper-control__actions">
      <button type="button" class="stepper-btn stepper-btn--minus" aria-label="Decrease quantity of ${label}" ${val <= min ? 'disabled' : ''}>-</button>
      <span class="stepper-control__val" aria-live="polite">${val}</span>
      <button type="button" class="stepper-btn stepper-btn--plus" aria-label="Increase quantity of ${label}" ${val >= max ? 'disabled' : ''}>+</button>
    </div>
  `;

  const minusBtn = container.querySelector('.stepper-btn--minus');
  const plusBtn = container.querySelector('.stepper-btn--plus');
  const valDisplay = container.querySelector('.stepper-control__val');

  const update = (newVal) => {
    val = Math.max(min, Math.min(max, newVal));
    valDisplay.textContent = val;
    minusBtn.disabled = val <= min;
    plusBtn.disabled = val >= max;
    if (onChange) onChange(val);
  };

  minusBtn.addEventListener('click', () => update(val - 1));
  plusBtn.addEventListener('click', () => update(val + 1));

  return container;
}

/**
 * swipeDeck(items, onDone)
 * Draggable card stack with yes/no swipe, keyboard arrows, and accessible buttons
 */
export function swipeDeck(items = [], onDone = null) {
  const container = document.createElement('div');
  container.className = 'swipe-deck';

  let currentIndex = 0;
  const results = {};

  const deckStage = document.createElement('div');
  deckStage.className = 'swipe-deck__stage';
  deckStage.setAttribute('aria-live', 'polite');

  const controls = document.createElement('div');
  controls.className = 'swipe-deck__controls';
  controls.innerHTML = `
    <button type="button" class="swipe-btn swipe-btn--no" aria-label="Pass">
      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.5" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      <span>NO WAY</span>
    </button>
    <button type="button" class="swipe-btn swipe-btn--yes" aria-label="Add to trip">
      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>MUST HAVE</span>
    </button>
  `;

  container.appendChild(deckStage);
  container.appendChild(controls);

  function renderDeck() {
    deckStage.innerHTML = '';
    if (currentIndex >= items.length) {
      deckStage.innerHTML = `
        <div class="swipe-card swipe-card--empty">
          <p class="swipe-card__empty-text">All cards sorted!</p>
        </div>
      `;
      if (onDone) onDone(results);
      return;
    }

    for (let i = Math.min(items.length - 1, currentIndex + 2); i >= currentIndex; i--) {
      const item = items[i];
      const card = document.createElement('div');
      const offset = i - currentIndex;
      card.className = `swipe-card ${offset === 0 ? 'is-top' : ''}`;
      card.style.setProperty('--deck-offset', offset);

      card.innerHTML = `
        <div class="swipe-card__paper">
          ${item.image ? `<img src="${item.image}" alt="" class="swipe-card__img" />` : ''}
          <h4 class="swipe-card__title">${item.title}</h4>
          <p class="swipe-card__desc">${item.description || ''}</p>
          <div class="swipe-card__badge">${item.category || 'Road Snack'}</div>
        </div>
      `;

      if (offset === 0) {
        setupDrag(card, item);
      }

      deckStage.appendChild(card);
    }
  }

  function handleSwipe(direction, item) {
    results[item.id || item.title] = direction === 'yes';
    currentIndex++;
    renderDeck();
  }

  function setupDrag(cardEl, item) {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const onStart = (e) => {
      isDragging = true;
      startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      cardEl.style.transition = 'none';
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      currentX = x - startX;
      const rotate = currentX * 0.08;
      cardEl.style.transform = `translate3d(${currentX}px, 0, 0) rotate(${rotate}deg)`;
    };

    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      cardEl.style.transition = 'transform 0.3s ease';
      if (currentX > 80) {
        cardEl.style.transform = 'translate3d(400px, 0, 0) rotate(20deg)';
        setTimeout(() => handleSwipe('yes', item), 200);
      } else if (currentX < -80) {
        cardEl.style.transform = 'translate3d(-400px, 0, 0) rotate(-20deg)';
        setTimeout(() => handleSwipe('no', item), 200);
      } else {
        cardEl.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
      }
    };

    cardEl.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    cardEl.addEventListener('touchstart', onStart, { passive: true });
    cardEl.addEventListener('touchmove', onMove, { passive: true });
    cardEl.addEventListener('touchend', onEnd);
  }

  const noBtn = controls.querySelector('.swipe-btn--no');
  const yesBtn = controls.querySelector('.swipe-btn--yes');

  noBtn.addEventListener('click', () => {
    if (currentIndex < items.length) handleSwipe('no', items[currentIndex]);
  });
  yesBtn.addEventListener('click', () => {
    if (currentIndex < items.length) handleSwipe('yes', items[currentIndex]);
  });

  renderDeck();
  return container;
}

/**
 * sheet(title, bodyHtml)
 * Slide-up detail modal sheet
 */
export function sheet(title, bodyHtml) {
  const overlay = document.createElement('div');
  overlay.className = 'atlas-sheet-overlay';

  overlay.innerHTML = `
    <div class="atlas-sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
      <div class="atlas-sheet__handle"></div>
      <div class="atlas-sheet__header">
        <h3 class="atlas-sheet__title" id="sheet-title">${title}</h3>
        <button type="button" class="atlas-sheet__close" aria-label="Close sheet">✕</button>
      </div>
      <div class="atlas-sheet__body">
        ${bodyHtml}
      </div>
    </div>
  `;

  const closeBtn = overlay.querySelector('.atlas-sheet__close');
  const close = () => {
    overlay.classList.remove('is-open');
    setTimeout(() => overlay.remove(), 250);
  };

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('is-open'));

  return { close, element: overlay };
}

/**
 * mascot(pose)
 * Reusable dog mascot component with inline SVG fallback
 */
export function mascot(pose = "driving") {
  const container = document.createElement('div');
  container.className = `mascot-wrapper mascot-wrapper--${pose}`;

  const svgFallback = `
    <svg class="mascot-svg-fallback" viewBox="0 0 100 100" width="80" height="80" fill="none" stroke="#24262B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M 30 40 C 25 20, 15 35, 25 55 C 28 62, 35 70, 50 72 C 65 70, 72 62, 75 55 C 85 35, 75 20, 70 40 Z" fill="#EFE6D2" />
      <path d="M 28 35 Q 12 40, 18 65 Q 26 60, 30 45" fill="#E2D5B8" />
      <path d="M 72 35 Q 88 40, 82 65 Q 74 60, 70 45" fill="#E2D5B8" />
      <circle cx="42" cy="48" r="3.5" fill="#24262B" />
      <circle cx="58" cy="48" r="3.5" fill="#24262B" />
      <ellipse cx="50" cy="56" rx="5" ry="3.5" fill="#24262B" />
      <path d="M 50 59.5 L 50 64 Q 44 68, 38 64 M 50 64 Q 56 68, 62 64" />
      ${pose === 'driving' ? '<path d="M 25 78 C 35 72, 65 72, 75 78 L 80 90 L 20 90 Z" fill="#F2C14E" /><circle cx="50" cy="85" r="10" stroke-width="3" />' : ''}
      ${pose === 'sleeping' ? '<path d="M 68 30 Q 75 22, 82 30" /><text x="75" y="22" font-family="Caveat" font-size="16" fill="#6B6459">Zzz...</text>' : ''}
      ${pose === 'waving' ? '<path d="M 78 60 Q 90 45, 85 35" stroke-width="3" /><circle cx="85" cy="35" r="4" fill="#C8455A" />' : ''}
      ${pose === 'thinking' ? '<circle cx="75" cy="30" r="3" fill="#6B6459" /><circle cx="82" cy="20" r="6" fill="#EFE6D2" />' : ''}
    </svg>
  `;

  container.innerHTML = svgFallback;
  return container;
}
