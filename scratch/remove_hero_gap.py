import re

path = r'd:\Downloads\websitework\website\pokefun-nextjs-app\src\app\page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Remove the redundant Top Info Bar (lines 132 to 225)
# This removes the extra row of STORE SHOP / ONLINE / DISCORD pills inside the hero card
old_top_bar_pattern = re.compile(
    r'\{/\* Top Info Bar \(Store Shop \+ Live Player Count \+ Discord\) \*/\}.*?\{/\* Desktop Split-Hero Grid',
    re.DOTALL
)

new_split_grid_start = '{/* Desktop Split-Hero Grid'

text = old_top_bar_pattern.sub(new_split_grid_start, text)

# 2. Replace the stacked Badge + 140px Logo with a sleek horizontal Brand Lockup
old_brand_pattern = re.compile(
    r'\{/\* Status Pill Badge \*/\}.*?\{/\* Hero Titles \*/\}',
    re.DOTALL
)

new_brand_lockup = """{/* Sleek Brand Lockup: Integrated Logo + Live Edition Badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "4px" }}>
              <div style={{ position: "relative" }}>
                <div style={{
                  position: "absolute",
                  inset: "-6px",
                  background: "radial-gradient(circle, rgba(0, 201, 216, 0.45) 0%, transparent 70%)",
                  filter: "blur(12px)",
                  pointerEvents: "none"
                }}></div>
                <img 
                  src="/images/pokefun_logo_transparent.png" 
                  alt="Pokefun Cobblemon SMP" 
                  style={{
                    width: "56px",
                    height: "auto",
                    display: "block",
                    filter: "drop-shadow(0 4px 12px rgba(0, 201, 216, 0.4))"
                  }}
                />
              </div>

              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                padding: "8px 18px",
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
            </div>

            {/* Hero Titles */}"""

text = old_brand_pattern.sub(new_brand_lockup, text)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

print("page.tsx layout updated: empty space eliminated and text moved up!")
