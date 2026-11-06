import re

def update_homepage():
    path = r'pokefun-nextjs-app\src\app\page.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. Update 3D Pod inside Hero
    old_pod_pattern = re.compile(
        r'\{\/\* Right Column: Dedicated 3D Holographic Showcase Pod \*\/\}[\s\S]*?\{\/\* Bottom model name tag \*\/\}[\s\S]*?<\/div>\s*<\/div>',
        re.MULTILINE
    )

    new_pod = """{/* Right Column: Dedicated 3D Holographic Showcase Pod */}
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

            {/* 3D Model with dynamic controls, switcher, and dynamic name tag */}
            <div style={{ width: "100%", height: "100%", position: "relative", zIndex: 5 }}>
              <DynamicHero3D />
            </div>

          </div>"""

    c = old_pod_pattern.sub(new_pod, c)

    # 2. Update Feature Cards
    old_features_pattern = re.compile(
        r'\{\/\* =+\s*EPIC SERVER FEATURES GRID\s*=+\s*\*\/\}[\s\S]*?<\/section>',
        re.MULTILINE
    )

    new_features = """{/* =================================================================
          EPIC SERVER FEATURES GRID (CINEMATIC CARD LAYOUT)
          ================================================================= */}
      <section style={{ marginBottom: "60px" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            display: "inline-block",
            padding: "5px 16px",
            fontSize: "0.78rem",
            fontWeight: 800,
            color: "#1677FF",
            background: "rgba(0, 201, 216, 0.12)",
            border: "1.5px solid rgba(0, 201, 216, 0.35)",
            borderRadius: "20px",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}>
            Cobblemon Innovations
          </div>
          <h2 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#0B1524", margin: "12px 0 6px 0" }}>
            Epic Server Features
          </h2>
          <p style={{ color: "#3D567A", fontSize: "1rem", maxWidth: "600px", margin: "0 auto" }}>
            Experience handcrafted gameplay mechanics built from the ground up for competitive and casual Cobblemon enthusiasts.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px"
        }}>
          {featureItems.map((item, idx) => (
            <div 
              key={idx}
              style={{
                borderRadius: "22px",
                background: "#FFFFFF",
                border: "1.5px solid rgba(0, 201, 216, 0.22)",
                boxShadow: "0 8px 30px rgba(22, 119, 255, 0.05)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                transition: "all 0.25s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "#00C9D8";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(0, 201, 216, 0.18)";
                const img = e.currentTarget.querySelector('.feature-card-img') as HTMLElement;
                if (img) img.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.borderColor = "rgba(0, 201, 216, 0.22)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(22, 119, 255, 0.05)";
                const img = e.currentTarget.querySelector('.feature-card-img') as HTMLElement;
                if (img) img.style.transform = "scale(1)";
              }}
            >
              {/* Full-width Cinematic Preview Banner */}
              <div style={{
                width: "100%",
                height: "175px",
                overflow: "hidden",
                position: "relative",
                background: "linear-gradient(135deg, #E6F8FF 0%, #F0F6FE 100%)",
                borderBottom: "1.5px solid rgba(0, 201, 216, 0.2)"
              }}>
                <img 
                  loading="lazy" 
                  decoding="async" 
                  src={item.img} 
                  alt={item.title} 
                  className="feature-card-img"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    transition: "transform 0.35s ease"
                  }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>

              {/* Card Body */}
              <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", flex: 1, textAlign: "left" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0B1524", margin: "0 0 8px 0" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#3D567A", fontSize: "0.92rem", lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>"""

    c = old_features_pattern.sub(new_features, c)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)

    print("Homepage updated successfully with multi-model pod and cinematic feature cards!")

update_homepage()
