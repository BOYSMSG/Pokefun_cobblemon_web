import os
import sys

sys.path.append(r'C:\Users\Shifan Gouri\.gemini\antigravity\brain\8a9d4567-b072-43a0-9cae-dea5e590514b\scratch')
from convert_venustoise_to_glb import convert_model

CACHE_DIR = r'd:\Downloads\websitework\website\pokefun-nextjs-app\scratch\cobblemon_raw'
OUT_DIR = r'd:\Downloads\websitework\website\pokefun-nextjs-app\public\models'

official_roster = [
    ("charizard", "Charizard", "Fire / Flying", "Official Cobblemon"),
    ("blastoise", "Blastoise", "Water", "Official Cobblemon"),
    ("lucario", "Lucario", "Fighting / Steel", "Official Cobblemon"),
    ("lapras", "Lapras", "Water / Ice", "Official Cobblemon"),
    ("gengar", "Gengar", "Ghost / Poison", "Official Cobblemon"),
    ("snorlax", "Snorlax", "Normal", "Official Cobblemon"),
    ("rayquaza", "Rayquaza", "Dragon / Flying", "Legendary Cobblemon"),
    ("mewtwo", "Mewtwo", "Psychic", "Legendary Cobblemon"),
    ("greninja", "Greninja", "Water / Dark", "Official Cobblemon"),
]

for name, display_name, poke_type, badge in official_roster:
    geo_file = os.path.join(CACHE_DIR, f"{name}.geo.json")
    tex_file = os.path.join(CACHE_DIR, f"{name}.png")
    anim_file = os.path.join(CACHE_DIR, f"{name}.animation.json")
    out_glb = os.path.join(OUT_DIR, f"official-{name}.glb")
    
    if os.path.exists(geo_file) and os.path.exists(tex_file):
        try:
            convert_model(geo_file, tex_file, anim_file if os.path.exists(anim_file) else None, out_glb)
            sz = os.path.getsize(out_glb) / 1024.0
            print(f"Rebuilt animated {name} -> official-{name}.glb ({sz:.1f} KB)")
        except Exception as e:
            print(f"Error {name}: {e}")

print("Done rebuilding animated Cobblemon models!")
