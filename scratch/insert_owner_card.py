import re

path = r'd:\Downloads\websitework\website\pokefun-nextjs-app\src\app\page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

target = '''              <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "5px 12px", borderRadius: "10px", background: "rgba(245, 158, 11, 0.08)", color: "#d97706", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                🏆 Gyms &amp; Tournaments
              </span>
            </div>'''

owner_card = '''              <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "5px 12px", borderRadius: "10px", background: "rgba(245, 158, 11, 0.08)", color: "#d97706", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                🏆 Gyms &amp; Tournaments
              </span>
            </div>

            {/* Server Founder & Developer Verified Profile Card */}
            <a
              href="https://shifan.pokefun.in/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "8px 16px",
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.95)",
                border: "1.5px solid rgba(22, 119, 255, 0.25)",
                boxShadow: "0 4px 16px rgba(22, 119, 255, 0.08)",
                textDecoration: "none",
                marginTop: "6px",
                transition: "all 0.2s ease"
              }}
              title="Server Founder & Developer: Shifan"
            >
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1677FF 0%, #00C9D8 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: "0.85rem",
                boxShadow: "0 2px 8px rgba(0, 201, 216, 0.35)",
                flexShrink: 0
              }}>
                <i className="fa-solid fa-crown"></i>
              </div>
              <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0B1524" }}>Shifan</span>
                  <span style={{
                    fontSize: "0.62rem",
                    fontWeight: 800,
                    background: "rgba(22, 119, 255, 0.1)",
                    color: "#1677FF",
                    padding: "1px 6px",
                    borderRadius: "4px",
                    letterSpacing: "0.5px"
                  }}>FOUNDER &amp; DEV</span>
                </div>
                <span style={{ fontSize: "0.72rem", color: "#64748B", display: "flex", alignItems: "center", gap: "4px" }}>
                  shifan.pokefun.in <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.6rem", opacity: 0.7 }}></i>
                </span>
              </div>
            </a>'''

if target in content:
    content = content.replace(target, owner_card)
    print("Owner card added successfully!")
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
else:
    print("Target not found!")
