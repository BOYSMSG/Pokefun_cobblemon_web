"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlobalSidebar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Hide the global sidebar only on the store page (it has its own custom shop layout)
  if (pathname && (pathname.startsWith('/store') || pathname.startsWith('https://store.pokefun.in'))) {
    return null;
  }

  const mainLinks = [
    { title: "Home", path: "/" },
    { title: "Profile", path: "/profile" },
    { title: "Messages", path: "/messages" },
    { title: "Community", path: "/community" },
    { title: "Reels", path: "/community/reels" },
    { title: "Wiki", path: "/wiki" },
    { title: "Modpacks", path: "/modpacks" },
    { title: "Showcase", path: "/showcase" },
    { title: "Vote", path: "/vote" },
    { title: "Rewards", path: "/rewards" },
    { title: "Store", path: "https://store.pokefun.in" },
  ];

  const infoLinks = [
    { title: "Rules", path: "/rules" },
    { title: "Staff Team", path: "/team" },
    { title: "Changelogs", path: "/changelogs" },
    { title: "Discord", path: "https://discord.com/invite/NtE8QBkmwR", external: true },
  ];

  const otherLinks = [
    { title: "Gym Apply", path: "/gym_apply" },
    { title: "Gym Battle", path: "/gym_battle" },
    { title: "Polls", path: "/polls" },
    { title: "Giveaways", path: "/giveaways" },
    { title: "Tournaments", path: "/tournaments" },
    { title: "Events", path: "/events" },
  ];

  const guideLinks = [
    { title: "CobbleLeague Phone", path: "/wiki/guides/cobbleleague-phone" },
    { title: "NPCs & Gyms Guide", path: "/wiki/guides/npc" },
    { title: "Introduction", path: "/wiki/guides" },
    { title: "Server Features", path: "/wiki/guides/features" },
    { title: "AlphaZone Guide", path: "/wiki/guides/alphazone" },
    { title: "Battle Tower", path: "/wiki/guides/battletower" },
    { title: "Cobble Bosses", path: "/wiki/guides/cobblebosses" },
    { title: "Dungeon Guide", path: "/wiki/guides/dungeon" },
    { title: "Fusions Guide", path: "/wiki/guides/fusion" },
    { title: "Raid Guide", path: "/wiki/guides/raid" },
    { title: "Ranked Guide", path: "/wiki/guides/ranked" },
  ];

  const renderLink = (link: any) => {
    const isActive = pathname === link.path;
    const linkStyle = {
      display: "block",
      padding: "8px 14px",
      borderRadius: "10px",
      color: isActive ? "#0284c7" : "#334155",
      background: isActive ? "linear-gradient(135deg, rgba(22, 119, 255, 0.1), rgba(0, 201, 216, 0.16))" : "transparent",
      fontWeight: isActive ? 700 : 500,
      border: isActive ? "1px solid rgba(0, 201, 216, 0.35)" : "1px solid transparent",
      textDecoration: "none",
      fontSize: "0.92rem",
      transition: "all 0.2s ease",
      marginBottom: "3px"
    };

    if (link.external) {
      return (
        <a 
          key={link.title} 
          href={link.path} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={linkStyle}
          className="global-sidebar-navlink"
          onMouseEnter={(e) => {
            if (!isActive) {
              e.currentTarget.style.background = "rgba(0, 201, 216, 0.08)";
              e.currentTarget.style.color = "#0284c7";
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive) {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#334155";
            }
          }}
        >
          {link.title}
        </a>
      );
    }

    return (
      <Link 
        key={link.path} 
        href={link.path}
        onClick={() => setSidebarOpen(false)}
        style={linkStyle}
        className="global-sidebar-navlink"
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = "rgba(0, 201, 216, 0.08)";
            e.currentTarget.style.color = "#0284c7";
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#334155";
          }
        }}
      >
        {link.title}
      </Link>
    );
  };

  return (
    <>
      <div 
        className="global-sidebar-toggle"
        style={{ display: "none", padding: "10px", position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}
      >
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ background: "linear-gradient(135deg, #1677FF, #00C9D8)", color: "white", border: "none", width: "50px", height: "50px", borderRadius: "25px", cursor: "pointer", boxShadow: "0 4px 15px rgba(0, 201, 216, 0.35)" }}
        >
          <i className={`fa-solid ${sidebarOpen ? 'fa-xmark' : 'fa-bars'}`} style={{ fontSize: "1.5rem" }}></i>
        </button>
      </div>

      <aside 
        className={`global-sidebar ${sidebarOpen ? "open" : ""}`}
        style={{ 
          width: "270px", 
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(16px)",
          border: "1.5px solid rgba(0, 201, 216, 0.22)", 
          borderRadius: "20px",
          padding: "24px 16px",
          position: "sticky",
          top: "80px",
          height: "fit-content",
          maxHeight: "calc(100vh - 100px)",
          overflowY: "auto",
          flexShrink: 0,
          zIndex: 100,
          boxShadow: "0 8px 30px rgba(22, 119, 255, 0.06)",
          transition: "transform 0.3s ease"
        }}
      >
        <div style={{ marginBottom: "22px", padding: "0 8px" }}>
           <h2 style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0B1524", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
             Main Menu
           </h2>
           <nav>
             {mainLinks.map(renderLink)}
           </nav>
        </div>

        <div style={{ marginBottom: "22px", padding: "0 8px" }}>
           <h2 style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0B1524", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
             Community & Info
           </h2>
           <nav>
             {infoLinks.map(renderLink)}
           </nav>
        </div>

        <div style={{ marginBottom: "22px", padding: "0 8px" }}>
           <h2 style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0B1524", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
             Other Features
           </h2>
           <nav>
             {otherLinks.map(renderLink)}
           </nav>
        </div>

        <div style={{ marginBottom: "22px", padding: "0 8px" }}>
           <h2 style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0B1524", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
             FAQ & Guides
           </h2>
           <nav>
             {guideLinks.map(renderLink)}
           </nav>
        </div>
      </aside>

      <style jsx>{`
        /* Custom scrollbar for sidebar */
        .global-sidebar::-webkit-scrollbar {
          width: 8px;
        }
        .global-sidebar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .global-sidebar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .global-sidebar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }

        @media (max-width: 1000px) {
          .global-sidebar-toggle {
            display: block !important;
          }
          .global-sidebar {
            position: fixed !important;
            left: 20px;
            top: 80px;
            bottom: 80px;
            height: auto;
            transform: translateX(-150%);
          }
          .global-sidebar.open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
