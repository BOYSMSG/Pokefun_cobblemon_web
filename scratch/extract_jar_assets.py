import zipfile
import os

jar_path = r"D:\Downloads\archive-2026-09-13T123458+0200\Cobblemon-fabric-1.7.3+1.21.1.jar"
out_dir = r"d:\Downloads\websitework\website\pokefun-nextjs-app\scratch\cobblemon_jar_extracted"

os.makedirs(out_dir, exist_ok=True)

with zipfile.ZipFile(jar_path, 'r') as z:
    for name in z.namelist():
        if name.startswith("assets/cobblemon/bedrock/pokemon/"):
            # Extract models, textures, animations, posers, resolvers
            z.extract(name, out_dir)

print("Extraction completed successfully!")
