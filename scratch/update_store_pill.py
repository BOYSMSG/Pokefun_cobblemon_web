import re

path = r'd:\Downloads\websitework\website\pokefun-nextjs-app\public\css\custom.css'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace light mode .nav-store-pill
old_pill = '''.nav-store-pill {
  background: linear-gradient(135deg, #00C9D8 0%, #1677FF 100%) !important;
  color: #ffffff !important;
  font-weight: 700 !important;
  padding: 7px 16px !important;
  border-radius: 9999px !important;
  box-shadow: 0 2px 10px rgba(0, 201, 216, 0.35);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.88rem;
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.nav-store-pill:hover {
  transform: translateY(-1px) scale(1.02);
  box-shadow: 0 4px 16px rgba(0, 201, 216, 0.55);
}'''

new_pill = '''.nav-store-pill {
  background: rgba(22, 119, 255, 0.08) !important;
  color: #1677FF !important;
  border: 1.5px solid rgba(22, 119, 255, 0.28) !important;
  font-weight: 700 !important;
  padding: 6px 14px !important;
  border-radius: 9999px !important;
  box-shadow: 0 2px 8px rgba(22, 119, 255, 0.06);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.88rem;
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.nav-store-pill:hover {
  background: rgba(22, 119, 255, 0.16) !important;
  color: #1677FF !important;
  border-color: #1677FF !important;
  box-shadow: 0 4px 14px rgba(22, 119, 255, 0.2);
  transform: translateY(-1px);
}'''

if old_pill in content:
    content = content.replace(old_pill, new_pill)
    print("Store pill CSS updated!")
else:
    # Pattern fallback
    pattern = r'\.nav-store-pill\s*\{[^}]+\}\s*\.nav-store-pill:hover\s*\{[^}]+\}'
    content, count = re.subn(pattern, new_pill, content)
    print(f"Store pill CSS regex replaced: {count}")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
