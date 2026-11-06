import subprocess
import os

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
BRAIN = r"C:\Users\Shifan Gouri\.gemini\antigravity\brain\8a9d4567-b072-43a0-9cae-dea5e590514b"
out_png = os.path.join(BRAIN, "audit_verify_pikachu_delayed.png")

# Using --virtual-time-budget=8000 gives 8 seconds of browser time for WebGL to render!
cmd = [
    EDGE,
    "--headless",
    "--disable-gpu",
    "--virtual-time-budget=8000",
    "--window-size=1400,900",
    f"--screenshot={out_png}",
    "http://localhost:3000/?pokemon=pikachu"
]

subprocess.run(cmd, timeout=30)
if os.path.exists(out_png):
    print("Captured delayed pikachu:", os.path.getsize(out_png))
else:
    print("Not created")
