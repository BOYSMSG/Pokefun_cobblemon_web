import subprocess
import os

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
BRAIN = r"C:\Users\Shifan Gouri\.gemini\antigravity\brain\8a9d4567-b072-43a0-9cae-dea5e590514b"
out_png = os.path.join(BRAIN, "verify_fixed_necgross.png")

cmd = [
    EDGE,
    "--headless",
    "--disable-gpu",
    "--window-size=1400,900",
    f"--screenshot={out_png}",
    "http://localhost:3000/?pokemon=necgross"
]

subprocess.run(cmd, timeout=15)
if os.path.exists(out_png):
    print("Captured fixed necgross:", os.path.getsize(out_png))
else:
    print("Failed")
