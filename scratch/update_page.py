import re

def update_page_hero():
    path = r'pokefun-nextjs-app\src\app\page.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to replace the whole hero section starting from:
    # {/* =================================================================
    #     WHITE & ELECTRIC AQUA SCI-FI HERO SECTION
    # up to:
    # </section>
    
    hero_pattern = re.compile(
        r'\{\/\* =+\s*WHITE & ELECTRIC AQUA SCI-FI HERO SECTION\s*=+\s*\*\/\}[\s\S]*?<\/section>',
        re.MULTILINE
    )
    
    new_hero = """{/* =================================================================
          WHITE & ELECTRIC AQUA SCI-FI HERO SECTION (SPLIT-HERO LAYOUT)
          ================================================================= */}
      <section style={{
        position: "relative",
        width: "100%",
        minHeight: "680px",
        overflow: "hidden",
        borderRadius: "32px",
        marginBottom: "40px",
        background: "radial-gradient(ellipse at 50% 0%, #E6F8FF 0%, #F0F7FF 50%, #F8FBFF 100%)",
        border: "1.5px solid rgba(0, 201, 216, 0.35)",
        boxShadow: "0 20px 60px rgba(0, 201, 216, 0.12), 0 4px 20px rgba(22, 119, 255, 0.06)",
        padding: "36px 32px"
      }} className="scifi-cyber-grid">

        {/* Ambient Holographic Glow Aura */}
        <div style={{
          position: "absolute",
          top: "-20%",
          right: "5%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 201, 216, 0.22) 0%, rgba(22, 119, 255, 0.1) 45%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 1
        }}></div>

        {/* Top Info Bar (Store Shop + Live Player Count + Discord) */}
        <div style={{
          position: "relative",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "14px",
          marginBottom: "32px"
        }}>
          {/* Left top pills */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <Link 
              href="https://store.pokefun.in" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 16px",
                borderRadius: "14px",
                background: "rgba(255, 255, 255, 0.95)",
                border: "1.5px solid rgba(245, 158, 11, 0.45)",
                backdropFilter: "blur(12px)",
                textDecoration: "none",
                color: "#0B1524",
                boxShadow: "0 4px 14px rgba(245, 158, 11, 0.12)",
                fontSize: "0.82rem",
                fontWeight: 800
              }}
            >
              <i className="fa-solid fa-cart-shopping" style={{ color: "#f59e0b" }}></i>
              <span>STORE</span>
              <span style={{ padding: "2px 6px", borderRadius: "4px", background: "#f59e0b", color: "#FFFFFF", fontSize: "0.68rem", fontWeight: 900 }}>SHOP</span>
            </Link>

            <button
              onClick={handleCopyIP}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "14px",
                background: "rgba(255, 255, 255, 0.95)",
                border: "1.5px solid rgba(0, 201, 216, 0.35)",
                backdropFilter: "blur(12px)",
                color: "#0B1524",
                boxShadow: "0 4px 14px rgba(0, 201, 216, 0.12)",
                fontSize: "0.82rem",
                fontWeight: 800,
                cursor: "pointer"
              }}
              title="Click to copy IP"
            >
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", display: "inline-block", boxShadow: "0 0 8px #10b981" }}></span>
              <span style={{ color: "#1677FF" }}>{playerCount !== null && playerCount > 0 ? playerCount : "36"}</span> ONLINE
              <span style={{ color: "#94a3b8", fontWeight: 600, fontFamily: "monospace" }}>play.pokefun.in</span>
            </button>
          </div>

          {/* Right top Discord pill */}
          <div>
            <a 
              target="_blank" 
              rel="noopener noreferrer" 
              href="https://discord.gg/NtE8QBkmwR" 
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 16px",
                borderRadius: "14px",
                background: "rgba(255, 255, 255, 0.95)",
                border: "1.5px solid rgba(88, 101, 242, 0.35)",
                backdropFilter: "blur(12px)",
                textDecoration: "none",
                color: "#0B1524",
                boxShadow: "0 4px 14px rgba(88, 101, 242, 0.12)",
                fontSize: "0.82rem",
                fontWeight: 800
              }}
            >
              <i className="fa-brands fa-discord" style={{ color: "#5865F2", fontSize: "1rem" }}></i>
              <span>DISCORD</span>
              <span style={{ padding: "2px 6px", borderRadius: "4px", background: "#5865F2", color: "white", fontSize: "0.68rem", fontWeight: 900 }}>10K+ JOIN</span>
            </a>
          </div>
        </div>

        {/* Desktop Split-Hero Grid (55% Text / 45% 3D Pod) */}
        <div style={{
          position: "relative",
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "40px",
          alignItems: "center",
          width: "100%"
        }}>
          
          {/* Left Column: Brand, Headline, CTAs */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "16px" }}>
            
            {/* Status Pill Badge */}
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
              <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#1677FF" }}>JAVA &amp; BEDROCK</span>
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
                  width: "135px",
                  maxWidth: "135px",
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
              Immerse yourself in a living Pokémon world with custom Raids, Mega Evolutions, DNA Fusions, and an active player-driven economy.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", width: "100%", marginTop: "6px" }}>
              {/* Copy IP */}
              <button 
                onClick={handleCopyIP} 
                style={{
                  padding: "13px 24px",
                  borderRadius: "14px",
                  fontWeight: 800,
                  fontSize: "0.92rem",
                  letterSpacing: "0.5px",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  background: copied ? "#10b981" : "linear-gradient(135deg, #1677FF 0%, #00C9D8 100%)",
                  color: "#FFFFFF",
                  boxShadow: copied ? "0 4px 20px rgba(16, 185, 129, 0.4)" : "0 4px 20px rgba(0, 201, 216, 0.4)",
                  transition: "all 0.2s ease"
                }}
                title="Click to copy server IP"
              >
                <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                <span>{copied ? 'IP Copied to Clipboard!' : 'play.pokefun.in'}</span>
              </button>

              {/* Discord */}
              <a 
                href="https://discord.gg/NtE8QBkmwR" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  padding: "13px 22px",
                  borderRadius: "14px",
                  fontWeight: 800,
                  fontSize: "0.92rem",
                  background: "#5865F2",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 18px rgba(88, 101, 242, 0.25)"
                }}
              >
                <i className="fa-brands fa-discord" style={{ fontSize: "1rem" }}></i>
                <span>Discord</span>
              </a>

              {/* Store */}
              <a 
                href="https://store.pokefun.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  padding: "13px 22px",
                  borderRadius: "14px",
                  fontWeight: 800,
                  fontSize: "0.92rem",
                  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 18px rgba(245, 158, 11, 0.25)"
                }}
              >
                <i className="fa-solid fa-cart-shopping"></i>
                <span>Store</span>
              </a>
            </div>

            {/* Quick feature highlights */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "8px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "5px 12px", borderRadius: "10px", background: "rgba(22, 119, 255, 0.08)", color: "#1677FF", border: "1px solid rgba(22, 119, 255, 0.2)" }}>
                ⚡ Custom DNA Fusions
              </span>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "5px 12px", borderRadius: "10px", background: "rgba(0, 201, 216, 0.08)", color: "#00C9D8", border: "1px solid rgba(0, 201, 216, 0.25)" }}>
                ⚔️ Wild Bosses &amp; Raids
              </span>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "5px 12px", borderRadius: "10px", background: "rgba(245, 158, 11, 0.08)", color: "#d97706", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                🏆 Gyms &amp; Tournaments
              </span>
            </div>

          </div>

          {/* Right Column: Dedicated 3D Holographic Showcase Pod */}
          <div style={{
            position: "relative",
            width: "100%",
            height: "520px",
            minHeight: "480px",
            borderRadius: "24px",
            background: "radial-gradient(ellipse at 50% 60%, rgba(0, 201, 216, 0.12) 0%, rgba(22, 119, 255, 0.05) 50%, rgba(255, 255, 255, 0.6) 100%)",
            border: "1.5px solid rgba(0, 201, 216, 0.3)",
            boxShadow: "inset 0 0 40px rgba(0, 201, 216, 0.1), 0 10px 30px rgba(0, 201, 216, 0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
          }}>
            
            {/* Hologram Stage Pedestal Rings (Sci-Fi Base) */}
            <div style={{
              position: "absolute",
              bottom: "25px",
              left: "50%",
              transform: "translateX(-50%) rotateX(68deg)",
              width: "360px",
              height: "360px",
              borderRadius: "50%",
              border: "2px solid rgba(0, 201, 216, 0.6)",
              boxShadow: "0 0 35px rgba(0, 201, 216, 0.4), inset 0 0 35px rgba(22, 119, 255, 0.3)",
              pointerEvents: "none",
              zIndex: 1
            }}></div>
            <div style={{
              position: "absolute",
              bottom: "45px",
              left: "50%",
              transform: "translateX(-50%) rotateX(68deg)",
              width: "260px",
              height: "260px",
              borderRadius: "50%",
              border: "1.5px dashed rgba(22, 119, 255, 0.5)",
              pointerEvents: "none",
              zIndex: 1
            }}></div>

            {/* Top Interactive Pill */}
            <div style={{
              position: "absolute",
              top: "16px",
              zIndex: 10,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.75rem",
              fontWeight: 800,
              color: "#1677FF",
              background: "rgba(255, 255, 255, 0.95)",
              padding: "6px 16px",
              borderRadius: "50px",
              border: "1.5px solid rgba(0, 201, 216, 0.35)",
              boxShadow: "0 4px 14px rgba(0, 201, 216, 0.15)"
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00C9D8", boxShadow: "0 0 8px #00C9D8" }}></span>
              <span>INTERACTIVE 3D HERO • DRAG TO ROTATE</span>
            </div>

            {/* 3D Model Canvas inside its dedicated container */}
            <div style={{ width: "100%", height: "100%", position: "relative", zIndex: 5 }}>
              <DynamicHero3D modelPath="/models/hero-pokemon.glb" />
            </div>

            {/* Bottom model name tag */}
            <div style={{
              position: "absolute",
              bottom: "16px",
              zIndex: 10,
              fontSize: "0.74rem",
              fontWeight: 700,
              color: "#3D567A",
              background: "rgba(255, 255, 255, 0.85)",
              padding: "4px 14px",
              borderRadius: "12px",
              border: "1px solid rgba(0, 201, 216, 0.25)"
            }}>
              Cobblemon Custom DNA Fusion: <strong style={{ color: "#1677FF" }}>Venustoise</strong>
            </div>

          </div>

        </div>

      </section>"""

    new_content, count = hero_pattern.subn(new_hero, content)
    if count == 0:
        print("Hero section pattern not matched!")
        return False
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Homepage Split-Hero section updated successfully!")
    return True

update_page_hero()
