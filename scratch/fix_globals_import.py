path = r'd:\Downloads\websitework\website\pokefun-nextjs-app\src\app\globals.css'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Fix @import placement
bad_import = "@import url('https://fonts.googleapis.com/css2?family=Karla:wght@400;500;600;700;800&family=Righteous&display=swap');"
text = text.replace(bad_import, "")

# Place it right after @import "tailwindcss";
text = text.replace('@import "tailwindcss";', f'@import "tailwindcss";\n{bad_import}\n')

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

print("globals.css @import fixed!")
