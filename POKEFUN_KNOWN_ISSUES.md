# POKEFUN — KNOWN ISSUES & TECHNICAL DEBT REGISTER

---

## 1. Discovered Visual & Architectural Quirks

### 1.1 Theme Hydration & FOUC (Flash of Unstyled Content)
- **Root Cause:** Next.js Server Components emit static HTML before client-side JavaScript mounts. If a user previously selected Dark Mode, the static server HTML painted white before React hydrated `SettingsWidget` or `AIChatWidget` to add `.dark-mode`.
- **Status:** Mitigated with pre-hydration inline `<script>` and `<style>` guards in `src/app/layout.tsx`.
- **Recommendation for Redesign:** Implement a standardized theme provider (e.g. `next-themes`) or clean CSS class toggler that reads `data-theme` attribute synchronously on the `<html>` root.

### 1.2 Desktop Navigation Bar Overcrowding
- **Root Cause:** The desktop navigation bar had 14 visible text and button links. On standard desktop screens between 1024px and 1440px wide, the items wrapped onto a second line, dropping behind the fixed `[MSG Boys]` profile button.
- **Status:** Resolved by collapsing secondary links into a frosted glass "More ▾" dropdown menu and adding `padding-right: 200px` to the nav container.
- **Recommendation for Redesign:** Keep visible top-level navigation strictly under 7 core items. Move administrative and utility links into a modern Mega-Menu or side drawer.

### 1.3 Transparent Logo Contrast on Pure White Backgrounds
- **Root Cause:** `public/images/pokefun_logo_transparent.png` contains light pastel cyan (`#A9ECF2`) tones and white highlights. When rendered over a pure `#FFFFFF` background without a container, the logo borders faded into the background.
- **Status:** Fixed by wrapping the brand mark in `.nav-brand-logo-badge` with a glass backing, subtle border, and depth drop shadow.
- **Recommendation for Redesign:** Maintain dual asset definitions or consistent high-contrast badge containers across all themes.

### 1.4 Fixed Position Overlap with Floating UI Elements
- **Root Cause:** Multiple components use `position: fixed`:
  - `AuthWidget.tsx`: Fixed at `top: 20px; right: 30px; zIndex: 9999`.
  - `AIChatWidget.tsx`: Fixed at `bottom: 30px; right: 30px; zIndex: 9999`.
  - `SettingsWidget.tsx` (Store): Fixed at bottom right.
  - Sticky checkout bar: Fixed at bottom center.
- **Status:** Adjusted z-indices and mobile bottom offsets (`bottom: 82px`).
- **Recommendation for Redesign:** Unify all floating status triggers into a single integrated HUD or dock bar.

---

## 2. In-Game & Data Synchronization Quirks

### 2.1 MySQL Plugin Tables Null Fallbacks
- **Issue:** In `src/app/api/leaderboard/route.ts`, if in-game plugins have not yet populated table columns (e.g. `elo`, `wins`, `kills`), queries could fail.
- **Status:** Protected with `SHOW TABLES LIKE ?` and column inspection fallbacks.
- **Recommendation for Redesign:** Add an in-memory Redis cache or Next.js `unstable_cache` with a 60-second revalidation period to reduce SQL connection pressure.

### 2.2 Google Drive Cloud Upload Limits
- **Issue:** User-generated content (screenshots and video reels) uploads directly through Google Drive API using service account credentials.
- **Risk:** Large video files can exhaust Drive quota or encounter latency during serverless execution.
- **Recommendation for Redesign:** Migrate community media storage to Cloudflare R2 or AWS S3 with pre-signed direct client upload URLs.

### 2.3 Mobile Browser Audio Autoplay Policy
- **Issue:** Modern mobile browsers (iOS Safari, Android Chrome) block automatic audio playback until the first user gesture.
- **Status:** Handled via promise rejection catch in `SettingsWidget.tsx` and `AudioPlayer.tsx`.

---

## 3. Incomplete & Stubbed Functionality

1. **AI Chat Assistant (`src/components/AIChatWidget.tsx`):**
   - The Chat tab currently shows "Coming Soon!" with placeholder text while backend prompts are finalized.
2. **Staff Applications (`/apply`):**
   - Application forms submit to MongoDB `StaffApplication`, but email notification dispatch to administrators is currently manual.
3. **Giftcard Verification Modal:**
   - Store giftcard redemption informs users to apply codes on the final Tebex checkout page. Direct on-site validation is planned for future API updates.
