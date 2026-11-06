"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface HeroSceneProps {
  modelPath?: string;
  rotY?: number;
}

export default function HeroScene({ 
  modelPath = "/models/fusion-venustoise.glb",
  rotY = Math.PI + 0.25 // ~3.39 rad: faces camera (+Z) with heroic 3/4 angle
}: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) {
      setWebGLSupported(false);
      return;
    }

    let animationFrameId: number;
    let mixer: THREE.AnimationMixer | null = null;
    let modelGroup: THREE.Group | null = null;
    let cyberRing: THREE.Mesh | null = null;
    let cyberRingOuter: THREE.Mesh | null = null;
    let basePosY = 0;
    const baseRotY = rotY;

    // Scene
    const scene = new THREE.Scene();

    // Camera setup - looking from +Z towards origin
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 650;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 5.2);
    camera.lookAt(0, 0.9, 0);

    // Renderer with transparent canvas so CSS sci-fi background shows cleanly
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Studio Lighting for Electric Sci-Fi Aqua Look
    const ambientLight = new THREE.AmbientLight(0xf0faff, 2.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x00c9d8, 3.4);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const rimLightBlue = new THREE.DirectionalLight(0x1677ff, 2.8);
    rimLightBlue.position.set(-6, 5, -4);
    scene.add(rimLightBlue);

    const frontFill = new THREE.DirectionalLight(0xffffff, 2.0);
    frontFill.position.set(0, 3, 6);
    scene.add(frontFill);

    // Sci-Fi Holographic Floor Grid / Crystal Ice Stage
    const stageGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.15, 64);
    const stageMat = new THREE.MeshStandardMaterial({
      color: 0xe0f7fa,
      emissive: 0x00bcd4,
      emissiveIntensity: 0.25,
      roughness: 0.15,
      metalness: 0.35,
      transparent: true,
      opacity: 0.82
    });
    const stageMesh = new THREE.Mesh(stageGeo, stageMat);
    stageMesh.position.y = -0.08;
    scene.add(stageMesh);

    // Inner Glowing Neon Cyber-Ring
    const ringGeo = new THREE.RingGeometry(2.6, 2.75, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9
    });
    cyberRing = new THREE.Mesh(ringGeo, ringMat);
    cyberRing.rotation.x = -Math.PI / 2;
    cyberRing.position.y = 0.02;
    scene.add(cyberRing);

    // Outer Cyber Ring with Dashes
    const outerRingGeo = new THREE.RingGeometry(3.2, 3.32, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x1677ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75
    });
    cyberRingOuter = new THREE.Mesh(outerRingGeo, outerRingMat);
    cyberRingOuter.rotation.x = -Math.PI / 2;
    cyberRingOuter.position.y = 0.02;
    scene.add(cyberRingOuter);

    // Floating Luminous Sci-Fi Energy Particles
    const particleCount = 85;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 12;
      particlePos[i + 1] = Math.random() * 4.5 + 0.1;
      particlePos[i + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00c9d8,
      size: 0.065,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Interaction
    let mouseOffsetRotY = 0;
    let mouseOffsetRotX = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseOffsetRotY = mouseX * 0.4;
      mouseOffsetRotX = mouseY * 0.15;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Load Cobblemon GLB Model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        // Auto-normalize scale and center so any Pokemon sits perfectly on the cyber pedestal
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 2.4;
        const autoScale = maxDim > 0 ? targetSize / maxDim : 1.2;
        
        // Setup wrapper group for clear hierarchy
        const wrapper = new THREE.Group();
        gltf.scene.scale.set(autoScale, autoScale, autoScale);
        gltf.scene.position.x = -center.x * autoScale;
        gltf.scene.position.z = -center.z * autoScale;
        
        // Smart vertical centering to ensure both ground and flying/hover models stay in pod center
        const bottomGroundedY = -box.min.y * autoScale;
        const middlePodY = -center.y * autoScale + 1.1;
        // If bottom grounding pushes center out of view (> 1.7 or < 0.4), use middle centering
        const centerAfterGrounded = (center.y - box.min.y) * autoScale;
        if (centerAfterGrounded > 1.8 || box.min.y > 1.5) {
          gltf.scene.position.y = middlePodY;
        } else {
          gltf.scene.position.y = bottomGroundedY;
        }
        
        wrapper.add(gltf.scene);
        wrapper.rotation.y = baseRotY; // Initial facing angle (facing camera)
        
        basePosY = 0.05;
        wrapper.position.y = basePosY;
        
        modelGroup = wrapper;
        scene.add(modelGroup);

        if (gltf.animations && gltf.animations.length > 0) {
          try {
            mixer = new THREE.AnimationMixer(gltf.scene);
            const idleClip = gltf.animations.find(a => a.name.includes("battle") || a.name.includes("idle") || a.name.includes("water") || a.name.includes("air")) || gltf.animations[0];
            if (idleClip) {
              const action = mixer.clipAction(idleClip);
              action.setEffectiveTimeScale(1.0);
              action.play();
            }
          } catch (animErr) {
            console.warn("Hero model animation fallback to rest pose:", animErr);
          }
        }
        setIsLoaded(true);
      },
      undefined,
      (err) => {
        console.warn("Hero model loading fallback:", err);
        setIsLoaded(true);
      }
    );

    // Window resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (mixer) {
        mixer.update(delta);
      }

      // Smooth model mouse tilt + gentle sci-fi hover bob (centered around baseRotY & basePosY)
      if (modelGroup) {
        const targetY = baseRotY + mouseOffsetRotY;
        const targetX = mouseOffsetRotX;
        modelGroup.rotation.y += (targetY - modelGroup.rotation.y) * 0.05;
        modelGroup.rotation.x += (targetX - modelGroup.rotation.x) * 0.05;
        modelGroup.position.y = basePosY + Math.sin(elapsedTime * 1.6) * 0.05;
      }

      // Rotate cyber-rings
      if (cyberRing) {
        cyberRing.rotation.z = elapsedTime * 0.3;
      }
      if (cyberRingOuter) {
        cyberRingOuter.rotation.z = -elapsedTime * 0.18;
      }

      // Float particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += 0.006;
        if (positions[i] > 4.5) {
          positions[i] = 0.1;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (mixer) mixer.stopAllAction();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelPath, rotY]);

  if (!webGLSupported) {
    return (
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle, rgba(0, 201, 216, 0.12) 0%, transparent 70%)"
      }}>
        <img 
          src="/images/pokefun_logo_transparent.png" 
          alt="Pokefun" 
          style={{ width: "240px", height: "auto", filter: "drop-shadow(0 10px 30px rgba(0, 201, 216, 0.4))" }} 
        />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: "100%", 
        height: "100%", 
        position: "relative",
        cursor: "grab",
        opacity: isLoaded ? 1 : 0.4,
        transition: "opacity 0.4s ease"
      }} 
    />
  );
}
