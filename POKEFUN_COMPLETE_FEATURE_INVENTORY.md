# POKEFUN — COMPLETE FEATURE INVENTORY
**Total Distinct Routes:** 75 Pages | **Total API Endpoints:** 69 APIs  
**Coverage:** 100% Comprehensive Inspection

---

## 1. Core & Public Presentation Routes

| Route | Purpose & Functionality | Key Components | APIs & Database | Auth | Key Assets |
|---|---|---|---|---|---|
| `/` | Main Homepage: Live server player counters, hero brand callouts, Cobblemon 1.21.1 badges, feature showcase cards, quick CTAs. | `HomePage`, `GlobalSidebar`, `DesktopNavbar`, `MobileNav` | `/api/player-count`, MongoDB `Post` | Public | `/images/pokefun_logo_transparent.png`, `/images/features/*` |
| `/changelogs` | Server and website update notes, chronological patch history, bugfix announcements. | `ChangelogView` | MongoDB `GlobalConfig` | Public | `/images/features/*` |
| `/rules` | Official server & Discord rules, gameplay guidelines, griefing penalties, and staff code. | `RulesView` | Static / MongoDB | Public | Vector icons, brand badges |
| `/team` | Staff directory showcasing Owners, Developers, Admins, Moderators, and Gym Masters. | `TeamGrid` | Static / MongoDB `User` | Public | Staff player heads (`mc-heads.net`) |
| `/vote` | Voting site incentives with voting links, player rewards explanation, daily streak tracking. | `VoteLinksCard` | `/api/rewards/daily-checkin`, MySQL | Public | Vote provider logos |
| `/showcase` | Gallery of player-built Pokémon towns, arenas, shiny catches, and legendary encounters. | `ShowcaseGrid` | `/api/community` (tagged showcase) | Public | `/images/showcase/*` |
| `/features` | Comprehensive overview of server custom systems (Fusions, Bosses, C-League, Raids). | `FeatureCards` | Static Data `features.json` | Public | `/images/features/*` |
| `/modpacks` | Direct download links, CurseForge & Modrinth install guides for Java & Bedrock. | `ModpackGuides` | Static | Public | `/images/modpack_banner.png` |
| `/other` | Secondary utility links, partner servers, legal disclaimers, privacy policy. | `OtherLinks` | Static | Public | Standard icons |

---

## 2. Wiki & Cobblemon Game Guide Routes

| Route | Purpose & Functionality | Key Components | Data / APIs | Auth | Key Assets |
|---|---|---|---|---|---|
| `/wiki` | Wiki Homepage: Search index, category tiles (Pokédex, Guides, Fusions, Bosses, NPCs). | `WikiIndex` | Static Data Indices | Public | Wiki category icons |
| `/wiki/pokedex` & `/[id]` | Full Cobblemon Pokédex: Stats, types, abilities, spawn biomes, evolution trees. | `PokedexGrid`, `PokemonDetail` | `cobblebosses.json`, `trainersData.json` | Public | Pokémon sprite art, type badges |
| `/wiki/fusions` & `/[id]` | Custom Pokémon Fusions catalog: Unique stat lines, custom textures, fusion recipes. | `FusionGrid`, `FusionView` | `fusions.json` | Public | `/images/fakemons/*` |
| `/wiki/fakemons` & `/[id]` | Custom Fakemon directory exclusive to Pokefun SMP with stats and spawn rates. | `FakemonGrid`, `FakemonDetail` | `fakemons.json` | Public | Custom Fakemon artwork |
| `/wiki/cosmetics` | In-game visual cosmetics catalog (hats, wings, particle auras, custom weapon skins). | `CosmeticsViewer` | `cosmetics.json` | Public | `/images/cosmetics/*` (1,271 files) |
| `/wiki/gyms-npcs` | NPC Trainer & Gym Master locations, battle rosters, recommended level caps. | `GymNPCView` | `trainersData.json` | Public | Gym badge icons |
| `/wiki/guides` & `/[id]` | Dynamic player guides index with markdown rendering and search filters. | `GuideReader` | `guides.json`, MongoDB `Post` | Public | Embedded guide screenshots |
| `/wiki/guides/cobbleleague-phone` | In-game CobbleLeague Trainer Phone comprehensive manual, apps, merges, & terminal guide. | `CobbleLeagueManual` | Custom static handbook | Public | `/images/cobbleleague/*` (21 files) |
| `/wiki/guides/alphazone` | Alpha Zone raid guide: mechanics, high-tier loot tables, spawn timers. | `AlphaZoneGuide` | Markdown guide | Public | Raid boss renders |
| `/wiki/guides/battletower` | Battle Tower 20-floor challenge: Sky Tower & Abyss Tower rosters, token rewards. | `BattleTowerGuide` | Markdown guide | Public | Tower artwork |
| `/wiki/guides/cobblebosses` | World Boss guide: Spawn mechanics, legendary boss variants, drop rates. | `BossGuide` | `cobblebosses.json` | Public | Boss renders |
| `/wiki/guides/claims` & `/plots` | Town claims, land protection, trusting players, flags, and claim blocks guide. | `ClaimsGuide` | Markdown guide | Public | Land claim screenshots |
| `/wiki/guides/dungeon` | Custom procedural dungeons, dungeon keys, mob wave strategies. | `DungeonGuide` | Markdown guide | Public | Dungeon screenshots |
| `/wiki/guides/fusion` | Step-by-step fusion machine guide, DNA splicers, compatibility matrices. | `FusionGuide` | Markdown guide | Public | Fusion machine textures |
| `/wiki/guides/gyms` | Gym challenge rules, level scaling, gym leader queues. | `GymGuide` | Markdown guide | Public | Gym badges |
| `/wiki/guides/homes` | Teleportation commands: `/sethome`, `/home`, `/tpa`, limits per rank. | `HomesGuide` | Markdown guide | Public | Command examples |
| `/wiki/guides/legendaries` | Legendary Pokémon spawning probabilities, biomes, weather conditions, bells. | `LegendaryGuide` | Markdown guide | Public | Legendary renders |
| `/wiki/guides/npc` | Custom merchant NPC trade tables, quest givers, currency exchanges. | `NpcGuide` | Markdown guide | Public | NPC screenshots |
| `/wiki/guides/raid` | Multiplayer raid dens, dynamax/terastallize mechanics, team coordination. | `RaidGuide` | Markdown guide | Public | Raid den renders |
| `/wiki/guides/ranked` | Competitive matchmaking tiers, ELO rating system, seasonal rewards. | `RankedGuide` | Markdown guide | Public | Rank badge tiers |

