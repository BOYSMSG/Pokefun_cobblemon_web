import json

with open(r'C:\Users\Shifan Gouri\.gemini\antigravity\brain\8a9d4567-b072-43a0-9cae-dea5e590514b\.system_generated\logs\transcript.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        if '"step_index":1107' in line or '"step_index":1106' in line or '"step_index":1108' in line:
            data = json.loads(line)
            print("STEP:", data.get("step_index"))
            if "tool_calls" in data:
                print("TOOL_CALLS:", data["tool_calls"])
            if "content" in data:
                print("CONTENT:", data["content"][:300])
