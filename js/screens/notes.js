/**
 * js/screens/notes.js - Screen 9: Anything else & Send (The Margins)
 */

import { signHeader, chip } from '../ui.js';
import { getAnswers, setAnswer } from '../state.js';

let containerEl = null;

export function init(el) {
  containerEl = el;
  containerEl.innerHTML = '';

  const answers = getAnswers();
  const savedNotes = answers.notes || { text: "", wantsSurprise: true };

  let notesTextVal = savedNotes.text || savedNotes.perfect || savedNotes.constraints || "";
  let wantsSurpriseVal = savedNotes.wantsSurprise !== false;

  const paperCard = document.createElement('div');
  paperCard.className = 'atlas-card atlas-card--notes';

  // 1. Sign Header
  const header = signHeader(9, "Anything else");
  paperCard.appendChild(header);

  // 2. Body Container
  const body = document.createElement('div');
  body.className = 'notes-screen__body';

  function saveNotesState() {
    setAnswer('notes', {
      text: notesTextVal,
      wantsSurprise: wantsSurpriseVal
    });
  }

  body.innerHTML = `
    <!-- Single Question Box -->
    <div class="notes-field-group">
      <label for="notes-textarea" class="notes-field-label">Anything else or something that would make this weekend?</label>
      <textarea id="notes-textarea" class="atlas-textarea" rows="2" placeholder="Let me know here...">${notesTextVal}</textarea>
    </div>

    <!-- Surprise / No Surprises Button Chips -->
    <div class="notes-field-group">
      <div class="notes-surprise-chips" id="surprise-chips-group"></div>
    </div>

    <!-- Question Image Container -->
    <div class="notes-image-wrapper">
      <img src="assets/question.jpeg" alt="Question" class="notes-screen__img" />
    </div>
  `;

  // Attach textarea listener
  const notesArea = body.querySelector('#notes-textarea');
  notesArea.addEventListener('input', (e) => {
    notesTextVal = e.target.value;
    saveNotesState();
  });

  // Render surprise options
  const surpriseGroup = body.querySelector('#surprise-chips-group');
  const surpriseOptions = [
    { label: "Surprise me", val: true },
    { label: "No surprises", val: false }
  ];

  surpriseOptions.forEach(opt => {
    const isSel = (wantsSurpriseVal === opt.val);
    const chipBtn = chip(opt.label, {
      selected: isSel,
      value: opt.label,
      onClick: () => {
        wantsSurpriseVal = opt.val;
        const allChips = surpriseGroup.querySelectorAll('.atlas-chip');
        allChips.forEach(c => c.classList.remove('is-selected'));
        chipBtn.classList.add('is-selected');
        saveNotesState();
      }
    });
    surpriseGroup.appendChild(chipBtn);
  });

  paperCard.appendChild(body);
  containerEl.appendChild(paperCard);
}

export function read() {
  const answers = getAnswers();
  return {
    notes: answers.notes || { text: "", wantsSurprise: true }
  };
}
