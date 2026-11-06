import os
import json
import math
import re
import struct

# Exact Three.js Euler('ZYX') to Quaternion matching Blockbench
def euler_zyx_to_quat(rx, ry, rz):
    c1 = math.cos(rx / 2.0)
    c2 = math.cos(ry / 2.0)
    c3 = math.cos(rz / 2.0)
    s1 = math.sin(rx / 2.0)
    s2 = math.sin(ry / 2.0)
    s3 = math.sin(rz / 2.0)

    # Three.js Euler with order 'ZYX':
    x = s1 * c2 * c3 - c1 * s2 * s3
    y = c1 * s2 * c3 + s1 * c2 * s3
    z = c1 * c2 * s3 - s1 * s2 * c3
    w = c1 * c2 * c3 + s1 * s2 * s3

    l = math.sqrt(x*x + y*y + z*z + w*w)
    if l > 0:
        return [x/l, y/l, z/l, w/l]
    return [0.0, 0.0, 0.0, 1.0]

def rotate_vector_zyx(v, rx, ry, rz):
    x, y, z = v
    # 1. Rotate around Z:
    cz, sz = math.cos(rz), math.sin(rz)
    x1 = cz * x - sz * y
    y1 = sz * x + cz * y
    z1 = z

    # 2. Rotate around Y:
    cy, sy = math.cos(ry), math.sin(ry)
    x2 = cy * x1 + sy * z1
    y2 = y1
    z2 = -sy * x1 + cy * z1

    # 3. Rotate around X:
    cx, sx = math.cos(rx), math.sin(rx)
    x3 = x2
    y3 = cx * y2 - sx * z2
    z3 = sx * y2 + cx * z2

    return [x3, y3, z3]

def eval_molang(expr, t):
    if isinstance(expr, (int, float)):
        return float(expr)
    s = str(expr).strip()
    try:
        return float(s)
    except ValueError:
        pass
    py_expr = s.replace("q.anim_time", f"({t})")
    py_expr = re.sub(r'math\.sin\b', 'm_sin', py_expr)
    py_expr = re.sub(r'math\.cos\b', 'm_cos', py_expr)
    py_expr = re.sub(r'math\.clamp\b', 'm_clamp', py_expr)
    py_expr = re.sub(r'math\.abs\b', 'abs', py_expr)
    scope = {
        'm_sin': lambda d: math.sin(math.radians(d)),
        'm_cos': lambda d: math.cos(math.radians(d)),
        'm_clamp': lambda v, lo, hi: max(lo, min(hi, v)),
        'abs': abs,
        'math': math
    }
    try:
        return float(eval(py_expr, {"__builtins__": None}, scope))
    except Exception:
        return 0.0

