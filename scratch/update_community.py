import re

def update_community():
    path = r'pokefun-nextjs-app\src\app\community\page.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    
    # Outer container
    c = c.replace("background: '#060b13', minHeight: '100vh', color: '#f8fafc'", "background: '#F8FBFF', minHeight: '100vh', color: '#0B1524'")
    # Header title & subtitle
    c = c.replace("h1 style={{ fontSize: '2.8rem', fontWeight: 800, margin: 0, color: 'white', letterSpacing: '-0.5px' }}", "h1 style={{ fontSize: '2.8rem', fontWeight: 800, margin: 0, color: '#0B1524', letterSpacing: '-0.5px' }}")
    c = c.replace("color: '#94a3b8', margin: '6px 0 0 0'", "color: '#3D567A', margin: '6px 0 0 0'")
    
    # Sort dropdown
    c = c.replace("background: 'rgba(13, 23, 38, 0.9)',\n                  color: '#f8fafc',\n                  border: '1px solid rgba(6, 182, 212, 0.3)',", "background: '#FFFFFF',\n                  color: '#0B1524',\n                  border: '1.5px solid rgba(0, 201, 216, 0.35)',")
    c = c.replace("background: 'rgba(13, 23, 38, 0.9)',\r\n                  color: '#f8fafc',\r\n                  border: '1px solid rgba(6, 182, 212, 0.3)',", "background: '#FFFFFF',\r\n                  color: '#0B1524',\r\n                  border: '1.5px solid rgba(0, 201, 216, 0.35)',")
    c = c.replace("style={{ background: '#0d1726' }}", "style={{ background: '#FFFFFF', color: '#0B1524' }}")
    
    # Create post button
    c = c.replace("background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',\n                color: '#060b13',", "background: 'linear-gradient(135deg, #1677FF 0%, #00C9D8 100%)',\n                color: '#FFFFFF',")
    c = c.replace("background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',\r\n                color: '#060b13',", "background: 'linear-gradient(135deg, #1677FF 0%, #00C9D8 100%)',\r\n                color: '#FFFFFF',")
    
    # Category pills
    old_pills = """                  border: filter === cat ? '1px solid #06b6d4' : '1px solid rgba(255,255,255,0.08)',
                  background: filter === cat ? 'rgba(6, 182, 212, 0.15)' : 'rgba(13, 23, 38, 0.6)',
                  color: filter === cat ? '#38bdf8' : '#94a3b8',"""
    new_pills = """                  border: filter === cat ? '1.5px solid #00C9D8' : '1.5px solid rgba(0, 201, 216, 0.25)',
                  background: filter === cat ? 'linear-gradient(135deg, #1677FF 0%, #00C9D8 100%)' : '#FFFFFF',
                  color: filter === cat ? '#FFFFFF' : '#3D567A',
                  boxShadow: filter === cat ? '0 4px 14px rgba(0, 201, 216, 0.35)' : '0 2px 8px rgba(0, 0, 0, 0.04)',"""
    c = c.replace(old_pills, new_pills)
    c = c.replace(old_pills.replace('\n', '\r\n'), new_pills.replace('\n', '\r\n'))
    
    # Post cards
    old_card = """                  style={{ 
                    background: 'rgba(13, 23, 38, 0.85)', 
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.08)', 
                    borderRadius: '20px', 
                    overflow: 'hidden',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
                  }}"""
    new_card = """                  style={{ 
                    background: '#FFFFFF', 
                    color: '#0B1524',
                    border: '1.5px solid rgba(0, 201, 216, 0.22)', 
                    borderRadius: '20px', 
                    overflow: 'hidden',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 8px 25px rgba(0, 201, 216, 0.08)'
                  }}"""
    c = c.replace(old_card, new_card)
    c = c.replace(old_card.replace('\n', '\r\n'), new_card.replace('\n', '\r\n'))
    
    # Card mouseover
    c = c.replace("e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.35)';\n                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.6)';", "e.currentTarget.style.borderColor = '#00C9D8';\n                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 201, 216, 0.18)';")
    c = c.replace("e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.35)';\r\n                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.6)';", "e.currentTarget.style.borderColor = '#00C9D8';\r\n                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 201, 216, 0.18)';")
    c = c.replace("e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';\n                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';", "e.currentTarget.style.borderColor = 'rgba(0, 201, 216, 0.22)';\n                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 201, 216, 0.08)';")
    c = c.replace("e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';\r\n                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';", "e.currentTarget.style.borderColor = 'rgba(0, 201, 216, 0.22)';\r\n                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 201, 216, 0.08)';")
    
    # Card media background
    c = c.replace("background: '#060b13', position: 'relative'", "background: '#F0F6FE', position: 'relative'")
    
    # Card typography
    c = c.replace("color: '#f8fafc', lineHeight: 1.4", "color: '#0B1524', lineHeight: 1.4")
    c = c.replace("color: '#94a3b8', fontSize: '0.92rem'", "color: '#475569', fontSize: '0.92rem'")
    c = c.replace("borderTop: '1px solid rgba(255,255,255,0.06)'", "borderTop: '1px solid rgba(0, 201, 216, 0.12)'")
    c = c.replace("color: '#f8fafc' }}>{post.author}", "color: '#0B1524' }}>{post.author}")
    c = c.replace("border: '1px solid rgba(6, 182, 212, 0.4)'", "border: '1.5px solid rgba(0, 201, 216, 0.45)'")
    
    # Empty post placeholder
    c = c.replace("background: 'rgba(13, 23, 38, 0.6)'", "background: '#FFFFFF'")
    c = c.replace("border: '1px dashed rgba(255,255,255,0.1)'", "border: '1.5px dashed rgba(0, 201, 216, 0.3)'")
    c = c.replace("h3 style={{ color: 'white'", "h3 style={{ color: '#0B1524'")
    
    # Insights Modal
    c = c.replace("background: '#0b1424'", "background: '#FFFFFF'")
    c = c.replace("borderTop: '1px solid rgba(6, 182, 212, 0.3)'", "borderTop: '2px solid rgba(0, 201, 216, 0.4)'")
    c = c.replace("color: 'white', fontSize: '1.2rem'", "color: '#0B1524', fontSize: '1.2rem'")
    c = c.replace("borderBottom: '1px solid rgba(255,255,255,0.08)'", "borderBottom: '1px solid rgba(0, 201, 216, 0.15)'")
    c = c.replace("color: 'white', fontWeight: 700", "color: '#0B1524', fontWeight: 700")
    c = c.replace("background: 'rgba(255,255,255,0.02)'", "background: '#F8FBFF'")
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("community/page.tsx updated to White & Electric Aqua")

update_community()
