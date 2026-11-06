import re

def update_hero_scene():
    path = r'pokefun-nextjs-app\src\components\3d\HeroScene.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. Update camera position to FRONT of model
    c = c.replace('camera.position.set(0, 2.2, -5.6);', 'camera.position.set(0, 1.8, 5.2);')
    c = c.replace('camera.lookAt(0, 0.8, 0);', 'camera.lookAt(0, 0.85, 0);')

    # 2. Lighting adjustments for front illumination
    c = c.replace('keyLight.position.set(5, 10, -5);', 'keyLight.position.set(5, 8, 6);')
    c = c.replace('rimLightBlue.position.set(-6, 4, 5);', 'rimLightBlue.position.set(-6, 5, -4);')
    c = c.replace('warmFill.position.set(0, -3, -5);', 'warmFill.position.set(0, 2, 6);')

    # 3. Model initial orientation (Face camera at 3/4 hero angle)
    c = c.replace('modelGroup.position.set(0, 0, 0);', 'modelGroup.position.set(0, 0, 0);\n        modelGroup.rotation.y = 0.2;')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("HeroScene.tsx camera and orientation updated to FACE FORWARD")

update_hero_scene()