def convert_model(geo_path, texture_path, anim_path, out_glb_path):
    with open(geo_path, "r", encoding="utf-8") as f:
        geo_data = json.load(f)

    with open(texture_path, "rb") as f:
        texture_bytes = f.read()

    anim_data = {}
    if anim_path and os.path.exists(anim_path):
        with open(anim_path, "r", encoding="utf-8") as f:
            anim_data = json.load(f).get("animations", {})

    geo_list = geo_data.get("minecraft:geometry", [])
    if isinstance(geo_list, list):
        geo = geo_list[0]
    else:
        geo = geo_list

    tex_w = float(geo.get("description", {}).get("texture_width", 512))
    tex_h = float(geo.get("description", {}).get("texture_height", 512))
    bones = geo.get("bones", [])

    bone_map = {b["name"]: b for b in bones}
    children_map = {b["name"]: [] for b in bones}
    for b in bones:
        p = b.get("parent")
        if p and p in children_map:
            children_map[p].append(b["name"])

    bone_names = [b["name"] for b in bones]
    bone_to_node_idx = {name: i for i, name in enumerate(bone_names)}

    bin_data = bytearray()
    buffer_views = []
    accessors = []
    meshes = []

    def add_buffer_view(data, target=None):
        offset = len(bin_data)
        pad = (4 - (offset % 4)) % 4
        if pad:
            bin_data.extend(b'\x00' * pad)
            offset += pad
        bin_data.extend(data)
        bv = {"buffer": 0, "byteOffset": offset, "byteLength": len(data)}
        if target:
            bv["target"] = target
        bv_idx = len(buffer_views)
        buffer_views.append(bv)
        return bv_idx

    node_to_mesh_idx = {}
    total_triangles = 0

    # Build meshes according to Blockbench Bedrock logic:
    for b in bones:
        cubes = b.get("cubes", [])
        if not cubes:
            continue

        b_pivot = b.get("pivot", [0, 0, 0])
        bp_x = -b_pivot[0]
        bp_y = b_pivot[1]
        bp_z = b_pivot[2]

        positions = []
        normals = []
        uvs = []
        indices = []
        v_offset = 0

        for c in cubes:
            origin = c.get("origin", [0, 0, 0])
            size = c.get("size", [0, 0, 0])
            uv = c.get("uv", [0, 0])
            c_rot = c.get("rotation")
            c_piv = c.get("pivot", [0, 0, 0])

            # Blockbench from:
            fx = -(origin[0] + size[0])
            fy = origin[1]
            fz = origin[2]
            sx, sy, sz = size[0], size[1], size[2]

            u, v = float(uv[0]), float(uv[1])
            w, h, d = float(sx), float(sy), float(sz)

            # Raw cube corner coordinates in world space (unrotated):
            # 8 corners of the box:
            x0, x1 = fx, fx + sx
            y0, y1 = fy, fy + sy
            z0, z1 = fz, fz + sz

            raw_faces = [
                # North (-Z)
                ([0, 0, -1], [[x0, y1, z0], [x1, y1, z0], [x1, y0, z0], [x0, y0, z0]],
                 [(u + d) / tex_w, (u + d + w) / tex_w, (v + d) / tex_h, (v + d + h) / tex_h]),
                # South (+Z)
                ([0, 0, 1], [[x1, y1, z1], [x0, y1, z1], [x0, y0, z1], [x1, y0, z1]],
                 [(u + d + w + d) / tex_w, (u + d + w + d + w) / tex_w, (v + d) / tex_h, (v + d + h) / tex_h]),
                # East (+X)
                ([1, 0, 0], [[x1, y1, z0], [x1, y1, z1], [x1, y0, z1], [x1, y0, z0]],
                 [(u + d + w) / tex_w, (u + d + w + d) / tex_w, (v + d) / tex_h, (v + d + h) / tex_h]),
                # West (-X)
                ([-1, 0, 0], [[x0, y1, z1], [x0, y1, z0], [x0, y0, z0], [x0, y0, z1]],
                 [u / tex_w, (u + d) / tex_w, (v + d) / tex_h, (v + d + h) / tex_h]),
                # Up (+Y)
                ([0, 1, 0], [[x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0]],
                 [(u + d) / tex_w, (u + d + w) / tex_w, v / tex_h, (v + d) / tex_h]),
                # Down (-Y)
                ([0, -1, 0], [[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]],
                 [(u + d + w) / tex_w, (u + d + w + w) / tex_w, v / tex_h, (v + d) / tex_h]),
            ]

            # If cube has its own rotation:
            has_cube_rot = c_rot is not None
            if has_cube_rot:
                cp_x = -c_piv[0]
                cp_y = c_piv[1]
                cp_z = c_piv[2]
                crx = math.radians(-c_rot[0])
                cry = math.radians(-c_rot[1])
                crz = math.radians(c_rot[2])

            for raw_norm, verts, (u0, u1, v0, v1) in raw_faces:
                transformed_verts = []
                for pt in verts:
                    if has_cube_rot:
                        # rotate around cube pivot
                        rel = [pt[0] - cp_x, pt[1] - cp_y, pt[2] - cp_z]
                        rot_pt = rotate_vector_zyx(rel, crx, cry, crz)
                        w_pt = [rot_pt[0] + cp_x, rot_pt[1] + cp_y, rot_pt[2] + cp_z]
                    else:
                        w_pt = pt

                    # Convert to bone local coordinates (scaled / 16.0)
                    gx = (w_pt[0] - bp_x) / 16.0
                    gy = (w_pt[1] - bp_y) / 16.0
                    gz = (w_pt[2] - bp_z) / 16.0
                    transformed_verts.append([gx, gy, gz])

                if has_cube_rot:
                    fnorm = rotate_vector_zyx(raw_norm, crx, cry, crz)
                else:
                    fnorm = raw_norm

                positions.extend(transformed_verts[0] + transformed_verts[1] + transformed_verts[2] + transformed_verts[3])
                for _ in range(4):
                    normals.extend(fnorm)
                uvs.extend([u0, v0, u1, v0, u1, v1, u0, v1])
                indices.extend([v_offset, v_offset + 1, v_offset + 2, v_offset, v_offset + 2, v_offset + 3])
                v_offset += 4
                total_triangles += 2

        pos_bytes = struct.pack(f'<{len(positions)}f', *positions)
        min_pos = [min(positions[i::3]) for i in range(3)]
        max_pos = [max(positions[i::3]) for i in range(3)]
        bv_pos = add_buffer_view(pos_bytes, target=34962)
        acc_pos = len(accessors)
        accessors.append({
            "bufferView": bv_pos, "byteOffset": 0, "componentType": 5126,
            "count": len(positions) // 3, "type": "VEC3",
            "min": min_pos, "max": max_pos
        })

        norm_bytes = struct.pack(f'<{len(normals)}f', *normals)
        bv_norm = add_buffer_view(norm_bytes, target=34962)
        acc_norm = len(accessors)
        accessors.append({
            "bufferView": bv_norm, "byteOffset": 0, "componentType": 5126,
            "count": len(normals) // 3, "type": "VEC3"
        })

        uv_bytes = struct.pack(f'<{len(uvs)}f', *uvs)
        bv_uv = add_buffer_view(uv_bytes, target=34962)
        acc_uv = len(accessors)
        accessors.append({
            "bufferView": bv_uv, "byteOffset": 0, "componentType": 5126,
            "count": len(uvs) // 2, "type": "VEC2"
        })

        idx_bytes = struct.pack(f'<{len(indices)}H', *indices)
        bv_idx = add_buffer_view(idx_bytes, target=34963)
        acc_idx = len(accessors)
        accessors.append({
            "bufferView": bv_idx, "byteOffset": 0, "componentType": 5123,
            "count": len(indices), "type": "SCALAR"
        })

        mesh_idx = len(meshes)
        meshes.append({
            "name": f"mesh_{b['name']}",
            "primitives": [{
                "attributes": {"POSITION": acc_pos, "NORMAL": acc_norm, "TEXCOORD_0": acc_uv},
                "indices": acc_idx,
                "material": 0
            }]
        })
        node_to_mesh_idx[b["name"]] = mesh_idx

    bv_img = add_buffer_view(texture_bytes)

    preferred_anims = []
    if anim_data:
        prio = ["battle_idle", "ground_idle", "water_idle", "air_idle", "idle", "quirk"]
        for p in prio:
            for k in anim_data.keys():
                if p in k and k not in preferred_anims:
                    preferred_anims.append(k)
        if not preferred_anims:
            preferred_anims = list(anim_data.keys())[:2]

    # Build nodes according to Blockbench:
    nodes = []
    for b in bones:
        name = b["name"]
        pivot = b.get("pivot", [0, 0, 0])
        bp_x = -pivot[0]
        bp_y = pivot[1]
        bp_z = pivot[2]

        p_name = b.get("parent")
        if p_name and p_name in bone_map:
            p_pivot = bone_map[p_name].get("pivot", [0, 0, 0])
            pp_x = -p_pivot[0]
            pp_y = p_pivot[1]
            pp_z = p_pivot[2]
            tx = (bp_x - pp_x) / 16.0
            ty = (bp_y - pp_y) / 16.0
            tz = (bp_z - pp_z) / 16.0
        else:
            tx = bp_x / 16.0
            ty = bp_y / 16.0
            tz = bp_z / 16.0

        b_rot = b.get("rotation", [0, 0, 0])
        rx = math.radians(-b_rot[0])
        ry = math.radians(-b_rot[1])
        rz = math.radians(b_rot[2])
        quat = euler_zyx_to_quat(rx, ry, rz)

        node = {
            "name": name,
            "translation": [tx, ty, tz],
            "rotation": quat,
            "scale": [1.0, 1.0, 1.0]
        }
        if name in node_to_mesh_idx:
            node["mesh"] = node_to_mesh_idx[name]

        ch = children_map.get(name, [])
        if ch:
            node["children"] = [bone_to_node_idx[c] for c in ch]

        nodes.append(node)

    # Initial animation pose at t=0
    if preferred_anims:
        first_anim = anim_data[preferred_anims[0]]
        first_bones = first_anim.get("bones", {})
        for b_name, b_anim in first_bones.items():
            if b_name in bone_to_node_idx:
                n_idx = bone_to_node_idx[b_name]
                if "rotation" in b_anim:
                    r_spec = b_anim["rotation"]
                    if isinstance(r_spec, dict):
                        k0 = sorted([float(k) for k in r_spec.keys()])[0]
                        v = r_spec[str(k0)]
                    elif isinstance(r_spec, (list, tuple)):
                        v = r_spec
                    else:
                        v = [0, 0, 0]
                    if not isinstance(v, (list, tuple)):
                        v = [0, 0, 0]

                    b_rot = bones[n_idx].get("rotation", [0, 0, 0])
                    dx = eval_molang(v[0], 0) if len(v) > 0 else 0
                    dy = eval_molang(v[1], 0) if len(v) > 1 else 0
                    dz = eval_molang(v[2], 0) if len(v) > 2 else 0

                    rx = math.radians(-(b_rot[0] + dx))
                    ry = math.radians(-(b_rot[1] + dy))
                    rz = math.radians(b_rot[2] + dz)
                    nodes[n_idx]["rotation"] = euler_zyx_to_quat(rx, ry, rz)

    root_nodes = [bone_to_node_idx[b["name"]] for b in bones if "parent" not in b or b["parent"] not in bone_map]

    # Sample animation keyframes
    gltf_animations = []
    for anim_name in preferred_anims[:3]:
        cur_anim = anim_data[anim_name]
        dur = float(cur_anim.get("animation_length", 3.0) or 3.0)
        fps = 20.0
        n_frames = int(math.ceil(dur * fps)) + 1
        time_samples = [min(dur, i / fps) for i in range(n_frames)]

        time_bytes = struct.pack(f'<{len(time_samples)}f', *time_samples)
        bv_time = add_buffer_view(time_bytes)
        acc_time = len(accessors)
        accessors.append({
            "bufferView": bv_time, "byteOffset": 0, "componentType": 5126,
            "count": len(time_samples), "type": "SCALAR",
            "min": [time_samples[0]], "max": [time_samples[-1]]
        })

        channels = []
        samplers = []
        anim_bones = cur_anim.get("bones", {})

        for b_name, b_anim in anim_bones.items():
            if b_name not in bone_to_node_idx:
                continue
            n_idx = bone_to_node_idx[b_name]
            b_rot = bones[n_idx].get("rotation", [0, 0, 0])

            if "rotation" in b_anim:
                r_spec = b_anim["rotation"]
                rot_values = []
                for t in time_samples:
                    if isinstance(r_spec, dict):
                        keys = sorted([float(k) for k in r_spec.keys()])
                        val = r_spec[str(keys[0])]
                        for k in keys:
                            if t >= k:
                                val = r_spec[str(k)]
                    elif isinstance(r_spec, (list, tuple)):
                        val = r_spec
                    else:
                        val = [0, 0, 0]

                    if not isinstance(val, (list, tuple)):
                        val = [0, 0, 0]

                    dx = eval_molang(val[0], t) if len(val) > 0 else 0
                    dy = eval_molang(val[1], t) if len(val) > 1 else 0
                    dz = eval_molang(val[2], t) if len(val) > 2 else 0

                    rx = math.radians(-(b_rot[0] + dx))
                    ry = math.radians(-(b_rot[1] + dy))
                    rz = math.radians(b_rot[2] + dz)
                    q = euler_zyx_to_quat(rx, ry, rz)
                    rot_values.extend(q)

                rot_bytes = struct.pack(f'<{len(rot_values)}f', *rot_values)
                bv_rot = add_buffer_view(rot_bytes)
                acc_rot = len(accessors)
                accessors.append({
                    "bufferView": bv_rot, "byteOffset": 0, "componentType": 5126,
                    "count": len(time_samples), "type": "VEC4"
                })
                s_idx = len(samplers)
                samplers.append({"input": acc_time, "interpolation": "LINEAR", "output": acc_rot})
                channels.append({"sampler": s_idx, "target": {"node": n_idx, "path": "rotation"}})

            if "position" in b_anim:
                p_spec = b_anim["position"]
                pos_values = []
                orig_t = nodes[n_idx]["translation"]
                for t in time_samples:
                    if isinstance(p_spec, dict):
                        keys = sorted([float(k) for k in p_spec.keys()])
                        val = p_spec[str(keys[0])]
                        for k in keys:
                            if t >= k:
                                val = p_spec[str(k)]
                    elif isinstance(p_spec, (list, tuple)):
                        val = p_spec
                    else:
                        val = [0, 0, 0]

                    if not isinstance(val, (list, tuple)):
                        val = [0, 0, 0]

                    dx = eval_molang(val[0], t) / 16.0 if len(val) > 0 else 0
                    dy = eval_molang(val[1], t) / 16.0 if len(val) > 1 else 0
                    dz = eval_molang(val[2], t) / 16.0 if len(val) > 2 else 0

                    pos_values.extend([orig_t[0] - dx, orig_t[1] + dy, orig_t[2] + dz])

                pos_bytes = struct.pack(f'<{len(pos_values)}f', *pos_values)
                bv_p = add_buffer_view(pos_bytes)
                acc_p = len(accessors)
                accessors.append({
                    "bufferView": bv_p, "byteOffset": 0, "componentType": 5126,
                    "count": len(time_samples), "type": "VEC3"
                })
                s_idx = len(samplers)
                samplers.append({"input": acc_time, "interpolation": "LINEAR", "output": acc_p})
                channels.append({"sampler": s_idx, "target": {"node": n_idx, "path": "translation"}})

        clean_name = anim_name.split(".")[-1]
        gltf_animations.append({
            "name": clean_name,
            "channels": channels,
            "samplers": samplers
        })

    gltf = {
        "asset": {"version": "2.0", "generator": "Pokefun Cobblemon Engine v4.0"},
        "scenes": [{"name": "DefaultScene", "nodes": root_nodes}],
        "scene": 0,
        "nodes": nodes,
        "meshes": meshes,
        "materials": [{
            "name": "CobblemonMaterial",
            "pbrMetallicRoughness": {
                "baseColorTexture": {"index": 0},
                "metallicFactor": 0.05,
                "roughnessFactor": 0.85
            },
            "alphaMode": "MASK",
            "alphaCutoff": 0.1,
            "doubleSided": True
        }],
        "textures": [{"source": 0, "sampler": 0}],
        "images": [{"bufferView": bv_img, "mimeType": "image/png"}],
        "samplers": [{"magFilter": 9728, "minFilter": 9728}], # NEAREST for crisp Minecraft pixels
        "buffers": [{"byteLength": len(bin_data)}],
        "bufferViews": buffer_views,
        "accessors": accessors,
        "animations": gltf_animations
    }

    json_str = json.dumps(gltf, separators=(',', ':'))
    json_bytes = json_str.encode('utf-8')
    pad = (4 - (len(json_bytes) % 4)) % 4
    if pad:
        json_bytes += b' ' * pad

    pad_bin = (4 - (len(bin_data) % 4)) % 4
    if pad_bin:
        bin_data += b'\x00' * pad_bin

    total_len = 12 + 8 + len(json_bytes) + 8 + len(bin_data)
    header = struct.pack('<4sII', b'glTF', 2, total_len)
    chunk0 = struct.pack('<II', len(json_bytes), 0x4E4F534A) + json_bytes
    chunk1 = struct.pack('<II', len(bin_data), 0x004E4942) + bytes(bin_data)

    os.makedirs(os.path.dirname(out_glb_path), exist_ok=True)
    with open(out_glb_path, 'wb') as f:
        f.write(header)
        f.write(chunk0)
        f.write(chunk1)

