/**
 * js/screens/postcards.js - Screen 6: Things to do in New Orleans
 */

import { CATEGORIES, THINGS_TO_DO } from '../data-todo.js';
import { signHeader, chip } from '../ui.js';
import { setAnswer, getAnswers } from '../state.js';

const CATEGORY_COLORS = {
  classic: '#1F5B45',
  music: '#7C3A82',
  drinks: '#C86228',
  art: '#2563EB',
  outdoors: '#2E7D32',
  offbeat: '#8B5CF6'
};

let containerEl = null;
let photoManifest = { hasPhotos: false, available: {} };

export async function init(el) {
  containerEl = el;
  containerEl.innerHTML = '';

  try {
    const res = await fetch('assets/todo/manifest.json');
    if (res.ok) {
      photoManifest = await res.json();
    }
  } catch (e) {
    photoManifest = { hasPhotos: false, available: {} };
  }

  const answers = getAnswers();
  const savedActivities = answers.activities || { liked: [], maybe: [], passed: [], lastFilter: 'all' };

  let likedSet = new Set(savedActivities.liked || []);
  let maybeSet = new Set(savedActivities.maybe || []);
  let passedSet = new Set(savedActivities.passed || []);
  let currentFilter = savedActivities.lastFilter || 'all';

  const paperCard = document.createElement('div');
  paperCard.className = 'atlas-card atlas-card--postcards';

  // 1. Sign Header
  const header = signHeader(6, "Things to do");
  paperCard.appendChild(header);

  // 2. Main Body Container
  const body = document.createElement('div');
  body.className = 'postcards-screen__body';

  // Filter Row
  const filterRow = document.createElement('div');
  filterRow.className = 'postcards-filter-bar';
  body.appendChild(filterRow);

  // Deck Wrapper Container
  const deckWrapper = document.createElement('div');
  deckWrapper.className = 'postcards-deck-wrapper';
  body.appendChild(deckWrapper);

  paperCard.appendChild(body);
  containerEl.appendChild(paperCard);

  function saveState() {
    const payload = {
      liked: Array.from(likedSet),
      maybe: Array.from(maybeSet),
      passed: Array.from(passedSet),
      lastFilter: currentFilter
    };
    setAnswer('activities', payload);
  }

  function getUnswipedItems(catId) {
    return THINGS_TO_DO.filter(item => {
      const isAnswered = likedSet.has(item.id) || maybeSet.has(item.id) || passedSet.has(item.id);
      if (isAnswered) return false;
      if (catId === 'all') return true;
      return item.category === catId;
    });
  }

  function getItemsInFilter(catId) {
    if (catId === 'all') return THINGS_TO_DO;
    return THINGS_TO_DO.filter(item => item.category === catId);
  }

  function renderFilterBar() {
    filterRow.innerHTML = '';
    CATEGORIES.forEach(cat => {
      const unswipedCount = getUnswipedItems(cat.id).length;
      const isSelected = cat.id === currentFilter;
      const labelText = isSelected ? `${cat.label} ${unswipedCount}` : cat.label;

      const chipBtn = chip(labelText, {
        selected: isSelected,
        value: cat.id,
        onClick: (catId) => {
          if (currentFilter !== catId) {
            currentFilter = catId;
            saveState();
            renderFilterBar();
            renderDeckView();
          }
        }
      });
      filterRow.appendChild(chipBtn);
    });
  }

  function renderDeckView() {
    deckWrapper.innerHTML = '';

    const unswipedCards = getUnswipedItems(currentFilter);

    if (unswipedCards.length === 0) {
      renderGroupedSummary();
      return;
    }

    renderInteractiveDeck(unswipedCards);
  }

  function renderInteractiveDeck(cardsList) {
    deckWrapper.innerHTML = '';
    let currentIndex = 0;

    const stage = document.createElement('div');
    stage.className = 'postcard-stage';

    // 3 Action Buttons below deck
    const controls = document.createElement('div');
    controls.className = 'postcard-actions-3';
    controls.innerHTML = `
      <button type="button" class="postcard-act-btn postcard-act-btn--no" aria-label="Pass">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        <span>PASS</span>
      </button>

      <button type="button" class="postcard-act-btn postcard-act-btn--maybe" aria-label="Save as maybe">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
        <span>MAYBE</span>
      </button>

      <button type="button" class="postcard-act-btn postcard-act-btn--yes" aria-label="Must do">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>MUST DO</span>
      </button>
    `;

    deckWrapper.appendChild(stage);
    deckWrapper.appendChild(controls);

    function updateDeck() {
      stage.innerHTML = '';

      if (currentIndex >= cardsList.length) {
        renderFilterBar();
        renderGroupedSummary();
        return;
      }

      // Preload next card's top photo if available
      if (currentIndex + 1 < cardsList.length) {
        const nextItem = cardsList[currentIndex + 1];
        const pre = new Image();
        pre.src = `assets/todo/${nextItem.id}-1.jpg`;
      }

      renderFilterBar();

      // Render top 3 stacked cards
      for (let i = Math.min(cardsList.length - 1, currentIndex + 2); i >= currentIndex; i--) {
        const item = cardsList[i];
        const offset = i - currentIndex;
        const cardEl = createCardElement(item, offset, offset === 0, (outcome) => {
          if (outcome === 'liked') likedSet.add(item.id);
          else if (outcome === 'maybe') maybeSet.add(item.id);
          else if (outcome === 'passed') passedSet.add(item.id);

          saveState();
          currentIndex++;
          updateDeck();
        });

        stage.appendChild(cardEl);
      }
    }

    const noBtn = controls.querySelector('.postcard-act-btn--no');
    const maybeBtn = controls.querySelector('.postcard-act-btn--maybe');
    const yesBtn = controls.querySelector('.postcard-act-btn--yes');

    const handleAction = (type, e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (currentIndex < cardsList.length) {
        const item = cardsList[currentIndex];
        if (type === 'no') passedSet.add(item.id);
        else if (type === 'maybe') maybeSet.add(item.id);
        else if (type === 'yes') likedSet.add(item.id);
        saveState();
        currentIndex++;
        updateDeck();
      }
    };

    noBtn.addEventListener('click', (e) => handleAction('no', e));
    maybeBtn.addEventListener('click', (e) => handleAction('maybe', e));
    yesBtn.addEventListener('click', (e) => handleAction('yes', e));

    // Keyboard Navigation
    const keyHandler = (e) => {
      if (!document.contains(stage)) {
        window.removeEventListener('keydown', keyHandler);
        return;
      }
      if (currentIndex >= cardsList.length) return;

      if (e.key === 'ArrowRight') {
        const item = cardsList[currentIndex];
        likedSet.add(item.id);
        saveState();
        currentIndex++;
        updateDeck();
      } else if (e.key === 'ArrowLeft') {
        const item = cardsList[currentIndex];
        passedSet.add(item.id);
        saveState();
        currentIndex++;
        updateDeck();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const item = cardsList[currentIndex];
        maybeSet.add(item.id);
        saveState();
        currentIndex++;
        updateDeck();
      }
    };

    window.addEventListener('keydown', keyHandler);

    updateDeck();
  }

  function createCardElement(item, offset, isTop, onSwipe) {
    const card = document.createElement('div');
    card.className = `postcard-card ${isTop ? 'is-top' : ''}`;
    card.style.setProperty('--deck-offset', offset);

    const categoryBg = CATEGORY_COLORS[item.category] || '#1F5B45';

    card.innerHTML = `
      <div class="postcard-card__paper">
        <!-- 1. PHOTO CAROUSEL AREA (~58%) -->
        <div class="postcard-photo-area">
          <div class="postcard-photo-track"></div>
          
          <div class="postcard-photo-fallback" style="background-color: ${categoryBg}">
            <div class="postcard-fallback-icon-wrap">
              ${getCategoryBgSvg(item.category)}
            </div>
            <span class="postcard-fallback-name">${escapeHtml(item.name)}</span>
          </div>

          <div class="postcard-photo-dots"></div>
        </div>

        <!-- 2. CONTENT AREA -->
        <div class="postcard-card__info">
          <h3 class="postcard-card__name">${escapeHtml(item.name)}</h3>
          <p class="postcard-card__blurb" title="Click to expand description">${escapeHtml(item.blurb)}</p>

          <div class="postcard-card__meta-row">
            <div class="postcard-card__tags">
              <span class="postcard-tag">${escapeHtml(item.neighborhood)}</span>
              <span class="postcard-tag">${escapeHtml(item.duration)}</span>
            </div>
            <span class="postcard-card__from-hotel">${escapeHtml(item.fromHotel)}</span>
          </div>

          <div class="postcard-card__maps-wrap">
            <a href="${item.mapsUrl}" target="_blank" rel="noopener noreferrer" class="postcard-card__maps-link">
              Open in Maps &nearr;
            </a>
          </div>
        </div>

        <!-- RUBBER STAMPS -->
        <div class="postcard-stamp postcard-stamp--yes">MUST DO</div>
        <div class="postcard-stamp postcard-stamp--maybe">MAYBE</div>
        <div class="postcard-stamp postcard-stamp--no">PASS</div>
      </div>
    `;

    const mapsLink = card.querySelector('.postcard-card__maps-link');
    mapsLink.addEventListener('click', (e) => e.stopPropagation());

    const blurbEl = card.querySelector('.postcard-card__blurb');
    blurbEl.addEventListener('click', (e) => {
      e.stopPropagation();
      blurbEl.classList.toggle('is-expanded');
    });

    const photoArea = card.querySelector('.postcard-photo-area');
    const photoTrack = card.querySelector('.postcard-photo-track');
    const fallbackEl = card.querySelector('.postcard-photo-fallback');
    const dotsContainer = card.querySelector('.postcard-photo-dots');

    const validImageUrls = [];
    let photoIndex = 0;
    const availableCount = photoManifest && photoManifest.available ? (photoManifest.available[item.id] || 0) : 0;

    if (!photoManifest || !photoManifest.hasPhotos || availableCount === 0) {
      renderPhotos();
    } else {
      const candidates = [];
      for (let c = 1; c <= availableCount; c++) {
        candidates.push({ url: `assets/todo/${item.id}-${c}.jpg`, idx: c - 1 });
      }
      let loadedCount = 0;
      candidates.forEach((cand) => {
        const img = new Image();
        img.onload = () => {
          validImageUrls.push(cand);
          loadedCount++;
          checkImagesDone();
        };
        img.onerror = () => {
          loadedCount++;
          checkImagesDone();
        };
        img.src = cand.url;
      });

      function checkImagesDone() {
        if (loadedCount < candidates.length) return;
        validImageUrls.sort((a, b) => a.idx - b.idx);
        renderPhotos();
      }
    }

    function renderPhotos() {
      photoTrack.innerHTML = '';
      dotsContainer.innerHTML = '';

      if (validImageUrls.length === 0) {
        fallbackEl.style.display = 'flex';
        photoTrack.style.display = 'none';
        dotsContainer.style.display = 'none';
        return;
      }

      fallbackEl.style.display = 'none';
      photoTrack.style.display = 'flex';

      validImageUrls.forEach((obj, pIdx) => {
        const imgEl = document.createElement('img');
        imgEl.src = obj.url;
        imgEl.alt = item.name;
        imgEl.className = 'postcard-photo-slide';
        imgEl.setAttribute('loading', isTop && offset <= 1 ? 'eager' : 'lazy');
        photoTrack.appendChild(imgEl);

        const dot = document.createElement('span');
        dot.className = `postcard-dot ${pIdx === 0 ? 'is-active' : ''}`;
        dotsContainer.appendChild(dot);
      });

      if (validImageUrls.length <= 1) {
        dotsContainer.style.display = 'none';
      } else {
        dotsContainer.style.display = 'flex';
      }
    }

    function updateCarouselPosition(animate = true) {
      if (validImageUrls.length <= 1) return;
      photoTrack.style.transition = animate ? 'transform 250ms ease' : 'none';
      photoTrack.style.transform = `translate3d(-${photoIndex * 100}%, 0, 0)`;

      const dots = dotsContainer.querySelectorAll('.postcard-dot');
      dots.forEach((d, idx) => {
        d.classList.toggle('is-active', idx === photoIndex);
      });
    }

    // Photo Carousel Gesture Paging vs Card Swipe Conflict Resolution
    let pStartX = 0;
    let pStartY = 0;
    let pCurrentX = 0;
    let pDirection = null;
    let isPhotoDrag = false;

    const onPhotoStart = (e) => {
      if (!isTop || validImageUrls.length <= 1) return;
      isPhotoDrag = true;
      pStartX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      pStartY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
      pDirection = null;
    };

    const onPhotoMove = (e) => {
      if (!isPhotoDrag || !isTop || validImageUrls.length <= 1) return;
      const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const y = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
      const dx = x - pStartX;
      const dy = y - pStartY;

      if (!pDirection) {
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 6) {
          pDirection = 'horizontal';
        } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 6) {
          pDirection = 'vertical';
        }
      }

      if (pDirection === 'horizontal') {
        const isDraggingRightFromStart = (photoIndex === 0 && dx > 0);
        const isDraggingLeftFromEnd = (photoIndex === validImageUrls.length - 1 && dx < 0);

        if (!isDraggingRightFromStart && !isDraggingLeftFromEnd) {
          e.stopPropagation();
          pCurrentX = dx;
          photoTrack.style.transition = 'none';
          const basePct = -photoIndex * 100;
          photoTrack.style.transform = `translate3d(calc(${basePct}% + ${dx}px), 0, 0)`;
        }
      }
    };

    const onPhotoEnd = () => {
      if (!isPhotoDrag || !isTop || validImageUrls.length <= 1) return;
      isPhotoDrag = false;
      if (pDirection === 'horizontal') {
        if (pCurrentX < -40 && photoIndex < validImageUrls.length - 1) {
          photoIndex++;
        } else if (pCurrentX > 40 && photoIndex > 0) {
          photoIndex--;
        }
        updateCarouselPosition(true);
      }
      pCurrentX = 0;
      pDirection = null;
    };

    photoArea.addEventListener('mousedown', onPhotoStart);
    photoArea.addEventListener('mousemove', onPhotoMove);
    photoArea.addEventListener('mouseup', onPhotoEnd);

    photoArea.addEventListener('touchstart', onPhotoStart, { passive: true });
    photoArea.addEventListener('touchmove', onPhotoMove, { passive: false });
    photoArea.addEventListener('touchend', onPhotoEnd);

    // Main Card Swipe Dragging
    if (isTop) {
      setupCardDrag(card, onSwipe);
    }

    return card;
  }

  function setupCardDrag(cardEl, onSwipe) {
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;

    const stampYes = cardEl.querySelector('.postcard-stamp--yes');
    const stampMaybe = cardEl.querySelector('.postcard-stamp--maybe');
    const stampNo = cardEl.querySelector('.postcard-stamp--no');

    const onStart = (e) => {
      isDragging = true;
      startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      startY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
      cardEl.style.transition = 'none';
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const y = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
      currentX = x - startX;
      currentY = y - startY;

      const rotate = currentX * 0.07;
      cardEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${rotate}deg)`;

      // Stamp Opacity feedback
      if (currentY < -40 && Math.abs(currentY) > Math.abs(currentX)) {
        stampMaybe.style.opacity = Math.min(1, Math.abs(currentY) / 70);
        stampYes.style.opacity = '0';
        stampNo.style.opacity = '0';
      } else if (currentX > 20) {
        stampYes.style.opacity = Math.min(1, currentX / 70);
        stampMaybe.style.opacity = '0';
        stampNo.style.opacity = '0';
      } else if (currentX < -20) {
        stampNo.style.opacity = Math.min(1, Math.abs(currentX) / 70);
        stampYes.style.opacity = '0';
        stampMaybe.style.opacity = '0';
      } else {
        stampYes.style.opacity = '0';
        stampMaybe.style.opacity = '0';
        stampNo.style.opacity = '0';
      }
    };

    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      cardEl.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

      if (currentY < -80 && Math.abs(currentY) > Math.abs(currentX)) {
        cardEl.style.transform = 'translate3d(0, -400px, 0) rotate(0deg)';
        setTimeout(() => onSwipe('maybe'), 180);
      } else if (currentX > 75) {
        cardEl.style.transform = 'translate3d(400px, 0, 0) rotate(20deg)';
        setTimeout(() => onSwipe('liked'), 180);
      } else if (currentX < -75) {
        cardEl.style.transform = 'translate3d(-400px, 0, 0) rotate(-20deg)';
        setTimeout(() => onSwipe('passed'), 180);
      } else {
        cardEl.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
        stampYes.style.opacity = '0';
        stampMaybe.style.opacity = '0';
        stampNo.style.opacity = '0';
      }
    };

    cardEl.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    cardEl.addEventListener('touchstart', onStart, { passive: true });
    cardEl.addEventListener('touchmove', onMove, { passive: true });
    cardEl.addEventListener('touchend', onEnd);
  }

  function renderGroupedSummary() {
    deckWrapper.innerHTML = '';

    const filterObj = CATEGORIES.find(c => c.id === currentFilter) || CATEGORIES[0];
    const itemsInCurrentFilter = getItemsInFilter(currentFilter);

    const likedInFilter = itemsInCurrentFilter.filter(item => likedSet.has(item.id));
    const maybeInFilter = itemsInCurrentFilter.filter(item => maybeSet.has(item.id));

    const summaryCard = document.createElement('div');
    summaryCard.className = 'postcards-summary';

    summaryCard.innerHTML = `
      <div class="summary-header-wrap">
        <h3 class="summary-title">${escapeHtml(filterObj.label.toUpperCase())} ACTIVITIES</h3>
      </div>

      <div class="summary-groups-container">
        <!-- YES GROUP -->
        <div class="summary-group">
          <div class="summary-group__heading">
            <span class="summary-group__tag summary-group__tag--yes">MUST DO</span>
            <span class="summary-group__count">${likedInFilter.length}</span>
          </div>
          <div class="summary-chips-wrap" id="summary-yes-chips"></div>
        </div>

        <!-- MAYBE GROUP -->
        <div class="summary-group">
          <div class="summary-group__heading">
            <span class="summary-group__tag summary-group__tag--maybe">MAYBE</span>
            <span class="summary-group__count">${maybeInFilter.length}</span>
          </div>
          <div class="summary-chips-wrap" id="summary-maybe-chips"></div>
        </div>
      </div>

      <div class="summary-restart-wrap">
        <button type="button" class="summary-restart-btn" id="restart-current-filter-btn">
          &circlearrowleft; change my answers
        </button>
      </div>
    `;

    const yesChipsWrap = summaryCard.querySelector('#summary-yes-chips');
    const maybeChipsWrap = summaryCard.querySelector('#summary-maybe-chips');

    if (likedInFilter.length === 0) {
      yesChipsWrap.innerHTML = `<span class="summary-empty-text">None selected yet</span>`;
    } else {
      likedInFilter.forEach(item => {
        yesChipsWrap.appendChild(chip(item.name, { selected: true }));
      });
    }

    if (maybeInFilter.length === 0) {
      maybeChipsWrap.innerHTML = `<span class="summary-empty-text">None saved as maybe</span>`;
    } else {
      maybeInFilter.forEach(item => {
        maybeChipsWrap.appendChild(chip(item.name, { selected: true }));
      });
    }

    const restartBtn = summaryCard.querySelector('#restart-current-filter-btn');
    restartBtn.addEventListener('click', () => {
      itemsInCurrentFilter.forEach(item => {
        likedSet.delete(item.id);
        maybeSet.delete(item.id);
        passedSet.delete(item.id);
      });
      saveState();
      renderFilterBar();
      renderDeckView();
    });

    deckWrapper.appendChild(summaryCard);
  }

  saveState();
  renderFilterBar();
  renderDeckView();
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function read() {
  const answers = getAnswers();
  return {
    activities: answers.activities || { liked: [], maybe: [], passed: [], lastFilter: 'all' }
  };
}

function getCategoryBgSvg(category) {
  switch (category) {
    case 'classic':
      return `
        <svg viewBox="0 0 120 120" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="postcard-fallback-icon">
          <rect x="20" y="35" width="80" height="45" rx="6"/>
          <line x1="20" y1="55" x2="100" y2="55" stroke-width="1.5"/>
          <rect x="28" y="42" width="14" height="10" rx="1"/>
          <rect x="53" y="42" width="14" height="10" rx="1"/>
          <rect x="78" y="42" width="14" height="10" rx="1"/>
          <circle cx="35" cy="86" r="6"/>
          <circle cx="85" cy="86" r="6"/>
          <line x1="15" y1="92" x2="105" y2="92" stroke-width="3"/>
        </svg>
      `;
    case 'music':
      return `
        <svg viewBox="0 0 120 120" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="postcard-fallback-icon">
          <path d="M 20 60 L 75 60 L 95 40 L 95 80 Z"/>
          <line x1="40" y1="48" x2="40" y2="60"/>
          <line x1="52" y1="48" x2="52" y2="60"/>
          <line x1="64" y1="48" x2="64" y2="60"/>
          <circle cx="25" cy="30" r="4" fill="rgba(255,255,255,0.28)"/>
          <line x1="29" y1="30" x2="29" y2="15"/>
          <line x1="29" y1="15" x2="42" y2="18"/>
          <circle cx="42" cy="33" r="4" fill="rgba(255,255,255,0.28)"/>
          <line x1="46" y1="33" x2="46" y2="18"/>
        </svg>
      `;
    case 'drinks':
      return `
        <svg viewBox="0 0 120 120" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="postcard-fallback-icon">
          <path d="M 30 35 L 90 35 L 60 70 Z"/>
          <line x1="60" y1="70" x2="60" y2="95"/>
          <line x1="45" y1="95" x2="75" y2="95"/>
          <circle cx="72" cy="30" r="8"/>
        </svg>
      `;
    case 'art':
      return `
        <svg viewBox="0 0 120 120" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="postcard-fallback-icon">
          <path d="M 60 25 C 25 25 20 55 35 75 C 45 88 65 95 80 80 C 95 65 95 40 75 28 C 70 25 65 25 60 25 Z"/>
          <circle cx="45" cy="45" r="4" fill="rgba(255,255,255,0.28)"/>
          <circle cx="62" cy="40" r="4" fill="rgba(255,255,255,0.28)"/>
          <circle cx="75" cy="52" r="4" fill="rgba(255,255,255,0.28)"/>
          <circle cx="42" cy="65" r="6"/>
        </svg>
      `;
    case 'outdoors':
      return `
        <svg viewBox="0 0 120 120" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="postcard-fallback-icon">
          <path d="M 60 95 L 60 65 M 60 75 C 50 65 30 60 25 45 M 60 75 C 70 65 90 60 95 45" stroke-width="3"/>
          <path d="M 20 45 C 10 30 30 15 50 22 C 60 10 80 15 90 30 C 100 45 85 60 60 65 C 35 60 15 55 20 45 Z" fill="rgba(255,255,255,0.08)"/>
        </svg>
      `;
    case 'offbeat':
    default:
      return `
        <svg viewBox="0 0 120 120" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="postcard-fallback-icon">
          <path d="M 65 25 C 45 25 30 40 30 60 C 30 80 45 95 65 95 C 52 85 48 65 58 45 C 62 37 68 30 75 27 C 71 25 68 25 65 25 Z" fill="rgba(255,255,255,0.1)"/>
          <path d="M 85 35 L 87 40 L 92 42 L 87 44 L 85 49 L 83 44 L 78 42 L 83 40 Z"/>
          <path d="M 35 30 L 36 33 L 39 34 L 36 35 L 35 38 L 34 35 L 31 34 L 34 33 Z"/>
        </svg>
      `;
  }
}
