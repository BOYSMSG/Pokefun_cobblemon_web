import re

def update_global_sidebar():
    path = r'pokefun-nextjs-app\src\components\GlobalSidebar.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    
    # Update aside styles
    c = c.replace('background: "rgba(13, 23, 38, 0.9)",', 'background: "rgba(255, 255, 255, 0.95)",')
    c = c.replace('border: "1px solid rgba(6, 182, 212, 0.2)",', 'border: "1.5px solid rgba(0, 201, 216, 0.25)",')
    c = c.replace('boxShadow: "0 10px 30px rgba(0,0,0,0.4)",', 'boxShadow: "0 10px 30px rgba(0, 201, 216, 0.08)",')
    c = c.replace('color: "#f8fafc"', 'color: "#0B1524"')
    
    # Brand text & border
    c = c.replace('borderBottom: "1px solid rgba(255,255,255,0.08)"', 'borderBottom: "1px solid rgba(0, 201, 216, 0.15)"')
    c = c.replace('color: "white", display: "block"', 'color: "#0B1524", display: "block"')
    c = c.replace('color: "#06b6d4"', 'color: "#00C9D8"')
    
    # Links
    c = c.replace('color: "#94a3b8"', 'color: "#3D567A"')
    c = c.replace('color: isActive ? "#38bdf8" : "#94a3b8"', 'color: isActive ? "#1677FF" : "#3D567A"')
    c = c.replace('background: isActive ? "rgba(6, 182, 212, 0.15)" : "transparent"', 'background: isActive ? "linear-gradient(135deg, rgba(22, 119, 255, 0.1), rgba(0, 201, 216, 0.16))" : "transparent"')
    c = c.replace('border: isActive ? "1px solid rgba(6, 182, 212, 0.3)" : "1px solid transparent"', 'border: isActive ? "1px solid rgba(0, 201, 216, 0.35)" : "1px solid transparent"')
    c = c.replace('e.currentTarget.style.color = "#f8fafc";', 'e.currentTarget.style.color = "#1677FF";')
    c = c.replace('e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";', 'e.currentTarget.style.background = "rgba(22, 119, 255, 0.06)";')
    c = c.replace('e.currentTarget.style.color = "#38bdf8";', 'e.currentTarget.style.color = "#1677FF";')
    c = c.replace('e.currentTarget.style.background = "rgba(6, 182, 212, 0.08)";', 'e.currentTarget.style.background = "rgba(22, 119, 255, 0.06)";')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("GlobalSidebar.tsx updated to White & Electric Aqua")

update_global_sidebar()
