p = r'd:\Downloads\websitework\website\pokefun-nextjs-app\src\app\page.tsx'
with open(p, 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace(
    'onClick={handleCopyIP} \n                className="scifi-sheen-btn"',
    'onClick={handleCopyIP} \n                className="scifi-sheen-btn cta-btn-play"'
)
c = c.replace(
    'href="https://discord.gg/NtE8QBkmwR" \n                target="_blank" \n                rel="noopener noreferrer" \n                className="scifi-sheen-btn"',
    'href="https://discord.gg/NtE8QBkmwR" \n                target="_blank" \n                rel="noopener noreferrer" \n                className="scifi-sheen-btn cta-btn-discord"'
)
c = c.replace(
    'href="https://store.pokefun.in" \n                target="_blank" \n                rel="noopener noreferrer" \n                className="scifi-sheen-btn"',
    'href="https://store.pokefun.in" \n                target="_blank" \n                rel="noopener noreferrer" \n                className="scifi-sheen-btn cta-btn-store"'
)
c = c.replace(
    'href="https://shifan.pokefun.in/" \n                target="_blank" \n                rel="noopener noreferrer" \n                className="scifi-sheen-btn"',
    'href="https://shifan.pokefun.in/" \n                target="_blank" \n                rel="noopener noreferrer" \n                className="scifi-sheen-btn cta-btn-owner"'
)

with open(p, 'w', encoding='utf-8') as f:
    f.write(c)

print("Updated page.tsx with specific button classes!")
