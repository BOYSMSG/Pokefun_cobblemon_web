"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import GlobalSaleBanner from "@/components/GlobalSaleBanner";
import DynamicHero3D from "@/components/3d/DynamicHero3D";
import AtmosphereEngine from "@/components/effects/AtmosphereEngine";
import CinematicScroll from "@/components/effects/CinematicScroll";
import MagneticButton from "@/components/effects/MagneticButton";
import "./pokefun-cinematic.css";

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
    { title: "Pokémon Fusions", desc: "Create unique and devastating Pokémon through our advanced DNA splicing fusion system.", img: "/images/features/fusion_pokemons1.png" },
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
        .site-main-viewport { max-width: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
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
          CINEMATIC MINECRAFT COBBLEMON HERO SECTION (MATCHING REFERENCE B)
          ================================================================= */}
      <CinematicScroll />

      <section className="cinematic-hero-section">
        {/* Full-width Minecraft Cobblemon City Environmental Background */}
        <img 
          src="/images/hero-cinematic-world.webp" 
          alt="Pokefun Cobblemon Living World" 
          className="cinematic-hero-world-img" 
        />

        {/* Readability Gradient Layer (Text contrast on left, reveals vibrant world on right) */}
        <div className="cinematic-hero-readability"></div>



        {/* Atmospheric Particle Layer */}
        <div className="cinematic-hero-particles"></div>
        <AtmosphereEngine />



        {/* Two-Column Responsive Hero Container */}
        <div className="cinematic-hero-container">
          
          {/* Left Column: Brand & Server Gateway */}
          <div className="cinematic-hero-left">
            
{/* Top pill button removed as requested */}

            {/* Main Cinematic Heading */}
            <h1 className="cinematic-title">
              Your Adventure<br />
              <span className="cinematic-title-gradient">Begins Here.</span>
            </h1>

