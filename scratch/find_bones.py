with open(r'd:\Downloads\websitework\website\pokefun-nextjs-app\scratch\bb_extracted\dist\bundle.js', 'r', encoding='utf-8') as f:
    text = f.read()

pos = 0
for i in range(15):
    pos = text.find('bones.forEach', pos + 1)
    if pos == -1:
        pos = text.find('bones', pos + 1)
    if pos == -1: break
    snippet = text[pos-50:pos+350]
    if 'pivot' in snippet and 'cubes' in snippet:
        print(f"Match {i}:")
        print(snippet)
        print("=" * 60)
        break
