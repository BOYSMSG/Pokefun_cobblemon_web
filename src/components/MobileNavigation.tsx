"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const pathname = usePathname();

  // Close drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Fetch online players count
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch("/api/player-count");
        const data = await res.json();
        if (data && data.online && data.players > 0) {
          setPlayerCount(data.players + 30);
          return;
        }
      } catch {}
      try {
        const res = await fetch("https://api.mcstatus.io/v2/status/java/play.pokefun.in");
        const data = await res.json();
        if (data && data.online) {
          setPlayerCount(data.players.online + 30);
        } else {
          setPlayerCount(null);
        }
      } catch {
        setPlayerCount(null);
      }
    };
    fetchPlayers();
  }, []);

  const navCategories = [
    {
      name: "Main Menu",
      links: [
        { title: "Home", path: "/", icon: "fa-solid fa-house", highlight: false },
        { title: "Store & Ranks", path: "https://store.pokefun.in", icon: "fa-solid fa-cart-shopping", highlight: true, external: true },
        { title: "Community Feed", path: "/community", icon: "fa-solid fa-users", highlight: false },
        { title: "Reels", path: "/community/reels", icon: "fa-solid fa-play", highlight: false },
        { title: "Leaderboards", path: "/leaderboard", icon: "fa-solid fa-trophy", highlight: true },
        { title: "Messages", path: "/messages", icon: "fa-solid fa-comment-dots", highlight: false },
        { title: "Wiki & Pokédex", path: "/wiki", icon: "fa-solid fa-book", highlight: false },
        { title: "Modpacks Download", path: "/modpacks", icon: "fa-solid fa-download", highlight: false },
        { title: "Vote for Rewards", path: "/vote", icon: "fa-solid fa-check-to-slot", highlight: false },
        { title: "Showcase", path: "/showcase", icon: "fa-solid fa-star", highlight: false },
      ],
    },
    {
      name: "Game Guides",
      links: [
        { title: "CobbleLeague Phone", path: "/wiki/guides/cobbleleague-phone", icon: "fa-solid fa-mobile-screen" },
        { title: "NPCs & Gyms", path: "/wiki/guides/npc", icon: "fa-solid fa-dumbbell" },
        { title: "AlphaZone Guide", path: "/wiki/guides/alphazone", icon: "fa-solid fa-radiation" },
        { title: "Battle Tower", path: "/wiki/guides/battletower", icon: "fa-solid fa-shield-halved" },
        { title: "Boss Pokémon", path: "/wiki/guides/cobblebosses", icon: "fa-solid fa-skull" },
        { title: "Dungeons Guide", path: "/wiki/guides/dungeon", icon: "fa-solid fa-dungeon" },
        { title: "Fusions Guide", path: "/wiki/guides/fusion", icon: "fa-solid fa-dna" },
        { title: "Custom Raids", path: "/wiki/guides/raid", icon: "fa-solid fa-fire" },
        { title: "Ranked Battles", path: "/wiki/guides/ranked", icon: "fa-solid fa-medal" },
      ],
    },
    {
      name: "Community & Events",
      links: [
        { title: "Server Rules", path: "/rules", icon: "fa-solid fa-scale-balanced" },
        { title: "Staff Team", path: "/team", icon: "fa-solid fa-user-shield" },
        { title: "Changelogs", path: "/changelogs", icon: "fa-solid fa-clock-rotate-left" },
        { title: "Gym Apply", path: "/gym_apply", icon: "fa-solid fa-file-signature" },
        { title: "Gym Battle", path: "/gym_battle", icon: "fa-solid fa-swords" },
        { title: "Polls", path: "/polls", icon: "fa-solid fa-square-poll-vertical" },
        { title: "Giveaways", path: "/giveaways", icon: "fa-solid fa-gift" },
        { title: "Tournaments", path: "/tournaments", icon: "fa-solid fa-award" },
        { title: "Events", path: "/events", icon: "fa-solid fa-calendar-days" },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Top Navigation Bar (Hidden on desktop screens >= 992px) */}
      <nav className="mobile-header-bar">
        <div className="mobile-header-inner">
          {/* Logo & Brand */}
          <Link href="/" className="mobile-brand">
            <img
              src="/images/logo.png"
              alt="Pokefun Logo"
              className="mobile-brand-logo"
              onError={(e) => {
                e.currentTarget.src = "/images/pokefun_logo_transparent.png";
              }}
            />
            <div className="mobile-brand-text">
              <span className="mobile-brand-title">POKEFUN</span>
              <span className="mobile-brand-subtitle">COBBLEMON SMP</span>
            </div>
          </Link>

          {/* Right Action Icons */}
          <div className="mobile-header-actions">
            <a
              href="https://store.pokefun.in"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-store-pill"
              title="Pokefun Store"
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span>STORE</span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-menu-toggle"
              aria-label="Toggle Navigation Menu"
              aria-expanded={isOpen}
            >
              <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
            </button>
          </div>
        </div>

        {/* Players online status banner for mobile */}
        <div className="mobile-status-strip">
          <div className="mobile-status-item">
            <span className="status-dot"></span>
            <span className="status-text">
              IP: <strong>play.pokefun.in</strong>
            </span>
          </div>
          <div className="mobile-status-item">
            <span className="status-players">
              <i className="fa-solid fa-users text-cyan-400"></i>{" "}
              {playerCount !== null ? `${playerCount} Online` : "Server Online"}
            </span>
          </div>
        </div>
      </nav>

      {/* Drawer Overlay Backdrop */}
      {isOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Mobile Navigation Drawer */}
      <aside className={`mobile-nav-drawer ${isOpen ? "drawer-open" : ""}`}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-header-left">
            <img
              src="/images/pokefun_logo_transparent.png"
              alt="Pokefun"
              className="drawer-logo"
            />
            <div>
              <h3 className="drawer-title">Pokefun SMP</h3>
              <p className="drawer-subtitle">Cobblemon Multiplayer</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="drawer-close-btn"
            aria-label="Close Menu"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Quick Social / Action Links Grid */}
        <div className="drawer-quick-actions">
          <a
            href="https://discord.gg/pokefun"
            target="_blank"
            rel="noopener noreferrer"
            className="drawer-quick-btn discord-btn"
          >
            <i className="fa-brands fa-discord"></i>
            <span>Discord</span>
          </a>
          <a
            href="https://store.pokefun.in"
            target="_blank"
            rel="noopener noreferrer"
            className="drawer-quick-btn store-btn"
          >
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Shop Ranks</span>
          </a>
        </div>

        {/* Categorized Navigation Links */}
        <div className="drawer-nav-content">
          {navCategories.map((cat, catIdx) => (
            <div key={cat.name} className="drawer-category">
              <div className="drawer-category-title">{cat.name}</div>
              <div className="drawer-links-list">
                {cat.links.map((link) => {
                  const isActive = pathname === link.path;
                  const itemClass = `drawer-link-item ${
                    isActive ? "active-link" : ""
                  } ${link.highlight ? "highlight-link" : ""}`;

                  if ((link as any).external) {
                    return (
                      <a
                        key={link.title}
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={itemClass}
                      >
                        <i className={`link-icon ${link.icon}`}></i>
                        <span className="link-title">{link.title}</span>
                        <i className="fa-solid fa-arrow-up-right-from-square link-arrow"></i>
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={itemClass}
                      onClick={() => setIsOpen(false)}
                    >
                      <i className={`link-icon ${link.icon}`}></i>
                      <span className="link-title">{link.title}</span>
                      <i className="fa-solid fa-chevron-right link-arrow"></i>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="drawer-footer">
          <div className="drawer-footer-text">
            <span>2026 © Pokefun Network</span>
            <span>Version 1.20.1+</span>
          </div>
        </div>
      </aside>

      <style jsx>{`
        /* Desktop: Hide all mobile navigation elements */
        .mobile-header-bar,
        .mobile-drawer-backdrop,
        .mobile-nav-drawer {
          display: none;
        }

        /* Mobile & Tablet Styles (Screens < 992px) */
        @media (max-width: 991px) {
          .mobile-header-bar {
            display: block;
            position: sticky;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            background: rgba(10, 14, 26, 0.96);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          }

          .mobile-header-inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 16px;
            height: 60px;
          }

          .mobile-brand {
            display: flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
          }

          .mobile-brand-logo {
            width: 38px;
            height: 38px;
            object-fit: contain;
            filter: drop-shadow(0 0 10px rgba(28, 198, 219, 0.6));
          }

          .mobile-brand-text {
            display: flex;
            flex-direction: column;
          }

          .mobile-brand-title {
            font-family: 'Righteous', cursive, sans-serif;
            font-size: 1.25rem;
            font-weight: 900;
            letter-spacing: 1.5px;
            background: linear-gradient(135deg, #fbbf24 0%, #38bdf8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1.1;
          }

          .mobile-brand-subtitle {
            font-size: 0.65rem;
            font-weight: 700;
            letter-spacing: 1px;
            color: #94a3b8;
            text-transform: uppercase;
          }

          .mobile-header-actions {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .mobile-store-pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            border-radius: 9999px;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: #ffffff !important;
            font-weight: 800;
            font-size: 0.75rem;
            letter-spacing: 0.5px;
            text-decoration: none;
            box-shadow: 0 2px 10px rgba(245, 158, 11, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: transform 0.15s ease;
          }

          .mobile-store-pill:active {
            transform: scale(0.96);
          }

          .mobile-menu-toggle {
            width: 42px;
            height: 42px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            background: rgba(255, 255, 255, 0.06);
            color: #ffffff;
            font-size: 1.25rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.2s, transform 0.15s;
          }

          .mobile-menu-toggle:active {
            background: rgba(28, 198, 219, 0.2);
            transform: scale(0.95);
          }

          /* Status Strip */
          .mobile-status-strip {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 6px 16px;
            background: rgba(15, 23, 42, 0.85);
            border-top: 1px solid rgba(255, 255, 255, 0.04);
            font-size: 0.72rem;
            color: #cbd5e1;
          }

          .mobile-status-item {
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .status-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #22c55e;
            box-shadow: 0 0 8px #22c55e;
            animation: pulse-dot 2s infinite;
          }

          @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.2); }
          }

          .status-players {
            font-weight: 700;
            color: #38bdf8;
          }

          /* Drawer Backdrop */
          .mobile-drawer-backdrop {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            z-index: 1998;
            animation: fadeIn 0.2s ease-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          /* Drawer Aside */
          .mobile-nav-drawer {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 86vw;
            max-width: 360px;
            background: #0f172a;
            border-left: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: -10px 0 40px rgba(0, 0, 0, 0.8);
            z-index: 1999;
            transform: translateX(100%);
            transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
            overflow: hidden;
          }

          .mobile-nav-drawer.drawer-open {
            transform: translateX(0);
          }

          /* Drawer Header */
          .drawer-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            background: rgba(15, 23, 42, 0.95);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }

          .drawer-header-left {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .drawer-logo {
            width: 40px;
            height: 40px;
            object-fit: contain;
          }

          .drawer-title {
            font-family: 'Righteous', cursive, sans-serif;
            font-size: 1.15rem;
            color: #ffffff;
            margin: 0;
            line-height: 1.2;
          }

          .drawer-subtitle {
            font-size: 0.7rem;
            color: #94a3b8;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .drawer-close-btn {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #ffffff;
            font-size: 1.1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* Quick Actions */
          .drawer-quick-actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            padding: 14px 16px;
            background: rgba(30, 41, 59, 0.5);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }

          .drawer-quick-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 10px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.85rem;
            text-decoration: none;
            color: #ffffff !important;
            transition: transform 0.15s;
          }

          .drawer-quick-btn:active {
            transform: scale(0.97);
          }

          .discord-btn {
            background: #5865f2;
            box-shadow: 0 4px 12px rgba(88, 101, 242, 0.35);
          }

          .store-btn {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.35);
          }

          /* Nav Content Scrollable Area */
          .drawer-nav-content {
            flex: 1;
            overflow-y: auto;
            padding: 14px 16px;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .drawer-category-title {
            font-size: 0.72rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            color: #64748b;
            margin-bottom: 8px;
            padding-left: 6px;
          }

          .drawer-links-list {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .drawer-link-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 11px 14px;
            border-radius: 12px;
            color: #cbd5e1 !important;
            text-decoration: none !important;
            font-size: 0.92rem;
            font-weight: 600;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid transparent;
            transition: all 0.15s ease;
          }

          .drawer-link-item:hover,
          .drawer-link-item:active {
            background: rgba(255, 255, 255, 0.07);
            color: #ffffff !important;
          }

          .drawer-link-item.active-link {
            background: rgba(28, 198, 219, 0.15);
            border-color: rgba(28, 198, 219, 0.4);
            color: #38bdf8 !important;
            font-weight: 700;
          }

          .drawer-link-item.highlight-link {
            color: #fbbf24 !important;
          }

          .link-icon {
            font-size: 1rem;
            width: 20px;
            text-align: center;
            color: #38bdf8;
          }

          .drawer-link-item.highlight-link .link-icon {
            color: #fbbf24;
          }

          .link-title {
            flex: 1;
          }

          .link-arrow {
            font-size: 0.75rem;
            color: #64748b;
          }

          /* Drawer Footer */
          .drawer-footer {
            padding: 14px 16px;
            background: rgba(15, 23, 42, 0.98);
            border-top: 1px solid rgba(255, 255, 255, 0.06);
          }

          .drawer-footer-text {
            display: flex;
            justify-content: space-between;
            font-size: 0.7rem;
            color: #64748b;
          }
        }
      `}</style>
    </>
  );
}
