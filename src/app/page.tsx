"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import GlobalSaleBanner from "@/components/GlobalSaleBanner";

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

  return (
    <>
      {/* =================================================================
          HERO SECTION (CLEAN, MODERN & RESPONSIVE)
          ================================================================= */}
      <div className="hero-main-container">
          {/* Desktop-Only Left Widgets (Store & Player Count) */}
          <div className="hero-left-widgets desktop-only-widget">
              <GlobalSaleBanner />
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <Link id="store" href="https://store.pokefun.in" className="info-card" style={{ display: "flex", alignItems: "center", gap: "15px", textDecoration: "none", color: "white", fontWeight: 900 }}>
                      <i className="fa-solid fa-cart-shopping"></i>
                      <div className="info-text">
                          <div className="if-large">STORE <span className="count" style={{ background: '#f59e0b', color: 'white' }}>SHOP</span></div>
                          <div className="if-small">Browse Ranks & Items</div>
                      </div>
                  </Link>
                  <div id="players" className="info-card" style={{ display: "flex", alignItems: "center", gap: "15px", color: "white", fontWeight: 900 }}>
                      <div className="info-text" style={{ textAlign: "right" }}>
                          {playerCount === -1 ? (
                              <div className="if-large" style={{ color: '#ef4444' }}>MAINTENANCE</div>
                          ) : (
                              <div className="if-large"><span className="count">{playerCount !== null ? playerCount : "..."}</span> PLAYERS</div>
                          )}
                          <div className="if-small">play.pokefun.in</div>
                      </div>
                      <i className="fa-regular fa-circle-play"></i>
                  </div>
              </div>
          </div>

          {/* Central Hero: Clean Logo + Portfolio-Style Identity & CTAs */}
          <div className="hero-center-brand">
              <div id="logo">
                  <a href="/">
                      <img 
                        className="animate__infinite animate__slower animate__animated animate__pulse main-logo-img" 
                        src="/images/pokefun_logo_transparent.png" 
                        alt="Pokefun Cobblemon SMP" 
                      />
                  </a>
              </div>

              {/* High-Impact Hero Typography & Badges (Cleaned like Portfolio) */}
              <div className="hero-portfolio-box">
                  <div className="hero-status-pill">
                      <span className="live-status-dot"></span>
                      <span className="pill-badge-label">COBBLEMON SMP 1.21.1</span>
                      <span className="pill-sep">•</span>
                      <span className="pill-badge-sub">JAVA &amp; BEDROCK</span>
                  </div>

                  <h1 className="hero-main-title">
                      The Ultimate Cobblemon <br className="break-mobile" />
                      <span className="hero-gradient-text">Server &amp; Community</span>
                  </h1>

                  <p className="hero-main-subtext">
                      Custom Bosses, Mega Evolution, Raids, Pokémon Fusions, and an active player-driven economy.
                  </p>

                  <div className="hero-cta-button-group">
                      <button onClick={handleCopyIP} className="hero-cta-btn ip-btn" title="Click to copy server IP">
                          <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                          <span>{copied ? 'IP Copied to Clipboard!' : 'play.pokefun.in'}</span>
                      </button>
                      <a href="https://discord.gg/NtE8QBkmwR" target="_blank" rel="noopener noreferrer" className="hero-cta-btn discord-btn">
                          <i className="fa-brands fa-discord"></i>
                          <span>Join Discord</span>
                      </a>
                      <a href="https://store.pokefun.in" target="_blank" rel="noopener noreferrer" className="hero-cta-btn store-btn">
                          <i className="fa-solid fa-cart-shopping"></i>
                          <span>Store</span>
                      </a>
                  </div>
              </div>
          </div>

          {/* Desktop-Only Right Widget (Discord) */}
          <div className="hero-right-widget desktop-only-widget">
              <a id="discord" target="_blank" href="https://discord.gg/NtE8QBkmwR" className="info-card" style={{ display: "flex", alignItems: "center", gap: "20px", textDecoration: "none", color: "white", fontWeight: 900 }}>
                  <i className="fa-brands fa-discord"></i>
                  <div className="info-text">
                      <div className="if-large">DISCORD <span className="count">JOIN</span></div>
                      <div className="if-small">Join the Community</div>
                  </div>
              </a>
          </div>
      </div>

      <div id="tsparticles" style={{ zIndex: 1 }}></div>

      {/* =================================================================
          MAIN CONTENT AREA
          ================================================================= */}
      <main id="site-main" className="site-main outer" style={{ position: "relative", zIndex: 10 }}>
          <div className="inner posts">

              {/* COMMUNITY HUB PROMO CARD */}
              <div className="community-promo-card">
                  <h3 className="community-promo-title">Join the Pokefun Community Hub!</h3>
                  <p className="community-promo-desc">
                      Share your best moments, watch 60-second Reels, post your insane builds, and connect with other trainers! Get rewards for top posts!
                  </p>
                  <div className="community-promo-btns">
                      <Link href="/community" className="promo-btn feed-btn">
                          <i className="fa-solid fa-users"></i> Explore Feed
                      </Link>
                      <Link href="/community/reels" className="promo-btn reels-btn">
                          <i className="fa-solid fa-play"></i> Watch Reels
                      </Link>
                  </div>
              </div>

              {/* ALL EPIC FEATURES */}
              <div className="inner" style={{ marginTop: "30px", marginBottom: "50px" }}>
                  <div className="section-title" style={{ textAlign: "center", marginBottom: "35px", fontSize: "2rem", fontWeight: 800 }}>EPIC SERVER FEATURES</div>
                  <div className="fakemons-grid">
                      
                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/image09_bosspokemons1.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Natural Bosses" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Natural Bosses</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Powerful bosses spawn naturally in the world! Defeat them for epic loot.</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/image27_Team_Raids_Battle.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Custom Raids" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Custom Raids</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Team up with friends in the new Raid System to battle legendary foes.</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/image29_Z_Mega1s.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Battle Gimmicks" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Battle Gimmicks</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Mega Evolution, Dynamax, Gigantamax, and Z-Moves are all fully active!</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/fusion pokemons1.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Pokémon Fusion" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Pokémon Fusion</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Create unique and powerful Pokémon through our advanced fusion system.</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/battletower.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Gym System" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Gym System</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Challenge our custom gyms and prove you are the best trainer.</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/cosmetic skins1.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Cosmetic Skins" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Cosmetic Skins</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Unlock hundreds of unique skins and cosmetics for your favorite Pokémon.</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/hugecity2.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Player Economy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Player Economy</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Trade with players, set up shops, and participate in a living GTS economy.</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/cool spawn-2.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Legendary Monuments" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Legendary Monuments</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Explore hidden structures containing rare treasures and secrets.</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/DISTORTION WORLD1.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Distortion World" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Distortion World</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Explore the twisted and inverted Distortion World!</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/Flying Taxi-Photoroom.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Flying Taxi" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Flying Taxi</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Travel quickly across the region using the Flying Taxi service.</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/Gmax forms-1.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Gigantamax Forms" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Gigantamax Forms</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Discover and battle incredible Gigantamax Pokemon.</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/battleroyalsalphzone.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Battle Royals & Alpha Zone" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Battle Royals & Alpha Zone</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Compete in chaotic Battle Royals in the dangerous Alpha Zone.</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/battletower.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Battle Tower" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Battle Tower</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Test your skills in the Battle Tower and earn rare rewards.</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/coolfakemons.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Cool Fakemons" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Cool Fakemons</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Hundreds of unique Fakemons to catch and train.</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/customeforms.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Custom Forms" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Custom Forms</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Discover unique regional forms of your favorite Pokemon.</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/dungeon.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Dungeons" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Dungeons</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Explore challenging dungeons for legendary loot.</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/hugecity.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Huge Cities" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Huge Cities</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Explore massive cities full of NPCs and quests.</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/image15_epicarmours.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Epic Armours" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Epic Armours</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Equip your character with epic custom armor sets.</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/image22_pokecostume.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Poke Costumes" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Poke Costumes</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Dress up your Pokemon with special costumes.</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/image26_primal_forms.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Primal Forms" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Primal Forms</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Unleash the ancient power of Primal Reversion.</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/minigamstasks-.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Minigames & Tasks" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Minigames & Tasks</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Complete daily tasks and play fun minigames.</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/rankedmacthcs.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Ranked Matches" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Ranked Matches</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Climb the ladder in competitive Ranked Matches.</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/safarizone.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Safari Zone" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Safari Zone</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Catch rare Pokemon in the Safari Zone.</p>
                      </div>

                      <div className="fakemon-card">
                          <img loading="lazy" decoding="async" src="/images/features/teambattles.png" style={{ width: "180px", height: "180px", objectFit: "contain", margin: "0 auto 15px", display: "block" }} alt="Team Battles" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Team Battles</h3>
                          <p style={{ color: "gray", marginTop: "10px" }}>Form a team and battle other players.</p>
                      </div>

                  </div>
              </div>

              {/* LEADERBOARD CALL TO ACTION CARD */}
              <div className="leaderboard-promo-card">
                <i className="fa-solid fa-crown promo-crown-icon"></i>
                <h2 className="leaderboard-promo-title">Global Leaderboards</h2>
                <p className="leaderboard-promo-desc">
                  Check out the top players across Ranked PvP, AlphaZone, and Dungeons. Do you have what it takes to be #1?
                </p>
                <Link href="/leaderboard" className="leaderboard-cta-btn">
                  <i className="fa-solid fa-trophy" style={{ marginRight: '8px' }}></i> View Leaderboards
                </Link>
              </div>

              <div className="post-continue">
                  <a href="/modpacks">Join Now</a>
              </div>
          </div>
      </main>
    </>
  );
}
