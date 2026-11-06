import subprocess
import time
import os

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
BRAIN = r"C:\Users\Shifan Gouri\.gemini\antigravity\brain\8a9d4567-b072-43a0-9cae-dea5e590514b"

screens = [
    ("model_pose_pikachu.png", "http://localhost:3000/?pokemon=pikachu", (1400, 900)),
    ("model_pose_lucario.png", "http://localhost:3000/?pokemon=lucario", (1400, 900)),
    ("model_pose_gengar.png", "http://localhost:3000/?pokemon=gengar", (1400, 900)),
    ("mobile_homepage_top.png", "http://localhost:3000/", (390, 844)),
    ("mobile_homepage_pikachu.png", "http://localhost:3000/?pokemon=pikachu", (390, 844)),
    ("mobile_homepage_eevee.png", "http://localhost:3000/?pokemon=eevee", (390, 844)),
]

for fname, url, (w, h) in screens:
    out_png = os.path.join(BRAIN, fname)
    cmd = [
        EDGE,
        "--headless",
        "--disable-gpu",
        f"--window-size={w},{h}",
        f"--screenshot={out_png}",
        url
    ]
    try:
        subprocess.run(cmd, timeout=30)
        time.sleep(0.5)
        if os.path.exists(out_png):
            print(f"Captured {fname} ({os.path.getsize(out_png)} bytes)")
        else:
            print(f"File not created: {fname}")
    except Exception as e:
        print(f"Error {fname}: {e}")

print("Done taking screenshots!")
