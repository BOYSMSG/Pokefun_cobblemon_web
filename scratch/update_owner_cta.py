import re

path = r'd:\Downloads\websitework\website\pokefun-nextjs-app\src\app\page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the CTA buttons section + feature highlights
old_section = '''              {/* Store */}
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

            {/* Quick feature highlights + Owner pill */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "8px", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "5px 12px", borderRadius: "10px", background: "rgba(22, 119, 255, 0.08)", color: "#1677FF", border: "1px solid rgba(22, 119, 255, 0.2)" }}>
                ⚡ Custom DNA Fusions
              </span>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "5px 12px", borderRadius: "10px", background: "rgba(0, 201, 216, 0.08)", color: "#00C9D8", border: "1px solid rgba(0, 201, 216, 0.25)" }}>
                ⚔️ Wild Bosses &amp; Raids
              </span>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "5px 12px", borderRadius: "10px", background: "rgba(245, 158, 11, 0.08)", color: "#d97706", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                🏆 Gyms &amp; Tournaments
              </span>
              <a 
                href="https://shifan.pokefun.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Server Founder & Developer: Shifan"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  padding: "5px 12px",
                  borderRadius: "10px",
                  background: "rgba(22, 119, 255, 0.12)",
                  color: "#1677FF",
                  border: "1.5px solid rgba(22, 119, 255, 0.35)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 2px 8px rgba(22, 119, 255, 0.08)",
                  transition: "all 0.2s ease"
                }}
              >
                👑 Owner: Shifan <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.62rem", opacity: 0.8 }}></i>
              </a>
            </div>'''

new_section = '''              {/* Store */}
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

              {/* Owner Profile Button in Light Blue Box */}
              <a 
                href="https://shifan.pokefun.in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  padding: "13px 22px",
                  borderRadius: "14px",
                  fontWeight: 800,
                  fontSize: "0.92rem",
                  background: "linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 18px rgba(14, 165, 233, 0.35)",
                  transition: "all 0.2s ease"
                }}
                title="Server Founder & Developer: Shifan"
              >
                <i className="fa-solid fa-crown" style={{ fontSize: "0.95rem" }}></i>
                <span>Owner</span>
              </a>
            </div>

            {/* Quick feature highlights */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "8px", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "5px 12px", borderRadius: "10px", background: "rgba(22, 119, 255, 0.08)", color: "#1677FF", border: "1px solid rgba(22, 119, 255, 0.2)" }}>
                ⚡ Custom DNA Fusions
              </span>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "5px 12px", borderRadius: "10px", background: "rgba(0, 201, 216, 0.08)", color: "#00C9D8", border: "1px solid rgba(0, 201, 216, 0.25)" }}>
                ⚔️ Wild Bosses &amp; Raids
              </span>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "5px 12px", borderRadius: "10px", background: "rgba(245, 158, 11, 0.08)", color: "#d97706", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                🏆 Gyms &amp; Tournaments
              </span>
            </div>'''

if old_section in content:
    content = content.replace(old_section, new_section)
    print("Owner CTA button integrated successfully!")
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
else:
    print("Old section not matched directly, investigating lines")
