import re

def update_layout():
    path = r'pokefun-nextjs-app\src\app\layout.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    # Place <AuthWidget /> right inside desktop-nav-container after nav-links-center
    old_nav_end = '                        </div>\n                    </div>\n                </nav>'
    new_nav_end = '                        </div>\n                        <AuthWidget />\n                    </div>\n                </nav>'
    
    c = c.replace(old_nav_end, new_nav_end)
    c = c.replace(old_nav_end.replace('\n', '\r\n'), new_nav_end.replace('\n', '\r\n'))
    
    # Remove floating <AuthWidget /> at bottom
    c = c.replace('<AuthWidget />\n', '')
    c = c.replace('<AuthWidget />\r\n', '')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("layout.tsx updated with inline AuthWidget")

def update_css_nav():
    path = r'pokefun-nextjs-app\public\css\custom.css'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    c = c.replace('padding-right: 200px; /* Room for fixed AuthWidget button */', '/* Clean desktop padding */')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("custom.css updated")

update_layout()
update_css_nav()
