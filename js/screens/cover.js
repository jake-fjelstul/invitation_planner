/**
 * js/screens/cover.js - Screen 0: The Cover (New Orleans SemiFormal 2026)
 */

let containerEl = null;

export function init(el, onStartJourney = null) {
  containerEl = el;
  containerEl.innerHTML = '';

  const paperCard = document.createElement('div');
  paperCard.className = 'atlas-card atlas-card--cover-screen0';

  paperCard.innerHTML = `
    <div class="cover-screen0__header">
      <div class="route-shield-stamp" aria-label="Interstate 85">
        <svg viewBox="0 0 100 100" width="34" height="34" fill="none">
          <path d="M 50 8 C 70 8, 90 12, 92 28 C 94 58, 72 82, 50 94 C 28 82, 6 58, 8 28 C 10 12, 30 8, 50 8 Z" fill="#1F5B45" stroke="#FFFFFF" stroke-width="4" />
          <path d="M 12 28 C 12 22, 30 14, 50 14 C 70 14, 88 22, 88 28 L 88 34 C 70 28, 30 28, 12 34 Z" fill="#C8455A" />
          <text x="50" y="70" font-family="'Overpass', sans-serif" font-size="38" font-weight="800" fill="#FFFFFF" text-anchor="middle">85</text>
        </svg>
      </div>

      <h1 class="cover-screen0__title">New Orleans SemiFormal 2026</h1>

      <p class="cover-screen0__subline">
        Greenlee, Jake invites you to join him September 25-27 on a road trip to New Orleans. To make this weekend perfect choose what you want to do and I'll make the plan.
      </p>
    </div>

    <div class="cover-screen0__image-wrapper">
      <img src="assets/cover_invitation.jpg" alt="New Orleans Invitation" class="cover-screen0__img" />
    </div>
  `;

  containerEl.appendChild(paperCard);
}

export function read() {
  return { started: true };
}
