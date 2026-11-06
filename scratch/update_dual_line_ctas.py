import re

path = r'd:\Downloads\websitework\website\pokefun-nextjs-app\src\app\page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'\{/\* CTAs \*/\}\s*<div[^>]*>.*?\{/\* Quick feature highlights \*/\}'

new_ctas = '''{/* CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", width: "100%", marginTop: "6px" }}>
              {/* Copy IP */}
              <button 
                onClick={handleCopyIP} 
                style={{
                  padding: "10px 20px",
                  borderRadius: "14px",
                  fontWeight: 800,
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: copied ? "#10b981" : "linear-gradient(135deg, #1677FF 0%, #00C9D8 100%)",
                  color: "#FFFFFF",
                  boxShadow: copied ? "0 4px 20px rgba(16, 185, 129, 0.4)" : "0 4px 20px rgba(0, 201, 216, 0.4)",
                  transition: "all 0.2s ease"
                }}
                title="Click to copy server IP"
              >
                <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`} style={{ fontSize: "1.1rem" }}></i>
                <div style={{ display: "flex", flexDirection: "column", textAlign: "left", lineHeight: "1.15" }}>
                  <span style={{ fontSize: "0.88rem", fontWeight: 900, letterSpacing: "0.5px" }}>{copied ? 'COPIED!' : 'PLAY.POKEFUN.IN'}</span>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, opacity: 0.9 }}>
                    {copied ? 'Ready to Join Minecraft' : 'Click to Copy IP'}
                  </span>
                </div>
              </button>

              {/* Discord */}
              <a 
                href="https://discord.gg/NtE8QBkmwR" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  padding: "10px 18px",
                  borderRadius: "14px",
                  fontWeight: 800,
                  background: "#5865F2",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "0 4px 18px rgba(88, 101, 242, 0.25)",
                  transition: "all 0.2s ease"
                }}
              >
                <i className="fa-brands fa-discord" style={{ fontSize: "1.2rem" }}></i>
                <div style={{ display: "flex", flexDirection: "column", textAlign: "left", lineHeight: "1.15" }}>
                  <span style={{ fontSize: "0.88rem", fontWeight: 900, letterSpacing: "0.5px" }}>DISCORD</span>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, opacity: 0.9, display: "flex", alignItems: "center", gap: "3px" }}>
                    Join 10K+ <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.58rem" }}></i>
                  </span>
                </div>
              </a>

              {/* Store */}
              <a 
                href="https://store.pokefun.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  padding: "10px 18px",
                  borderRadius: "14px",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "0 4px 18px rgba(245, 158, 11, 0.25)",
                  transition: "all 0.2s ease"
                }}
              >
                <i className="fa-solid fa-cart-shopping" style={{ fontSize: "1.1rem" }}></i>
                <div style={{ display: "flex", flexDirection: "column", textAlign: "left", lineHeight: "1.15" }}>
                  <span style={{ fontSize: "0.88rem", fontWeight: 900, letterSpacing: "0.5px" }}>STORE</span>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, opacity: 0.9, display: "flex", alignItems: "center", gap: "3px" }}>
                    Ranks &amp; Items <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.58rem" }}></i>
                  </span>
                </div>
              </a>

              {/* Owner Profile Button in Light Blue Box */}
              <a 
                href="https://shifan.pokefun.in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  padding: "10px 18px",
                  borderRadius: "14px",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "0 4px 18px rgba(14, 165, 233, 0.35)",
                  transition: "all 0.2s ease"
                }}
                title="Server Founder & Developer: Shifan"
              >
                <i className="fa-solid fa-crown" style={{ fontSize: "1.1rem" }}></i>
                <div style={{ display: "flex", flexDirection: "column", textAlign: "left", lineHeight: "1.15" }}>
                  <span style={{ fontSize: "0.88rem", fontWeight: 900, letterSpacing: "0.5px" }}>OWNER</span>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, opacity: 0.9, display: "flex", alignItems: "center", gap: "3px" }}>
                    Profile <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.58rem" }}></i>
                  </span>
                </div>
              </a>
            </div>

            {/* Quick feature highlights */}'''

content, count = re.subn(pattern, new_ctas, content, flags=re.DOTALL)
print(f"Replaced CTAs: {count}")
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
