"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('menu') === 'open';
    }
    return false;
  });
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const { data: session } = useSession();
  const pathname = usePathname();

  // Close drawer on route change (or open if query param ?menu=open)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('menu') === 'open') {
        setIsOpen(true);
        return;
      }
    }
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
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

  // Live online player count
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
        }
      } catch {}
    };
    fetchPlayers();
  }, []);

  const navCategories = [
    {
      name: "Main Menu",
      links: [
        { title: "Home", path: "/", icon: "fa-solid fa-house" },
        { title: "Store & Ranks", path: "https://store.pokefun.in", icon: "fa-solid fa-cart-shopping", highlight: true, external: true },
        { title: "Community Feed", path: "/community", icon: "fa-solid fa-users" },
        { title: "Reels", path: "/community/reels", icon: "fa-solid fa-play" },
        { title: "Showcase", path: "/showcase", icon: "fa-solid fa-star", highlight: true },
        { title: "Wiki & Pokédex", path: "/wiki", icon: "fa-solid fa-book" },
        { title: "Vote for Rewards", path: "/vote", icon: "fa-solid fa-check-to-slot" },
        { title: "Leaderboards", path: "/leaderboard", icon: "fa-solid fa-trophy" },
        { title: "Messages", path: "/messages", icon: "fa-solid fa-comment-dots" },
        { title: "Modpacks", path: "/modpacks", icon: "fa-solid fa-download" },
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
      {/* ==============================================================
          WHITE & ELECTRIC AQUA MOBILE TOP BAR
          ============================================================== */}
      <nav className="mobile-aqua-header">
        <div className="mobile-aqua-inner">
          {/* Brand */}
          <Link href="/" className="mobile-aqua-brand">
            <img
              src="/images/logo.png"
              alt="Pokefun Logo"
              className="mobile-aqua-logo"
              onError={(e) => {
                e.currentTarget.src = "/images/pokefun_logo_transparent.png";
              }}
            />
            <div className="mobile-aqua-brand-text">
              <span className="mobile-aqua-title">POKEFUN</span>
              <span className="mobile-aqua-subtitle">COBBLEMON SMP</span>
            </div>
          </Link>

          {/* Right Header Actions */}
          <div className="mobile-aqua-actions">
            <a
              href="https://store.pokefun.in"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-aqua-store-btn"
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span>STORE</span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-aqua-toggle"
              aria-label="Open Navigation Menu"
            >
              <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
            </button>
          </div>
        </div>

        {/* Status Strip: White / Ice background with Emerald Dot */}
        <div className="mobile-aqua-status">
          <div className="status-badge">
            <span className="status-live-dot"></span>
            <span className="status-server-ip">play.pokefun.in</span>
          </div>
          <div className="status-players-count">
            <i className="fa-solid fa-users" style={{ color: "#0284c7" }}></i>{" "}
            <strong>{playerCount !== null ? `${playerCount} Online` : "Online"}</strong>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="mobile-aqua-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ==============================================================
          WHITE & ELECTRIC AQUA SLIDE-OUT DRAWER
          ============================================================== */}
      <aside className={`mobile-aqua-drawer ${isOpen ? "drawer-visible" : ""}`}>
        {/* Drawer Header */}
        <div className="drawer-aqua-header">
          <div className="drawer-aqua-brand">
            <img
              src="/images/pokefun_logo_transparent.png"
              alt="Pokefun"
              className="drawer-aqua-logo"
            />
            <div>
              <h3 className="drawer-aqua-title">Pokefun SMP</h3>
              <span className="drawer-aqua-badge">Electric Aqua Edition</span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="drawer-aqua-close"
            aria-label="Close Navigation Menu"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* User Account / Login Section Inside Drawer (Clean White Card) */}
        <div className="drawer-auth-card">
          {session ? (
            <div className="drawer-user-info">
              <img
                src={session.user?.image || "/images/default-avatar.png"}
                alt="Avatar"
                className="drawer-user-avatar"
              />
              <div className="drawer-user-meta">
                <span className="drawer-user-name">{session.user?.name || "Trainer"}</span>
                <span className="drawer-user-email">{session.user?.email || "Connected"}</span>
              </div>
              <div className="drawer-user-buttons">
                <Link
                  href="/profile"
                  className="drawer-auth-action-btn profile-btn"
                  onClick={() => setIsOpen(false)}
                >
                  <i className="fa-solid fa-user"></i> Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="drawer-auth-action-btn logout-btn"
                >
                  <i className="fa-solid fa-sign-out"></i>
                </button>
              </div>
            </div>
          ) : (
            <div className="drawer-guest-box">
              <div className="drawer-guest-text">
                <span className="guest-title">Trainer Account</span>
                <span className="guest-subtitle">Sign in to save progress &amp; vote</span>
              </div>
              <div className="drawer-guest-buttons">
                <button
                  onClick={() => signIn("discord")}
                  className="guest-login-btn discord"
                >
                  <i className="fa-brands fa-discord"></i> Discord
                </button>
                <button
                  onClick={() => signIn("google")}
                  className="guest-login-btn google"
                >
                  <i className="fa-brands fa-google"></i> Google
                </button>
              </div>
              <div style={{ textAlign: "center", marginTop: "8px" }}>
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  style={{
                    fontSize: "0.72rem",
                    color: "#0284c7",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  <i className="fa-solid fa-lock" style={{ marginRight: "4px" }}></i>
                  Admin Login
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Quick Hub Links (Discord & Store) */}
        <div className="drawer-hub-actions">
          <a
            href="https://discord.gg/pokefun"
            target="_blank"
            rel="noopener noreferrer"
            className="hub-btn discord-hub"
          >
            <i className="fa-brands fa-discord"></i>
            <span>Join Discord</span>
          </a>
          <a
            href="https://store.pokefun.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hub-btn store-hub"
          >
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Store Ranks</span>
          </a>
        </div>

        {/* Scrollable Navigation Categories */}
        <div className="drawer-scroll-body">
          {navCategories.map((category) => (
            <div key={category.name} className="nav-cat-group">
              <div className="nav-cat-heading">
                <span className="nav-cat-dot"></span>
                <span>{category.name}</span>
              </div>

              <div className="nav-links-stack">
                {category.links.map((link) => {
                  const isActive = pathname === link.path;
                  const itemClass = `aqua-nav-item ${isActive ? "item-active" : ""} ${
                    link.highlight ? "item-highlight" : ""
                  }`;

                  if ((link as any).external) {
                    return (
                      <a
                        key={link.title}
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={itemClass}
                      >
                        <i className={`item-icon ${link.icon}`}></i>
                        <span className="item-text">{link.title}</span>
                        <i className="fa-solid fa-arrow-up-right-from-square item-ext"></i>
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
                      <i className={`item-icon ${link.icon}`}></i>
                      <span className="item-text">{link.title}</span>
                      <i className="fa-solid fa-chevron-right item-arrow"></i>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="drawer-aqua-footer">
          <span>2026 © Pokefun Network</span>
          <span className="footer-cyan">Cobblemon 1.21.1 • Java Edition</span>
        </div>
      </aside>

      {/* ==============================================================
          CSS STYLING (PURE WHITE & ELECTRIC AQUA THEME)
          ============================================================== */}
      <style jsx>{`
        /* Hide on desktop (>= 992px) */
        .mobile-aqua-header,
        .mobile-aqua-backdrop,
        .mobile-aqua-drawer {
          display: none;
        }

        /* Mobile Screens (< 992px) */
        @media (max-width: 991px) {
          /* Top Navigation Bar: Frosted White & Aqua */
          .mobile-aqua-header {
            display: block;
            position: sticky;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            background: rgba(255, 255, 255, 0.98) !important;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1.5px solid rgba(28, 198, 219, 0.35);
            box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
          }

          .mobile-aqua-inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 16px;
            height: 62px;
          }

          .mobile-aqua-brand {
            display: flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
          }

          .mobile-aqua-logo {
            width: 40px;
            height: 40px;
            object-fit: contain;
            filter: drop-shadow(0 2px 8px rgba(6, 182, 212, 0.4));
          }

          .mobile-aqua-brand-text {
            display: flex;
            flex-direction: column;
          }

          .mobile-aqua-title {
            font-family: 'Righteous', cursive, sans-serif;
            font-size: 1.3rem;
            font-weight: 900;
            letter-spacing: 1.5px;
            background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1.1;
          }

          .mobile-aqua-subtitle {
            font-size: 0.65rem;
            font-weight: 800;
            letter-spacing: 1px;
            color: #64748b;
            text-transform: uppercase;
          }

          .mobile-aqua-actions {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .mobile-aqua-store-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 7px 14px;
            border-radius: 9999px;
            background: linear-gradient(135deg, #06b6d4, #0284c7);
            color: #ffffff !important;
            font-weight: 800;
            font-size: 0.75rem;
            letter-spacing: 0.5px;
            text-decoration: none !important;
            box-shadow: 0 3px 12px rgba(6, 182, 212, 0.35);
            border: 1px solid rgba(255, 255, 255, 0.5);
            transition: transform 0.15s;
          }

          .mobile-aqua-store-btn:active {
            transform: scale(0.96);
          }

          .mobile-aqua-toggle {
            width: 42px;
            height: 42px;
            border-radius: 12px;
            border: 1.5px solid #ccfbf1;
            background: #f0fdfa;
            color: #0f766e;
            font-size: 1.25rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(15, 118, 110, 0.08);
            transition: all 0.15s ease;
          }

          .mobile-aqua-toggle:active {
            background: #ccfbf1;
            transform: scale(0.95);
          }

          /* Sub-bar: Status strip */
          .mobile-aqua-status {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 6px 16px;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            font-size: 0.75rem;
            color: #475569;
          }

          .status-badge {
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .status-live-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #10b981;
            box-shadow: 0 0 10px #10b981;
            animation: pulse-live 2s infinite;
          }

          @keyframes pulse-live {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.2); }
          }

          .status-server-ip {
            font-weight: 700;
            color: #0f172a;
          }

          .status-players-count {
            font-size: 0.75rem;
            color: #0284c7;
          }

          /* Backdrop */
          .mobile-aqua-backdrop {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            z-index: 1998;
            animation: fadeIn 0.2s ease-out;
          }

          /* White & Electric Aqua Drawer */
          .mobile-aqua-drawer {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 86vw;
            max-width: 360px;
            background: #ffffff !important;
            border-left: 1.5px solid #e2e8f0;
            box-shadow: -10px 0 40px rgba(15, 23, 42, 0.15);
            z-index: 1999;
            transform: translateX(100%);
            transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.28s ease;
            overflow: hidden;
            visibility: hidden;
            pointer-events: none;
          }

          .mobile-aqua-drawer.drawer-visible {
            transform: translateX(0);
            visibility: visible;
            pointer-events: auto;
          }

          /* Drawer Header */
          .drawer-aqua-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
          }

          .drawer-aqua-brand {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .drawer-aqua-logo {
            width: 40px;
            height: 40px;
            object-fit: contain;
          }

          .drawer-aqua-title {
            font-family: 'Righteous', cursive, sans-serif;
            font-size: 1.15rem;
            color: #0f172a !important;
            margin: 0;
            line-height: 1.2;
          }

          .drawer-aqua-badge {
            font-size: 0.65rem;
            font-weight: 800;
            color: #0284c7;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .drawer-aqua-close {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: #ffffff;
            border: 1px solid #cbd5e1;
            color: #64748b;
            font-size: 1.1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* User / Auth Section */
          .drawer-auth-card {
            padding: 12px 16px;
            background: #f0fdfa;
            border-bottom: 1px solid #ccfbf1;
          }

          .drawer-user-info {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .drawer-user-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #06b6d4;
          }

          .drawer-user-meta {
            flex: 1;
            min-width: 0;
          }

          .drawer-user-name {
            display: block;
            font-size: 0.85rem;
            font-weight: 700;
            color: #0f172a !important;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .drawer-user-email {
            display: block;
            font-size: 0.7rem;
            color: #0284c7 !important;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .drawer-user-buttons {
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .drawer-auth-action-btn {
            padding: 6px 10px;
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: 700;
            text-decoration: none;
            border: none;
            cursor: pointer;
          }

          .profile-btn {
            background: #0284c7;
            color: #ffffff !important;
          }

          .logout-btn {
            background: #e2e8f0;
            color: #475569;
          }

          .drawer-guest-box {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .drawer-guest-text {
            display: flex;
            flex-direction: column;
          }

          .guest-title {
            font-size: 0.82rem;
            font-weight: 800;
            color: #0f172a !important;
          }

          .guest-subtitle {
            font-size: 0.7rem;
            color: #64748b !important;
          }

          .drawer-guest-buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          .guest-login-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            padding: 8px;
            border-radius: 10px;
            font-size: 0.78rem;
            font-weight: 700;
            border: none;
            cursor: pointer;
            color: #ffffff !important;
          }

          .guest-login-btn.discord {
            background: #5865f2;
          }

          .guest-login-btn.google {
            background: #ea4335;
          }

          /* Hub actions (Discord & Store) */
          .drawer-hub-actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            padding: 12px 16px;
            background: #ffffff;
            border-bottom: 1px solid #f1f5f9;
          }

          .hub-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 10px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.82rem;
            text-decoration: none !important;
            color: #ffffff !important;
          }

          .discord-hub {
            background: #5865f2;
            box-shadow: 0 2px 8px rgba(88, 101, 242, 0.25);
          }

          .store-hub {
            background: linear-gradient(135deg, #06b6d4, #0284c7);
            box-shadow: 0 2px 8px rgba(6, 182, 212, 0.25);
          }

          /* Scrollable links */
          .drawer-scroll-body {
            flex: 1;
            overflow-y: auto;
            padding: 14px 16px;
            display: flex;
            flex-direction: column;
            gap: 18px;
            background: #ffffff !important;
          }

          .nav-cat-group {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .nav-cat-heading {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.72rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            color: #0284c7;
            margin-bottom: 6px;
            padding-left: 4px;
          }

          .nav-cat-dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #06b6d4;
          }

          .nav-links-stack {
            display: flex;
            flex-direction: column;
            gap: 3px;
          }

          /* 100% Guaranteed High-Contrast Links on White */
          .aqua-nav-item {
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
            padding: 10px 14px !important;
            border-radius: 12px !important;
            color: #0f172a !important; /* Pure high-contrast dark slate text */
            text-decoration: none !important;
            font-size: 0.9rem !important;
            font-weight: 600 !important;
            background: #ffffff !important;
            border: 1px solid transparent !important;
            transition: all 0.15s ease !important;
          }

          .aqua-nav-item:hover,
          .aqua-nav-item:active {
            background: #f0fdfa !important;
            color: #0369a1 !important;
            border-color: #ccfbf1 !important;
          }

          .aqua-nav-item.item-active {
            background: rgba(28, 198, 219, 0.12) !important;
            border-color: rgba(28, 198, 219, 0.4) !important;
            color: #0284c7 !important;
            font-weight: 700 !important;
          }

          .aqua-nav-item.item-highlight {
            color: #d97706 !important;
            font-weight: 700 !important;
          }

          .item-icon {
            font-size: 1rem;
            width: 20px;
            text-align: center;
            color: #0284c7 !important;
          }

          .aqua-nav-item.item-highlight .item-icon {
            color: #f59e0b !important;
          }

          .item-text {
            flex: 1;
            color: inherit !important;
          }

          .item-arrow,
          .item-ext {
            font-size: 0.75rem;
            color: #94a3b8;
          }

          /* Drawer Footer */
          .drawer-aqua-footer {
            padding: 12px 16px;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            font-size: 0.7rem;
            font-weight: 700;
            color: #64748b;
          }

          .footer-cyan {
            color: #0284c7;
          }
        }
      `}</style>
    </>
  );
}
