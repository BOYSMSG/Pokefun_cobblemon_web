import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Server Rules - Pokéfun Cobblemon",
  description: "Official community guidelines and server rules for Pokéfun Cobblemon SMP.",
};

export default function RulesPage() {
  const rules = [
    { 
      num: "01",
      icon: "fa-solid fa-hand-holding-hand", 
      title: "No Stealing or Griefing", 
      desc: "Do not steal from other players' chests, barrels, or claimed bases. Griefing (destroying, defacing, or damaging someone else's builds) is strictly forbidden." 
    },
    { 
      num: "02",
      icon: "fa-solid fa-coins", 
      title: "No Real Money Trading (RMT)", 
      desc: "Selling or trading Pokémon, items, or currency for real-world money is strictly prohibited unless conducted through the official store managed by owners." 
    },
    { 
      num: "03",
      icon: "fa-solid fa-monument", 
      title: "Respect All Builds & Habitats", 
      desc: "Do not alter, bridge over, or crowd someone else's structures or designated Pokémon breeding grounds without explicit consent." 
    },
    { 
      num: "04",
      icon: "fa-solid fa-bug-slash", 
      title: "No Duplication or Exploits", 
      desc: "Using bugs, glitches, packet exploits, or illegitimate duplication machines is forbidden. Report bugs immediately to staff for bounty rewards." 
    },
    { 
      num: "05",
      icon: "fa-solid fa-handshake-simple", 
      title: "Fair Trading & Auctions", 
      desc: "Be transparent and honest in all Pokémon trades and GTS transactions. Misleading trade names or reneging on agreed terms is punishable." 
    },
    { 
      num: "06",
      icon: "fa-solid fa-shield-halved", 
      title: "Legitimate Clients Only", 
      desc: "Hacked clients, X-Ray packs, auto-clickers, and unfair automation mods are prohibited. Only quality-of-life and performance mods (Sodium, Iris, JourneyMap) are permitted." 
    },
    { 
      num: "07",
      icon: "fa-solid fa-comments", 
      title: "Safe & Friendly Community", 
      desc: "Inappropriate builds, signs, hate speech, or offensive chat messages are banned. Keep Pokéfun a welcoming environment for trainers of all ages." 
    },
    { 
      num: "08",
      icon: "fa-solid fa-heart-circle-check", 
      title: "No Toxicity or Harassment", 
      desc: "Bullying, personal attacks, spam, or toxic behavior will result in temporary or permanent mutes. Treat fellow trainers and staff with respect." 
    },
    { 
      num: "09",
      icon: "fa-solid fa-user-shield", 
      title: "Staff Authority & Moderation", 
      desc: "Respect decisions made by server moderators and admins. If you disagree with a ruling, file a ticket politely through Discord." 
    },
    { 
      num: "10",
      icon: "fa-solid fa-clock-rotate-left", 
      title: "Dynamic Policy Updates", 
      desc: "Server leadership reserves the right to clarify or adjust rules as new Cobblemon updates release. Notice is posted in the official Discord announcements." 
    },
    { 
      num: "11",
      icon: "fa-solid fa-gauge-high", 
      title: "Server Performance & Farms", 
      desc: "Excessive redstone clocks, entity cramming, or hyper-lag AFK machines will be cleared without refund to ensure 20 TPS server performance." 
    },
    { 
      num: "12",
      icon: "fa-solid fa-sparkles", 
      title: "Have Fun & Catch 'Em All!", 
      desc: "Embark on adventures, participate in server tournament events, build majestic gym towns, and enjoy your journey across Pokéfun SMP!" 
    }
  ];

  return (
    <div style={{ background: '#F8FBFF', minHeight: '100vh', color: '#0B1524', paddingBottom: '90px' }}>
      <div className="inner" style={{ paddingTop: '110px', maxWidth: '1000px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
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
            <i className="fa-solid fa-scale-balanced"></i> Fair Play Guidelines
          </div>
          <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "12px", color: "#0B1524", letterSpacing: '-0.5px' }}>
            Pokéfun Server Rules
          </h1>
          <p style={{ color: "#3D567A", fontSize: "1.15rem", maxWidth: '650px', margin: '0 auto' }}>
            To keep our Cobblemon world safe, fair, and fun for all trainers, please adhere to these guidelines across all server modes.
          </p>
        </div>

        {/* Rules Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))", gap: "20px" }}>
          {rules.map((rule) => (
            <div 
              key={rule.num} 
              style={{ 
                padding: "26px", 
                background: "#FFFFFF", 
                border: "1.5px solid rgba(0, 201, 216, 0.22)",
                boxShadow: "0 8px 25px rgba(0, 201, 216, 0.08)",
                borderRadius: "18px",
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
                transition: "all 0.25s ease",
                position: "relative",
                overflow: "hidden"
              }}
              className="rule-card"
            >
              {/* Number Badge */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8',
                fontWeight: 800,
                fontSize: '1.1rem',
                flexShrink: 0
              }}>
                <i className={rule.icon} style={{ fontSize: '1.2rem' }}></i>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ color: '#06b6d4', fontSize: '0.8rem', fontWeight: 800 }}>RULE #{rule.num}</span>
                  <h3 style={{ fontSize: "1.2rem", color: "#0B1524", margin: 0, fontWeight: 700 }}>
                    {rule.title}
                  </h3>
                </div>
                <p style={{ color: "#3D567A", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
                  {rule.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA Footer */}
        <div style={{ 
          marginTop: '50px', 
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.08) 0%, rgba(13, 23, 38, 0.9) 100%)',
          borderRadius: '20px', 
          padding: '36px', 
          textAlign: 'center',
          border: '1px solid rgba(6, 182, 212, 0.2)'
        }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 10px 0', color: 'white' }}>
            Questions or Need to Report a Rule Violation?
          </h3>
          <p style={{ color: '#94a3b8', margin: '0 0 20px 0', fontSize: '0.95rem' }}>
            Our moderation team is available 24/7 on our official community Discord.
          </p>
          <a 
            href="https://discord.gg/pokefun" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#5865F2',
              color: 'white',
              padding: '12px 28px',
              borderRadius: '12px',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(88, 101, 242, 0.4)'
            }}
          >
            <i className="fa-brands fa-discord"></i> Join Pokéfun Discord
          </a>
        </div>

      </div>
    </div>
  );
}