import subprocess, os, time

edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
if not os.path.exists(edge_path):
    edge_path = r'C:\Program Files\Microsoft\Edge\Application\msedge.exe'

user_data = os.path.join(os.environ.get('TEMP', r'C:\Temp'), 'edge_verify_charizard')
artifact_dir = r'C:\Users\Shifan Gouri\.gemini\antigravity\brain\8a9d4567-b072-43a0-9cae-dea5e590514b'
out_charizard = os.path.join(artifact_dir, 'official_charizard_hero.png')

subprocess.run([
    edge_path, '--headless', '--disable-gpu', f'--user-data-dir={user_data}',
    '--window-size=1440,900', '--virtual-time-budget=4000', f'--screenshot={out_charizard}',
    'http://localhost:3000/'
])

print("Captured charizard:", out_charizard)
