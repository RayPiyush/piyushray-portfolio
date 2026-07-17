# Design System — "Aurora Slate"

A restrained, premium system: deep-space neutrals, one indigo accent with cyan/violet aurora support, glass surfaces, and physics-based motion. All tokens live in `src/app/globals.css`.

## Color

Semantic tokens flip between themes via CSS variables — components never reference raw hex.

| Token                        | Dark (default)     | Light              | Use                   |
| ---------------------------- | ------------------ | ------------------ | --------------------- |
| `background`                 | `#08080d`          | `#fafafb`          | page                  |
| `foreground`                 | `#e8eaf0`          | `#101318`          | primary text          |
| `muted`                      | `#a3abbd`          | `#565d6b`          | body text             |
| `subtle`                     | `#6f7789`          | `#7b8494`          | captions, meta        |
| `surface`                    | white @ 4%         | white @ 72%        | glass fills           |
| `surface-raised`             | `#10111a`          | `#ffffff`          | dialogs, code         |
| `accent`                     | `#8b93ff`          | `#4f46e5`          | actions, links, focus |
| `success / warning / danger` | mint / amber / red | deeper equivalents | status                |

Aurora gradients (`--aurora-1..3`) are indigo/cyan/violet at ≤20% alpha — atmosphere, never content. Contrast: body text pairs meet WCAG AA in both themes (`muted` on `background` ≥ 4.5:1).

## Typography

| Role    | Font                             | Usage                         |
| ------- | -------------------------------- | ----------------------------- |
| Display | Space Grotesk (`--font-display`) | headings, tightened `-0.02em` |
| Body    | Inter (`--font-sans`)            | everything else               |
| Mono    | JetBrains Mono (`--font-mono`)   | eyebrows, meta, code, tags    |

Scale (mobile → desktop): h1 36→60px · h2 30→36px · h3 18–20px · body 16px/1.75 · meta 11–12px mono with `0.2em+` tracking for eyebrow labels.

## Spacing & radius

- Section rhythm: `py-16` (inner sections) / `py-24` (page blocks); content max-width `max-w-5xl` (grid pages) or `max-w-3xl/4xl` (reading pages); gutters `px-6`.
- Radii: pills/buttons `rounded-full`, cards `rounded-2xl` (16px), heroes/bands `rounded-3xl`, tags `rounded-md`.

## Elevation

Three levels, defined as `--shadow-*` tokens:

1. `shadow-soft` — resting cards
2. `shadow-raised` — hover state, dialogs
3. `shadow-glow` — accent-tinted emphasis (primary CTAs, active filters)

Plus the `glass` utility (blur 16px + saturate 1.4 + hairline border) for all floating surfaces.

## Motion guidelines

- **Signature easing**: `cubic-bezier(0.21, 0.47, 0.32, 0.98)` — fast start, soft landing. Entrances 0.6–0.7s; micro-interactions 0.2–0.3s.
- **Entrances**: fade + 16–32px rise (`Reveal`), staggered lists at 80–120ms intervals (`Stagger`), word-mask reveals for headlines (`TextReveal`).
- **Physics**: springs for anything cursor-driven — `Magnetic` (damping 18/stiffness 180), `TiltCard` (max 6°), nav active pill (stiffness 400/damping 34).
- **Ambient**: CSS-only float/marquee/gradient-pan keyframes; canvas particle field pauses off-screen.
- **Hard rules**: every animation respects `prefers-reduced-motion`; nothing animates layout properties; ambient motion stays under 20% opacity; hover lifts are 4px max.

## Component recipes

- **Buttons** (`ui/button.tsx`): `primary` (foreground fill), `accent`, `outline` (glass), `ghost`, `link` × sizes `sm/md/lg/icon`. All pill-shaped, lift 2px on hover.
- **Badges** (`ui/badge.tsx`): `default/accent/success/outline` × `sm/md/lg` — status and metadata.
- **Tags** (`ui/tag.tsx`): mono 11px, squared — tech-stack only.
- **Cards** (`ui/card.tsx`): glass + hairline ring + `shadow-soft`; hoverable variant lifts and strengthens the border.
- **Section headers** (`ui/section-heading.tsx`): mono uppercase eyebrow → display title → muted description. Always in that order.
