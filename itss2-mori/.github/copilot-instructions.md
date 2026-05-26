# UI Theme Guide (LinkedIn-like)

When creating or updating UI in this project, follow a **clean, professional, content-first** visual direction inspired by LinkedIn.

---

## Design Principles

- Use a **light neutral base + controlled blue accents**.
- Prioritize **readability and hierarchy** over decoration.
- Prefer **flat surfaces + subtle borders** instead of heavy shadows.
- Keep UI **structured, aligned, and card-based**.
- Visual tone should feel **calm, trustworthy, enterprise-grade**.

---

## Color System (Design Tokens)

### Primary

- `primary`: #0A66C2
- `primary-hover`: #004182
- `primary-light`: #E8F3FF

### Background

- `bg-page`: #F3F2EF
- `bg-surface`: #FFFFFF
- `bg-muted`: #F8F9FA

### Text

- `text-primary`: #000000E6
- `text-secondary`: #00000099
- `text-muted`: #00000066

### Border & Divider

- `border`: #E0E0E0
- `divider`: #EBEBEB

### State Colors

- `success`: #057642
- `warning`: #B26A00
- `error`: #CC1016
- `info`: #0A66C2

---

## Color Usage Rules

- Use **primary blue only for key actions** (CTA, active states).
- Avoid using blue for large backgrounds → keep it as an accent.
- Prefer **gray hierarchy** for structure, not color overload.
- Never mix multiple strong colors in one view.
- Keep contrast accessible (text must be readable on all surfaces).

---

## Typography

- Use a modern sans-serif system font stack.
- Headings: **semibold/bold**, controlled scale (no oversized hero text).
- Body text: **compact, neutral, high readability**.
- Use **sentence case**, avoid ALL CAPS except labels.

---

## Components

### Cards
- Background: `bg-surface`
- Border: `1px solid border`
- Radius: 6–8px
- Shadow: very subtle or none

### Buttons
- Primary:
  - Background: `primary`
  - Text: white
  - Hover: `primary-hover`
- Secondary:
  - Background: transparent or light gray
  - Border: `border`

### Inputs
- Clean, rectangular with slight rounding
- Border: neutral gray
- Focus: subtle blue outline

### Navigation
- Minimal, structured
- Active item: indicated by **color or weight**, not decoration

---

## Spacing & Layout

- Use **8px grid system** (8 / 16 / 24 / 32)
- Maintain strong vertical rhythm
- Cards: **padding ≥ 16px**
- Avoid dense layouts → breathing room is required

---

## Interaction Style

- Hover: subtle background or color shift
- Focus: clear but not aggressive
- Motion: fast, minimal, functional (no flashy animation)
- Feedback states: clear, calm, informative

---

## What to Avoid

- Neon or overly saturated colors
- Heavy shadows or glassmorphism
- Large gradients as primary UI
- Overly playful or rounded UI
- Cluttered layouts or excessive icons
- Inconsistent spacing or ad-hoc styling

---

## Implementation Rules (Critical for Copilot)

- Always use **defined color tokens**, never hardcode colors.
- Reuse existing components before creating new ones.
- Follow **card-based layout patterns** by default.
- If unsure, default to **simpler, flatter, more neutral UI**.

---

## Prompting Hint (for AI tools)

Use prompts like:

"Use LinkedIn-style UI: light gray background (#F3F2EF), white cards with subtle borders, primary blue (#0A66C2), minimal shadow, clean and professional layout."