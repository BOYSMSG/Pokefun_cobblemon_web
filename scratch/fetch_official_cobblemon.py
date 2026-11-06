import os
import sys
import urllib.request

sys.path.append(r'C:\Users\Shifan Gouri\.gemini\antigravity\brain\8a9d4567-b072-43a0-9cae-dea5e590514b\scratch')
from convert_venustoise_to_glb import convert_model

CACHE_DIR = r'd:\Downloads\websitework\website\pokefun-nextjs-app\scratch\cobblemon_raw'
OUT_DIR = r'd:\Downloads\websitework\website\pokefun-nextjs-app\public\models'
os.makedirs(CACHE_DIR, exist_ok=True)
os.makedirs(OUT_DIR, exist_ok=True)

official_roster = [
    ("0006_charizard", "charizard", "Charizard", "Fire / Flying", "Official Cobblemon"),
    ("0384_rayquaza", "rayquaza", "Rayquaza", "Dragon / Flying", "Legendary Cobblemon"),
    ("0150_mewtwo", "mewtwo", "Mewtwo", "Psychic", "Legendary Cobblemon"),
    ("0151_mew", "mew", "Mew", "Psychic", "Mythical Cobblemon"),
    ("0658_greninja", "greninja", "Greninja", "Water / Dark", "Official Cobblemon"),
    ("0448_lucario", "lucario", "Lucario", "Fighting / Steel", "Official Cobblemon"),
    ("0094_gengar", "gengar", "Gengar", "Ghost / Poison", "Official Cobblemon"),
    ("0131_lapras", "lapras", "Lapras", "Water / Ice", "Official Cobblemon"),
    ("0143_snorlax", "snorlax", "Snorlax", "Normal", "Official Cobblemon"),
    ("0009_blastoise", "blastoise", "Blastoise", "Water", "Official Cobblemon"),
]

base_url = "https://gitlab.com/cable-mc/cobblemon/-/raw/main/common/src/main/resources/assets/cobblemon/"

downloaded = []
for folder, name, display_name, poke_type, badge in official_roster:
    geo_url = f"{base_url}bedrock/pokemon/models/{folder}/{name}.geo.json"
    tex_url = f"{base_url}textures/pokemon/{folder}/{name}.png"
    
    geo_file = os.path.join(CACHE_DIR, f"{name}.geo.json")
    tex_file = os.path.join(CACHE_DIR, f"{name}.png")
    out_glb = os.path.join(OUT_DIR, f"official-{name}.glb")
    
    try:
        if not os.path.exists(geo_file):
            req = urllib.request.Request(geo_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as res:
                with open(geo_file, "wb") as f:
                    f.write(res.read())
                    
        if not os.path.exists(tex_file):
            req = urllib.request.Request(tex_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as res:
                with open(tex_file, "wb") as f:
                    f.write(res.read())
                    
        convert_model(geo_file, tex_file, None, out_glb)
        sz = os.path.getsize(out_glb) / 1024.0
        print(f"Generated official-{name}.glb ({sz:.1f} KB)")
        downloaded.append({
            "id": f"official-{name}",
            "name": display_name,
            "type": poke_type,
            "badge": badge,
            "path": f"/models/official-{name}.glb",
            "rotY": 3.4
        })
    except Exception as e:
        print(f"Failed {name}: {e}")

print(f"\nSuccessfully created {len(downloaded)} official Cobblemon models!")
