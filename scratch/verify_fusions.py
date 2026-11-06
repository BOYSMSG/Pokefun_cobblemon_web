import subprocess
import os

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
BRAIN = r"C:\Users\Shifan Gouri\.gemini\antigravity\brain\8a9d4567-b072-43a0-9cae-dea5e590514b"

test_fusions = ["giraruledge", "umbrizard", "venustoise", "meowscarada", "miraiceus"]

for m in test_fusions:
    out_png = os.path.join(BRAIN, f"verify_fusion_{m}.png")
    cmd = [
        EDGE,
        "--headless",
        "--disable-gpu",
        "--window-size=1400,900",
        f"--screenshot={out_png}",
        f"http://localhost:3000/?pokemon={m}"
    ]
    try:
        subprocess.run(cmd, timeout=15)
        if os.path.exists(out_png):
            print(f"[OK] {m}: {os.path.getsize(out_png)} bytes")
        else:
            print(f"[FAIL] {m}")
    except Exception as e:
        print(f"[ERROR] {m}: {e}")

print("Fusion verification screenshots complete!")
