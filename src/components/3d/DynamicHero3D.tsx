"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";

export interface PokemonHeroItem {
  id: string;
  name: string;
  type: string;
  badge: string;
  path: string;
  rotY?: number;
}

// 32 Iconic Cobblemon Models: Official Cobblemon + DNA Fusions + Classic Favorites
export const POKEMON_ROSTER: PokemonHeroItem[] = [
  // --- Official Cobblemon Originals ---
  { id: "greninja", name: "Greninja", type: "Water / Dark", badge: "Fan Favorite", path: "/models/official-greninja.glb", rotY: Math.PI + 0.25 },
  { id: "pikachu", name: "Pikachu", type: "Electric", badge: "Mascot Cobblemon", path: "/models/official-pikachu.glb", rotY: Math.PI + 0.25 },
  { id: "charizard", name: "Charizard", type: "Fire / Flying", badge: "Official Cobblemon", path: "/models/official-charizard.glb", rotY: Math.PI + 0.25 },
  { id: "lucario", name: "Lucario", type: "Fighting / Steel", badge: "Aura Cobblemon", path: "/models/official-lucario.glb", rotY: Math.PI + 0.25 },
  { id: "eevee", name: "Eevee", type: "Normal", badge: "Fan Favorite", path: "/models/official-eevee.glb", rotY: Math.PI + 0.25 },
  { id: "gengar", name: "Gengar", type: "Ghost / Poison", badge: "Shadow Cobblemon", path: "/models/official-gengar.glb", rotY: Math.PI + 0.25 },
  { id: "blastoise", name: "Blastoise", type: "Water", badge: "Official Cobblemon", path: "/models/official-blastoise.glb", rotY: Math.PI + 0.25 },
  { id: "mewtwo", name: "Mewtwo", type: "Psychic", badge: "Legendary Cobblemon", path: "/models/official-mewtwo.glb", rotY: Math.PI + 0.25 },
  { id: "garchomp", name: "Garchomp", type: "Dragon / Ground", badge: "Apex Cobblemon", path: "/models/official-garchomp.glb", rotY: Math.PI + 0.25 },
  { id: "gyarados", name: "Gyarados", type: "Water / Flying", badge: "Atrocious Cobblemon", path: "/models/official-gyarados.glb", rotY: Math.PI + 0.25 },
  { id: "snorlax", name: "Snorlax", type: "Normal", badge: "Sleeping Cobblemon", path: "/models/official-snorlax.glb", rotY: Math.PI + 0.25 },
  { id: "lapras", name: "Lapras", type: "Water / Ice", badge: "Transport Cobblemon", path: "/models/official-lapras.glb", rotY: Math.PI + 0.25 },

  // --- Custom DNA & Starlight Fusions ---
  { id: "umbrizard", name: "Umbrizard", type: "Dark / Fire", badge: "Custom DNA Fusion", path: "/models/fusion-umbrizard.glb", rotY: Math.PI + 0.25 },
  { id: "venustoise", name: "Venustoise", type: "Grass / Water", badge: "Custom DNA Fusion", path: "/models/fusion-venustoise.glb", rotY: Math.PI + 0.25 },
  { id: "giraruledge", name: "Giraruledge", type: "Ghost / Dragon", badge: "Starlight Fusion", path: "/models/fusion-giraruledge.glb", rotY: Math.PI + 0.25 },
  { id: "miraiceus", name: "Miraiceus", type: "Normal / Electric", badge: "Legendary Fusion", path: "/models/fusion-miraiceus.glb", rotY: Math.PI + 0.25 },
  { id: "necgross", name: "Necgross", type: "Psychic / Steel", badge: "Ultra Fusion", path: "/models/fusion-necgross.glb", rotY: Math.PI + 0.25 },
  { id: "darkzor", name: "Darkzor", type: "Bug / Dark", badge: "Starlight Fusion", path: "/models/fusion-darkzor.glb", rotY: Math.PI + 0.25 },
  { id: "togechu", name: "Togechu", type: "Electric / Fairy", badge: "Custom DNA Fusion", path: "/models/fusion-togechu.glb", rotY: Math.PI + 0.25 },
  { id: "bulbakoal", name: "Bulbakoal", type: "Grass / Fire", badge: "Custom DNA Fusion", path: "/models/fusion-bulbakoal.glb", rotY: Math.PI + 0.25 },
  { id: "eterneon", name: "Eterneon", type: "Psychic / Dragon", badge: "Custom DNA Fusion", path: "/models/fusion-eterneon.glb", rotY: Math.PI + 0.25 },
  { id: "dragovoir", name: "Dragovoir", type: "Dragon / Fairy", badge: "Custom DNA Fusion", path: "/models/fusion-dragovoir.glb", rotY: Math.PI + 0.25 },
  { id: "luxpa", name: "Luxpa", type: "Electric / Dark", badge: "Custom DNA Fusion", path: "/models/fusion-luxpa.glb", rotY: Math.PI + 0.25 },
  { id: "armartina", name: "Armartina", type: "Fire / Ghost", badge: "Starlight Fusion", path: "/models/fusion-armartina.glb", rotY: Math.PI + 0.25 },
  { id: "espevoir", name: "Espevoir", type: "Psychic / Fairy", badge: "Starlight Fusion", path: "/models/fusion-espevoir.glb", rotY: Math.PI + 0.25 },

  // --- Classic Cobblemon Favorites (Excluded from random selection: indices 25..31) ---
  { id: "dragonite", name: "Dragonite", type: "Dragon / Flying", badge: "Classic Cobblemon", path: "/models/pokemon-dragonite.glb", rotY: Math.PI + 0.25 },
  { id: "salamence", name: "Salamence", type: "Dragon / Flying", badge: "Classic Cobblemon", path: "/models/pokemon-salamence.glb", rotY: Math.PI + 0.25 },
  { id: "gardevoir", name: "Gardevoir", type: "Psychic / Fairy", badge: "Classic Cobblemon", path: "/models/pokemon-gardevoir.glb", rotY: Math.PI + 0.25 },
  { id: "flygon", name: "Flygon", type: "Ground / Dragon", badge: "Classic Cobblemon", path: "/models/pokemon-flygon.glb", rotY: Math.PI + 0.25 },
  { id: "meowscarada", name: "Meowscarada", type: "Grass / Dark", badge: "Paldea Starter", path: "/models/pokemon-meowscarada.glb", rotY: Math.PI + 0.25 },
  { id: "braixen", name: "Braixen", type: "Fire", badge: "Kalos Starter", path: "/models/pokemon-braixen.glb", rotY: Math.PI + 0.25 },
  { id: "serperior", name: "Serperior", type: "Grass", badge: "Unova Royal", path: "/models/pokemon-serperior.glb", rotY: Math.PI + 0.25 },
];

