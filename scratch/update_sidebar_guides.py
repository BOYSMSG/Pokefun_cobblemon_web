import re

def update_guides():
    path = r'pokefun-nextjs-app\src\components\GlobalSidebar.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    old_block = re.search(r'const guideLinks = \[.*?\];', c, re.DOTALL).group(0)
    new_block = '''const guideLinks = [
    { title: "CobbleLeague & Phone", href: "/wiki/guides/cobbleleague-phone", icon: "fa-solid fa-mobile-screen" },
    { title: "Raids & Dungeons", href: "/wiki/guides/raid", icon: "fa-solid fa-dungeon" },
    { title: "Cobble Bosses", href: "/wiki/guides/cobblebosses", icon: "fa-solid fa-skull" },
    { title: "DNA Fusion System", href: "/wiki/guides/fusion", icon: "fa-solid fa-dna" },
    { title: "AlphaZone Guide", href: "/wiki/guides/alphazone", icon: "fa-solid fa-compass" },
    { title: "Gyms & Badges", href: "/wiki/guides/gyms", icon: "fa-solid fa-shield-halved" },
    { title: "Battle Tower", href: "/wiki/guides/battletower", icon: "fa-solid fa-tower-observation" },
    { title: "CobbleRanked Battles", href: "/wiki/guides/ranked", icon: "fa-solid fa-ranking-star" },
    { title: "Legendaries Guide", href: "/wiki/guides/legendaries", icon: "fa-solid fa-dragon" },
    { title: "Land Claims", href: "/wiki/guides/claims", icon: "fa-solid fa-map-location-dot" },
    { title: "All Wiki Guides →", href: "/wiki/guides", icon: "fa-solid fa-book-open" },
  ];'''

    c = c.replace(old_block, new_block)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)

    print("Sidebar guides updated successfully!")

update_guides()
