import re

path = r'd:\Downloads\websitework\website\pokefun-nextjs-app\src\app\layout.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove star from showcase
pattern = r'<a href="/showcase" className="nav-link-item">\s*<i className="fa-solid fa-star"[^>]*></i>\s*Showcase\s*</a>'
replacement = '<a href="/showcase" className="nav-link-item">Showcase</a>'

new_content, count = re.subn(pattern, replacement, content)
print(f"Showcase replaced: {count}")

# In footer, add Owner Profile link
footer_old = '<small>Updated for Pokefun | <a href="/rules">Rules</a> | <a href="/team">Staff Team</a></small>'
footer_new = '<small>Updated for Pokefun | <a href="/rules">Rules</a> | <a href="/team">Staff Team</a> | <a href="https://shifan.pokefun.in/" target="_blank" rel="noopener noreferrer" style={{ color: "#1677FF", fontWeight: 700 }}>Owner Profile</a></small>'
if footer_old in new_content:
    new_content = new_content.replace(footer_old, footer_new)
    print("Footer owner link added")

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)
