import os
import sys
import glob

# Ensure we can import convert_model
sys.path.append(r'C:\Users\Shifan Gouri\.gemini\antigravity\brain\8a9d4567-b072-43a0-9cae-dea5e590514b\scratch')
from convert_venustoise_to_glb import convert_model

OUT_DIR = r'd:\Downloads\websitework\website\pokefun-nextjs-app\public\models'
os.makedirs(OUT_DIR, exist_ok=True)

# List of targets: (id, name, type, badge, geo_path, tex_path, rot_offset)
# rot_offset: Math.PI means flip 180 degrees so front faces +Z (towards Three.js camera)
models_to_convert = [
    # --- Custom Fusions (Cobblefusions!) ---
    {
        "id": "venustoise",
        "name": "Venustoise",
        "type": "Grass / Water",
        "badge": "DNA Fusion",
        "geo": r"d:\Downloads\websitework\website\fusionpokemons\Cobblefusions!\assets\cobblemon\bedrock\pokemon\models\0009_blastoise\venustoise.geo.json",
        "tex": r"d:\Downloads\websitework\website\fusionpokemons\Cobblefusions!\assets\cobblemon\textures\pokemon\0009_blastoise\venustoise.png",
        "out": "fusion-venustoise.glb"
    },
    {
        "id": "umbrizard",
        "name": "Umbrizard",
        "type": "Dark / Fire",
        "badge": "DNA Fusion",
        "geo": r"d:\Downloads\websitework\website\fusionpokemons\Cobblefusions!\assets\cobblemon\bedrock\pokemon\models\0006_charizard\umbrizard.geo.json",
        "tex": r"d:\Downloads\websitework\website\fusionpokemons\Cobblefusions!\assets\cobblemon\textures\pokemon\0006_charizard\umbrizard.png",
        "out": "fusion-umbrizard.glb"
    },
    {
        "id": "bulbakoal",
        "name": "Bulbakoal",
        "type": "Grass / Fire",
        "badge": "DNA Fusion",
        "geo": r"d:\Downloads\websitework\website\fusionpokemons\Cobblefusions!\assets\cobblemon\bedrock\pokemon\models\0001_bulbasaur\bulbakoal.geo.json",
        "tex": r"d:\Downloads\websitework\website\fusionpokemons\Cobblefusions!\assets\cobblemon\textures\pokemon\0001_bulbasaur\bulbakoal.png",
        "out": "fusion-bulbakoal.glb"
    },
    {
        "id": "togechu",
        "name": "Togechu",
        "type": "Electric / Fairy",
        "badge": "DNA Fusion",
        "geo": r"d:\Downloads\websitework\website\fusionpokemons\Cobblefusions!\assets\cobblemon\bedrock\pokemon\models\0172_pichu\togechu.geo.json",
        "tex": r"d:\Downloads\websitework\website\fusionpokemons\Cobblefusions!\assets\cobblemon\textures\pokemon\0172_pichu\togechu.png",
        "out": "fusion-togechu.glb"
    },
    {
        "id": "eterneon",
        "name": "Eterneon",
        "type": "Psychic / Dragon",
        "badge": "DNA Fusion",
        "geo": r"d:\Downloads\websitework\website\fusionpokemons\Cobblefusions!\assets\cobblemon\bedrock\pokemon\models\0196_espeon\eterneon.geo.json",
        "tex": r"d:\Downloads\websitework\website\fusionpokemons\Cobblefusions!\assets\cobblemon\textures\pokemon\0196_espeon\eterneon.png",
        "out": "fusion-eterneon.glb"
    },
    {
        "id": "dragovoir",
        "name": "Dragovoir",
        "type": "Dragon / Fairy",
        "badge": "DNA Fusion",
        "geo": r"d:\Downloads\websitework\website\fusionpokemons\Cobblefusions!\assets\cobblemon\bedrock\pokemon\models\0282_gardevoir\dragovoir.geo.json",
        "tex": r"d:\Downloads\websitework\website\fusionpokemons\Cobblefusions!\assets\cobblemon\textures\pokemon\0282_gardevoir\dragovoir.png",
        "out": "fusion-dragovoir.glb"
    },
    {
        "id": "luxpa",
        "name": "Luxpa",
        "type": "Electric / Dark",
        "badge": "DNA Fusion",
        "geo": r"d:\Downloads\websitework\website\fusionpokemons\Cobblefusions!\assets\cobblemon\bedrock\pokemon\models\0405_luxray\luxpa.geo.json",
        "tex": r"d:\Downloads\websitework\website\fusionpokemons\Cobblefusions!\assets\cobblemon\textures\pokemon\0405_luxray\luxpa.png",
        "out": "fusion-luxpa.glb"
    },
    {
        "id": "mimikvee",
        "name": "Mimikvee",
        "type": "Ghost / Fairy",
        "badge": "DNA Fusion",
        "geo": r"d:\Downloads\websitework\website\fusionpokemons\Cobblefusions!\assets\cobblemon\bedrock\pokemon\models\0778_mimikyu\mimikvee.geo.json",
        "tex": r"d:\Downloads\websitework\website\fusionpokemons\Cobblefusions!\assets\cobblemon\textures\pokemon\0778_mimikyu\mimikvee.png",
        "out": "fusion-mimikvee.glb"
    },

    # --- Starlight Fusions ---
    {
        "id": "darkzor",
        "name": "Darkzor",
        "type": "Bug / Dark",
        "badge": "Starlight Fusion",
        "geo": r"d:\Downloads\websitework\website\fusionpokemons\starlightfusion-fabric-1.8.0\assets\cobblemon\bedrock\pokemon\models\0212_scizor\darkzor.geo.json",
        "tex": r"d:\Downloads\websitework\website\fusionpokemons\starlightfusion-fabric-1.8.0\assets\cobblemon\textures\pokemon\0212_scizor\darkzor\darkzor.png",
        "out": "fusion-darkzor.glb"
    },
    {
        "id": "giraruledge",
        "name": "Giraruledge",
        "type": "Ghost / Dragon",
        "badge": "Starlight Fusion",
        "geo": r"d:\Downloads\websitework\website\fusionpokemons\starlightfusion-fabric-1.8.0\assets\cobblemon\bedrock\pokemon\models\0937_ceruledge\giraruledge.geo.json",
        "tex": r"d:\Downloads\websitework\website\fusionpokemons\starlightfusion-fabric-1.8.0\assets\cobblemon\textures\pokemon\0937_ceruledge\giraruledge\giraruledge.png",
        "out": "fusion-giraruledge.glb"
    },
    {
        "id": "miraiceus",
        "name": "Miraiceus",
        "type": "Normal / Electric",
        "badge": "Legendary Fusion",
        "geo": r"d:\Downloads\websitework\website\fusionpokemons\starlightfusion-fabric-1.8.0\assets\cobblemon\bedrock\pokemon\models\0493_arceus\miraiceus.geo.json",
        "tex": r"d:\Downloads\websitework\website\fusionpokemons\starlightfusion-fabric-1.8.0\assets\cobblemon\textures\pokemon\0493_arceus\miraiceus\miraiceus.png",
        "out": "fusion-miraiceus.glb"
    },
    {
        "id": "necgross",
        "name": "Necgross",
        "type": "Psychic / Steel",
        "badge": "Ultra Fusion",
        "geo": r"d:\Downloads\websitework\website\fusionpokemons\starlightfusion-fabric-1.8.0\assets\cobblemon\bedrock\pokemon\models\0800_necrozma\necgross.geo.json",
        "tex": r"d:\Downloads\websitework\website\fusionpokemons\starlightfusion-fabric-1.8.0\assets\cobblemon\textures\pokemon\0800_necrozma\necgross\necgross.png",
        "out": "fusion-necgross.glb"
    },
    {
        "id": "armartina",
        "name": "Armartina",
        "type": "Fire / Ghost",
        "badge": "Starlight Fusion",
        "geo": r"d:\Downloads\websitework\website\fusionpokemons\starlightfusion-fabric-1.8.0\assets\cobblemon\bedrock\pokemon\models\0936_armarouge\armartina.geo.json",
        "tex": r"d:\Downloads\websitework\website\fusionpokemons\starlightfusion-fabric-1.8.0\assets\cobblemon\textures\pokemon\0936_armarouge\armartina\armartina.png",
        "out": "fusion-armartina.glb"
    },
    {
        "id": "espevoir",
        "name": "Espevoir",
        "type": "Psychic / Fairy",
        "badge": "Starlight Fusion",
        "geo": r"d:\Downloads\websitework\website\fusionpokemons\starlightfusion-fabric-1.8.0\assets\cobblemon\bedrock\pokemon\models\0282_gardevoir\espevoir.geo.json",
        "tex": r"d:\Downloads\websitework\website\fusionpokemons\starlightfusion-fabric-1.8.0\assets\cobblemon\textures\pokemon\0282_gardevoir\espevoir\espevoir.png",
        "out": "fusion-espevoir.glb"
    },
    {
        "id": "flarevoir",
        "name": "Flarevoir",
        "type": "Fire / Fairy",
        "badge": "Starlight Fusion",
        "geo": r"d:\Downloads\websitework\website\fusionpokemons\starlightfusion-fabric-1.8.0\assets\cobblemon\bedrock\pokemon\models\0282_gardevoir\flarevoir.geo.json",
        "tex": r"d:\Downloads\websitework\website\fusionpokemons\starlightfusion-fabric-1.8.0\assets\cobblemon\textures\pokemon\0282_gardevoir\flarevoir\flarevoir.png",
        "out": "fusion-flarevoir.glb"
    },
    {
        "id": "glacevoir",
        "name": "Glacevoir",
        "type": "Ice / Fairy",
        "badge": "Starlight Fusion",
        "geo": r"d:\Downloads\websitework\website\fusionpokemons\starlightfusion-fabric-1.8.0\assets\cobblemon\bedrock\pokemon\models\0282_gardevoir\glacevoir.geo.json",
        "tex": r"d:\Downloads\websitework\website\fusionpokemons\starlightfusion-fabric-1.8.0\assets\cobblemon\textures\pokemon\0282_gardevoir\glacevoir\glacevoir.png",
        "out": "fusion-glacevoir.glb"
    },

    # --- Classic / Popular Cobblemon ---
    {
        "id": "dragonite",
        "name": "Dragonite",
        "type": "Dragon / Flying",
        "badge": "Classic Cobblemon",
        "geo": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\bedrock\pokemon\models\cafe_dragonite.geo.json",
        "tex": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\textures\pokemon\dragonite\cafe_dragonite.png",
        "out": "pokemon-dragonite.glb"
    },
    {
        "id": "salamence",
        "name": "Salamence",
        "type": "Dragon / Flying",
        "badge": "Classic Cobblemon",
        "geo": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\bedrock\pokemon\models\cafe_salamence.geo.json",
        "tex": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\textures\pokemon\salamence\cafe_salamence.png",
        "out": "pokemon-salamence.glb"
    },
    {
        "id": "gardevoir",
        "name": "Gardevoir",
        "type": "Psychic / Fairy",
        "badge": "Classic Cobblemon",
        "geo": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\bedrock\pokemon\models\cafe_gardevoir.geo.json",
        "tex": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\textures\pokemon\gardevoir\cafe_gardevoir.png",
        "out": "pokemon-gardevoir.glb"
    },
    {
        "id": "flygon",
        "name": "Flygon",
        "type": "Ground / Dragon",
        "badge": "Classic Cobblemon",
        "geo": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\bedrock\pokemon\models\cafe_flygon.geo.json",
        "tex": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\textures\pokemon\flygon\cafe_flygon.png",
        "out": "pokemon-flygon.glb"
    },
    {
        "id": "meowscarada",
        "name": "Meowscarada",
        "type": "Grass / Dark",
        "badge": "Gen 9 Starter",
        "geo": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\bedrock\pokemon\models\cafe_meowscarada.geo.json",
        "tex": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\textures\pokemon\meowscarada\cafe_meowscarada.png",
        "out": "pokemon-meowscarada.glb"
    },
    {
        "id": "braixen",
        "name": "Braixen",
        "type": "Fire",
        "badge": "Kalos Form",
        "geo": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\bedrock\pokemon\models\cafe_braixen.geo.json",
        "tex": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\textures\pokemon\braixen\cafe_braixen.png",
        "out": "pokemon-braixen.glb"
    },
    {
        "id": "chikorita",
        "name": "Chikorita",
        "type": "Grass",
        "badge": "Johto Starter",
        "geo": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\bedrock\pokemon\models\cafe_chikorita.geo.json",
        "tex": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\textures\pokemon\chikorita\cafe_chikorita.png",
        "out": "pokemon-chikorita.glb"
    },
    {
        "id": "cyndaquil",
        "name": "Cyndaquil",
        "type": "Fire",
        "badge": "Johto Starter",
        "geo": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\bedrock\pokemon\models\cafe_cyndaquil.geo.json",
        "tex": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\textures\pokemon\cyndaquil\cafe_cyndaquil.png",
        "out": "pokemon-cyndaquil.glb"
    },
    {
        "id": "cleffa",
        "name": "Cleffa",
        "type": "Fairy",
        "badge": "Baby Pokemon",
        "geo": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\bedrock\pokemon\models\cafe_cleffa.geo.json",
        "tex": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\textures\pokemon\cleffa\cafe_cleffa.png",
        "out": "pokemon-cleffa.glb"
    },
    {
        "id": "arbok",
        "name": "Arbok",
        "type": "Poison",
        "badge": "Kanto Classic",
        "geo": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\bedrock\pokemon\models\cafe_arbok.geo.json",
        "tex": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\textures\pokemon\arbok\cafe_arbok.png",
        "out": "pokemon-arbok.glb"
    },
    {
        "id": "serperior",
        "name": "Serperior",
        "type": "Grass",
        "badge": "Unova Royal",
        "geo": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\bedrock\pokemon\models\cafe_serperior.geo.json",
        "tex": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\textures\pokemon\serperior\cafe_serperior.png",
        "out": "pokemon-serperior.glb"
    },
    {
        "id": "delphox",
        "name": "Delphox",
        "type": "Fire / Psychic",
        "badge": "Kalos Final Form",
        "geo": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\bedrock\pokemon\models\cafe_delphox.geo.json",
        "tex": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\textures\pokemon\delphox\cafe_delphox.png",
        "out": "pokemon-delphox.glb"
    },
    {
        "id": "rowlet",
        "name": "Rowlet",
        "type": "Grass / Flying",
        "badge": "Alola Starter",
        "geo": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\bedrock\pokemon\models\cafe_rowlet.geo.json",
        "tex": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\textures\pokemon\rowlet\cafe_rowlet.png",
        "out": "pokemon-rowlet.glb"
    },
    {
        "id": "mawile",
        "name": "Mawile",
        "type": "Steel / Fairy",
        "badge": "Hoenn Deceiver",
        "geo": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\bedrock\pokemon\models\cafe_mawile.geo.json",
        "tex": r"d:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use\assets\cobblemon\textures\pokemon\mawile\cafe_mawile.png",
        "out": "pokemon-mawile.glb"
    }
]

valid_list = []
for m in models_to_convert:
    geo = m["geo"]
    tex = m["tex"]
    out = os.path.join(OUT_DIR, m["out"])
    
    if not os.path.exists(geo):
        print(f"Skipping {m['id']}: missing geo {geo}")
        continue
    if not os.path.exists(tex):
        print(f"Skipping {m['id']}: missing tex {tex}")
        continue
        
    try:
        convert_model(geo, tex, None, out)
        sz_kb = os.path.getsize(out) / 1024.0
        print(f"Converted {m['name']} -> {m['out']} ({sz_kb:.1f} KB)")
        valid_list.append(m)
    except Exception as e:
        print(f"Error converting {m['name']}: {e}")

print(f"\nSuccessfully generated {len(valid_list)} Pokemon GLB models!")
