import subprocess, os

edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
if not os.path.exists(edge_path):
    edge_path = r'C:\Program Files\Microsoft\Edge\Application\msedge.exe'

user_data = os.path.join(os.environ.get('TEMP', r'C:\Temp'), 'edge_verify_split_fresh')
artifact_dir = r'C:\Users\Shifan Gouri\.gemini\antigravity\brain\8a9d4567-b072-43a0-9cae-dea5e590514b'

out_desk = os.path.join(artifact_dir, 'homepage_split_desktop.png')
out_mob = os.path.join(artifact_dir, 'homepage_split_mobile.png')
out_comm = os.path.join(artifact_dir, 'community_white_desktop.png')

print("Capturing Desktop Homepage...")
subprocess.run([
    edge_path, '--headless', '--disable-gpu', f'--user-data-dir={user_data}',
    '--window-size=1440,900', '--virtual-time-budget=4000', f'--screenshot={out_desk}',
    'http://localhost:3000/'
])

print("Capturing Desktop Community...")
subprocess.run([
    edge_path, '--headless', '--disable-gpu', f'--user-data-dir={user_data}',
    '--window-size=1440,900', '--virtual-time-budget=4000', f'--screenshot={out_comm}',
    'http://localhost:3000/community'
])

print("Capturing Mobile Homepage...")
subprocess.run([
    edge_path, '--headless', '--disable-gpu', f'--user-data-dir={user_data}',
    '--window-size=390,844', '--virtual-time-budget=4000', f'--screenshot={out_mob}',
    'http://localhost:3000/'
])

print("Verification screenshots captured successfully!")
