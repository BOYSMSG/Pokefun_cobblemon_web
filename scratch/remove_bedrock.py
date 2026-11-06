def remove_bedrock():
    # 1. page.tsx
    page_path = r'pokefun-nextjs-app\src\app\page.tsx'
    with open(page_path, 'r', encoding='utf-8') as f:
        c = f.read()
    c = c.replace('JAVA &amp; BEDROCK', 'MINECRAFT JAVA EDITION')
    c = c.replace('JAVA & BEDROCK', 'MINECRAFT JAVA EDITION')
    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("page.tsx updated: Bedrock removed")

    # 2. MobileNavigation.tsx
    mob_path = r'pokefun-nextjs-app\src\components\MobileNavigation.tsx'
    with open(mob_path, 'r', encoding='utf-8') as f:
        c = f.read()
    c = c.replace('Cobblemon 1.21.1 • Java &amp; Bedrock', 'Cobblemon 1.21.1 • Java Edition')
    c = c.replace('Cobblemon 1.21.1 • Java & Bedrock', 'Cobblemon 1.21.1 • Java Edition')
    with open(mob_path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("MobileNavigation.tsx updated: Bedrock removed")

    # 3. layout.tsx
    layout_path = r'pokefun-nextjs-app\src\app\layout.tsx'
    with open(layout_path, 'r', encoding='utf-8') as f:
        c = f.read()
    c = c.replace('"gamePlatform": ["PC", "Minecraft Java Edition", "Minecraft Bedrock Edition"]', '"gamePlatform": ["PC", "Minecraft Java Edition"]')
    with open(layout_path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("layout.tsx updated: Bedrock removed")

remove_bedrock()
