import subprocess, os

edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
if not os.path.exists(edge_path):
    edge_path = r'C:\Program Files\Microsoft\Edge\Application\msedge.exe'

user_data = os.path.join(os.environ.get('TEMP', r'C:\Temp'), 'edge_verify_features_fresh')
artifact_dir = r'C:\Users\Shifan Gouri\.gemini\antigravity\brain\8a9d4567-b072-43a0-9cae-dea5e590514b'

out_hero = os.path.join(artifact_dir, 'hero_face_forward_desktop.png')
out_comm = os.path.join(artifact_dir, 'sidebar_guides_desktop.png')

print("Capturing Hero Desktop...")
subprocess.run([
    edge_path, '--headless', '--disable-gpu', f'--user-data-dir={user_data}',
    '--window-size=1440,900', '--virtual-time-budget=4000', f'--screenshot={out_hero}',
    'http://localhost:3000/'
])

print("Capturing Sidebar Guides...")
subprocess.run([
    edge_path, '--headless', '--disable-gpu', f'--user-data-dir={user_data}',
    '--window-size=1440,900', '--virtual-time-budget=4000', f'--screenshot={out_comm}',
    'http://localhost:3000/community'
])

print("All screenshots captured!")
