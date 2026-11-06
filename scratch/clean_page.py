path = r'd:\Downloads\websitework\website\pokefun-nextjs-app\src\app\page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if 'className="interactive-pill"' in line and i > 0 and 'className="interactive-hero-btn' in lines[i-1]:
        continue
    new_lines.append(line)

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("page.tsx cleaned perfectly!")
