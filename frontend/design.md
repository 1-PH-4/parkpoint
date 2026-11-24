# ParkPoint design.md

Revised 22. 11. 2026.

## About this document

This document governs **appearance and layout**: tokens, type, spacing, components, states and the way text is formatted. It is written so that a value is stated once, in one place, and everything else points at it.

It deliberately does **not** contain: what a screen does, which fields it has or where it navigates (that is `specification.md`); contractual or legal rules (those are the VOP — only a design consequence of one is recorded here, in a line); product logic and product decisions; file names, mockup inventories or handover notes; any code beyond the single `@theme` block.

Where this document and `specification.md` disagree, the specification wins and the gap is logged under Open questions. Build appearance only from here, never product logic.

**Non-negotiables**, each a pointer to the section that defines it: one orange and nothing but (Color) · flat, no shadows (Flatness and focus) · tokens or nothing (Tailwind theme) · one family, Inter (Typography) · every screen designs its loading, error and empty state (Screen patterns and states).

Scope of v1: mobile-first, design width 390 px, light mode only, no dark mode and no theme switch. UI language Slovak with formal vykanie; this document is English, as is everything in the repository. Stack: React (plain JavaScript) + Vite + Tailwind CSS 4 + Leaflet over CARTO Positron; Capacitor later.

## Color

One theme (light). Values live here and in the `@theme` block, which is a verbatim copy. Text needs 4.5:1; large text (24px, or 18.66px bold) and non-text marks (control borders, icons, focus rings) need 3:1. All ratios are computed, not estimated.

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `surface` | #ffffff | Cards, sheets, inputs, nav, header, map controls | ground |
| `surface-muted` | #f5f5f5 | Page background, disabled fills, unavailable states, skeletons | ground |
| `surface-sunken` | #ebebeb | Segmented track, slide-switch off track, notification button, photo placeholder, empty-state circle | decorative |
| `border` | #e5e5e5 | 1px dividers, card outlines, chart separators and baseline | 1.26 on surface (never a control edge) |
| `border-strong` | #767676 | Control edges (1.5px) and placeholder glyphs only | 4.54 on surface, 4.17 on surface-muted |
| `ink` | #171717 | Primary text, icons, amounts; fills the "Majiteľ" chip and the offline banner | 17.93 on surface, 16.44 on surface-muted |
| `ink-muted` | #404040 | Every secondary text: addresses, captions, status labels, chart labels, placeholders, inactive icons | 10.37 on surface, 9.51 on surface-muted |
| `ink-subtle` | #8a8a8a | Disabled text and non-essential hints only | 3.45 on surface (never essential text) |
| `on-ink` | #ffffff | Text and icons on an `ink` fill | 17.93 on ink |
| `accent` | #ff4d00 | The one orange; see the rule below | 3.33 with white; 5.39 with `ink`; 3.33 on surface, 3.05 on surface-muted |
| `on-accent` | #ffffff | Text and marks on `accent` | 3.33 on accent |
| `accent-tint` | rgba(255,77,0,0.12) | Fill of the orange tint pattern, always with a 1.5px `accent` outline | `ink` 15.4 and `ink-muted` 8.9 over surface; 14.2 and 8.2 over surface-muted; `accent` on it 2.87 |
| `success` | #16a34a | Active listing, payment confirmed, Stripe connected | 3.30 on surface; 3.15 on success-surface |
| `success-surface` | #f0fdf4 | Success badge background | ink 17.13 on it |
| `on-success` | #ffffff | Text or icon on a `success` fill (19px/700 or icons only) | 3.30 on success |
| `danger` | #dc2626 | Error, destructive action, unfinished verification | 4.83 on surface, 4.43 on surface-muted, 4.41 on danger-surface |
| `danger-surface` | #fef2f2 | Error badge background | ink 16.39 on it |
| `on-danger` | #ffffff | Text or icon on a `danger` fill | 4.83 on danger |
| `map-spot-fill` | rgba(255,77,0,0.20) | Approximate spot disc fill | map layer |
| `map-spot-stroke` | rgba(255,77,0,0.55) | Approximate spot disc edge | map layer |
| `map-user-halo` | rgba(23,23,23,0.12) | Halo behind the user-position dot | map layer |
| `map-pin-ground` | rgba(23,23,23,0.14) | Ground mark under the booked pin | map layer |
| `pred-easy` | rgba(22,163,74,0.38) | Prediction: easy to park | map layer |
| `pred-mid` | rgba(201,138,0,0.38) | Prediction: moderate | map layer |
| `pred-hard` | rgba(220,38,38,0.40) | Prediction: hard to park | map layer |
| `scrim` | rgba(23,23,23,0.40) | Behind an open sheet | n/a |

### The orange rule

There is exactly one orange and no darker or lighter variant: no pressed orange, no second tint. The only derived values are the same orange with alpha — the four map tokens and `accent-tint`.

**Orange fills** the primary (commit) button, the selected chip and segment, the checked checkbox, the Predikcia pill when on, the mode slide switch when on, the booked pin and the map discs; it colors the active nav icon with its indicator bar and the line, area and end dot of the overview chart. That list is complete: anything not on it is not orange.

**Orange is never** a header, a solid card or panel, body text, or a second filled button on one screen. It is never a text color on white or grey at any size, and never an icon colour under 24px. Two exceptions, both deliberate: the "Point" half of the logo wordmark (22px/800, large bold, 3.33:1), and the decorative clock glyph on the active surface, which is 2.87:1 on the tint and therefore never carries meaning without its label.

**A small orange mark on grey** gets a `surface` block or a white ring behind it, because orange on the page grey is 3.05:1, barely over the bar; the chart's end dot carries that ring. The booked pin is exempt: at 60px it is far above the size where the bar is a concern, so it sits on the map with no ring and only its ground mark.