# Master conversion list of popular official Cobblemon
BASE = r'd:\Downloads\websitework\website\pokefun-nextjs-app\scratch\cobblemon_jar_extracted'
OUT = r'd:\Downloads\websitework\website\pokefun-nextjs-app\public\models'

TARGETS = [
    # (id, folder_name, geo_name, tex_name, anim_name)
    ("pikachu", "0025_pikachu", "pikachu_male.geo.json", "pikachu.png", "pikachu.animation.json"),
    ("eevee", "0133_eevee", "eevee_male.geo.json", "eevee.png", "eevee.animation.json"),
    ("gengar", "0094_gengar", "gengar.geo.json", "gengar.png", "gengar.animation.json"),
    ("lucario", "0448_lucario", "lucario.geo.json", "lucario.png", "lucario.animation.json"),
    ("mewtwo", "0150_mewtwo", "mewtwo.geo.json", "mewtwo.png", "mewtwo.animation.json"),
    ("greninja", "0658_greninja", "greninja.geo.json", "greninja.png", "greninja.animation.json"),
    ("blastoise", "0009_blastoise", "blastoise.geo.json", "blastoise.png", "blastoise.animation.json"),
    ("charizard", "0006_charizard", "charizard.geo.json", "charizard.png", "charizard.animation.json"),
    ("garchomp", "0445_garchomp", "garchomp_male.geo.json", "garchomp.png", "garchomp.animation.json"),
    ("snorlax", "0143_snorlax", "snorlax.geo.json", "snorlax.png", "snorlax.animation.json"),
    ("lapras", "0131_lapras", "lapras.geo.json", "lapras.png", "lapras.animation.json"),
    ("gyarados", "0130_gyarados", "gyarados.geo.json", "gyarados.png", "gyarados.animation.json"),
]

for p_id, folder, geo_file, tex_file, anim_file in TARGETS:
    geo_p = os.path.join(BASE, 'assets', 'cobblemon', 'bedrock', 'pokemon', 'models', folder, geo_file)
    tex_p = os.path.join(BASE, 'assets', 'cobblemon', 'textures', 'pokemon', folder, tex_file)
    anim_p = os.path.join(BASE, 'assets', 'cobblemon', 'bedrock', 'pokemon', 'animations', folder, anim_file)
    out_glb = os.path.join(OUT, f"official-{p_id}.glb")

    if os.path.exists(geo_p) and os.path.exists(tex_p):
        try:
            convert_model(geo_p, tex_p, anim_p if os.path.exists(anim_p) else None, out_glb)
            sz = os.path.getsize(out_glb) / 1024.0
            print(f"[OK] Converted {p_id} -> official-{p_id}.glb ({sz:.1f} KB)")
        except Exception as e:
            print(f"[ERROR] {p_id}: {e}")
    else:
        print(f"[MISSING] {p_id} geo_p={os.path.exists(geo_p)} tex_p={os.path.exists(tex_p)}")

print("Batch conversion completed!")
