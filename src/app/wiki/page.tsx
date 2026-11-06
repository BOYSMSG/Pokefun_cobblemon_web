"use client";

import React, { useState } from "react";
import Link from "next/link";

interface WikiEntry {
  href: string;
  icon: string;
  category: "dex" | "guide" | "world";
  title: string;
  desc: string;
  badge: string;
}

const wikiPages: WikiEntry[] = [
  { href: "/wiki/pokedex", icon: "fa-solid fa-book-bookmark", category: "dex", title: "Official Pokédex", desc: "Explore all official Cobblemon Pokémon, their base stats, abilities, typings, and movepools.", badge: "Vanilla & Mods" },
  { href: "/wiki/fusions", icon: "fa-solid fa-dna", category: "dex", title: "Fusion Dex", desc: "Discover all custom Cobblemon Fusions! View exclusive hybrid typings, custom stats, and special abilities.", badge: "Exclusive Fusions" },
  { href: "/wiki/fakemons", icon: "fa-solid fa-wand-magic-sparkles", category: "dex", title: "Fakemon Dex", desc: "Explore hundreds of unique custom Fakemons, regional variants, and custom evolutionary lines.", badge: "Custom Species" },
  { href: "/wiki/cosmetics", icon: "fa-solid fa-shirt", category: "dex", title: "Cosmetics & Skins", desc: "Check out the huge gallery of custom Pokémon skins, seasonal costumes, and wearable trainer gear.", badge: "Visual Outfits" },
  { href: "/wiki/guides/cobbleleague-phone", icon: "fa-solid fa-mobile-screen", category: "guide", title: "CobbleLeague Phone", desc: "Complete guide to the Trainer Phone, tournaments, Gym Leaders, app syncing, and league perks.", badge: "Core Gameplay" },
  { href: "/wiki/guides/npc", icon: "fa-solid fa-dumbbell", category: "guide", title: "NPCs & Gyms Guide", desc: "Complete guide to Gym Leader rosters, custom EV Training NPCs, and instant server warps.", badge: "PvE Battles" },
  { href: "/wiki/guides/dungeon", icon: "fa-solid fa-dungeon", category: "guide", title: "Dungeons & Crypts", desc: "Instance raid details, mob waves, dungeon loot tables, and boss mechanics for party play.", badge: "Instanced PvE" },
  { href: "/wiki/guides/raid", icon: "fa-solid fa-fire", category: "guide", title: "Custom Raids", desc: "Learn how to trigger world raid portals, defeat raid bosses, and earn guaranteed high-IV rewards.", badge: "Group Raids" },
  { href: "/wiki/guides/alphazone", icon: "fa-solid fa-skull", category: "guide", title: "Alpha Zone", desc: "Deep dive into the high-risk, high-reward Alpha Zone and its aggressive Alpha-tier spawns.", badge: "Endgame Zone" },
  { href: "/wiki/guides/ranked", icon: "fa-solid fa-trophy", category: "guide", title: "Ranked PvP", desc: "Tier clauses, Elo rating system, seasonal competitive tournaments, and championship rewards.", badge: "Competitive" },
  { href: "/wiki/guides/legendaries", icon: "fa-solid fa-dragon", category: "guide", title: "Legendaries & Vaults", desc: "Rituals, summoning keys, and conditions required to locate and capture mythical Pokémon.", badge: "Mythicals" },
  { href: "/wiki/guides/cobblebosses", icon: "fa-solid fa-crown", category: "guide", title: "Cobblemon Bosses", desc: "Natural boss spawn mechanics, enraged health pools, and drop tables for rare boss tiers.", badge: "World Bosses" },
  { href: "/wiki/guides/claims", icon: "fa-solid fa-shield-halved", category: "world", title: "Claims & Protection", desc: "Commands and rules for protecting your land, preventing griefing, and trusting teammates.", badge: "Land Protection" },
  { href: "/wiki/guides/plots", icon: "fa-solid fa-city", category: "world", title: "Plots & City World", desc: "Guide on purchasing, building, renting, and trading commercial plots in the main player City.", badge: "Economy & Cities" },
  { href: "/wiki/guides/homes", icon: "fa-solid fa-house", category: "world", title: "Homes & Teleportation", desc: "Fast travel commands, setting multiple biome waypoints, and warp mechanics.", badge: "Utility" },
  { href: "/showcase", icon: "fa-solid fa-images", category: "dex", title: "Media Showcase", desc: "Browse full-resolution screenshots, video reels, and photo galleries from players across the SMP.", badge: "Gallery" },
];

export default function WikiIndex() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filteredPages = wikiPages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(search.toLowerCase()) || 
                          page.desc.toLowerCase().includes(search.toLowerCase()) ||
                          page.badge.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || page.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-slate-100">
      
      {/* Header Banner */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider mb-4 shadow-sm shadow-cyan-500/10">
          <i className="fa-solid fa-book-open"></i>
          <span>Official POKEFUN Knowledge Base</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
          POKEFUN Wiki &amp; Database
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Your complete encyclopedia for official and custom Pokémon, DNA fusions, server mechanics, dungeons, gyms, and competitive systems.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mt-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyan-400">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <input 
            type="text" 
            placeholder="Search guides, Pokémon, fusions, bosses, commands..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-slate-900/80 border border-cyan-500/30 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 backdrop-blur-md shadow-lg shadow-black/40 transition-all"
          />
          {search && (
            <button 
              onClick={() => setSearch("")} 
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white text-xs font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {[
            { id: "all", label: "All Categories", icon: "fa-solid fa-grid-2" },
            { id: "dex", label: "Pokédex & Lore", icon: "fa-solid fa-dna" },
            { id: "guide", label: "Gameplay & Raids", icon: "fa-solid fa-gamepad" },
            { id: "world", label: "World & Economy", icon: "fa-solid fa-earth-americas" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                category === tab.id
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <i className={tab.icon}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Wiki Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        {filteredPages.length > 0 ? (
          filteredPages.map((page, idx) => (
            <Link 
              key={idx} 
              href={page.href}
              className="group relative flex flex-col justify-between p-6 rounded-3xl bg-slate-900/70 hover:bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/10 backdrop-blur-md"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                    <i className={page.icon}></i>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {page.badge}
                  </span>
                </div>

                <h2 className="text-xl font-extrabold text-white group-hover:text-cyan-400 transition-colors mb-2">
                  {page.title}
                </h2>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-4">
                  {page.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>Read Documentation</span>
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-16 text-center">
            <i className="fa-solid fa-folder-open text-4xl text-slate-600 mb-3 block"></i>
            <h3 className="text-lg font-bold text-slate-300">No Wiki Articles Match Your Query</h3>
            <p className="text-slate-500 text-sm mt-1">Try searching for generic terms like &quot;fusion&quot;, &quot;gym&quot;, &quot;claim&quot; or &quot;boss&quot;.</p>
          </div>
        )}
      </div>

    </div>
  );
}
