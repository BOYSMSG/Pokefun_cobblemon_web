with open(r'd:\Downloads\websitework\website\pokefun-nextjs-app\scratch\bb_extracted\dist\bundle.js', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('r.pivot&&(l.origin[0]*=-1)')
print("Match 4 full snippet:")
print(text[pos-100:pos+1500])
