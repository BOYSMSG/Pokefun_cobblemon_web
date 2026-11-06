import re

path = r'd:\Downloads\websitework\website\pokefun-nextjs-app\src\app\page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Locate the Left Column inside the Hero section:
# from `{/* Status Pill Badge */}` down to `{/* Quick feature highlights */}` end.

pattern = re.compile(
    r'(\{/\* Status Pill Badge \*/\}.*?\{/\* Quick feature highlights \*/\}.*?</div>\s*</div>)',
    re.DOTALL
)

replacement = """{/* Status Pill Badge */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              padding: "7px 18px",
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

            {/* Logo */}
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle, rgba(0, 201, 216, 0.3) 0%, transparent 70%)",
                filter: "blur(20px)",
                pointerEvents: "none"
              }}></div>
              <img 
                src="/images/pokefun_logo_transparent.png" 
                alt="Pokefun Cobblemon SMP" 
                style={{
                  width: "140px",
                  maxWidth: "140px",
                  height: "auto",
                  display: "block",
                  filter: "drop-shadow(0 4px 14px rgba(0, 201, 216, 0.35))"
                }}
              />
            </div>

            {/* Hero Titles */}
            <h1 style={{
              fontFamily: "'Righteous', cursive, sans-serif",
              fontSize: "clamp(2.2rem, 4.2vw, 3.4rem)",
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
            <div style={{
              width: "100%",
              maxWidth: "540px",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 247, 255, 0.95) 100%)",
              border: "1.5px solid rgba(0, 201, 216, 0.45)",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0, 201, 216, 0.12), 0 2px 10px rgba(22, 119, 255, 0.06)",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginTop: "4px"
            }}>
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
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "14px",
                background: "#FFFFFF",
                border: "1.5px solid rgba(22, 119, 255, 0.22)",
                borderRadius: "14px",
                padding: "10px 14px",
                flexWrap: "wrap"
              }}>
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

                {/* 1-Click Copy Button */}
                <button
                  onClick={handleCopyIP}
                  className="interactive-hero-btn scifi-sheen-btn cta-btn-play"
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
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "10px",
              width: "100%",
              maxWidth: "540px",
              marginTop: "4px"
            }}>
              {/* Discord */}
              <a 
                href="https://discord.gg/NtE8QBkmwR" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="interactive-hero-btn scifi-sheen-btn cta-btn-discord"
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
                className="interactive-hero-btn scifi-sheen-btn cta-btn-store"
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
                className="interactive-hero-btn scifi-sheen-btn cta-btn-owner"
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
          </div>"""

match = pattern.search(text)
if match:
    text = pattern.sub(replacement, text, count=1)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)
    print("Apex Server Gateway applied to page.tsx!")
else:
    print("Could not match pattern in page.tsx!")
