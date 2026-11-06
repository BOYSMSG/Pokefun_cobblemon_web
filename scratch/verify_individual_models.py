import subprocess, os, time

edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
if not os.path.exists(edge_path):
    edge_path = r'C:\Program Files\Microsoft\Edge\Application\msedge.exe'

user_data_base = os.path.join(os.environ.get('TEMP', r'C:\Temp'), 'edge_verify_individual_models')
artifact_dir = r'C:\Users\Shifan Gouri\.gemini\antigravity\brain\8a9d4567-b072-43a0-9cae-dea5e590514b'

test_models = [
    "charizard",
    "blastoise",
    "lucario",
    "rayquaza",
    "mewtwo",
    "greninja"
]

for m in test_models:
    out_img = os.path.join(artifact_dir, f'model_verify_{m}.png')
    url = f'http://localhost:3000/?pokemon={m}'
    u_dir = f'{user_data_base}_{m}'
    print(f"Capturing {m}...")
    subprocess.run([
        edge_path, '--headless', '--disable-gpu', f'--user-data-dir={u_dir}',
        '--window-size=1440,900', '--virtual-time-budget=4000', f'--screenshot={out_img}',
        url
    ])
    print(f"Saved {out_img}")

print("All individual model screenshots captured!")
