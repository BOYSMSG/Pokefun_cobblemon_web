# POKEFUN — ASSET MANIFEST & CLASSIFICATION
**Total Asset Count:** 1,989 Files | **Total Uncompressed Size:** 274.32 MB  
**Root Path:** `public/`

---

## 1. Asset Category Summary

| Category | Relative Folder | File Count | Size (MB) | Purpose & Key Contents |
|---|---|---|---|---|
| **Cosmetics Catalog** | `public/images/cosmetics/` | 1,271 | 95.81 MB | PNG renders of all in-game hats, backpacks, weapons, particle auras, and skins. |
| **Fakemons & Fusions** | `public/images/fakemons/` | 476 | 97.37 MB | Custom artwork of server-exclusive Fakemons and DNA fusion Pokémon. |
| **Features & Guides** | `public/images/features/` | 40 | 5.93 MB | High-resolution 2.5x artwork illustrating server features on the homepage. |
| **Showcase Gallery** | `public/images/showcase/` | 55 | 7.34 MB | Curated player builds, mega-arenas, and legendary catch screenshots. |
| **CobbleLeague Phone** | `public/images/cobbleleague/` | 21 | 0.52 MB | Hand-drawn textures of the Trainer Phone, apps, trophies, and UI frames. |
| **Main Web Graphics** | `public/images/mainimages/` | 30 | 34.28 MB | High-res character renders, Rayquaza, Lucario, and promotional artwork. |
| **Logos & Branding** | `public/images/` (root) | 16 | 6.80 MB | `logo.png`, `pokefun_logo_transparent.png`, `icon.png`, favicon variants. |
| **Backgrounds** | `public/images/backgrounds/` | 3 | 6.49 MB | High-res Minecraft landscape hero backgrounds (`spawn.png`, etc.). |
| **Ranks & Tags** | `public/images/ranks/` | 6 | 0.08 MB | VIP, Champion, Elite, Ace, and Master rank emblem badges. |
| **Audio Assets** | `public/audio/` | 3 | 5.14 MB | Background looping music (`north_province.ogg`) and message pings. |
| **Fonts & Typography** | `public/fonts/` | 12 | 0.90 MB | Web font files (WOFF2/TTF) for offline and fast rendering of icons. |
| **Stylesheets & CSS** | `public/css/` | 8 | 0.39 MB | `custom.css`, `cards.min.css`, `animate.min.css`, `all.min.css`. |
| **User Uploads Cache** | `public/uploads/` | 2 | 7.43 MB | Cached preview attachments. |
| **Client Scripts** | `public/js/` | 11 | 1.24 MB | Pre-packaged vendor scripts (bootstrap helpers, jquery shims). |
| **Root Public Files** | `public/` (root) | 7 | < 0.05 MB | `sw.js` (Service Worker), `ads.txt`, `file.svg`, `globe.svg`, `next.svg`. |

---

## 2. Critical Branding Assets (Never Delete or Rename)

1. **`public/images/pokefun_logo_transparent.png` (1254 × 1254, RGBA):**
   - The primary official logo badge for Pokefun Cobblemon SMP.
   - Used in the desktop navbar, hero pulse animation, and mobile navigation drawer.
2. **`public/images/logo.png` (766 × 138, RGBA):**
   - The wide horizontal Pokefun ice banner with Rayquaza and Lucario.
   - Used in the store top bar, emails, and wide promotional headers.
3. **`public/images/icon.png` (1254 × 1254, RGBA):**
   - Official server icon used as the PWA icon and browser touch icon.
4. **`public/images/logopfun.png`:**
   - Alternate branding asset for social share cards and Discord rich embeds.

---

## 3. High-Value Custom Game Assets

### 3.1 Custom Pokémon Artwork (`/images/fakemons/`)
- Contains 476 high-resolution digital illustrations of unique Fakemon variants:
  - Custom anime-themed Megas (Mega Lucario Aura, Mega Charizard X/Y variants).
  - DNA Fusion Pokémon (Reshiram + Charizard, Rayquaza + Milotic, Mewtwo + Gengar).
  - Referenced in `/wiki/fakemons`, `/wiki/fusions`, and `src/data/fakemons.json`.

### 3.2 CobbleLeague Trainer Phone Graphics (`/images/cobbleleague/`)
- Exact mod textures extracted and formatted for the interactive guidebook at `/wiki/guides/cobbleleague-phone`:
  - `00_phone_hero.png` (Trainer Phone item texture).
  - `01_mini_trophy.png` (Tournament trophy).
  - `03_phone_frame.png` (UI smartphone chassis).
  - `14_craft_poketab.webp` & `15_craft_map.webp` (Crafting recipes).
  - `16_screen_home.webp` through `20_screen_feed.webp` (In-game UI screenshots).

### 3.3 Feature Cards (`/images/features/`)
- 40 custom illustrations rendered at 2.5x magnification:
  - Custom bosses, Pokémon raids, PokeMMO-style battle towers, automatic farming plots.
  - Displayed prominently on the homepage and `/features` route.

---

## 4. Audio & Media Manifest

| Asset | Size | Format | Trigger / Component |
|---|---|---|---|
| `public/audio/north_province.ogg` | 4.8 MB | Ogg Vorbis | Background ambience player in `SettingsWidget.tsx` and `AudioPlayer.tsx`. |
| Message Notification Ping | ~150 KB | MP3 / WAV | Fired by `PushManager.tsx` on incoming direct message. |

---

## 5. Asset Preservation Policy

- **Do Not Compress Destructively:** All Pokémon transparency and icon masks rely on alpha channels.
- **Maintain Exact Filenames:** Over 3,000 JSON entries across `fakemons.json`, `cosmetics.json`, and `fusions.json` directly index these file paths.
