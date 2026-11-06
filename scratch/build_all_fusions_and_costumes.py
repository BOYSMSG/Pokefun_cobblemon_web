import os
import sys

sys.path.append(r'd:\Downloads\websitework\website\pokefun-nextjs-app\scratch')
from build_all_official_models import convert_model

OUT_DIR = r'd:\Downloads\websitework\website\pokefun-nextjs-app\public\models'
os.makedirs(OUT_DIR, exist_ok=True)

JAR_BASE = r'd:\Downloads\websitework\website\pokefun-nextjs-app\scratch\cobblemon_jar_extracted'
STARLIGHT_BASE = r'd:\Downloads\websitework\website\fusionpokemons\starlightfusion-fabric-1.8.0'
COBBLEFUSION_BASE = r'd:\Downloads\websitework\website\fusionpokemons\Cobblefusions!'
CAFE_BASE = r'd:\Downloads\websitework\website\cosmeticpokemons\CobbleCafe [1.7] ( for tham use'

tasks = [
    # --- Starlight Fusions ---
    {
        "id": "necgross",
        "geo": os.path.join(STARLIGHT_BASE, r"assets\cobblemon\bedrock\pokemon\models\0800_necrozma\necgross.geo.json"),
        "tex": os.path.join(STARLIGHT_BASE, r"assets\cobblemon\textures\pokemon\0800_necrozma\necgross\necgross.png"),
        "anim": os.path.join(STARLIGHT_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0800_necrozma\necgross.animation.json"),
        "out": "fusion-necgross.glb"
    },
    {
        "id": "giraruledge",
        "geo": os.path.join(STARLIGHT_BASE, r"assets\cobblemon\bedrock\pokemon\models\0937_ceruledge\giraruledge.geo.json"),
        "tex": os.path.join(STARLIGHT_BASE, r"assets\cobblemon\textures\pokemon\0937_ceruledge\giraruledge\giraruledge.png"),
        "anim": os.path.join(STARLIGHT_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0937_ceruledge\giraruledge.animation.json"),
        "out": "fusion-giraruledge.glb"
    },
    {
        "id": "armartina",
        "geo": os.path.join(STARLIGHT_BASE, r"assets\cobblemon\bedrock\pokemon\models\0936_armarouge\armartina.geo.json"),
        "tex": os.path.join(STARLIGHT_BASE, r"assets\cobblemon\textures\pokemon\0936_armarouge\armartina\armartina.png"),
        "anim": os.path.join(STARLIGHT_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0936_armarouge\armartina.animation.json"),
        "out": "fusion-armartina.glb"
    },
    {
        "id": "darkzor",
        "geo": os.path.join(STARLIGHT_BASE, r"assets\cobblemon\bedrock\pokemon\models\0212_scizor\darkzor.geo.json"),
        "tex": os.path.join(STARLIGHT_BASE, r"assets\cobblemon\textures\pokemon\0212_scizor\darkzor\darkzor.png"),
        "anim": os.path.join(STARLIGHT_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0212_scizor\darkzor.animation.json"),
        "out": "fusion-darkzor.glb"
    },
    {
        "id": "espevoir",
        "geo": os.path.join(STARLIGHT_BASE, r"assets\cobblemon\bedrock\pokemon\models\0282_gardevoir\espevoir.geo.json"),
        "tex": os.path.join(STARLIGHT_BASE, r"assets\cobblemon\textures\pokemon\0282_gardevoir\espevoir\espevoir.png"),
        "anim": os.path.join(STARLIGHT_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0282_gardevoir\espevoir.animation.json"),
        "out": "fusion-espevoir.glb"
    },
    {
        "id": "miraiceus",
        "geo": os.path.join(STARLIGHT_BASE, r"assets\cobblemon\bedrock\pokemon\models\0493_arceus\miraiceus.geo.json"),
        "tex": os.path.join(STARLIGHT_BASE, r"assets\cobblemon\textures\pokemon\0493_arceus\miraiceus\miraiceus.png"),
        "anim": os.path.join(STARLIGHT_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0493_arceus\miraiceus.animation.json"),
        "out": "fusion-miraiceus.glb"
    },

    # --- Cobblefusions ---
    {
        "id": "venustoise",
        "geo": os.path.join(COBBLEFUSION_BASE, r"assets\cobblemon\bedrock\pokemon\models\0009_blastoise\venustoise.geo.json"),
        "tex": os.path.join(COBBLEFUSION_BASE, r"assets\cobblemon\textures\pokemon\0009_blastoise\venustoise.png"),
        "anim": os.path.join(COBBLEFUSION_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0009_blastoise\venustoise.animation.json"),
        "out": "fusion-venustoise.glb"
    },
    {
        "id": "umbrizard",
        "geo": os.path.join(COBBLEFUSION_BASE, r"assets\cobblemon\bedrock\pokemon\models\0006_charizard\umbrizard.geo.json"),
        "tex": os.path.join(COBBLEFUSION_BASE, r"assets\cobblemon\textures\pokemon\0006_charizard\umbrizard.png"),
        "anim": os.path.join(COBBLEFUSION_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0006_charizard\umbrizard.animation.json"),
        "out": "fusion-umbrizard.glb"
    },
    {
        "id": "bulbakoal",
        "geo": os.path.join(COBBLEFUSION_BASE, r"assets\cobblemon\bedrock\pokemon\models\0001_bulbasaur\bulbakoal.geo.json"),
        "tex": os.path.join(COBBLEFUSION_BASE, r"assets\cobblemon\textures\pokemon\0001_bulbasaur\bulbakoal.png"),
        "anim": os.path.join(COBBLEFUSION_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0001_bulbasaur\bulbakoal.animation.json"),
        "out": "fusion-bulbakoal.glb"
    },
    {
        "id": "togechu",
        "geo": os.path.join(COBBLEFUSION_BASE, r"assets\cobblemon\bedrock\pokemon\models\0172_pichu\togechu.geo.json"),
        "tex": os.path.join(COBBLEFUSION_BASE, r"assets\cobblemon\textures\pokemon\0172_pichu\togechu.png"),
        "anim": os.path.join(COBBLEFUSION_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0172_pichu\togechu.animation.json"),
        "out": "fusion-togechu.glb"
    },
    {
        "id": "eterneon",
        "geo": os.path.join(COBBLEFUSION_BASE, r"assets\cobblemon\bedrock\pokemon\models\0196_espeon\eterneon.geo.json"),
        "tex": os.path.join(COBBLEFUSION_BASE, r"assets\cobblemon\textures\pokemon\0196_espeon\eterneon.png"),
        "anim": os.path.join(COBBLEFUSION_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0196_espeon\eterneon.animation.json"),
        "out": "fusion-eterneon.glb"
    },
    {
        "id": "dragovoir",
        "geo": os.path.join(COBBLEFUSION_BASE, r"assets\cobblemon\bedrock\pokemon\models\0282_gardevoir\dragovoir.geo.json"),
        "tex": os.path.join(COBBLEFUSION_BASE, r"assets\cobblemon\textures\pokemon\0282_gardevoir\dragovoir.png"),
        "anim": os.path.join(COBBLEFUSION_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0282_gardevoir\dragovoir.animation.json"),
        "out": "fusion-dragovoir.glb"
    },
    {
        "id": "luxpa",
        "geo": os.path.join(COBBLEFUSION_BASE, r"assets\cobblemon\bedrock\pokemon\models\0405_luxray\luxpa.geo.json"),
        "tex": os.path.join(COBBLEFUSION_BASE, r"assets\cobblemon\textures\pokemon\0405_luxray\luxpa.png"),
        "anim": os.path.join(COBBLEFUSION_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0405_luxray\luxpa.animation.json"),
        "out": "fusion-luxpa.glb"
    },

    # --- CobbleCafe & Seasonal Costumes ---
    {
        "id": "meowscarada",
        "geo": os.path.join(CAFE_BASE, r"assets\cobblemon\bedrock\pokemon\models\cafe_meowscarada.geo.json"),
        "tex": os.path.join(CAFE_BASE, r"assets\cobblemon\textures\pokemon\meowscarada\cafe_meowscarada.png"),
        "anim": os.path.join(JAR_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0908_meowscarada\meowscarada.animation.json"),
        "out": "pokemon-meowscarada.glb"
    },
    {
        "id": "gardevoir",
        "geo": os.path.join(CAFE_BASE, r"assets\cobblemon\bedrock\pokemon\models\cafe_gardevoir.geo.json"),
        "tex": os.path.join(CAFE_BASE, r"assets\cobblemon\textures\pokemon\gardevoir\cafe_gardevoir.png"),
        "anim": os.path.join(JAR_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0282_gardevoir\gardevoir.animation.json"),
        "out": "pokemon-gardevoir.glb"
    },
    {
        "id": "dragonite",
        "geo": os.path.join(CAFE_BASE, r"assets\cobblemon\bedrock\pokemon\models\cafe_dragonite.geo.json"),
        "tex": os.path.join(CAFE_BASE, r"assets\cobblemon\textures\pokemon\dragonite\cafe_dragonite.png"),
        "anim": os.path.join(JAR_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0149_dragonite\dragonite.animation.json"),
        "out": "pokemon-dragonite.glb"
    },
    {
        "id": "salamence",
        "geo": os.path.join(CAFE_BASE, r"assets\cobblemon\bedrock\pokemon\models\cafe_salamence.geo.json"),
        "tex": os.path.join(CAFE_BASE, r"assets\cobblemon\textures\pokemon\salamence\cafe_salamence.png"),
        "anim": os.path.join(JAR_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0373_salamence\salamence.animation.json"),
        "out": "pokemon-salamence.glb"
    },
    {
        "id": "flygon",
        "geo": os.path.join(CAFE_BASE, r"assets\cobblemon\bedrock\pokemon\models\cafe_flygon.geo.json"),
        "tex": os.path.join(CAFE_BASE, r"assets\cobblemon\textures\pokemon\flygon\cafe_flygon.png"),
        "anim": os.path.join(JAR_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0330_flygon\flygon.animation.json"),
        "out": "pokemon-flygon.glb"
    },
    {
        "id": "serperior",
        "geo": os.path.join(CAFE_BASE, r"assets\cobblemon\bedrock\pokemon\models\cafe_serperior.geo.json"),
        "tex": os.path.join(CAFE_BASE, r"assets\cobblemon\textures\pokemon\serperior\cafe_serperior.png"),
        "anim": os.path.join(JAR_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0497_serperior\serperior.animation.json"),
        "out": "pokemon-serperior.glb"
    },
    {
        "id": "braixen",
        "geo": os.path.join(CAFE_BASE, r"assets\cobblemon\bedrock\pokemon\models\cafe_braixen.geo.json"),
        "tex": os.path.join(CAFE_BASE, r"assets\cobblemon\textures\pokemon\braixen\cafe_braixen.png"),
        "anim": os.path.join(JAR_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0654_braixen\braixen.animation.json"),
        "out": "pokemon-braixen.glb"
    },
    {
        "id": "kimono_mew",
        "geo": os.path.join(CAFE_BASE, r"assets\cobblemon\bedrock\pokemon\models\kimono_mew.geo.json"),
        "tex": os.path.join(CAFE_BASE, r"assets\cobblemon\textures\pokemon\mew\kimono_mew.png"),
        "anim": os.path.join(JAR_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0151_mew\mew.animation.json"),
        "out": "costume-kimono-mew.glb"
    },
    {
        "id": "lunar_rayquaza",
        "geo": os.path.join(CAFE_BASE, r"assets\cobblemon\bedrock\pokemon\models\lunar_rayquaza.geo.json"),
        "tex": os.path.join(CAFE_BASE, r"assets\cobblemon\textures\pokemon\rayquaza\lunar_rayquaza.png"),
        "anim": os.path.join(JAR_BASE, r"assets\cobblemon\bedrock\pokemon\animations\0384_rayquaza\rayquaza.animation.json"),
        "out": "costume-lunar-rayquaza.glb"
    }
]

converted_count = 0
for t in tasks:
    out_glb = os.path.join(OUT_DIR, t["out"])
    geo = t["geo"]
    tex = t["tex"]
    anim = t["anim"] if os.path.exists(t["anim"]) else None
    
    if os.path.exists(geo) and os.path.exists(tex):
        try:
            convert_model(geo, tex, anim, out_glb)
            sz = os.path.getsize(out_glb) / 1024.0
            print(f"[OK] {t['id']} -> {t['out']} ({sz:.1f} KB)")
            converted_count += 1
        except Exception as e:
            print(f"[ERROR] {t['id']}: {e}")
    else:
        print(f"[MISSING] {t['id']}: geo={os.path.exists(geo)}, tex={os.path.exists(tex)}")

print(f"\nAll Done! Successfully converted {converted_count}/{len(tasks)} fusion and costume models.")
