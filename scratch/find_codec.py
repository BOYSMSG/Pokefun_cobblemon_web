with open(r'd:\Downloads\websitework\website\pokefun-nextjs-app\scratch\bb_extracted\dist\bundle.js', 'r', encoding='utf-8') as f:
    text = f.read()

for query in ['Codec("bedrock"', "Codec('bedrock'", 'new Codec("bedrock"']:
    pos = text.find(query)
    if pos != -1:
        print(f"Found {query} at {pos}:")
        print(text[pos:pos+1500])
        break
