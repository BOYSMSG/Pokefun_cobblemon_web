import subprocess
import os

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
BRAIN = r"C:\Users\Shifan Gouri\.gemini\antigravity\brain\8a9d4567-b072-43a0-9cae-dea5e590514b"
out_png = os.path.join(BRAIN, "audit_verify_greninja_delayed.png")

cmd = [
    EDGE,
    "--headless",
    "--disable-gpu",
    "--virtual-time-budget=8000",
    "--window-size=1400,900",
    f"--screenshot={out_png}",
    "http://localhost:3000/?pokemon=greninja"
]

subprocess.run(cmd, timeout=30)
if os.path.exists(out_png):
    print("Captured delayed greninja:", os.path.getsize(out_png))
