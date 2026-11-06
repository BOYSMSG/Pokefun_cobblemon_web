# POKEFUN — REDESIGN REQUIREMENTS & IMPLEMENTATION BLUEPRINT
**Target Aesthetic:** [Shifan Portfolio](https://shifan.pokefun.in/)  
**Key Visual Identifiers:** Frosted Glass • Electric Aqua Glows • Modern Micro-Interactions • Seamless Dual-Theme  

---

## 1. Aesthetic Philosophy & Visual Identity

The redesign must completely transform Pokefun from a legacy gaming portal layout into an ultra-modern, high-performance web experience matching the design language of `https://shifan.pokefun.in/`.

### 1.1 Color Palette & Token Architecture

```scss
// Light Theme Palette (Clean Ice & Electric Aqua)
$bg-primary-light: #F8FBFF;
$bg-surface-light: #FFFFFF;
$bg-ice-glass: rgba(255, 255, 255, 0.85);
$text-primary-light: #0B1524;
$text-secondary-light: #3D567A;
$border-light: 1.5px solid rgba(0, 201, 216, 0.25);
$glow-light: 0 0 25px rgba(0, 201, 216, 0.35);

// Dark Theme Palette (Deep Void & Neon Cyan)
$bg-primary-dark: #0B0E14;
$bg-surface-dark: #111827;
$bg-dark-glass: rgba(17, 24, 39, 0.88);
$text-primary-dark: #F8FAFC;
$text-secondary-dark: #94A3B8;
$border-dark: 1.5px solid rgba(0, 240, 255, 0.22);
$glow-dark: 0 0 30px rgba(0, 240, 255, 0.45);

// Brand Accents
$electric-cyan: #00F0FF;
$electric-blue: #1677FF;
$brand-gradient: linear-gradient(135deg, #1677FF 0%, #00C9D8 100%);
```

### 1.2 Glassmorphism & Panel Styling
- Every card, modal, navigation bar, and sidebar must feature **frosted glass backing**:
  `backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);`
- Panels must have crisp 1.5px borders (`rgba(0, 201, 216, 0.25)`) that highlight with an aqua neon glow on hover (`0 0 20px rgba(0, 201, 216, 0.4)`).
- Border radii should follow unified proportions: `12px` for small chips, `16px` for cards, `24px` for major containers and modals.

---

## 2. Typography & Iconography

1. **Brand Headers & Badges:** `font-family: 'Righteous', cursive, sans-serif;`
   - Used for main logo text, section badges, level tags, and podium rankings.
2. **Body & Clean UI Headings:** `font-family: 'Karla', sans-serif;`
   - Weight 600/700 for headings, Weight 400/500 for paragraph descriptions.
   - Letter spacing: `+0.5px` on titles, `+1.5px` on uppercase badge labels.
3. **Iconography:** FontAwesome 6 Pro / Solid icons with consistent sizing and subtle opacity (`opacity: 0.85` default, `opacity: 1.0` on active/hover).

---

## 3. Responsive & Mobile Experience Standards

1. **Desktop Viewport (> 992px):**
   - Clean, non-wrapping header (height 64px) with high-contrast logo badge.
   - Core links visible, secondary utility links nested in the "More ▾" frosted glass dropdown.
   - Generous right-side padding to accommodate the floating account avatar pill without overlapping.
2. **Mobile Viewport (< 992px):**
   - Sticky top bar (height 52px) with server status indicator and drawer toggle.
   - Full-screen frosted drawer with smooth slide-in cubic-bezier physics.
   - 2-column compact grid for all package and Pokémon cards (Amazon mobile app style) so items are instantly visible on first screen load.
   - Floating buttons (checkout, settings) placed on non-overlapping coordinates.

---

## 4. Preservation & Implementation Constraints (CRITICAL)

The redesign planning must adhere to these absolute guardrails:

1. **Zero Database Alterations:** Do not change field names, schemas, or models in `src/models/*.ts`. All 17 collections must remain drop-in compatible.
2. **Zero API Breaking Changes:** All 69 existing endpoints in `src/app/api/*` must retain their input parameters, HTTP methods, and JSON response formats.
3. **Preserve Tebex Checkout Webhooks:** The Tebex integration and in-game command delivery dispatch (`DeliveryQueue.ts`) must function without interruption.
4. **Preserve Minecraft Status Queries:** `minecraft-server-util` logic querying `play.pokefun.in` must remain intact.
5. **Preserve Authentication:** NextAuth Discord and Google session configurations must remain unaltered.
6. **Preserve Static Assets:** All 1,989 static assets in `public/` must remain in their original paths and resolutions.