---

## 3. Community & Social Network Routes

| Route | Purpose & Functionality | Key Components | APIs & Database | Auth | Key Assets |
|---|---|---|---|---|---|
| `/community` | Social Feed: Feed stream, post creation modal, like/comment counts, media attachments. | `CommunityFeed`, `CreatePostModal` | `/api/community`, `/api/upload-image`, MongoDB `Post`, `Comment` | Public read, Auth post | User avatars, upload previews |
| `/community/create` | Full-screen rich post creator with markdown preview, tags, image/video upload. | `PostEditor` | `/api/community`, `/api/upload` | Required | Media preview components |
| `/community/post/[id]` | Single post discussion view: Nested comment replies, share links, like toggling. | `SinglePostView`, `CommentSection` | `/api/community/[id]`, `/api/community/[id]/comments` | Public read, Auth comment | Avatar heads |
| `/community/reels` | TikTok/Instagram-style vertical video reel stream, audio auto-ducking, interactive likes. | `ReelsFeed`, `ReelCard` | `/api/reels`, Google Drive storage | Public | Short-form videos, sound toggles |
| `/community-guide` | Community guidelines, posting etiquette, formatting help, badge unlocks. | `CommunityGuide` | Static | Public | Guidelines icons |
| `/polls` | Community voting polls with real-time percentage bars, multi-choice support. | `PollsList`, `PollCard` | `/api/polls`, `/api/polls/vote`, MongoDB `Poll` | Required to vote | Poll status pills |
| `/announcements` & `/create` | Official server broadcast bulletin, pin banners, rich HTML announcements. | `AnnouncementFeed`, `CreateAnnouncement` | `/api/admin/posts` | Required (Admin to create) | Announcement banners |

---

## 4. User Account & Direct Communication Routes

| Route | Purpose & Functionality | Key Components | APIs & Database | Auth | Key Assets |
|---|---|---|---|---|---|
| `/login` | Authentication hub: Discord OAuth, Google OAuth, session redirection. | `LoginCard` | `/api/auth/[...nextauth]` | Public | Discord & Google logos |
| `/profile` & `/[id]` | Player Profile: Minecraft gamertag link, skin 3D render, posts, badges, follower counts. | `ProfileHeader`, `UserPostsList` | `/api/profile/[id]`, `/api/profile/[id]/follow`, MongoDB `User` | Required for own, Public for others | Dynamic 3D avatar renders |
| `/studio` | Creator Dashboard: Upload reels, analyze video views, engagement metrics, drafts. | `StudioDashboard` | `/api/studio`, `/api/reels` | Required | Analytics charts |
| `/messages` | Direct Player Messaging: Conversation threads, unread counters, push ping alerts. | `ChatWindow`, `ThreadList` | `/api/messages`, `/api/messages/unread`, WebPush | Required | Sound cues, player avatars |
| `/dm-guide` | Direct message privacy settings, blocking users, notification settings guide. | `DmGuide` | Static | Public | Help icons |

---

## 5. Competitive Systems & In-Game Sync Routes

