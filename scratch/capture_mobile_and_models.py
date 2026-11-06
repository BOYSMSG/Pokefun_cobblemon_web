import subprocess
import time
import os

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
BRAIN = r"C:\Users\Shifan Gouri\.gemini\antigravity\brain\8a9d4567-b072-43a0-9cae-dea5e590514b"

# Test desktop models
models_to_test = ["pikachu", "eevee", "lucario", "garchomp", "blastoise", "charizard"]

for m in models_to_test:
    out_png = os.path.join(BRAIN, f"model_pose_{m}.png")
    url = f"http://localhost:3000/?pokemon={m}"
    cmd = [
        EDGE,
        "--headless",
        "--disable-gpu",
        "--window-size=1400,900",
        f"--screenshot={out_png}",
        url
    ]
    subprocess.run(cmd, timeout=20)
    time.sleep(1)
    if os.path.exists(out_png):
        print(f"Captured {m} -> {out_png}")
    else:
        print(f"Failed to capture {m}")

# Capture mobile view (iPhone viewport 390x844)
mobile_tests = [
    ("mobile_homepage_top.png", "http://localhost:3000/"),
    ("mobile_homepage_pikachu.png", "http://localhost:3000/?pokemon=pikachu"),
    ("mobile_homepage_lucario.png", "http://localhost:3000/?pokemon=lucario")
]

for fname, url in mobile_tests:
    out_png = os.path.join(BRAIN, fname)
    cmd = [
        EDGE,
        "--headless",
        "--disable-gpu",
        "--window-size=390,844",
        f"--screenshot={out_png}",
        url
    ]
    subprocess.run(cmd, timeout=20)
    time.sleep(1)
    if os.path.exists(out_png):
        print(f"Captured mobile {fname} -> {out_png}")

print("All screenshots taken!")