const HeroSceneComponent = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => (
    <div style={{
      position: "absolute",
      inset: 0,
      background: "radial-gradient(circle, rgba(0, 201, 216, 0.18) 0%, rgba(22, 119, 255, 0.06) 50%, transparent 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: "2.4rem", color: "#00C9D8" }}></i>
    </div>
  ),
});

// Helper for type pill styles & icons matching Pokémon authentic aesthetics
const getTypeBadge = (type: string) => {
  const t = type.trim().toLowerCase();
  switch (t) {
    case "water": return { bg: "#1677FF", icon: "💧" };
    case "dark": return { bg: "#1E293B", icon: "🌙" };
    case "fire": return { bg: "#EF4444", icon: "🔥" };
    case "grass": return { bg: "#10B981", icon: "🌿" };
    case "electric": return { bg: "#F59E0B", icon: "⚡" };
    case "psychic": return { bg: "#EC4899", icon: "🔮" };
    case "fighting": return { bg: "#B45309", icon: "🥊" };
    case "ghost": return { bg: "#7C3AED", icon: "👻" };
    case "dragon": return { bg: "#6366F1", icon: "🐉" };
    case "steel": return { bg: "#64748B", icon: "⚙️" };
    case "ice": return { bg: "#00C9D8", icon: "❄️" };
    case "flying": return { bg: "#38BDF8", icon: "🦅" };
    case "ground": return { bg: "#D97706", icon: "⛰️" };
    case "rock": return { bg: "#78716C", icon: "🪨" };
    case "bug": return { bg: "#84CC16", icon: "🐛" };
    case "poison": return { bg: "#9333EA", icon: "🧪" };
    case "fairy": return { bg: "#F472B6", icon: "✨" };
    default: return { bg: "#08979C", icon: "✦" };
  }
};

