p = r'd:\Downloads\websitework\website\pokefun-nextjs-app\src\app\page.tsx'
with open(p, 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace(
    'onClick={handleCopyIP} \n                style={{',
    'onClick={handleCopyIP} \n                className="scifi-sheen-btn"\n                style={{'
)
c = c.replace(
    'href="https://discord.gg/NtE8QBkmwR" \n                target="_blank" \n                rel="noopener noreferrer" \n                style={{',
    'href="https://discord.gg/NtE8QBkmwR" \n                target="_blank" \n                rel="noopener noreferrer" \n                className="scifi-sheen-btn"\n                style={{'
)
c = c.replace(
    'href="https://store.pokefun.in" \n                target="_blank" \n                rel="noopener noreferrer" \n                style={{',
    'href="https://store.pokefun.in" \n                target="_blank" \n                rel="noopener noreferrer" \n                className="scifi-sheen-btn"\n                style={{'
)
c = c.replace(
    'href="https://shifan.pokefun.in/" \n                target="_blank" \n                rel="noopener noreferrer" \n                style={{',
    'href="https://shifan.pokefun.in/" \n                target="_blank" \n                rel="noopener noreferrer" \n                className="scifi-sheen-btn"\n                style={{'
)

with open(p, 'w', encoding='utf-8') as f:
    f.write(c)

print("Updated buttons with scifi-sheen-btn!")
