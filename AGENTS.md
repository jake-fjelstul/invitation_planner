# Project: NOLA Weekend Invitation

## What this is
A single-page, phone-first invitation website for one person. It walks her through a
sequence of screens about a weekend road trip from Atlanta to New Orleans, collects her
choices, and saves them. It is a gift, not a product. Every screen should feel like it
was made by hand for her.

## Stack
- Vanilla HTML/CSS/JS. No React, no build step, no bundler, no Tailwind.
- Multi-file, no framework:
  index.html
  css/style.css
  js/config.js      <- all editable details live here, nothing hardcoded elsewhere
  js/data.js        <- all option/content arrays
  js/state.js       <- the answer object + localStorage autosave
  js/ui.js          <- shared components (chips, cards, deck, steppers, nav)
  js/screens/*.js   <- one file per screen, each exports init(el) and read()
  js/supabase.js    <- stub until the final prompt
- Supabase JS is loaded from CDN but stays dormant until the final prompt.
- Must run by opening index.html with a static server. No install step.

## Non-negotiables
- Mobile-first. Design at 390x844 first; desktop is a centered column, never a new layout.
- Every answer persists to localStorage on change, and restores on reload. She may close
  the tab halfway through and come back.
- Back navigation never loses answers.
- Respect prefers-reduced-motion: all transform/opacity animation reduces to instant.
- Keyboard focus is always visible. Tap targets >= 44px.
- No dead ends: every screen has a way forward, and most have a "skip / surprise me".
- No lorem ipsum, ever. If content is missing, use the real content from the data file
  or a clearly marked TODO in config.js.

## Voice
Warm, plainspoken, a little funny, never try-hard. Short sentences. Sentence case for
prose. ALL CAPS is allowed ONLY where it is literally road signage (mile markers, exit
signs, the route shield) — never as a decorative label above a heading.
Write like a person who is excited and slightly nervous, not like a brand.

## Design guardrails
- Do not produce the generic "AI site" look: no cream-background-plus-serif-plus-
  terracotta, no identical rounded cards with the same grey shadow, no gradient washes
  used as decoration, no "→" glued onto button text, no eyebrow labels.
- Spend the boldness in ONE place: the road. The route line is the spine of the whole
  site and the thing she remembers. Everything else stays quiet.
- Decoration must encode information. The tulips mark progress. The mile markers mark
  position. The dashed line marks the route. Nothing is there just to be pretty.