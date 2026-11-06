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
  // --- Official Cobblemon Originals (Extracted directly from Cobblemon Mod) ---
  { id: "pikachu", name: "Pikachu", type: "Electric", badge: "Mascot Cobblemon", path: "/models/official-pikachu.glb", rotY: Math.PI + 0.25 },
  { id: "charizard", name: "Charizard", type: "Fire / Flying", badge: "Official Cobblemon", path: "/models/official-charizard.glb", rotY: Math.PI + 0.25 },
  { id: "eevee", name: "Eevee", type: "Normal", badge: "Fan Favorite Cobblemon", path: "/models/official-eevee.glb", rotY: Math.PI + 0.25 },
  { id: "lucario", name: "Lucario", type: "Fighting / Steel", badge: "Aura Cobblemon", path: "/models/official-lucario.glb", rotY: Math.PI + 0.25 },
  { id: "gengar", name: "Gengar", type: "Ghost / Poison", badge: "Shadow Cobblemon", path: "/models/official-gengar.glb", rotY: Math.PI + 0.25 },
  { id: "greninja", name: "Greninja", type: "Water / Dark", badge: "Ninja Cobblemon", path: "/models/official-greninja.glb", rotY: Math.PI + 0.25 },
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

  // --- Classic Cobblemon Favorites (Excluded from random selection: 26 to 32) ---
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
      background: "radial-gradient(circle, rgba(0, 201, 216, 0.15) 0%, rgba(22, 119, 255, 0.05) 50%, rgba(255, 255, 255, 0.5) 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: "2.2rem", color: "#00C9D8" }}></i>
    </div>
  ),
});

export default function DynamicHero3D() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Helper to pick ONLY from premier showcase Pokemon (0% chance for indices 25..31, which are 26 to 32 on UI)
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
    setCurrentIndex(getRandomShowcaseIndex());
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
      
      {/* Top Trainer Holo-Dex Scanner Header */}
      <div style={{
        position: "absolute",
        top: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 20,
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: "rgba(255, 255, 255, 0.94)",
        backdropFilter: "blur(14px)",
        padding: "6px 14px",
        borderRadius: "16px",
        border: "1.5px solid rgba(0, 201, 216, 0.35)",
        boxShadow: "0 8px 24px rgba(0, 201, 216, 0.15)",
        whiteSpace: "nowrap"
      }}>
        {/* Prev Arrow */}
        <button 
          onClick={handlePrev}
          title="Previous Pokémon"
          className="pod-nav-btn"
          style={{
            background: "rgba(22, 119, 255, 0.08)",
            border: "1px solid rgba(22, 119, 255, 0.2)",
            color: "#1677FF",
            cursor: "pointer",
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            fontSize: "0.85rem",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        {/* Holo-Dex Counter */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          padding: "2px 8px"
        }}>
          <span style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#00C9D8",
            boxShadow: "0 0 10px #00C9D8",
            display: "inline-block"
          }}></span>
          <span style={{
            fontFamily: "monospace",
            fontSize: "0.84rem",
            fontWeight: 800,
            letterSpacing: "0.8px",
            color: "#0B1524"
          }}>
            DEX #{formattedIndex}
          </span>
          <span style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>
            / {formattedTotal}
          </span>
        </div>

        {/* Next Arrow */}
        <button 
          onClick={handleNext}
          title="Next Pokémon"
          className="pod-nav-btn"
          style={{
            background: "rgba(22, 119, 255, 0.08)",
            border: "1px solid rgba(22, 119, 255, 0.2)",
            color: "#1677FF",
            cursor: "pointer",
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            fontSize: "0.85rem",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        <div style={{ width: "1px", height: "18px", background: "rgba(0, 201, 216, 0.3)", margin: "0 2px" }}></div>

        {/* Random Shuffle Button */}
        <button
          onClick={handleRandom}
          title="Shuffle Pokémon"
          className="pod-random-btn"
          style={{
            background: "linear-gradient(135deg, rgba(0, 201, 216, 0.15) 0%, rgba(22, 119, 255, 0.12) 100%)",
            border: "1.5px solid rgba(0, 201, 216, 0.4)",
            color: "#0088A3",
            cursor: "pointer",
            padding: "5px 12px",
            borderRadius: "10px",
            fontSize: "0.76rem",
            fontWeight: 800,
            display: "inline-flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          <i className="fa-solid fa-dice" style={{ color: "#1677FF" }}></i>
          <span>Random</span>
        </button>
      </div>

      {/* Subtle Holographic Projection Scanlines & Technical HUD Accents */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(0, 201, 216, 0.035) 50%, transparent 50%)",
          backgroundSize: "100% 4px",
          pointerEvents: "none",
          zIndex: 10,
          borderRadius: "inherit"
        }}
      />


      {/* 3D WebGL Canvas */}
      <HeroSceneComponent 
        key={currentPokemon.path}
        modelPath={currentPokemon.path}
        rotY={currentPokemon.rotY}
      />

      {/* Bottom Holographic Pokémon Battle Card */}
      <div style={{
        position: "absolute",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(14px)",
        padding: "8px 18px",
        borderRadius: "18px",
        border: "1.5px solid rgba(0, 201, 216, 0.4)",
        boxShadow: "0 10px 30px rgba(0, 201, 216, 0.16)",
        maxWidth: "92%",
        minWidth: "280px"
      }}>
        {/* Left: Badge & Name */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2px" }}>
          <span style={{
            fontSize: "0.68rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.6px",
            color: currentPokemon.badge.includes("Fusion") ? "#08979C" : "#1677FF"
          }}>
            {currentPokemon.badge}
          </span>
          <span style={{
            fontFamily: "'Righteous', cursive, sans-serif",
            fontSize: "1.08rem",
            fontWeight: 900,
            color: "#0B1524",
            letterSpacing: "0.5px",
            lineHeight: "1.2"
          }}>
            {currentPokemon.name}
          </span>
        </div>

        {/* Right: Types & Drag to Rotate Hint */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "3px" }}>
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            {currentPokemon.type.split("/").map((t, i) => (
              <span
                key={i}
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  background: "rgba(0, 201, 216, 0.12)",
                  color: "#0088A3",
                  border: "1px solid rgba(0, 201, 216, 0.3)",
                  padding: "2px 8px",
                  borderRadius: "6px"
                }}
              >
                {t.trim()}
              </span>
            ))}
          </div>
          <span style={{
            fontSize: "0.64rem",
            color: "#94a3b8",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: "4px"
          }}>
            <i className="fa-solid fa-arrows-rotate" style={{ color: "#00C9D8", fontSize: "0.62rem" }}></i>
            360° Drag to inspect
          </span>
        </div>
      </div>

    </div>
  );
}
