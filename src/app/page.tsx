"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import GlobalSaleBanner from "@/components/GlobalSaleBanner";
import DynamicHero3D from "@/components/3d/DynamicHero3D";
import AtmosphereEngine from "@/components/effects/AtmosphereEngine";
import CinematicScroll from "@/components/effects/CinematicScroll";
import MagneticButton from "@/components/effects/MagneticButton";

export default function HomePage() {
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const [storeConfig, setStoreConfig] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyIP = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("play.pokefun.in");
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  useEffect(() => {
    const fetchPlayerCount = async () => {
      let isOnline = false;
      let players = 0;

      try {
        const res = await fetch("/api/player-count");
        const data = await res.json();
        if (data && data.online && data.players > 0) {
          isOnline = true;
          players = data.players;
        }
      } catch (e) {
        console.error("Internal player count API failed:", e);
      }

      if (!isOnline) {
        try {
          const res = await fetch("https://api.mcstatus.io/v2/status/java/play.pokefun.in");
          const data = await res.json();
          if (data && data.online) {
            isOnline = true;
            players = data.players.online;
          }
        } catch (e) {
          console.error("mcstatus.io failed:", e);
        }
      }

      if (isOnline) {
        setPlayerCount(players + 30);
      } else {
        setPlayerCount(-1);
      }
    };
    
    fetchPlayerCount();

    fetch('/api/store-config')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.config) {
          setStoreConfig(data.config);
        }
      })
      .catch(() => {});
  }, []);

  const featureItems = [
    { title: "Natural Bosses", desc: "Powerful bosses spawn naturally in the wild! Defeat them for epic loot and rare items.", img: "/images/features/image09_bosspokemons1.png" },
    { title: "Custom Raids", desc: "Team up with fellow trainers in the new Raid System to battle legendary Pokémon.", img: "/images/features/image27_Team_Raids_Battle.png" },
    { title: "Battle Gimmicks", desc: "Mega Evolution, Dynamax, Gigantamax, and Z-Moves are fully active across all battles!", img: "/images/features/image29_Z_Mega1s.png" },
    { title: "Pokémon Fusions", desc: "Create unique and devastating Pokémon through our advanced DNA splicing fusion system.", img: "/images/features/fusion pokemons1.png" },
    { title: "Gym System", desc: "Challenge player-run and NPC gyms across various biomes to earn official gym badges.", img: "/images/features/battletower.png" },
    { title: "Battle Tower", desc: "Test your tactical skills in the endless Battle Tower and earn rare competitive rewards.", img: "/images/features/image26_primal_forms.png" },
    { title: "Cool Fakemons", desc: "Discover hundreds of unique custom Fakemons and regional forms to catch and train.", img: "/images/features/coolfakemons.png" },
    { title: "Dungeons", desc: "Explore multi-level challenging dungeons filled with custom mobs and legendary rewards.", img: "/images/features/dungeon.png" },
    { title: "Huge Cities", desc: "Explore vibrant custom cities teeming with quests, traders, and interactive NPCs.", img: "/images/features/hugecity.png" },
    { title: "Epic Armours", desc: "Equip your trainer with custom RPG armor sets providing stat boosts and set bonuses.", img: "/images/features/image15_epicarmours.png" },
    { title: "Poke Costumes", desc: "Customize your favorite Pokémon with special seasonal outfits, hats, and cosmetics.", img: "/images/features/image22_pokecostume.png" },
    { title: "Safari Zone", desc: "Venture into the dedicated Safari Zone to hunt elusive shinies and high-IV specimens.", img: "/images/features/safarizone.png" },
  ];

  return (
    <div style={{ width: "100%", maxWidth: "100%", minHeight: "100vh", color: "#0B1524" }}>
      
      {/* Hide the sidebar on Homepage for full-width cinematic Cobblemon hero */}
      <style dangerouslySetInnerHTML={{__html: `
        .desktop-sidebar-container { display: none !important; }
        .site-content-layout { display: block !important; width: 100% !important; max-width: 100% !important; }
        .site-page-content { width: 100% !important; max-width: 100% !important; }
        
        /* Subtle Futuristic Sci-Fi Grid Animation */
        .scifi-cyber-grid {
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(0, 201, 216, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 201, 216, 0.08) 1px, transparent 1px);
        }
      `}} />

      {/* =================================================================
          WHITE & ELECTRIC AQUA SCI-FI HERO SECTION (SPLIT-HERO LAYOUT)
          ================================================================= */}
      {/* Cinematic GSAP Scroll Choreography */}
      <CinematicScroll />

      <section className="scifi-cyber-grid hero-sci-fi-section">
        {/* Living Atmosphere Particle Engine */}
        <AtmosphereEngine />

        {/* Ambient Holographic Glow Aura */}
        <div style={{
          position: "absolute",
          top: "-20%",
          right: "5%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 201, 216, 0.22) 0%, rgba(22, 119, 255, 0.1) 45%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 1
        }}></div>

        {/* Bulletproof Responsive Split Grid (Desktop 2-Col / Mobile 1-Col Stack) */}
        <div className="hero-split-grid">
          
          {/* Left Column: Brand, Headline, CTAs */}
          <div className="hero-text-column">
            
            {/* Live Edition Pill Badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                padding: "8px 18px",
                borderRadius: "50px",
                background: "#FFFFFF",
                border: "1.5px solid rgba(0, 201, 216, 0.4)",
                boxShadow: "0 4px 18px rgba(0, 201, 216, 0.12)"
              }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }}></span>
                <span style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "1px", color: "#0B1524" }}>COBBLEMON 1.21.1</span>
                <span style={{ color: "#00C9D8" }}>•</span>
                <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#1677FF" }}>MINECRAFT JAVA EDITION</span>
              </div>
            </div>

            {/* Hero Titles */}
            <h1 style={{
              fontFamily: "'Righteous', cursive, sans-serif",
              fontSize: "clamp(1.85rem, 5.5vw, 3.4rem)",
              fontWeight: 900,
              letterSpacing: "0.5px",
              color: "#0B1524",
              lineHeight: 1.15,
              margin: 0
            }}>
              The Ultimate Cobblemon <br />
              <span style={{
                background: "linear-gradient(135deg, #1677FF 0%, #00C9D8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                Server &amp; Community
              </span>
            </h1>

            <p style={{
              fontSize: "clamp(0.98rem, 1.8vw, 1.12rem)",
              color: "#3D567A",
              maxWidth: "540px",
              margin: 0,
              lineHeight: 1.6
            }}>
              Catch, battle, fuse, and conquer. Immerse yourself in a living Pokémon world with custom wild raids, DNA fusions, 18 gyms, and an active player-driven economy.
            </p>

            {/* =================================================================
                THE APEX SERVER GATEWAY (SHOWSTOPPER TERMINAL)
                ================================================================= */}
            <div className="apex-gateway-card">
              {/* Terminal Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <i className="fa-solid fa-server" style={{ color: "#1677FF", fontSize: "0.85rem" }}></i>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.8px", color: "#3D567A" }}>
                    MINECRAFT SERVER GATEWAY
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }}></span>
                  <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "#10b981" }}>
                    ONLINE • {playerCount !== null && playerCount > 0 ? playerCount : "36"} TRAINERS
                  </span>
                </div>
              </div>

              {/* Terminal IP Chamber & 1-Click Copy Trigger */}
              <div className="apex-gateway-ip-row">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Server IP Address
                  </span>
                  <span style={{
                    fontFamily: "monospace",
                    fontSize: "1.18rem",
                    fontWeight: 900,
                    color: "#0B1524",
                    letterSpacing: "0.5px"
                  }}>
                    play.pokefun.in
                  </span>
                </div>

                {/* 1-Click Copy Button with Magnetic Tactility */}
                <MagneticButton strength={0.22}>
                  <button
                    onClick={handleCopyIP}
                    className="interactive-hero-btn scifi-sheen-btn cta-btn-play apex-gateway-copy-btn"
                    style={{
                      padding: "11px 22px",
                      borderRadius: "12px",
                      fontWeight: 900,
                      border: "none",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      background: copied ? "#10b981" : "linear-gradient(135deg, #1677FF 0%, #00C9D8 100%)",
                      color: "#FFFFFF",
                      boxShadow: copied ? "0 4px 20px rgba(16, 185, 129, 0.45)" : "0 4px 20px rgba(0, 201, 216, 0.45)",
                      fontSize: "0.88rem",
                      letterSpacing: "0.5px"
                    }}
                    title="Click to copy server IP to clipboard"
                  >
                    <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`} style={{ fontSize: "1.1rem" }}></i>
                    <span>{copied ? 'IP COPIED! ⚡' : 'CLICK TO COPY'}</span>
                  </button>
                </MagneticButton>
              </div>

              {/* Terminal Details Footer */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.72rem", color: "#64748B", fontWeight: 600, flexWrap: "wrap", gap: "6px" }}>
                <span>⚡ Java Edition 1.21.1 • Port: 25565 (Default)</span>
                <span style={{ color: "#1677FF", fontWeight: 700 }}>Direct Connect Supported</span>
              </div>
            </div>

            {/* =================================================================
                SATELLITE COMPANION HUBS (DISCORD, STORE, OWNER)
                ================================================================= */}
            <div className="hero-satellite-grid">
              {/* Discord */}
              <a 
                href="https://discord.gg/NtE8QBkmwR" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="interactive-hero-btn scifi-sheen-btn cta-btn-discord hero-satellite-btn"
                style={{
                  padding: "10px 14px",
                  borderRadius: "14px",
                  background: "#5865F2",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "0 4px 18px rgba(88, 101, 242, 0.25)"
                }}
              >
                <i className="fa-brands fa-discord" style={{ fontSize: "1.25rem" }}></i>
                <div style={{ display: "flex", flexDirection: "column", textAlign: "left", lineHeight: "1.15" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 900, letterSpacing: "0.5px" }}>DISCORD</span>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, opacity: 0.9, display: "flex", alignItems: "center", gap: "3px" }}>
                    Join 10K+ <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.56rem" }}></i>
                  </span>
                </div>
              </a>

              {/* Store */}
              <a 
                href="https://store.pokefun.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="interactive-hero-btn scifi-sheen-btn cta-btn-store hero-satellite-btn"
                style={{
                  padding: "10px 14px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "0 4px 18px rgba(245, 158, 11, 0.25)"
                }}
              >
                <i className="fa-solid fa-cart-shopping" style={{ fontSize: "1.15rem" }}></i>
                <div style={{ display: "flex", flexDirection: "column", textAlign: "left", lineHeight: "1.15" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 900, letterSpacing: "0.5px" }}>STORE</span>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, opacity: 0.9, display: "flex", alignItems: "center", gap: "3px" }}>
                    Ranks &amp; Items <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.56rem" }}></i>
                  </span>
                </div>
              </a>

              {/* Owner Profile */}
              <a 
                href="https://shifan.pokefun.in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="interactive-hero-btn scifi-sheen-btn cta-btn-owner hero-satellite-btn"
                style={{
                  padding: "10px 14px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "0 4px 18px rgba(14, 165, 233, 0.35)"
                }}
                title="Server Founder & Developer: Shifan"
              >
                <i className="fa-solid fa-crown" style={{ fontSize: "1.15rem" }}></i>
                <div style={{ display: "flex", flexDirection: "column", textAlign: "left", lineHeight: "1.15" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 900, letterSpacing: "0.5px" }}>OWNER</span>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, opacity: 0.9, display: "flex", alignItems: "center", gap: "3px" }}>
                    Profile <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.56rem" }}></i>
                  </span>
                </div>
              </a>
            </div>

            {/* Quick feature highlights */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "4px", alignItems: "center" }}>
              <span style={{ fontSize: "0.74rem", fontWeight: 700, padding: "5px 12px", borderRadius: "10px", background: "rgba(22, 119, 255, 0.08)", color: "#1677FF", border: "1px solid rgba(22, 119, 255, 0.2)" }}>
                ⚡ Custom DNA Fusions
              </span>
              <span style={{ fontSize: "0.74rem", fontWeight: 700, padding: "5px 12px", borderRadius: "10px", background: "rgba(0, 201, 216, 0.08)", color: "#00C9D8", border: "1px solid rgba(0, 201, 216, 0.25)" }}>
                ⚔️ Wild Bosses &amp; Raids
              </span>
              <span style={{ fontSize: "0.74rem", fontWeight: 700, padding: "5px 12px", borderRadius: "10px", background: "rgba(245, 158, 11, 0.08)", color: "#d97706", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                🏆 Gyms &amp; Tournaments
              </span>
              <span style={{ fontSize: "0.74rem", fontWeight: 700, padding: "5px 12px", borderRadius: "10px", background: "rgba(16, 185, 129, 0.08)", color: "#059669", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                💼 Player Economy
              </span>
            </div>
          </div>

          {/* 3D Holographic Showcase Pod (Stacked on Mobile) */}
          <div className="hero-pod-wrapper">
            
            {/* Hologram Stage Pedestal Rings (Sci-Fi Base) */}
            <div style={{
              position: "absolute",
              bottom: "25px",
              left: "50%",
              transform: "translateX(-50%) rotateX(68deg)",
              width: "360px",
              height: "360px",
              borderRadius: "50%",
              border: "2px solid rgba(0, 201, 216, 0.6)",
              boxShadow: "0 0 35px rgba(0, 201, 216, 0.4), inset 0 0 35px rgba(22, 119, 255, 0.3)",
              pointerEvents: "none",
              zIndex: 1
            }}></div>
            <div style={{
              position: "absolute",
              bottom: "45px",
              left: "50%",
              transform: "translateX(-50%) rotateX(68deg)",
              width: "260px",
              height: "260px",
              borderRadius: "50%",
              border: "1.5px dashed rgba(22, 119, 255, 0.5)",
              pointerEvents: "none",
              zIndex: 1
            }}></div>

            {/* 3D Model with dynamic controls, switcher, and dynamic name tag */}
            <div style={{ width: "100%", height: "100%", position: "relative", zIndex: 5 }}>
              <DynamicHero3D />
            </div>

          </div>

        </div>

      </section>

      {/* =================================================================
          COMMUNITY HUB PROMO BANNER (WHITE & ELECTRIC AQUA)
          ================================================================= */}
      <section className="community-hub-card" style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "24px",
        padding: "36px 32px",
        marginBottom: "40px",
        background: "linear-gradient(135deg, rgba(22, 119, 255, 0.05) 0%, rgba(0, 201, 216, 0.08) 100%), #FFFFFF",
        border: "1.5px solid rgba(0, 201, 216, 0.3)",
        boxShadow: "0 10px 35px rgba(22, 119, 255, 0.06)"
      }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <i className="fa-solid fa-users" style={{ color: "#00C9D8" }}></i>
              <span style={{ color: "#1677FF", fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>Official Community Feed</span>
            </div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0 0 6px 0", color: "#0B1524" }}>
              Join the Pokéfun Trainer Hub
            </h2>
            <p style={{ color: "#3D567A", margin: 0, fontSize: "0.95rem", maxWidth: "600px" }}>
              Share your custom builds, post short reels, showcase shiny catches, and connect with thousands of active Cobblemon trainers.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link 
              href="/community" 
              className="interactive-hero-btn scifi-sheen-btn btn-glow-blue"
              style={{
                padding: "12px 24px",
                borderRadius: "14px",
                fontWeight: 700,
                fontSize: "0.92rem",
                background: "#F0F6FE",
                border: "1.5px solid rgba(0, 201, 216, 0.35)",
                color: "#1677FF",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <i className="fa-solid fa-compass" style={{ fontSize: "1rem" }}></i>
              <span>Explore Feed</span>
            </Link>
            <Link 
              href="/community/create" 
              className="interactive-hero-btn scifi-sheen-btn btn-glow-cyan"
              style={{
                padding: "12px 24px",
                borderRadius: "14px",
                fontWeight: 800,
                fontSize: "0.92rem",
                background: "linear-gradient(135deg, #1677FF 0%, #00C9D8 100%)",
                color: "#FFFFFF",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 15px rgba(0, 201, 216, 0.3)"
              }}
            >
              <i className="fa-solid fa-plus" style={{ fontSize: "0.95rem" }}></i>
              <span>Create Post</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================================
          EPIC SERVER FEATURES GRID (CINEMATIC CARD LAYOUT)
          ================================================================= */}
      <section style={{ marginBottom: "60px" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            display: "inline-block",
            padding: "5px 16px",
            fontSize: "0.78rem",
            fontWeight: 800,
            color: "#1677FF",
            background: "rgba(0, 201, 216, 0.12)",
            border: "1.5px solid rgba(0, 201, 216, 0.35)",
            borderRadius: "20px",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}>
            Cobblemon Innovations
          </div>
          <h2 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#0B1524", margin: "12px 0 6px 0" }}>
            Epic Server Features
          </h2>
          <p style={{ color: "#3D567A", fontSize: "1rem", maxWidth: "600px", margin: "0 auto" }}>
            Experience handcrafted gameplay mechanics built from the ground up for competitive and casual Cobblemon enthusiasts.
          </p>
        </div>

        <div className="features-grid-container" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px"
        }}>
          {featureItems.map((item, idx) => (
            <div 
              key={idx}
              className="feature-card-item"
              style={{
                borderRadius: "22px",
                background: "#FFFFFF",
                border: "1.5px solid rgba(0, 201, 216, 0.22)",
                boxShadow: "0 8px 30px rgba(22, 119, 255, 0.05)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                transition: "all 0.25s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "#00C9D8";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(0, 201, 216, 0.18)";
                const img = e.currentTarget.querySelector('.feature-card-img') as HTMLElement;
                if (img) img.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.borderColor = "rgba(0, 201, 216, 0.22)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(22, 119, 255, 0.05)";
                const img = e.currentTarget.querySelector('.feature-card-img') as HTMLElement;
                if (img) img.style.transform = "scale(1)";
              }}
            >
              {/* Full-width Cinematic Preview Banner */}
              <div style={{
                width: "100%",
                height: "175px",
                overflow: "hidden",
                position: "relative",
                background: "linear-gradient(135deg, #E6F8FF 0%, #F0F6FE 100%)",
                borderBottom: "1.5px solid rgba(0, 201, 216, 0.2)"
              }}>
                <img 
                  loading="lazy" 
                  decoding="async" 
                  src={item.img} 
                  alt={item.title} 
                  className="feature-card-img"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    transition: "transform 0.35s ease"
                  }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>

              {/* Card Body */}
              <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", flex: 1, textAlign: "left" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0B1524", margin: "0 0 8px 0" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#3D567A", fontSize: "0.92rem", lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================================
          GLOBAL LEADERBOARD PROMO CARD
          ================================================================= */}
      <section className="leaderboard-promo-section" style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "24px",
        padding: "36px 32px",
        marginBottom: "60px",
        background: "linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(217, 119, 6, 0.12) 100%), #FFFFFF",
        border: "1.5px solid rgba(245, 158, 11, 0.35)",
        boxShadow: "0 10px 35px rgba(245, 158, 11, 0.08)"
      }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "rgba(245, 158, 11, 0.15)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f59e0b",
              fontSize: "1.6rem",
              flexShrink: 0
            }}>
              <i className="fa-solid fa-crown"></i>
            </div>
            <div>
              <span style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#d97706" }}>Competitive Ranks</span>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0B1524", margin: "4px 0" }}>Global Leaderboards</h2>
              <p style={{ color: "#3D567A", fontSize: "0.92rem", margin: 0, maxWidth: "500px" }}>
                Climb the ladder across Ranked PvP, AlphaZone completions, and Dungeon clears. Who will claim #1?
              </p>
            </div>
          </div>
          <Link 
            href="/leaderboard" 
            className="interactive-hero-btn scifi-sheen-btn btn-glow-gold"
            style={{
              padding: "14px 28px",
              borderRadius: "14px",
              fontWeight: 800,
              fontSize: "0.95rem",
              color: "#FFFFFF",
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 18px rgba(245, 158, 11, 0.3)"
            }}
          >
            <i className="fa-solid fa-trophy"></i>
            <span>View Leaderboards</span>
          </Link>
        </div>
      </section>

      {/* Join Callout */}
      <div style={{ textAlign: "center", paddingBottom: "50px" }}>
        <a 
          href="/modpacks" 
          className="interactive-hero-btn scifi-sheen-btn btn-glow-cyan"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 38px",
            borderRadius: "16px",
            fontWeight: 800,
            fontSize: "1.05rem",
            color: "#FFFFFF",
            background: "linear-gradient(135deg, #1677FF 0%, #00C9D8 100%)",
            textDecoration: "none",
            boxShadow: "0 6px 25px rgba(0, 201, 216, 0.35)"
          }}
        >
          <i className="fa-solid fa-gamepad" style={{ fontSize: "1.2rem" }}></i>
          <span>How to Join POKEFUN SMP</span>
        </a>
      </div>

    </div>
  );
}
