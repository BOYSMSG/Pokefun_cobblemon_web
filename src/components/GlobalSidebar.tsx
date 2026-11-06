"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlobalSidebar() {
  const pathname = usePathname();

  const mainLinks = [
    { title: "Home", href: "/", icon: "fa-solid fa-house" },
    { title: "Staff Team", href: "/team", icon: "fa-solid fa-users" },
    { title: "Messages", href: "/messages", icon: "fa-solid fa-envelope" },
    { title: "Community", href: "/community", icon: "fa-solid fa-comments" },
    { title: "Reels", href: "/community/reels", icon: "fa-solid fa-film" },
    { title: "Modpacks", href: "/modpacks", icon: "fa-solid fa-box-archive" },
    { title: "Announcements", href: "/announcements", icon: "fa-solid fa-bullhorn" },
    { title: "Rewards", href: "/rewards", icon: "fa-solid fa-gift" },
    { title: "Store", href: "https://store.pokefun.in", icon: "fa-solid fa-cart-shopping", external: true },
  ];

  const otherLinks = [
    { title: "Gym Apply", href: "/gym_apply", icon: "fa-solid fa-shield-halved" },
    { title: "Gym Battle", href: "/gym_battle", icon: "fa-solid fa-trophy" },
    { title: "Polls", href: "/polls", icon: "fa-solid fa-square-poll-vertical" },
    { title: "Giveaways", href: "/giveaways", icon: "fa-solid fa-gem" },
    { title: "Tournaments", href: "/tournaments", icon: "fa-solid fa-award" },
    { title: "Events", href: "/events", icon: "fa-solid fa-calendar-days" },
  ];

  const guideLinks = [
    { title: "CobbleLeague & Phone", href: "/wiki/guides/cobbleleague-phone", icon: "fa-solid fa-mobile-screen" },
    { title: "Raids & Dungeons", href: "/wiki/guides/raid", icon: "fa-solid fa-dungeon" },
    { title: "Cobble Bosses", href: "/wiki/guides/cobblebosses", icon: "fa-solid fa-skull" },
    { title: "DNA Fusion System", href: "/wiki/guides/fusion", icon: "fa-solid fa-dna" },
    { title: "AlphaZone Guide", href: "/wiki/guides/alphazone", icon: "fa-solid fa-compass" },
    { title: "Gyms & Badges", href: "/wiki/guides/gyms", icon: "fa-solid fa-shield-halved" },
    { title: "Battle Tower", href: "/wiki/guides/battletower", icon: "fa-solid fa-tower-observation" },
    { title: "CobbleRanked Battles", href: "/wiki/guides/ranked", icon: "fa-solid fa-ranking-star" },
    { title: "Legendaries Guide", href: "/wiki/guides/legendaries", icon: "fa-solid fa-dragon" },
    { title: "Land Claims", href: "/wiki/guides/claims", icon: "fa-solid fa-map-location-dot" },
    { title: "All Wiki Guides →", href: "/wiki/guides", icon: "fa-solid fa-book-open" },
  ];

  const infoLinks = [
    { title: "Rules", href: "/rules", icon: "fa-solid fa-scale-balanced" },
    { title: "Staff Team", href: "/team", icon: "fa-solid fa-user-shield" },
    { title: "Changelogs", href: "/changelogs", icon: "fa-solid fa-clock-rotate-left" },
    { title: "Discord", href: "https://discord.gg/pokefun", icon: "fa-brands fa-discord", external: true },
  ];

  const renderLink = (link: any) => {
    const isActive = pathname === link.href;

    if (link.external) {
      return (
        <a
          key={link.title}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 12px",
            borderRadius: "10px",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#3D567A",
            textDecoration: "none",
            transition: "all 0.2s"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = "#1677FF";
            e.currentTarget.style.background = "rgba(22, 119, 255, 0.06)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = "#94a3b8";
            e.currentTarget.style.background = "transparent";
          }}
        >
          {link.icon && <i className={link.icon} style={{ width: "16px", textAlign: "center", opacity: 0.85 }}></i>}
          <span>{link.title}</span>
          <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "10px", marginLeft: "auto", opacity: 0.5 }}></i>
        </a>
      );
    }

    return (
      <Link
        key={link.title}
        href={link.href}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "8px 12px",
          borderRadius: "10px",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: isActive ? "#1677FF" : "#3D567A",
          background: isActive ? "linear-gradient(135deg, rgba(22, 119, 255, 0.1), rgba(0, 201, 216, 0.16))" : "transparent",
          border: isActive ? "1px solid rgba(0, 201, 216, 0.35)" : "1px solid transparent",
          textDecoration: "none",
          transition: "all 0.2s"
        }}
        onMouseOver={(e) => {
          if (!isActive) {
            e.currentTarget.style.color = "#1677FF";
            e.currentTarget.style.background = "rgba(22, 119, 255, 0.06)";
          }
        }}
        onMouseOut={(e) => {
          if (!isActive) {
            e.currentTarget.style.color = "#94a3b8";
            e.currentTarget.style.background = "transparent";
          }
        }}
      >
        {link.icon && <i className={link.icon} style={{ width: "16px", textAlign: "center", opacity: 0.85 }}></i>}
        <span>{link.title}</span>
      </Link>
    );
  };

  return (
    <aside style={{
      width: "100%",
      maxWidth: "270px",
      borderRadius: "18px",
      background: "rgba(255, 255, 255, 0.95)",
      border: "1.5px solid rgba(0, 201, 216, 0.25)",
      backdropFilter: "blur(16px)",
      padding: "20px 16px",
      boxShadow: "0 10px 30px rgba(0, 201, 216, 0.08)",
      color: "#0B1524"
    }}>
      
      {/* Brand header in sidebar */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingBottom: "14px", marginBottom: "16px", borderBottom: "1px solid rgba(0, 201, 216, 0.15)" }}>
        <img 
          src="/images/pokefun_logo_transparent.png" 
          alt="POKEFUN" 
          style={{ width: "32px", height: "32px", objectFit: "contain", flexShrink: 0 }}
        />
        <div>
          <span style={{ fontWeight: 800, fontSize: "0.95rem", letterSpacing: "1px", color: "#0B1524", display: "block" }}>POKEFUN</span>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#00C9D8", textTransform: "uppercase" }}>Java SMP Network</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div style={{ marginBottom: "18px" }}>
        <h4 style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#00C9D8", margin: "0 0 8px 8px" }}>Navigation</h4>
        {mainLinks.map(renderLink)}
      </div>

      {/* Server & Activities */}
      <div style={{ marginBottom: "18px" }}>
        <h4 style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#00C9D8", margin: "0 0 8px 8px" }}>Activities</h4>
        {otherLinks.map(renderLink)}
      </div>

      {/* Wiki Guides */}
      <div style={{ marginBottom: "18px" }}>
        <h4 style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#00C9D8", margin: "0 0 8px 8px" }}>Cobblemon Guides</h4>
        {guideLinks.map(renderLink)}
      </div>

      {/* Info & Legal */}
      <div>
        <h4 style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#00C9D8", margin: "0 0 8px 8px" }}>Information</h4>
        {infoLinks.map(renderLink)}
      </div>

    </aside>
  );
}