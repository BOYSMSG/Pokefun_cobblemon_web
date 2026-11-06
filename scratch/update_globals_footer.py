def update_globals_footer():
    path = r'pokefun-nextjs-app\src\app\globals.css'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    # Footer
    old_footer = """#footer {
  background: #040811 !important;
  border-top: 1px solid rgba(0, 201, 216, 0.22) !important;
  padding: 45px 20px !important;
  color: #94A3B8 !important;
  margin-top: 50px;
}"""
    new_footer = """#footer {
  background: #FFFFFF !important;
  border-top: 1.5px solid rgba(0, 201, 216, 0.22) !important;
  box-shadow: 0 -10px 40px rgba(22, 119, 255, 0.04) !important;
  padding: 45px 20px !important;
  color: #3D567A !important;
  margin-top: 50px;
}"""
    c = c.replace(old_footer, new_footer)
    c = c.replace(old_footer.replace('\n', '\r\n'), new_footer.replace('\n', '\r\n'))

    # Footer h1
    c = c.replace('color: #F8FAFC;\n}', 'color: #0B1524;\n}')
    c = c.replace('color: #F8FAFC;\r\n}', 'color: #0B1524;\r\n}')

    # Mobile nav
    c = c.replace('background: #060c18;', 'background: #FFFFFF;')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("globals.css footer and mobile elements updated")

update_globals_footer()