| Route | Purpose & Functionality | Key Components | APIs & Database | Auth | Key Assets |
|---|---|---|---|---|---|
| `/gym_apply` | Application form to become an official Gym Leader (type selection, team proof). | `GymApplyForm` | `/api/gyms/apply`, MongoDB `GymApplication` | Required | 18 Pokémon type badges |
| `/gym_battle` | Challenge queue: View active Gym Leaders online, request official battles, log badges. | `GymBattleQueue` | `/api/gyms`, `/api/gyms/challenge`, MongoDB `Gym` | Required | Gym Leader cards |
| `/tournaments` | Active & upcoming server tournaments, bracket progression, entry requirements. | `TournamentBracket` | `/api/tournaments`, MongoDB `Tournament` | Public read, Auth register | Trophy assets |
| `/leaderboard` | Live server leaderboards (Battle Points, Gym Badges, Playtime, Balance). | `LeaderboardTable` | `/api/leaderboard`, MySQL in-game sync | Public | Top 3 podium badges |
| `/events` | Server calendar: Legendary raid hours, double XP weekends, skin giveaway events. | `EventsCalendar` | `/api/events`, MongoDB `Event` | Public | Calendar cards |
| `/giveaways` | Automated server giveaways: Join countdowns, winner roll selection, roll animations. | `GiveawayCard` | `/api/giveaways`, `/api/giveaways/join`, MongoDB `Giveaway` | Required | Gift box animations |
| `/apply` | Staff application portal (Helper, Builder, Gym Leader, Developer). | `ApplicationForm` | `/api/admin/actions/users`, MongoDB `StaffApplication` | Required | Role badges |

---

## 6. Rewards & Gamification Engine Routes

| Route | Purpose & Functionality | Key Components | APIs & Database | Auth | Key Assets |
|---|---|---|---|---|---|
| `/rewards` | Rewards Hub: Points balance, daily streak reward claim, shortcuts to shop & earn. | `RewardsHub` | `/api/rewards/daily-checkin`, MongoDB `User` | Required | Coin icons, streak flame |
| `/rewards/earn` | Third-party offerwall integration (BitLabs survey & offer rewards). | `BitLabsOfferwall` | `/api/rewards/callbacks/bitlabs` | Required | Offerwall iframes |
| `/rewards/shop` | In-site point shop: Redeem earned points for crate keys, cosmetic tags, coins. | `RewardsShopGrid` | `/api/rewards/products`, `/api/rewards/purchase`, MongoDB `RewardProduct` | Required | Crate & item icons |
| `/rewards/history` | Transaction ledger: Detailed audit log of points earned, spent, and check-in dates. | `RewardsHistoryTable` | `/api/rewards/history`, MongoDB `RewardTransaction` | Required | Receipt badges |
| `/rewards/guide` | Guide explaining point values, anti-fraud rules, daily limits, check-in multipliers. | `RewardsGuide` | Static | Public | Point icons |

---

## 7. Store & E-Commerce Routes

| Route | Purpose & Functionality | Key Components | APIs & Database | Auth | Key Assets |
|---|---|---|---|---|---|
| `/store` | Embedded Tebex Store: Ranks, Battle Pass, Protection Stones, Cosmetics, Keys. | `ShopClient` | `/api/tebex/categories`, `/api/tebex/checkout`, `/api/tebex/recent-payments` | Public (Gamertag at checkout) | Rank badges, package images |

---

## 8. Admin Control Center (`/admin/*`)

| Sub-Route | Administrative Function | Database Model | Action APIs |
|---|---|---|---|
| `/admin` | Master dashboard overview: Active user counts, pending applications, error logs. | `GlobalConfig`, `User` | `/api/admin/system-config` |
| `/admin/users` | Player account manager: Role elevation (`vip`, `mod`, `admin`), profile badges, ban state. | `User` | `/api/admin/users`, `/api/admin/actions/users` |
| `/admin/actions` | Disciplinary command center: Issue warnings, temporary/permanent bans, audit log. | `User` | `/api/admin/actions/ban`, `/api/admin/actions/warn` |
| `/admin/posts` | Content moderation: Flagged post deletion, pinned announcements, reel reviews. | `Post` | `/api/admin/posts`, `/api/admin/actions/clear-posts` |
| `/admin/messages` | System broadcasts: Send official system messages to individual or all player inboxes. | `Message` | `/api/admin/messages` |
| `/admin/gyms` | Gym Leader application review: Accept/reject applicants, assign Gym type, audit logs. | `GymApplication`, `Gym` | `/api/gyms/applications`, `/api/gyms/revoke` |
| `/admin/tournaments` | Tournament creator: Seed brackets, configure battle formats, declare winners. | `Tournament` | `/api/tournaments` |
| `/admin/events` | Calendar event scheduler: Create scheduled events, set countdowns, push notifications. | `Event` | `/api/events` |
| `/admin/giveaways` | Giveaway manager: Trigger rolls, configure eligibility filters, verify claims. | `Giveaway` | `/api/admin/giveaways` |
| `/admin/rewards` | Economy controls: Configure point rewards, approve payouts, add reward products. | `RewardProduct`, `RewardTransaction` | `/api/rewards/config`, `/api/rewards/give-points` |
| `/admin/store-config` | Tebex store banner management: Set active sale titles, discount % and countdown dates. | `StoreConfig` | `/api/admin/store-config`, `/api/store-config` |
