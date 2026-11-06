import re

def update_hero_autoscale():
    path = r'pokefun-nextjs-app\src\components\3d\HeroScene.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    old_load = """        modelGroup = gltf.scene;
        modelGroup.position.set(0, 0, 0);
        modelGroup.rotation.y = 0.2;
        modelGroup.scale.set(1.2, 1.2, 1.2);
        scene.add(modelGroup);"""

    new_load = """        // Auto-normalize scale and center so any Pokemon fits the pedestal perfectly
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 2.3;
        const autoScale = maxDim > 0 ? targetSize / maxDim : 1.2;
        
        modelGroup = gltf.scene;
        modelGroup.scale.set(autoScale, autoScale, autoScale);
        modelGroup.position.x = -center.x * autoScale;
        modelGroup.position.z = -center.z * autoScale;
        modelGroup.position.y = -box.min.y * autoScale + 0.05;
        modelGroup.rotation.y = 0.25; // Face forward at 3/4 heroic angle
        scene.add(modelGroup);"""

    c = c.replace(old_load, new_load)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)

    print("HeroScene.tsx auto-scaling and front-facing centering updated successfully!")

update_hero_autoscale()
