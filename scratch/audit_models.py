import subprocess
import time
import os

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
BRAIN = r"C:\Users\Shifan Gouri\.gemini\antigravity\brain\8a9d4567-b072-43a0-9cae-dea5e590514b"

models = [
    "pikachu",
    "charizard",
    "eevee",
    "lucario",
    "gengar",
    "blastoise",
    "greninja",
    "mewtwo",
    "garchomp",
    "gyarados",
    "snorlax",
    "lapras",
    "venustoise"
]

results = []

for m in models:
    out_path = os.path.join(BRAIN, f"audit_model_{m}.png")
    url = f"http://localhost:3000/?pokemon={m}"
    cmd = [
        EDGE,
        "--headless",
        "--disable-gpu",
        "--window-size=1400,900",
        f"--screenshot={out_path}",
        url
    ]
    try:
        start_t = time.time()
        p = subprocess.run(cmd, timeout=20)
        time.sleep(1.0)
        if os.path.exists(out_path) and os.path.getsize(out_path) > 10000:
            sz_kb = os.path.getsize(out_path) / 1024
            results.append((m, "SUCCESS", f"{sz_kb:.1f} KB", out_path))
            print(f"[OK] {m}: {sz_kb:.1f} KB")
        else:
            results.append((m, "FAILED", "File empty or missing", None))
            print(f"[FAIL] {m}: Empty or not created")
    except Exception as e:
        results.append((m, "TIMEOUT/ERROR", str(e), None))
        print(f"[ERROR] {m}: {e}")

# Also capture mobile view test
mobile_out = os.path.join(BRAIN, "audit_mobile_full_view.png")
cmd_mob = [
    EDGE,
    "--headless",
    "--disable-gpu",
    "--window-size=390,950",
    f"--screenshot={mobile_out}",
    "http://localhost:3000/?pokemon=pikachu"
]
try:
    subprocess.run(cmd_mob, timeout=20)
    time.sleep(1.0)
    if os.path.exists(mobile_out):
        print(f"[OK] Mobile captured: {os.path.getsize(mobile_out)/1024:.1f} KB")
except Exception as e:
    print(f"[ERROR] Mobile capture: {e}")

print("\n--- AUDIT SUMMARY ---")
for r in results:
    print(f"{r[0]}: {r[1]} ({r[2]})")