export default function DynamicHero3D() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [arrowDirection, setArrowDirection] = useState<number>(0);

  // STRICT RULE: Indices 25..31 have exactly 0% probability of random selection
  const getRandomShowcaseIndex = (excludeIndex?: number): number => {
    const poolLimit = Math.min(25, POKEMON_ROSTER.length);
    let idx = Math.floor(Math.random() * poolLimit);
    if (excludeIndex !== undefined && idx === excludeIndex && poolLimit > 1) {
      idx = (idx + 1) % poolLimit;
    }
    return idx;
  };

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const pokeParam = params.get("pokemon");
      if (pokeParam) {
        const foundIdx = POKEMON_ROSTER.findIndex(
          p => p.id === pokeParam || p.name.toLowerCase() === pokeParam.toLowerCase()
        );
        if (foundIdx !== -1) {
          setCurrentIndex(foundIdx);
          return;
        }
      }
    }
    // Default to Greninja (index 0) to match Reference B
    setCurrentIndex(0);
  }, []);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % POKEMON_ROSTER.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + POKEMON_ROSTER.length) % POKEMON_ROSTER.length);
  };

  const handleRandom = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = getRandomShowcaseIndex(currentIndex);
    setCurrentIndex(nextIdx);
  };

  const currentPokemon = POKEMON_ROSTER[currentIndex] || POKEMON_ROSTER[0];
  const formattedIndex = String(currentIndex + 1).padStart(3, "0");
  const formattedTotal = String(POKEMON_ROSTER.length).padStart(3, "0");

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      
      {/* Concentric Neon Holographic Pedestal SVG Layer */}
      <img 
        src="/assets/pokefun/pedestal-rings.svg" 
        alt="" 
        className="cinematic-pedestal-svg" 
      />

      {/* Floating Side Nav Arrow (Previous Pokémon) - triggers model look-at */}
      <button 
        onClick={handlePrev}
        onMouseEnter={() => setArrowDirection(-1)}
        onMouseLeave={() => setArrowDirection(0)}
        title="Previous Pokémon"
        className="cinematic-stage-nav-btn stage-nav-prev"
        aria-label="Previous Pokémon"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      {/* Floating Side Nav Arrow (Next Pokémon) - triggers model look-at */}
      <button 
        onClick={handleNext}
        onMouseEnter={() => setArrowDirection(1)}
        onMouseLeave={() => setArrowDirection(0)}
        title="Next Pokémon"
        className="cinematic-stage-nav-btn stage-nav-next"
        aria-label="Next Pokémon"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>

      {/* Top Subtle Random Shuffle Pill */}
      <div style={{
        position: "absolute",
        top: "14px",
        right: "16px",
        zIndex: 25
      }}>
        <button
          onClick={handleRandom}
          title="Shuffle Pokémon"
          style={{
            background: "rgba(255, 255, 255, 0.92)",
            border: "1.5px solid rgba(0, 201, 216, 0.45)",
            color: "#1677FF",
            cursor: "pointer",
            padding: "5px 12px",
            borderRadius: "10px",
            fontSize: "0.74rem",
            fontWeight: 800,
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: "0 4px 14px rgba(0, 201, 216, 0.15)",
            backdropFilter: "blur(8px)"
          }}
        >
          <i className="fa-solid fa-dice" style={{ color: "#00C9D8" }}></i>
          <span>Random</span>
        </button>
      </div>

      {/* 3D WebGL Canvas */}
      <HeroSceneComponent 
        key={currentPokemon.path}
        modelPath={currentPokemon.path}
        rotY={currentPokemon.rotY}
        arrowDirection={arrowDirection}
      />

      {/* Bottom Holographic Pokémon Battle Card (Matching Reference B Exactly) */}
      <div className="cinematic-pokemon-card">
        {/* Top Row: DEX Number & Badge */}
        <div className="pokemon-card-top-row">
          <span className="pokemon-card-dex">
            DEX #{currentPokemon.id === "greninja" ? "658" : formattedIndex}
          </span>
          <span className="pokemon-card-badge">
            <i className="fa-solid fa-crown" style={{ fontSize: "0.62rem" }}></i>
            {currentPokemon.badge.toUpperCase()}
          </span>
        </div>

        {/* Bottom Row: Name & Type Pills */}
        <div className="pokemon-card-bottom-row">
          <span className="pokemon-card-name">
            {currentPokemon.name}
          </span>

          <div className="pokemon-card-types">
            {currentPokemon.type.split("/").map((t, i) => {
              const badge = getTypeBadge(t);
              return (
                <span
                  key={i}
                  className="pokemon-type-pill"
                  style={{ background: badge.bg }}
                >
                  <span>{badge.icon}</span>
                  <span>{t.trim()}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Tactile Drag Hint */}
        <div className="pokemon-card-drag-hint">
          <i className="fa-solid fa-arrows-rotate" style={{ color: "#00C9D8" }}></i>
          <span>360° Drag to inspect</span>
        </div>
      </div>

    </div>
  );
}