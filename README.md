# Goal-Based Investment Calculator

A WCAG 2.1 AA-compliant, responsive investment SIP calculator built with **Next.js 14**.

---

## Quick Start

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run start     # serve production build
```

---

## Project Structure

```
investment-calculator/
│
├── pages/
│   ├── _app.js          # Global styles, Google Fonts, Head meta
│   └── index.js         # Main page — composes all components
│
├── components/
│   ├── AppHeader.jsx    # Site header with brand mark
│   ├── CalculatorForm.jsx   # Input card (goal cost, years, rates)
│   ├── SliderField.jsx  # Reusable accessible slider + number input
│   └── ResultsPanel.jsx # SIP result, metric grid, legend, bar chart
│
├── hooks/
│   └── useCalculator.js # All state, validation, and computation logic
│
├── utils/
│   └── calculator.js    # Pure functions: formatINR, formatPct,
│                        # inflateGoal, requiredSIP, calculateGoalSIP,
│                        # validateInputs
│
├── styles/
│   ├── globals.css               # CSS variables, reset, skip-link, sr-only
│   ├── Layout.module.css         # Header, main grid, footer
│   ├── CalculatorForm.module.css # Card, fields, slider, button
│   └── ResultsPanel.module.css   # Results card, grid, legend, bar chart
│
├── next.config.js
└── package.json
```

---

## Calculation Logic (`utils/calculator.js`)

### Step 1 — Inflate Goal Value
```
FV = Present Cost × (1 + Inflation Rate)^Years
```

### Step 2 — Required Monthly SIP
```
r   = Annual Return ÷ 12
n   = Years × 12
SIP = FV × r ÷ [((1 + r)^n − 1) × (1 + r)]
```

Edge case: when `r = 0`, `SIP = FV / n`.

---

## Brand Colours
| Role       | Hex       | Usage                              |
|------------|-----------|------------------------------------|
| Blue       | `#224c87` | Primary brand, header, buttons, return assumption |
| Red        | `#da3832` | Inflation assumption, error states |
| Grey       | `#919090` | Secondary text, neutral bar        |

---

## Accessibility (WCAG 2.1 AA)

- **Semantic HTML**: `<header>`, `<main>`, `<footer>`, `<section>`, `<form>`
- **ARIA**: `aria-required`, `aria-invalid`, `aria-describedby`, `aria-live`, `aria-label`, `role`
- **Skip link**: Keyboard-accessible `.skip-link` at the top of every page
- **Screen reader live region**: `aria-live="polite"` announces results after calculation
- **Error announcements**: `aria-live="assertive"` on inline validation errors
- **Focus management**: Results panel receives focus after successful calculation
- **Keyboard navigation**: All interactive elements reachable and operable via keyboard
- **Colour contrast**: All text/background pairings meet AA contrast ratios
- **Touch targets**: Inputs and buttons meet 44×44 px minimum

---

## Drupal Integration

The calculator can be embedded in Drupal in two ways:

### Option A — iFrame embed (simplest)
Host the Next.js app separately and embed via an iFrame block in Drupal.

### Option B — Decoupled / headless (recommended)
1. Export the Next.js build (`npm run build && npm run export` with `output: 'export'` in `next.config.js`).
2. Place the static files in Drupal's `sites/default/files/` or a CDN.
3. Create a **Custom Block** or **Paragraph** in Drupal with a `<div id="sip-calculator-root">` and load the JS bundle.

The `utils/calculator.js` module is **Node-compatible** (no browser globals, no React imports) and can also be `require()`-d in a Drupal decoupled backend or a Node.js middleware layer.

---

## Fonts
- **Montserrat** — primary (loaded via Google Fonts in `_app.js`)
- **Arial** — first system fallback
- **Verdana** — second system fallback