{/* Vague hero text removed for cleaner cinematic gateway focus */}

            {/* =================================================================
                MINECRAFT SERVER GATEWAY (MATCHING REFERENCE B EXACTLY)
                ================================================================= */}
            <div className="cinematic-gateway-card">
              {/* Gateway Header */}
              <div className="cinematic-gateway-header">
                <div className="gateway-header-label">
                  <i className="fa-solid fa-server" style={{ color: "#1677FF" }}></i>
                  <span>MINECRAFT SERVER GATEWAY</span>
                </div>
                <div className="gateway-live-badge">
                  <span className="gateway-live-dot"></span>
                  <span>ONLINE • {playerCount !== null && playerCount > 0 ? playerCount : "37"} TRAINERS</span>
                </div>
              </div>

              {/* Gateway Main Row: IP Address Subcard + Primary Action Button */}
              <div className="cinematic-gateway-main-row">
                <div className="gateway-ip-subcard">
                  <div className="gateway-ip-subcard-text">
                    <span className="gateway-ip-subcard-label">Server IP Address</span>
                    <span className="gateway-ip-subcard-ip">play.pokefun.in</span>
                  </div>
                  <button 
                    onClick={handleCopyIP} 
                    className="gateway-copy-icon-btn"
                    title="Copy Server IP Address"
                    aria-label="Copy Server IP Address"
                  >
                    <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                  </button>
                </div>

                <MagneticButton strength={0.22}>
                  <button
                    onClick={handleCopyIP}
                    className="cinematic-primary-cta"
                    title="Click to copy server IP and join"
                  >
                    <span>{copied ? 'IP COPIED! ⚡' : 'COPY IP & JOIN'}</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </MagneticButton>
              </div>

              {/* Gateway Footer Details */}
              <div className="cinematic-gateway-footer">
                <div className="gateway-footer-item">
                  <i className="fa-solid fa-bolt" style={{ color: "#F59E0B" }}></i>
                  <span>Java Edition 1.21.1 • Port: 25565</span>
                </div>
                <div className="gateway-footer-item">
                  <i className="fa-solid fa-mobile-screen-button" style={{ color: "#1677FF" }}></i>
                  <span>Mobile Supported with Java Launcher</span>
                </div>
              </div>
            </div>

            {/* =================================================================
                SECONDARY QUICK ACTION BUTTONS (DISCORD, STORE, WIKI)
                ================================================================= */}
            <div className="cinematic-secondary-row">
              {/* Discord */}
              <a 
                href="https://discord.gg/NtE8QBkmwR" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cinematic-secondary-btn btn-discord"
              >
                <div className="btn-icon-wrap">
                  <i className="fa-brands fa-discord"></i>
                </div>
                <div className="btn-text-wrap">
                  <span className="btn-main-title">Discord</span>
                  <span className="btn-sub-title">Join 10K+ Trainers ↗</span>
                </div>
              </a>

              {/* Store */}
              <a 
                href="https://store.pokefun.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cinematic-secondary-btn btn-store"
              >
                <div className="btn-icon-wrap">
                  <i className="fa-solid fa-cart-shopping"></i>
                </div>
                <div className="btn-text-wrap">
                  <span className="btn-main-title">Store</span>
                  <span className="btn-sub-title">Ranks, Kits &amp; More ↗</span>
                </div>
              </a>

              {/* Wiki */}
              <a 
                href="/wiki" 
                className="cinematic-secondary-btn btn-wiki"
              >
                <div className="btn-icon-wrap">
                  <i className="fa-solid fa-book-open"></i>
                </div>
                <div className="btn-text-wrap">
                  <span className="btn-main-title">Wiki</span>
                  <span className="btn-sub-title">Guides &amp; Info ↗</span>
                </div>
              </a>

              {/* Owner Profile */}
              <a 
                href="https://shifan.pokefun.in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cinematic-secondary-btn btn-owner"
                title="Server Founder & Developer: Shifan"
              >
                <div className="btn-icon-wrap">
                  <i className="fa-solid fa-crown"></i>
                </div>
                <div className="btn-text-wrap">
                  <span className="btn-main-title">Owner</span>
                  <span className="btn-sub-title">Profile ↗</span>
                </div>
              </a>
            </div>

          </div>

          {/* Right Column: Living Pokémon Showcase on Holographic Pedestal */}
          <div className="cinematic-hero-right">
            <DynamicHero3D />
          </div>

        </div>

        {/* Bottom Soft World Fade: completely dissolves the background into page surface */}
        <div className="cinematic-hero-bottom-fade"></div>

        {/* Organic White Cloud Wave Divider (Matches Reference B Exactly, seamless bottom) */}
        <div className="cinematic-wave-wrapper">
          <img src="/assets/pokefun/wave-divider-bottom.svg" alt="" className="cinematic-wave-svg" />
        </div>

      </section>

      {/* =================================================================
          5-ITEM FEATURE STRIP FLOATING OVER SEAMLESS TRANSITION
          ================================================================= */}
      <div className="cinematic-feature-strip">
        <div className="cinematic-feature-card">
          <div className="feature-icon-badge">
            <i className="fa-solid fa-cubes-stacked"></i>
          </div>
          <div className="feature-text-group">
            <span className="feature-main-text">Custom Pokémon &amp; DNA Fusions</span>
            <span className="feature-sub-text">Exclusive Cobblemon Genes</span>
          </div>
        </div>

        <div className="cinematic-feature-card">
          <div className="feature-icon-badge">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <div className="feature-text-group">
            <span className="feature-main-text">Epic Boss Raids &amp; Events</span>
            <span className="feature-sub-text">Server-Wide Boss Hunts</span>
          </div>
        </div>

        <div className="cinematic-feature-card">
          <div className="feature-icon-badge">
            <i className="fa-solid fa-circle-dot"></i>
          </div>
          <div className="feature-text-group">
            <span className="feature-main-text">Custom Gyms &amp; Regions</span>
            <span className="feature-sub-text">18 Competitive Gym Badges</span>
          </div>
        </div>

        <div className="cinematic-feature-card">
          <div className="feature-icon-badge">
            <i className="fa-solid fa-users"></i>
          </div>
          <div className="feature-text-group">
            <span className="feature-main-text">Active Community</span>
            <span className="feature-sub-text">10,000+ Active Trainers</span>
          </div>
        </div>

        <div className="cinematic-feature-card">
          <div className="feature-icon-badge">
            <i className="fa-solid fa-gem"></i>
          </div>
          <div className="feature-text-group">
            <span className="feature-main-text">Player Economy &amp; Trading</span>
            <span className="feature-sub-text">Player Markets &amp; Auctions</span>
          </div>
        </div>
      </div>

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
                  loading="eager" 
                  src={item.img} 
                  alt={item.title} 
                  className="feature-card-img"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    transition: "transform 0.35s ease"
                  }}
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.src.includes('image09_bosspokemons1.png')) {
                      img.src = '/images/features/image09_bosspokemons1.png';
                    }
                  }}
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
