with open(r'd:\Downloads\websitework\website\pokefun-nextjs-app\scratch\bb_extracted\dist\bundle.js', 'r', encoding='utf-8') as f:
    text = f.read()

pos = 0
for i in range(10):
    pos = text.find('.origin', pos + 1)
    if pos == -1: break
    snippet = text[pos-40:pos+200]
    if 'from' in snippet or 'size' in snippet or 'to' in snippet:
        print(f"Match {i}:")
        print(snippet)
        print("-" * 50)
