"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function RewardsDashboard() {
  const { data: session } = useSession();
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(false);
  const [canCheckIn, setCanCheckIn] = useState(true);
  const [dailyAmount, setDailyAmount] = useState(50);

  useEffect(() => {
    // Fetch global config for daily amount
    fetch("/api/rewards/config")
      .then(res => res.json())
      .then(data => {
        if (data.config && data.config.dailyCheckInAmount) {
          setDailyAmount(data.config.dailyCheckInAmount);
        }
      })
      .catch(() => {});

    // Fetch user points and check-in status
    if (session?.user) {
      fetch("/api/profile?email=" + encodeURIComponent(session.user.email || ""))
        .then(res => res.json())
        .then(data => {
          if (data && data.user) {
            setPoints(data.user.rewardPoints || 0);
            if (data.user.lastCheckIn) {
              const lastCheck = new Date(data.user.lastCheckIn);
              const now = new Date();
              if (lastCheck.getUTCFullYear() === now.getUTCFullYear() &&
                  lastCheck.getUTCMonth() === now.getUTCMonth() &&
                  lastCheck.getUTCDate() === now.getUTCDate()) {
                setCanCheckIn(false);
              }
            }
          }
        })
        .catch(() => {});
    }
  }, [session]);

  const handleDailyCheckIn = async () => {
    if (!session?.user) return alert("Please login first to claim daily points!");
    setLoading(true);
    try {
      const res = await fetch("/api/rewards/daily-checkin", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        alert(data.message || "Daily reward claimed!");
        setPoints(data.newPoints);
        setCanCheckIn(false);
      } else {
        alert(data.error || "Could not claim daily reward");
      }
    } catch (error) {
      alert("Failed to claim daily bonus.");
    }
    setLoading(false);
  };

  const cards = [
    { 
      title: "Earn Rewards", 
      desc: "Complete daily quests, surveys & interactive challenges", 
      icon: "fa-solid fa-coins", 
      link: "/rewards/earn", 
      color: "#f59e0b",
      badge: "High Yield"
    },
    { 
      title: "Reward Shop", 
      desc: "Redeem points for Master Balls, Shiny Charms & crates", 
      icon: "fa-solid fa-store", 
      link: "/rewards/shop", 
      color: "#06b6d4",
      badge: "Catalog"
    },
    { 
      title: "Limited Collectibles", 
      desc: "Exclusive Cobblemon forms, cosmetics & seasonal ranks", 
      icon: "fa-solid fa-fire", 
      link: "/rewards/shop?category=Limited", 
      color: "#8b5cf6",
      badge: "Exclusive"
    },
    { 
      title: "Redemption History", 
      desc: "View past claims, reward codes & transaction logs", 
      icon: "fa-solid fa-clock-rotate-left", 
      link: "/rewards/history", 
      color: "#10b981",
      badge: "Log"
    },
    { 
      title: "Trainer's Guide", 
      desc: "Learn how to maximize daily point multipliers", 
      icon: "fa-solid fa-book-open", 
      link: "/rewards/guide", 
      color: "#3b82f6",
      badge: "Tutorial"
    },
  ];

  return (
    <div style={{ background: '#F8FBFF', minHeight: '100vh', color: '#0B1524', paddingBottom: '80px' }}>
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '110px 20px 40px' }}>
        
        {/* Top Header with Points */}
        <div style={{
          background: "#FFFFFF", border: "1.5px solid rgba(0, 201, 216, 0.25)", boxShadow: "0 8px 30px rgba(0, 201, 216, 0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(6, 182, 212, 0.25)",
          borderRadius: "20px",
          padding: "28px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2.5rem",
          boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
          flexWrap: "wrap",
          gap: "20px"
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <i className="fa-solid fa-crown" style={{ color: '#f59e0b' }}></i>
              <span style={{ color: '#06b6d4', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Trainer Loyalty Hub</span>
            </div>
            <h1 style={{ margin: 0, color: "#0B1524", fontSize: "2.2rem", fontWeight: 800, letterSpacing: '-0.5px' }}>
              Pokéfun Rewards
            </h1>
            <p style={{ margin: 0, color: "#3D567A", marginTop: "6px", fontSize: '0.95rem' }}>
              Participate daily, vote for the server, and unlock free Cobblemon items!
            </p>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: 'wrap' }}>
            <button 
              onClick={handleDailyCheckIn}
              disabled={loading || !canCheckIn}
              style={{
                background: !canCheckIn 
                  ? "rgba(255,255,255,0.06)" 
                  : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                padding: "12px 22px",
                borderRadius: "14px",
                border: !canCheckIn ? "1px solid rgba(255,255,255,0.1)" : "none",
                color: !canCheckIn ? "#64748b" : "white",
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: !canCheckIn ? "not-allowed" : "pointer",
                boxShadow: !canCheckIn ? "none" : "0 4px 15px rgba(16, 185, 129, 0.35)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                opacity: loading ? 0.7 : 1,
                transition: "all 0.2s ease"
              }}
            >
              <i className="fa-solid fa-calendar-check" style={{ color: !canCheckIn ? '#64748b' : '#a7f3d0' }}></i> 
              {loading ? "Claiming..." : !canCheckIn ? "Claimed Today" : `Daily Check-in (+${dailyAmount})`}
            </button>

            <div style={{
              background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.3) 100%)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              padding: "12px 24px",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow: "0 4px 20px rgba(245, 158, 11, 0.15)"
            }}>
              <i className="fa-solid fa-gem" style={{ color: "#f59e0b", fontSize: "1.3rem" }}></i>
              <div>
                <span style={{ display: 'block', fontSize: '0.72rem', color: '#fcd34d', fontWeight: 700, textTransform: 'uppercase' }}>Balance</span>
                <span style={{ color: "#0B1524", fontSize: "1.35rem", fontWeight: 800 }}>{points} Pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "22px"
        }}>
          {cards.map((card, idx) => {
            return (
              <Link href={card.link} key={idx} style={{ textDecoration: "none" }}>
                <div 
                  style={{
                    background: "rgba(13, 23, 38, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "18px",
                    padding: "32px 26px",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = card.color;
                    e.currentTarget.style.boxShadow = `0 14px 30px rgba(0,0,0,0.5), 0 0 20px ${card.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "14px",
                      background: `${card.color}20`,
                      border: `1px solid ${card.color}50`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: card.color,
                      fontSize: "1.6rem"
                    }}>
                      <i className={card.icon}></i>
                    </div>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: card.color,
                      background: `${card.color}15`,
                      border: `1px solid ${card.color}35`,
                      padding: '4px 10px',
                      borderRadius: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {card.badge}
                    </span>
                  </div>

                  <h2 style={{ margin: "0 0 8px 0", color: "#0B1524", fontSize: "1.3rem", fontWeight: 700 }}>
                    {card.title}
                  </h2>
                  <p style={{ margin: 0, color: "#3D567A", fontSize: "0.92rem", lineHeight: 1.5, flex: 1 }}>
                    {card.desc}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: card.color, fontSize: '0.85rem', fontWeight: 700, marginTop: '22px' }}>
                    <span>Open Section</span>
                    <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.8rem' }}></i>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </main>
    </div>
  );
}