import os

def update_rules():
    path = r'pokefun-nextjs-app\src\app\rules\page.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    c = c.replace("background: '#060b13', minHeight: '100vh', color: '#f8fafc'", "background: '#F8FBFF', minHeight: '100vh', color: '#0B1524'")
    c = c.replace('color: "#f8fafc", letterSpacing: \'-0.5px\'', 'color: "#0B1524", letterSpacing: \'-0.5px\'')
    c = c.replace('color: "#94a3b8"', 'color: "#3D567A"')
    c = c.replace('background: "rgba(13, 23, 38, 0.8)", \n                border: "1px solid rgba(255, 255, 255, 0.08)"', 'background: "#FFFFFF", \n                border: "1.5px solid rgba(0, 201, 216, 0.22)",\n                boxShadow: "0 8px 25px rgba(0, 201, 216, 0.08)"')
    c = c.replace('background: "rgba(13, 23, 38, 0.8)", \r\n                border: "1px solid rgba(255, 255, 255, 0.08)"', 'background: "#FFFFFF", \r\n                border: "1.5px solid rgba(0, 201, 216, 0.22)",\r\n                boxShadow: "0 8px 25px rgba(0, 201, 216, 0.08)"')
    c = c.replace('color: "#f8fafc", margin: 0, fontWeight: 700', 'color: "#0B1524", margin: 0, fontWeight: 700')
    c = c.replace('background: "rgba(13, 23, 38, 0.85)"', 'background: "#FFFFFF", border: "1.5px solid rgba(0, 201, 216, 0.22)", boxShadow: "0 8px 25px rgba(0, 201, 216, 0.08)"')
    c = c.replace('color: "white"', 'color: "#0B1524"')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("rules/page.tsx updated")

def update_rewards():
    path = r'pokefun-nextjs-app\src\app\rewards\page.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    c = c.replace("background: '#060b13', minHeight: '100vh', color: '#f8fafc'", "background: '#F8FBFF', minHeight: '100vh', color: '#0B1524'")
    c = c.replace('background: "radial-gradient(ellipse at top left, rgba(6, 182, 212, 0.1) 0%, rgba(13, 23, 38, 0.95) 100%)"', 'background: "#FFFFFF", border: "1.5px solid rgba(0, 201, 216, 0.25)", boxShadow: "0 8px 30px rgba(0, 201, 216, 0.08)"')
    c = c.replace('color: "white", fontSize: "2.2rem"', 'color: "#0B1524", fontSize: "2.2rem"')
    c = c.replace('color: "#94a3b8"', 'color: "#3D567A"')
    c = c.replace('background: "rgba(13, 23, 38, 0.85)"', 'background: "#FFFFFF", border: "1.5px solid rgba(0, 201, 216, 0.22)", boxShadow: "0 8px 25px rgba(0, 201, 216, 0.08)"')
    c = c.replace('color: "white"', 'color: "#0B1524"')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("rewards/page.tsx updated")

def update_vote():
    path = r'pokefun-nextjs-app\src\app\vote\page.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    c = c.replace("background: '#060b13', minHeight: '100vh', color: '#f8fafc'", "background: '#F8FBFF', minHeight: '100vh', color: '#0B1524'")
    c = c.replace('color: "#f8fafc", letterSpacing: \'-0.5px\'', 'color: "#0B1524", letterSpacing: \'-0.5px\'')
    c = c.replace('color: "#94a3b8"', 'color: "#3D567A"')
    c = c.replace('background: "rgba(13, 23, 38, 0.85)"', 'background: "#FFFFFF", border: "1.5px solid rgba(0, 201, 216, 0.22)", boxShadow: "0 8px 25px rgba(0, 201, 216, 0.08)"')
    c = c.replace('border: "1px solid rgba(255, 255, 255, 0.08)"', 'border: "1.5px solid rgba(0, 201, 216, 0.22)"')
    c = c.replace('color: "white"', 'color: "#0B1524"')
    c = c.replace('color: "#f8fafc"', 'color: "#0B1524"')
    c = c.replace('background: "rgba(13, 23, 38, 0.6)"', 'background: "#F8FBFF"')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("vote/page.tsx updated")

def update_profile():
    path = r'pokefun-nextjs-app\src\app\profile\page.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    c = c.replace("background: '#060b13'", "background: '#F8FBFF'")
    c = c.replace("color: '#f8fafc'", "color: '#0B1524'")
    c = c.replace("color: 'white'", "color: '#0B1524'")
    c = c.replace("background: 'rgba(13, 23, 38, 0.85)'", "background: '#FFFFFF', border: '1.5px solid rgba(0, 201, 216, 0.22)', boxShadow: '0 8px 25px rgba(0, 201, 216, 0.08)'")
    c = c.replace("background: 'rgba(13, 23, 38, 0.9)'", "background: '#FFFFFF', border: '1.5px solid rgba(0, 201, 216, 0.22)', boxShadow: '0 8px 25px rgba(0, 201, 216, 0.08)'")
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("profile/page.tsx updated")

def update_login():
    path = r'pokefun-nextjs-app\src\app\login\page.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    c = c.replace("background: 'radial-gradient(circle at 50% 20%, #0d1e38 0%, #060b13 75%, #03060a 100%) fixed'", "background: 'radial-gradient(ellipse at 50% 10%, #DFF7FF 0%, #EDF6FF 45%, #F8FBFF 80%, #FFFFFF 100%) fixed'")
    c = c.replace("color: '#f8fafc'", "color: '#0B1524'")
    c = c.replace("background: 'rgba(13, 23, 38, 0.95)'", "background: '#FFFFFF', border: '1.5px solid rgba(0, 201, 216, 0.3)', boxShadow: '0 12px 40px rgba(0, 201, 216, 0.12)'")
    c = c.replace("color: 'white'", "color: '#0B1524'")
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("login/page.tsx updated")

update_rules()
update_rewards()
update_vote()
update_profile()
update_login()
