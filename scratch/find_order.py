with open(r'd:\Downloads\websitework\website\pokefun-nextjs-app\scratch\bb_extracted\dist\bundle.js', 'r', encoding='utf-8') as f:
    text = f.read()

pos = 0
for i in range(10):
    pos = text.find('rotation.reorder', pos + 1)
    if pos == -1:
        pos = text.find('.rotation.order', pos + 1)
    if pos == -1: break
    print(f"Rotation order match {i}:", text[pos-50:pos+150])
