"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function VotePage() {
  const [copiedKey, setCopiedKey] = useState(false);

  const voteLinks = [
    { name: "Minecraft Best Servers", url: "https://minecraftbestservers.com/server-pokefun.4851/vote", icon: "fa-solid fa-check-to-slot", voters: "Daily +1 Vote" },
    { name: "Minecraft Servers Org", url: "https://minecraftservers.org/server/681278", icon: "fa-solid fa-star", voters: "Top Ranked" },
    { name: "Minecraft Server List", url: "https://minecraft-serverlist.com/server/3783", icon: "fa-solid fa-list", voters: "Verified" },
    { name: "Minecraft Buzz", url: "https://minecraft.buzz/server/18041", icon: "fa-solid fa-bolt", voters: "Instant Rewards" },
    { name: "Minecraft MP", url: "https://minecraft-mp.com/server/351806/vote", icon: "fa-solid fa-trophy", voters: "Streak Multiplier" },
  ];

  const inGameRewards = [
    {
      icon: "fa-solid fa-key",
      color: "#06b6d4",
      title: "Cobblemon Vote Key",
      desc: "Redeem at the /spawn Poké Crate for Rare Candies, Poké Balls, or shiny encounters."
    },
    {
      icon: "fa-solid fa-coins",
      color: "#f59e0b",
      title: "500 PokéCoins",
      desc: "Direct currency deposited into your in-game balance for GTS and NPC shop trading."
    },
    {
      icon: "fa-solid fa-bolt",
      color: "#10b981",
      title: "Trainer EXP Booster",
      desc: "Accelerate your Cobblemon team's growth with instant party battle EXP."
    },
    {
      icon: "fa-solid fa-crown",
      color: "#8b5cf6",
      title: "Monthly Top Voter Crate",
      desc: "The top 3 monthly voters earn custom Master Ranks, exclusive cosmetics, and store giftcards!"
    }
  ];

  return (
    <div style={{ background: '#F8FBFF', minHeight: '100vh', color: '#0B1524', paddingBottom: '90px' }}>
      <div className="inner" style={{ paddingTop: '110px', maxWidth: '1100px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "45px" }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(6, 182, 212, 0.12)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            padding: '6px 16px',
            borderRadius: '20px',
            color: '#38bdf8',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '16px'
          }}>
            <i className="fa-solid fa-award"></i> Server Support & Daily Rewards
          </div>
          <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "12px", color: "#0B1524", letterSpacing: '-0.5px' }}>
            Vote for Pokéfun
          </h1>
          <p style={{ color: "#3D567A", fontSize: "1.15rem", maxWidth: '650px', margin: '0 auto' }}>
            Support our community rankings across Minecraft lists every 24 hours to receive automatic keys and rewards while in-game!
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "30px", alignItems: "start" }}>
          
          {/* Left Column: Vote Links */}
          <div style={{
            background: "#FFFFFF", border: "1.5px solid rgba(0, 201, 216, 0.22)", boxShadow: "0 8px 25px rgba(0, 201, 216, 0.08)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(6, 182, 212, 0.2)",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
          }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "8px", display: "flex", alignItems: "center", gap: "10px", color: "#0B1524" }}>
              <i className="fa-solid fa-arrow-up-right-from-square" style={{ color: "#06b6d4" }}></i> 
              Available Voting Sites
            </h2>
            <p style={{ color: "#3D567A", fontSize: "0.9rem", marginBottom: "24px" }}>
              Click each link, enter your exact Minecraft username, and claim rewards instantly!
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {voteLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "16px", 
                    padding: "16px 20px", 
                    background: "rgba(255, 255, 255, 0.03)", 
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                    borderRadius: "14px", 
                    textDecoration: "none", 
                    color: "inherit",
                    fontWeight: 600,
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateX(6px)";
                    e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.5)";
                    e.currentTarget.style.background = "rgba(6, 182, 212, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.07)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                  }}
                >
                  <div style={{ 
                    width: "42px", 
                    height: "42px", 
                    background: "linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)", 
                    border: "1px solid rgba(6, 182, 212, 0.3)",
                    color: "#38bdf8", 
                    borderRadius: "12px", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    fontSize: "1.1rem"
                  }}>
                    <i className={link.icon}></i>
                  </div>
                  <div>
                    <span style={{ fontSize: "1rem", color: "#0B1524", display: "block" }}>{link.name}</span>
                    <span style={{ fontSize: "0.75rem", color: "#06b6d4", textTransform: 'uppercase', letterSpacing: '0.5px' }}>{link.voters}</span>
                  </div>
                  <i className="fa-solid fa-chevron-right" style={{ marginLeft: "auto", color: "#64748b", fontSize: "0.9rem" }}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: In-game Rewards */}
          <div style={{
            background: "#FFFFFF", border: "1.5px solid rgba(0, 201, 216, 0.22)", boxShadow: "0 8px 25px rgba(0, 201, 216, 0.08)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
          }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "8px", display: "flex", alignItems: "center", gap: "10px", color: "#0B1524" }}>
              <i className="fa-solid fa-gift" style={{ color: "#f59e0b" }}></i> 
              In-Game Vote Rewards
            </h2>
            <p style={{ color: "#3D567A", fontSize: "0.9rem", marginBottom: "24px" }}>
              Rewards are dispatched directly to your player inventory via automated server hooks:
            </p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {inGameRewards.map((item, idx) => (
                <div key={idx} style={{ 
                  display: "flex", 
                  gap: "16px", 
                  alignItems: "flex-start",
                  padding: "16px",
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)"
                }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: item.color,
                    flexShrink: 0
                  }}>
                    <i className={item.icon}></i>
                  </div>
                  <div>
                    <strong style={{ display: "block", fontSize: "1.05rem", color: "#0B1524", marginBottom: "4px" }}>
                      {item.title}
                    </strong>
                    <span style={{ color: "#3D567A", fontSize: "0.88rem", lineHeight: 1.5 }}>
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Reminder */}
            <div style={{ 
              marginTop: '24px', 
              padding: '14px 18px', 
              borderRadius: '12px', 
              background: 'rgba(6, 182, 212, 0.08)', 
              border: '1px solid rgba(6, 182, 212, 0.2)',
              fontSize: '0.85rem',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <i className="fa-solid fa-circle-info" style={{ color: '#06b6d4', fontSize: '1.1rem' }}></i>
              <span>Make sure you are online or your inventory is not full when claiming keys!</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}