**Text on orange is white.** At `button` size (19px/700) that is 3.33:1 and clears the large-bold bar. Below it, white on orange is a **knowing exception**: the label of a selected control — selected segment, selected chip, Predikcia on, slide switch on — is white at 15px/600 or 14px/600, which is 3.33:1 against a 4.5:1 requirement. Nothing smaller than 14px and nothing lighter than 600 ever sits on orange. If an accessibility review objects, switching those four controls to `ink` (5.39:1) is the entire fix (Open question 11).

**The orange tint pattern** is how a large surface that is not a button reads as live or active: a flat `accent-tint` fill with a 1.5px solid `accent` outline, the same look as the map discs and the chart area. All text on it is `ink` or `ink-muted`, never white. An orange mark on the tint (the progress bar's fill, the clock glyph) is decorative and the same information is always written as text beside it. No shadow, no gradient, no second tint level, at most one tinted surface per screen so it keeps meaning "live now", and never the tap target of a commit action. Today its only use is the in-progress reservation card.

### The other colors

**Two greys, not three.** `ink` for primary text, `ink-muted` for every secondary text in the product. `border-strong` is a control edge and a placeholder glyph, never a text color: a card that labels its figures in a third grey looks like it came from another app.

**Green and red are functional, not brand.** They always come with a Phosphor icon and a word. White on a solid fill is allowed (red 4.83:1; green 3.30:1, which passes only as large bold text), so a solid green or red fill carries only a `button`-size label or an icon. On a tint the word is `ink` and the color lives in the tint and the icon; small text is never green or red. Red text is allowed on `surface` only. They never fill a primary action except the final confirm of a destructive sheet. There is no warning color: an attention banner is `ink` with a text action, and a time overrun is a `danger` case.

**Black** is text, icons and amounts, plus two fills: the "Majiteľ" chip and the offline banner. Never a button fill.

**Disabled** is a `surface-muted` fill with `ink-subtle` text and no pressed state.

## Typography

One self-hosted family, **Inter**, with the `latin-ext` subset so `ľ š č ť ž ô ä` render. Weights 500, 600, 700, 800; the UI is deliberately heavy, body text is never lighter than 500 and Inter 400 is not loaded. A second family for numerals was tried three times (Geist, Poppins, Helvetica Neue) and dropped each time: amounts looked pasted in. Changing the family later is one `--font-sans` token. `font-display: swap`, self-hosted woff2 for the Capacitor wrapper.

| Style | Size / line | Weight | Usage |
|---|---|---|---|
| `display` | 30 / 36 | 800 | Onboarding, empty-state headline |
| `title-lg` | 26 / 32 | 700 | Screen title on a list screen, letter-spacing -0.01em |
| `title` | 24 / 30 | 700 | Screen title, sheet title |
| `heading` | 18 / 24 | 700 | Section heading, spot name, card title |
| `subhead` | 16 / 22 | 600 | Small section lead, emphasized label |
| `body` | 16 / 24 | 500 | Default text, list-row title, input value |
| `body-strong` | 16 / 24 | 600 | Inline emphasis, address on the booking card |
| `body-sm` | 14 / 20 | 500 | Address, distance, time range, unit suffix beside a price |
| `label` | 14 / 20 | 600 | Field label, chip, the Predikcia pill |
| `button` | 19 / 24 | 700 | Primary button label |
| `button-sm` | 15 / 20 | 600 | Text button label |
| `segment` | 15 / 20 | 600 | Segmented-control label, slide-switch label |
| `label-sm` | 13 / 16 | 600 | Status label on a card, `€` beside a card amount (700 on the active surface) |
| `caption` | 12 / 16 | 600 | Badge, nav label, chart label, map attribution, helper. Smallest type; weight 500 on a chart axis |
| `num-hero` | 36 / 42 | 600 | Income for today, letter-spacing -0.02em; its `€` is 22 / 600 |
| `num-xl` | 34 / 38 | 700 | Large stat |
| `num-lg` | 26 / 30 | 700 | Price on a detail, total on the payment summary |
| `num-md` | 20 / 24 | 700 | Price of a spot on a card or row |
| `num-card` | 18 / 24 | 700 | Amount paid, on a reservation card |
| `num-total` | 18 / 24 | 600 | Week and month totals |
| `num-sm` | 15 / 20 | 700 | Price on the compact map card |
| `logo` | 22 / 28 | 800 | Wordmark only, letter-spacing -0.01em; the "P" in the mark is 21 / 800 |

Inputs stay at 16px to stop iOS zoom. Every amount of money uses a `num-*` style and never a smaller or lighter one. A price is the numeral plus its unit in `body-sm` (`0,80` in `num-md`, `€ / hod` in `body-sm`); a paid amount is `num-card` with its `€` in `label-sm`. Numerals are proportional by default so a decimal comma keeps its spacing; add `.tnum` only to amounts right-aligned in a list and to a clock. Sentence case everywhere; no italics, no all caps, no letter-spacing changes beyond the two styles that name one and the map's area labels (`caption`, uppercase, wide tracking, grey, map layer only).

## Spacing, radius and photos

Tailwind's default 4px scale: `p-4` is 16px, `h-14` is 56px, `gap-6` is 24px. Two custom tokens only: `touch` 44px and `gutter` 16px. Screen gutter `gutter`; section gap `gap-6`; item gap `gap-3`; heading to content `gap-2`; card padding `p-4`, `p-3` on the compact map card, `p-3.5` on the overview card. The spacing scale is not reset, so an off-step value still compiles and is caught in review, not by the build.

Radius: `radius-xs` 8 (badges), `radius-sm` 12 (small thumbnails, time fields, the logo mark), `radius-md` 16 (card photos, inputs, the filter and locate buttons), `radius-lg` 20 (cards, grouped lists, sheet top, detail photos), `radius-xl` 28 (overview card, large sheets), `radius-full` 9999 (every pill).

Photos are rounded rectangles at fixed ratios, never circles. Listing card: full card width at about 2:1 (358 x 180 on a 390 px screen), flush with the card's top edge so the card's corners round over it. Map spot card: 16:9 at `radius-md`. Detail swiper: 3:2 at `radius-lg`, full-bleed. A surface **without a photo** is a `surface-sunken` block of the same size with a centered glyph in `border-strong`: `Image` 32 on a listing card, `Car` 24 on a compact map card, `Car` 32 on a sheet.

## Flatness and focus

There are no shadow tokens and nothing casts one. Surfaces are separated by a 1px `border` and by whitespace; a bottom sheet is separated by its `scrim` and its rounded top. The complete list of non-flat things in the product: the map discs, the user-position halo, the booked pin's ground mark, the prediction layer, the orange tint pattern and the sheet scrim. No gradients, no blur, no glass, no neumorphism.

Focus is a 2px solid `ink` outline at a 2px offset, on `:focus-visible` only, so a tapped button never shows a ring. One color everywhere: the offset puts the ring on the surface behind the control, never on the orange, so `ink` clears 3:1 on every ground. Write `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink`, never bare `focus:` and never `ring`. An input marks focus with a 2px `accent` border instead of the outline. Buttons have no resting border or ring of any kind.

## Tailwind theme

Tailwind CSS 4 with the Vite plugin; there is no `tailwind.config.js`. This block is the whole of `src/index.css`. Its values are a verbatim copy of the tables above: when one changes, change both in the same commit. Every group starts with `--xxx-*: initial`, which empties Tailwind's own palette, text sizes, radii and shadows, so an off-system class such as `bg-gray-100`, `text-sm`, `rounded-xl` or `shadow` produces no CSS and shows up in review as an unstyled element.

```css
@import "tailwindcss";

@theme {
  --color-*: initial;
  --color-surface: #ffffff;
  --color-surface-muted: #f5f5f5;
  --color-surface-sunken: #ebebeb;
  --color-border: #e5e5e5;
  --color-border-strong: #767676;
  --color-ink: #171717;
  --color-ink-muted: #404040;
  --color-ink-subtle: #8a8a8a;
  --color-on-ink: #ffffff;
  --color-accent: #ff4d00;
  --color-on-accent: #ffffff;
  --color-accent-tint: rgba(255, 77, 0, 0.12);
  --color-success: #16a34a;
  --color-success-surface: #f0fdf4;
  --color-on-success: #ffffff;
  --color-danger: #dc2626;
  --color-danger-surface: #fef2f2;
  --color-on-danger: #ffffff;
  --color-map-spot-fill: rgba(255, 77, 0, 0.20);
  --color-map-spot-stroke: rgba(255, 77, 0, 0.55);
  --color-map-user-halo: rgba(23, 23, 23, 0.12);
  --color-map-pin-ground: rgba(23, 23, 23, 0.14);
  --color-pred-easy: rgba(22, 163, 74, 0.38);
  --color-pred-mid: rgba(201, 138, 0, 0.38);
  --color-pred-hard: rgba(220, 38, 38, 0.40);
  --color-scrim: rgba(23, 23, 23, 0.40);

  --text-*: initial;
  --text-display: 30px;   --text-display--line-height: 36px;   --text-display--font-weight: 800;
  --text-title-lg: 26px;  --text-title-lg--line-height: 32px;  --text-title-lg--font-weight: 700;
  --text-title: 24px;     --text-title--line-height: 30px;     --text-title--font-weight: 700;
  --text-heading: 18px;   --text-heading--line-height: 24px;   --text-heading--font-weight: 700;
  --text-subhead: 16px;   --text-subhead--line-height: 22px;   --text-subhead--font-weight: 600;
  --text-body: 16px;      --text-body--line-height: 24px;      --text-body--font-weight: 500;
  --text-body-strong: 16px; --text-body-strong--line-height: 24px; --text-body-strong--font-weight: 600;
  --text-body-sm: 14px;   --text-body-sm--line-height: 20px;   --text-body-sm--font-weight: 500;
  --text-label: 14px;     --text-label--line-height: 20px;     --text-label--font-weight: 600;
  --text-button: 19px;    --text-button--line-height: 24px;    --text-button--font-weight: 700;
  --text-button-sm: 15px; --text-button-sm--line-height: 20px; --text-button-sm--font-weight: 600;
  --text-segment: 15px;   --text-segment--line-height: 20px;   --text-segment--font-weight: 600;
  --text-label-sm: 13px;  --text-label-sm--line-height: 16px;  --text-label-sm--font-weight: 600;
  --text-caption: 12px;   --text-caption--line-height: 16px;   --text-caption--font-weight: 600;
  --text-num-hero: 36px;  --text-num-hero--line-height: 42px;  --text-num-hero--font-weight: 600;
  --text-num-xl: 34px;    --text-num-xl--line-height: 38px;    --text-num-xl--font-weight: 700;
  --text-num-lg: 26px;    --text-num-lg--line-height: 30px;    --text-num-lg--font-weight: 700;
  --text-num-md: 20px;    --text-num-md--line-height: 24px;    --text-num-md--font-weight: 700;
  --text-num-card: 18px;  --text-num-card--line-height: 24px;  --text-num-card--font-weight: 700;
  --text-num-total: 18px; --text-num-total--line-height: 24px; --text-num-total--font-weight: 600;
  --text-num-sm: 15px;    --text-num-sm--line-height: 20px;    --text-num-sm--font-weight: 700;
  --text-logo: 22px;      --text-logo--line-height: 28px;      --text-logo--font-weight: 800;

  --radius-*: initial;
  --radius-xs: 8px;
  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-full: 9999px;

  --shadow-*: initial;

  --font-*: initial;
  --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;

  --spacing-touch: 44px;
  --spacing-gutter: 16px;
}

@layer base {
  body { @apply bg-surface-muted font-sans text-body text-ink; }
  .tnum { font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1; }
}
```

Inter comes from `body`, so no element names a family. Two traps: a bare `border` sets width only and paints in `currentColor`, so always name the color (`border border-border`, `border-[1.5px] border-accent`); and focus never uses `ring`. Tailwind 4 needs Chrome 111, Safari 16.4 or Firefox 128, which sets the oldest Android WebView the Capacitor build supports. An earlier version of this block compiled clean under Tailwind 4.3.5 and emitted no default classes; the tokens added since follow the same format and have not been recompiled.

## Iconography

Phosphor only (`@phosphor-icons/react`), imported by name. **Bold** weight for every icon in the product, the active nav item included — the heavy stroke matches the heavy type, and the active item is already marked by colour, indicator bar and label weight. **Fill** is used for exactly two things: a saved `Heart` and the `MapPin` inside the booked pin.

Sizes: 16 in badges, status labels and captions; 20 in buttons, inputs, trailing carets and floating map buttons; 21 in the header notification button; 24 for nav, list-leading, row menus and the app bar; 32 for photo placeholders and empty or error states. Colors: `ink` by default, `ink-muted` when inactive or secondary, `border-strong` for a placeholder glyph, `accent` only for the active nav item and the clock on the active surface, `on-accent` on the orange button, `success` or `danger` only inside a badge or message. Every icon-only button has a Slovak `aria-label` and a 44px hit area; a decorative icon is `aria-hidden`. Export names shift between Phosphor versions: use the name the installed version exports and add new ones to this list in the same PR.

- **Navigation:** `MapTrifold` (Mapa), `CalendarCheck` (Rezervácie), `User` (Profil), `LetterCircleP` (Moje miesta), `ChartBar` (Prehľad).
- **Everywhere:** `Bell` (notifications), `DotsThreeVertical` (row menu), `CaretRight` / `CaretLeft`, `X` (close a sheet).
- **Map:** `MagnifyingGlass`, `SlidersHorizontal`, `Crosshair`, `MapPin`, `NavigationArrow`, `Heart`, `Car`.
- **Spot:** `Ruler` (height limit), `Key`, `Keypad`, `Gate`, `VideoCamera`, `Door`, `Clock`, `Buildings`, `WarningOctagon` (report a listing).
- **Reservation:** `Clock` (in progress), `CalendarBlank` (upcoming), `CalendarX` (empty), `XCircle` (cancelled), `FileText` (withdrawal), `CheckCircle` (completed, paid), `CarProfile`, `Check`, `Receipt`, `ArrowClockwise` (retry, extend), `WarningCircle` (problem).
- **Owner:** `Image` (listing placeholder), `Prohibit` (paused), `Folder` (cases), `Camera`, `CurrencyEur`, `IdentificationCard`, `Buildings`, `Percent`.
- **Profile rows:** `CarProfile`, `CreditCard`, `Bell`, `Gear`, `Folder`, `Question`, `FileText`, `ShieldCheck`, `Info`, `SignOut`, `Receipt`, `Buildings`, `Percent`.
- **States:** `CheckCircle`, `WarningCircle`, `XCircle`, `Prohibit`, `WifiSlash`, `CircleNotch` (animated), `Info`.

## Components

Global rules. A control edge is 1.5px `border-strong`; a card or grouped list is 1px `border`; the active surface is a 1.5px `accent` outline. Minimum target 44px. Pressed: a filled button scales to 95%, everything else takes a `surface-muted` fill; there is no pressed orange. Transitions 120ms, honoring `prefers-reduced-motion`. Every interactive element gets the focus treatment from Flatness and focus.

**Button.** A pill: `h-14` (56px), `px-6`, `radius-full`, label in `button`, never a border. There is one filled button and everything else is text.
- *Primary (orange):* `accent` fill, `on-accent` label. The single commit action on a screen, in both modes: Rezervovať, Zaplatiť, Potvrdiť, Pridať miesto, Navigovať, Použiť. One per screen, label one or two words, never wrapped. In a sticky bar the amount sits at the left in `num-lg` and the button takes the rest of the width; an amount never goes inside a label. On the booking card the button keeps its height but takes only its label plus `px-5`.
- *Text button:* no fill, no border, label `button-sm` in `ink`, `px-4`, 44px min height, pressed fill `surface-muted`. Every quieter, reversible action: Zobraziť detail, Späť, Ponechať, Vymazať, Skúsiť znova, Dokončiť. Never orange. Two actions on a screen are the orange button and a text button, stacked and full width.
- *Destructive:* in place, a text button with its label and leading icon in `danger`; the final confirm in a destructive sheet is a solid `danger` fill with `on-danger`. Orange never carries a delete.
- *Disabled:* `surface-muted`, `ink-subtle`, no pressed. *Loading:* the label is replaced by an animated `CircleNotch` 20 at unchanged width, the label stays for screen readers, `aria-busy`.

**Input.** `h-12` (48px), `radius-md`, 1.5px `border-strong`, `surface` fill, `px-4`; value `body` `ink`, placeholder `ink-muted`. Label above in `label` `ink`, never a placeholder standing in for a label; helper below in `caption` `ink-muted`. Focus: 2px `accent` border. Error: `danger` border and a `caption` `danger` message with `WarningCircle` 16. The map search field is the same control as a pill with a leading `MagnifyingGlass` 20.

**Chip.** Height `touch`, `px-4`, `radius-full`, `label`. Default `surface` with a 1.5px `border-strong` edge and `ink` label; selected `accent` fill, white label and a `Check` 16 before it so selection is not colour alone. Rows scroll horizontally, `gap-2`, `gutter` edge padding.

**Segmented control.** Full width, equal segments on one line, never wrapped or truncated. Track `surface-sunken`, no border, `radius-full`, `p-1`. Segment 44px min, `radius-full`, `segment` style; selected `accent` fill with a white label, unselected no fill and `ink-muted`. `role="tablist"`, arrow keys move the selection, content switches immediately, the control sticks under the title in the white header.

**Slide switch.** The customer/owner mode switch, directly under the account card in Profil. Full width inside the gutter, 56px high, `radius-full`, a centered `segment` label and a 48px `surface` thumb inset 4px. Off: `surface-sunken` track, `ink-muted` label "Potiahnite pre režim majiteľa", thumb left with `CaretRight` 20 in `ink-muted`. On: `accent` track, white label "Potiahnite pre režim zákazníka", thumb right with `CaretLeft` 20 in `accent`. The thumb drags and the track also responds to a tap; the mode commits past about 70% of the track, otherwise it snaps back. `role="switch"` with `aria-checked`, labelled "Režim majiteľa". It is a switch and is never styled as a commit button.

**Switch (settings).** 52 x 32px, `radius-full`; off a `border-strong` track with a `surface` thumb, on an `accent` track with a `surface` thumb. Settings only. Its state is always also written in words beside it.

**Consent row.** A 24px square checkbox (`radius-xs`, 1.5px `border-strong`; checked `accent` with a white `Check` 16) and the text in `body-sm` `ink`. Consents are always separate rows, independently unchecked, and the primary button stays disabled until every one is checked. Never one combined consent.

**Active surface.** The reservation that is happening now, and the only use of the orange tint pattern today. `accent-tint` fill, 1.5px `accent` outline, `radius-lg`, `p-4`, `gap-2.5`, text sizes identical to the other reservation cards. Top row: a decorative `Clock` 16 in `accent` with "Práve prebieha" in `label-sm` at weight 700 `ink`; at the right the remaining-time pill and the row menu. The pill has no fill of its own, a 1.5px `accent` outline, `radius-full`, 28px high, `px-2.5`, text `label-sm` at 700 `ink` with `.tnum`. Then the spot name in `heading` and the address in `body-sm` `ink-muted`. Then a progress bar: 6px high, `radius-full`, a 1.5px `accent` outline as the track with no track fill, and a solid `accent` elapsed part. Bottom row: the term in `body-sm` `ink`, the amount in `num-card` `ink` with its `€` in `label-sm` at 700.

**Reservation card.** `surface`, 1px `border`, `radius-lg`, `p-4`, `gap-1.5`. *Upcoming:* a status row (`CalendarBlank` 16 and "Nadchádzajúca" in `label-sm`, both `ink-muted`) with the row menu at its right, then the name in `heading`, the address in `body-sm` `ink-muted`, a 1px `border` divider, and a bottom row with the term in `body-sm` `ink` and the amount in `num-card` with its `€` in `label-sm` `ink-muted`. *History:* no status row for a completed visit, since completed is what history means; name and address at the top with the row menu beside them, the divider, then the date and the amount. *Cancelled or withdrawn:* a status row above the name (`XCircle` and "Zrušená", or `FileText` and "Odstúpené", in `ink-muted`) and **no amount** — in its place the words "Suma vrátená" in `body-sm` `ink-muted`, so a missing figure reads as a fact and not as a bug.

**Spot card.** `surface`, 1px `border`, `radius-lg`, `p-4`. Photo at its ratio, name in `heading`, address in `body-sm` `ink-muted`, price in `num-md` with `€ / hod` in `body-sm`, status badge beside the name. One tap target. Unavailable: the name stays `ink`, the price goes `ink-muted` with a line-through and the badge says why. Cards stack with `gap-3`, never three across.

**Listing card.** `surface`, 1px `border`, `radius-lg`, clipped, with no padding of its own: the photo spans the full width at the top, and a `p-4` block below holds a title row (name in `heading` truncated to one line, the status badge, the row menu), the address in `body-sm` `ink-muted`, and the price in `num-md` with `€ / hod`.

**Nearest-spot card.** Compact and horizontal: `surface`, 1px `border`, `radius-lg`, `p-3`, `gap-3`. A 72 x 54px thumbnail at `radius-md`, then the street address in `heading`, the distance alone in `body-sm` `ink-muted` (`180 m`, never a walking time — the customer arrives by car), the price in `num-md` with `€ / hod`, and a `CaretRight` 20 at the right edge. One tap target, opening the spot sheet. Two stack with `gap-2` at a `gutter` inset.

**Row menu.** `DotsThreeVertical` 24 `ink` in a 44px target with negative margins so the row does not grow, at the top right of every reservation card, listing card and owner list row. It opens that item's actions — storno, navigate, report a problem — and **never** the detail: the card itself is the tap target for the detail, so one gesture always means one thing.

**List row.** 56px min, 64px with two lines, `px-4`, a 1px `border` at the bottom except on the last. Optional leading icon 24 `ink-muted`, title `body` `ink`, subtitle `body-sm` `ink-muted`, and at the right a `CaretRight` 20 `ink-muted`, a value, or the row menu. Rows are grouped in a `radius-lg` container with a 1px `border`; groups are separated by `gap-6`.

**Status badge, and the quiet label.** A badge is 24px high, `px-2`, `radius-xs`, `caption`, with a tint fill, the word in `ink` and a 16 icon in the status colour, `gap-1`, not tappable. A tinted badge is for a status about something the user owns or must act on: a listing, Stripe verification. In the user's own reservation list the status is instead a **quiet label** — the same icon at 16 and the word in `label-sm`, both `ink-muted`, no fill — so a list of reservations does not become a wall of colour.

**Bottom navigation.** `h-16` (64px) plus the safe-area inset, `surface` fill, 1px `border` on top, exactly three items of equal width with the main tab in the centre. Each item is a 24 Bold icon over a `caption` label, both always shown, 44px min. Inactive: icon and label `ink-muted`. Active: `accent` icon, `ink` label and a 2px `accent` bar across the top of the item. Customer, left to right: Rezervácie, Mapa, Profil. Owner: Moje miesta, Prehľad, Profil.

**Owner-mode chip.** An `ink` pill reading "Majiteľ", 24px high, `px-2.5`, `radius-full`, `caption` in `on-ink`, in the white header of every owner screen: at the right of the brand row before the notification button on Prehľad, at the right of the title row on Moje miesta and Profil. The header stays white in both modes; this chip and the switch are the only mode markers.

**Notification button.** A 40px `radius-full` circle in `surface-sunken` with a `Bell` 21 in `ink`, at the right of the brand row. Unread notifications add a 9px `accent` dot at its top right with a 1.5px ring in the circle's own colour, so the dot never touches the glyph.

**Bottom sheet.** `surface` fill, top corners `radius-lg`, no shadow, a `scrim` behind it down to the top of the bottom navigation, closing on a scrim tap. Content padding `gutter`, a close `X` 24 in a 44px target at the top right. One automatic height: there is no draggable or multi-detent sheet. Sheets replace centered modals except for destructive confirms. Where a sheet offers two actions they are stacked and full width, the orange button above the text button.

**Income card.** `surface`, 1px `border`, `radius-xl`, `p-3.5`. The label "Príjem dnes" in `caption` at weight 500 `ink-muted`. Below it one row: today's amount in `num-hero` `ink` (its `€` 22/600) at the left, the chart filling the rest. Chart: 56px high, the last seven days left to right with today last, six 1px `border` separators between the day columns and a 1px `border` baseline; a monotone 2px `accent` line with rounded caps and joins that never overshoots a data point; a flat `accent` area beneath it at 16% opacity down to the baseline; and an `accent` end dot (r 4) with a 2px `surface` ring at today. No grid lines, no axis values and no label above the dot, because the big amount already states today's figure. Touch or drag along the chart moves the dot and shows that day's amount above it. Day labels under the chart in `caption` at weight 500 `ink-muted`, today's in `ink` at 700. Below, two equal columns, "Tento týždeň" and "Tento mesiac", labels in `caption` 500 `ink-muted` and amounts in `num-total` `ink`. The figures must agree: today's amount is the chart's last point, and the week total is the sum of the current week's days.

**Inline banner.** A full-width `surface` block, 1px `border`, `radius-lg`, `p-4`: a `WarningCircle` 20 `ink`, the task in `body-sm` `ink`, and an underlined text button. No colour fill; attention comes from placement, not a tint. It is defined but currently unused (Open question 12).

## Map

The base map is CARTO Positron raster tiles with `grayscale(1)` on the tile pane, so the base is purely black and white and the orange discs are the only colour. The attribution "© OpenStreetMap contributors, © CARTO" is always visible — it is a licence requirement of both CARTO and the ODbL, and a map without it can have its tile key suspended — as a `caption` `ink-muted` label on a `surface` chip at `radius-xs`, bottom left, never covered by anything. The tile key lives in `.env`, never in committed code; the repo ships `.env.example` only. Points of interest, transit stops and every other icon the tile style draws are filtered out: the only pin in the product is the booked pin. The map is static — it fills the space between the header and the bottom navigation and does not scroll.

**Header.** White and fixed: a brand row 40px high with the logo at the left and the notification button at the right, and under it a search row with the pill search field "Zadajte adresu" (48px, `MagnifyingGlass` 20) beside a 48px filter button (`SlidersHorizontal` 20, `radius-md`). The logo is an `accent` rounded square (38px, `radius-sm`) with a white bold "P" plus the wordmark, "Park" in `ink` and "Point" in `accent`; it is a placeholder until the team confirms the final file, so it is built as one swappable element. There is no profile shortcut in the header — Profil is a tab. Date and time live in the filter sheet, not the header.

**Predikcia pill.** Floating over the map under the header, left at `gutter`, 12px down: 44px high, `radius-full`, `label`. Off: `surface`, 1.5px `border-strong`, `ink` label. On: `accent` fill, white label, no border. Hidden after payment along with the discs and the cards.

**Locate button.** `Crosshair` 20 in a 48px `surface` square, 1.5px `border-strong`, `radius-md`, labelled "Moja poloha", floating at the right edge above the bottom cards. Without it a customer who has panned the map has no way back to their own position, so it is on every map state except after payment, where the map is pinned to the booked spot.

**Approximate spot.** Before payment a spot is a translucent orange disc, never a pin and never a price: `map-spot-fill` with a 1px `map-spot-stroke` edge. A disc stands for the approximate 100 m area of one spot, so every disc is the same size at a given zoom (48px at the default) with a 28px minimum when zoomed out. Few discs, about six in view, none overlapping and none on water. Discs never cluster into counts. Tapping one opens the spot sheet.

**User position.** A 16px `ink` dot with a 3px `surface` ring and a 30px `map-user-halo`. Not blue, not orange.

**Nearest two spots.** Two fixed compact cards above the bottom navigation, for the two discs nearest the user dot. They neither scroll nor drag, and they are hidden while the sheet is open, while Predikcia is on, and after payment.

**Booked spot.** Once payment succeeds every disc, both cards and the Predikcia pill disappear, the map zooms about 2x on the exact location, and a single **booked pin** appears: a teardrop `MapPin` Fill 60px in `accent`, no outline, with a flat `map-pin-ground` circle about half its width under the tip. No label, no price. The booking card at the bottom carries the exact address in `body-strong`, the term and the entry code in `body-sm` `ink-muted`, and the primary "Navigovať" beside them.

**Prediction layer.** The pill turns it on and off. On: the discs and the cards give way to translucent zones on a green-to-red scale (`pred-easy`, `pred-mid`, `pred-hard`), the user dot stays, and zones may touch but never overlap and are never cut off by the edge of the map. A legend sits at the bottom right: a `surface` `radius-lg` chip with `p-3` and three rows, each a 16px `radius-xs` swatch with a `caption` `ink` label ("Ľahko zaparkujete", "Stredne", "Ťažko"). Meaning is in the words, not only the colours; colour-blindness is out of scope for v1. Zone geometry is undefined (Open question 3), so only the style, the pill and the legend are specified.

## Screen patterns and states

**Shell.** 390px design width, content capped at 480px and centred on anything wider with `surface-muted` outside. A list screen has a white header with its title and, where there is one, the segmented control; a map screen has the brand header. Back is `CaretLeft` in a 44px target. A flow that ends in a commitment ends in a sticky bottom bar: `surface`, 1px `border` on top, `p-4`, one primary button. The map is full-bleed; every other screen scrolls on `surface-muted` with `p-4` around the content and `gap-6` between groups.

**Six patterns, not 38 screens.** Everything is a form, a list, a detail, a bottom sheet, a confirmation, or one of the states below. A screen that does not have a layout note in this document follows its pattern.

**Four states, on every screen.** *Loading:* skeleton blocks in `border` at the final layout's heights with a 1.2s opacity pulse, static under reduced motion; the map shows tiles first and fades the discs in. *Error:* an inline block with `WarningCircle` 32, one sentence saying what failed and what is safe, and one text button "Skúsiť znova"; never a toast alone and never a code. *Empty:* centred in the content area, a 72px `surface-sunken` circle with a 32px icon in `ink-muted`, one `heading` line of why at most 260px wide, one `body-sm` `ink-muted` hint, and no illustration. An empty state carries an action only where the screen has none of its own; where a sticky button or a tab bar already offers the way out, it stays quiet. *Offline:* a banner under the header in `ink` with `on-ink` text and `WifiSlash` 20.

**Status vocabulary.** *Reservation,* as quiet labels: `Prebieha` is not a label, the card itself is the active surface; `Nadchádzajúca` takes `CalendarBlank`; `Ukončená` takes no label in history and `CheckCircle` where one is needed; `Zrušená` takes `XCircle`; `Odstúpené` takes `FileText`. The last two show "Suma vrátená" where the amount would be. *Listing,* as tinted badges: `Aktívne` success, `Pozastavené` neutral with `Prohibit`, `Čaká na doplnenie` danger. *Case,* as neutral badges: `Otvorený` with `Folder`, `Čaká na odpoveď` with `Clock`, `Uzavretý` with `CheckCircle` in `ink-muted`, plus a second badge for the type. *Stripe:* `Prepojený` success, `Nedokončené overenie` danger, `Pozastavený` neutral. Instant booking means there is no `Čaká na potvrdenie` and no `Zamietnuté`.

**What cancellation does to the UI.** Free cancellation runs until a set number of minutes **before** the start; after that deadline a reservation cannot be cancelled and runs to its end. Two consequences for the design: "Stornovať rezerváciu" is present only before the deadline and is removed, not disabled, once it passes; and "Odstúpiť od zmluvy" is a separate statutory right with its own 14-day clock, so it stays on the screen after storno is gone and the two are never hidden together. Because a cancellation therefore always happens before the reservation begins, the full amount always comes back, which is why a cancelled card reads "Suma vrátená". The number of minutes is not set and the terms still describe the older rule (Open question 14). The entry code follows the same deadline: it is not shown until 5 minutes before the start (at payment, if the reservation is paid after the cancellation deadline), so before that moment the reservation detail shows the code row with a short line that the code will appear 5 minutes before the start, and no code.

### Mapa

The home screen, no title bar. Header, then the map filling the rest, then the bottom navigation. The Predikcia pill floats at the left under the header, the locate button at the right, about six discs mark spots for the chosen time, the user dot is on the map and two nearest-spot cards sit above the navigation. Filters open as a sheet and update the discs. Empty: the map with a `surface` `radius-lg` note and a text button "Zmeniť čas".

### Moje rezervácie

Title in `title-lg`, the segmented control **Aktívne / História** under it, content in `p-4` with `gap-3`. Aktívne leads with the active surface for the reservation happening now, then upcoming cards in chronological order. História lists past visits newest first. Two segments, not three (Open question 5).

### Prehľad (owner)

The first screen after switching modes. The brand header, with the "Majiteľ" chip and the notification button at its right; no search row and no page title, because the brand row is the title. Then, with `gap-6`: the income card, and the sections "Aktuálne obsadené" and "Dnešné nadchádzajúce", each a `heading` over a grouped list whose rows carry the street and plate in `body`, the time in `body-sm` `ink-muted`, a leading icon and a row menu.

### Moje miesta (owner)

Title and chip in the header, listing cards stacked with `gap-3`, and above the bottom navigation a sticky `surface` bar with a 1px top `border` and `p-4` holding the primary "Pridať miesto". The empty state uses `LetterCircleP` and carries no action of its own, because the sticky button is already on screen.

### Profil

Title in the header, plus the chip in owner mode. With `gap-6`: the account card (a 64px `surface-muted` circle with `User` 24, the name in `heading`, the e-mail in `body-sm` `ink-muted`, a trailing `CaretRight`), then the slide switch, then grouped lists. In owner mode one extra group sits directly under the switch, above every customer group, and carries the Stripe status badge under its first row when verification is unfinished. Moje miesta is not a row here because it is a tab, and there is one Notifikácie row for both modes.

## Content style

Slovak, formal vykanie, calm and exact like a bank: short sentences, say what happened and what to do, address through verbs ("Vyberte čas"), never "Ty" — including on controls, so the switch reads "Potiahnite". No humour, no exclamation marks, no emoji, no slang. Every string lives in one Slovak dictionary file, never inline.

**Money.** `0,80 € / hod`: decimal comma, two decimals, a non-breaking space before `€` and around `/`. Units `/ hod`, `/ deň`, `/ mes.`; a total is `3,20 €`; free is `Zadarmo`. Never `€0.80`, `0.8€` or `EUR`. Prices always include VAT and a fee breakdown appears before payment.

**Distance and time.** Under 1 km in metres rounded to 10 m (`350 m`), from 1 km with a comma (`1,2 km`). Distance is the straight-line distance from the customer's position to the spot. Walking times never appear, because the customer arrives by car. A clock is 24h with a leading zero (`08:00`), a range takes an en dash with spaces (`14:00 – 18:00`), remaining time reads `zostáva 1:49 h` and a duration `4 hod 30 min`. Dates are `dnes`, `zajtra`, otherwise `pon 23. 11.`, and in history with the year, `18. 11. 2026`. Timezone Europe/Bratislava including DST. Currency and dates never wrap mid-value.

**Labels.** A button is an infinitive verb, one or two words, sentence case, no period; `OK`, `Odoslať` and `Ďalej` are banned on their own. A destructive label names the thing ("Stornovať rezerváciu") and its counter-option is "Ponechať". An error says what happened and then what to do, in two sentences at most.

**Mock data is held to the same standard as copy.** A term, a remaining time and a progress bar on one screen describe the same moment; the figures on the income card add up; and an owner screen never shows a reservation at an address that owner does not list.

## Open questions

Appearance-relevant gaps. None of them invents behaviour.

1. **ParkPoint commission.** The price breakdown and the owner's pre-publish net both show a "poplatok ParkPoint" line whose value is a placeholder.
2. **"Najlepší pomer ceny a vzdialenosti".** The map ranks the two nearest spots by distance. The price-to-distance helper is not designed; if it is wanted it needs a home off the map, such as a sort option in the filter sheet.
3. **Prediction zone geometry.** Style, toggle and legend are defined; the zone shapes and the city-parking price source behind the ±20 % estimate are not.
4. **The reservation state machine.** The set here is Nadchádzajúca / Prebieha / Ukončená / Zrušená / Odstúpené. Confirm it matches the terms.
5. **Obľúbené.** The specification now has two tabs in Rezervácie, as the design does, with favourite spots shown at the top of História, and keeps a `Heart` on the spot screens. Not designed: how the favourites at the top of História look and are told apart from past visits (a favourite is a property of a **spot**, not of a reservation), and the `Heart` in the spot sheet's title row, which the mockups omit.
6. **"Odstúpené".** Whether a withdrawn reservation stays in história or moves elsewhere.
7. **Owner-mode signal.** The black chip and the switch are the only markers. If testing shows people miss it, the fallback is a different bottom navigation in owner mode.
8. **Wording of the payment button.** The specification and the design both read "Zaplatiť". Consumer law wants a button that triggers a payment obligation to say so unambiguously; Marek confirms that "Zaplatiť" is enough, or the long label returns for this one button.
9. **"Suma vrátená" after a withdrawal.** A cancellation always precedes the start, so the full amount returns and the words are always true. A withdrawal can follow partial use, where the refund may be partial; whether that card should state a figure instead is a terms question.
10. **Logo.** The header mark is a placeholder. The final file, and whether the orange "Point" survives, are the team's call.
11. **White on orange below 19px.** Four controls carry white at 3.33:1 against a 4.5:1 requirement, chosen knowingly. Switching them to `ink` is the entire fix.
12. **Where the owner-registration task lives.** The inline banner is not on Prehľad or Moje miesta, so the only signal that payouts are blocked is the badge in Profil. Confirm that is enough, or give the task a home in notifications.
13. **Notifications screen.** The bell and its unread dot exist; the screen behind them is not designed and follows the list pattern.
14. **The cancellation deadline and the entry code.** The specification sets free cancellation at X minutes before the start, X not yet fixed. The entry code is shown 5 minutes before the start (at payment, if the reservation is paid after the cancellation deadline), so X must be at least 5. The terms still describe the older rule (cancellation up to five minutes after the start, the code available at once after payment) in articles 13.1 to 13.3 and 14.1 to 14.3; Marek updates them. The statutory right of withdrawal in 14.4 is unaffected.
15. **Blocking times.** The specification lets an owner block a time window on a listing (Upraviť parkovacie miesto) without changing the recurring availability. It follows the form pattern, with the date and time fields of the filter sheet; the list of existing blocks, its empty state and the message about a colliding reservation are not designed.

## Before shipping a screen

A checklist, not a source of rules: where it and the sections above disagree, they win.

1. Every colour, size, radius and spacing comes from a token; no raw hex and no arbitrary value.
2. Nothing casts a shadow, and nothing is transparent outside the listed exceptions.
3. One orange thing that commits; no orange text, no orange icon under 24px.
4. Nothing on orange is under 14px or lighter than weight 600.
5. Two greys in the text: `ink` and `ink-muted`.
6. Every status has an icon and a word, never a colour alone.
7. Every tap target is at least 44px and every icon-only button has a Slovak `aria-label`.
8. Focus is `:focus-visible` with the `ink` outline; no `ring`, no removed outline.
9. The loading, error and empty states exist, not just the happy path.
10. Slovak is formal, money and times follow the content rules, and the mock data adds up.
11. A row menu opens actions; the card itself opens the detail.
12. The map carries its attribution.
