import re

page_path = r'd:\Downloads\websitework\website\pokefun-nextjs-app\src\app\page.tsx'
with open(page_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Add interactive-hero-btn to the 4 buttons
text = text.replace('className="scifi-sheen-btn cta-btn-play"', 'className="interactive-hero-btn scifi-sheen-btn cta-btn-play"')
text = text.replace('className="scifi-sheen-btn cta-btn-discord"', 'className="interactive-hero-btn scifi-sheen-btn cta-btn-discord"')
text = text.replace('className="scifi-sheen-btn cta-btn-store"', 'className="interactive-hero-btn scifi-sheen-btn cta-btn-store"')
text = text.replace('className="scifi-sheen-btn cta-btn-owner"', 'className="interactive-hero-btn scifi-sheen-btn cta-btn-owner"')

# Add interactive-pill to top bar pills
text = re.sub(r'(<Link\s+href="https://store\.pokefun\.in"[^>]*?)(style=\{\{)', r'\1className="interactive-pill"\n              \2', text)
text = re.sub(r'(<button\s+onClick=\{handleCopyIP\}[^>]*?)(style=\{\{)', r'\1className="interactive-pill"\n              \2', text)
text = re.sub(r'(<a\s+target="_blank"\s+rel="noopener noreferrer"\s+href="https://discord\.gg/NtE8QBkmwR"[^>]*?)(style=\{\{)', r'\1className="interactive-pill"\n              \2', text)

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("page.tsx updated successfully!")

# Now update DynamicHero3D.tsx to give buttons pod-nav-btn and pod-random-btn
dynamic_hero_path = r'd:\Downloads\websitework\website\pokefun-nextjs-app\src\components\3d\DynamicHero3D.tsx'
with open(dynamic_hero_path, 'r', encoding='utf-8') as f:
    hero_text = f.read()

hero_text = hero_text.replace(
    '<button \n          onClick={handlePrev}\n          title="Previous Pokemon"',
    '<button \n          onClick={handlePrev}\n          title="Previous Pokemon"\n          className="pod-nav-btn"'
)
hero_text = hero_text.replace(
    '<button \n          onClick={handleNext}\n          title="Next Pokemon"',
    '<button \n          onClick={handleNext}\n          title="Next Pokemon"\n          className="pod-nav-btn"'
)
hero_text = hero_text.replace(
    '<button\n          onClick={handleRandom}\n          title="Show random Pokemon"',
    '<button\n          onClick={handleRandom}\n          title="Show random Pokemon"\n          className="pod-random-btn"'
)

with open(dynamic_hero_path, 'w', encoding='utf-8') as f:
    f.write(hero_text)

print("DynamicHero3D.tsx updated successfully!")
