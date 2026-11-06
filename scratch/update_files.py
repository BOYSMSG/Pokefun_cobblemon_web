import re

def update_layout():
    path = r'pokefun-nextjs-app\src\app\layout.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    
    # Remove tsparticles script tag
    c = re.sub(r'<Script\s+src="/js/tsparticles\.preset\.stars\.bundle\.min\.js"[^>]*/>\s*', '', c)
    # Remove tsParticles.load call
    c = re.sub(r'if\s*\(\s*typeof\s+tsParticles[^}]*\}\s*', '', c)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("layout.tsx cleaned of tsParticles")

update_layout()
