with open(r'd:\Downloads\websitework\website\pokefun-nextjs-app\scratch\bb_extracted\dist\bundle.js', 'r', encoding='utf-8') as f:
    text = f.read()

pos = 0
for i in range(10):
    pos = text.find('b.pivot', pos + 1)
    if pos == -1: break
    snippet = text[pos-50:pos+300]
    if 'rotation' in snippet:
        print(f"Match {i}:")
        print(snippet)
        print("-" * 50)
