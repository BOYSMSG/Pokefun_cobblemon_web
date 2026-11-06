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
    let groundContact: THREE.Mesh | null = null;
    let hasNativeAnim = false;
    let basePosY = 0.05;
    let isVisible = true;

    // Scene
    const scene = new THREE.Scene();

    // Camera setup - looking from +Z towards origin
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 520;
    const isMobile = width < 768;
    const camera = new THREE.PerspectiveCamera(isMobile ? 38 : 36, width / height, 0.1, 100);
    camera.position.set(0, isMobile ? 1.75 : 1.65, isMobile ? 5.8 : 5.3);
    camera.lookAt(0, isMobile ? 0.9 : 0.85, 0);

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
    const ambientLight = new THREE.AmbientLight(0xf0faff, 2.3);
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

    // Ground Contact Shadow Disc (Makes Pokémon feel grounded on stage)
    const shadowGeo = new THREE.PlaneGeometry(3.2, 3.2);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(0, 180, 216, 0.55)");
      grad.addColorStop(0.5, "rgba(22, 119, 255, 0.2)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.7,
      depthWrite: false
    });
    groundContact = new THREE.Mesh(shadowGeo, shadowMat);
    groundContact.rotation.x = -Math.PI / 2;
    groundContact.position.y = 0.01;
    scene.add(groundContact);

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
    const particleCount = 65;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 8;
      particlePos[i + 1] = Math.random() * 4.2 + 0.1;
      particlePos[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00c9d8,
      size: 0.055,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Tactile 360° Drag & Pointer Interaction
    let currentRotY = rotY;
    let targetRotY = rotY;
    let mouseOffsetRotX = 0;
    let isDragging = false;
    let lastPointerX = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastPointerX = e.clientX;
      if (container) container.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - lastPointerX;
        lastPointerX = e.clientX;
        targetRotY += deltaX * 0.015;
      } else {
        const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        mouseOffsetRotX = mouseY * 0.12;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      if (container) container.style.cursor = "grab";
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);

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
        const targetSize = 2.22; // Comfortable clearance on both desktop and mobile
        const autoScale = maxDim > 0 ? targetSize / maxDim : 1.15;
        
        const wrapper = new THREE.Group();
        gltf.scene.scale.set(autoScale, autoScale, autoScale);
        gltf.scene.position.x = -center.x * autoScale;
        gltf.scene.position.z = -center.z * autoScale;
        
        const bottomGroundedY = -box.min.y * autoScale;
        const middlePodY = -center.y * autoScale + 0.95;
        const centerAfterGrounded = (center.y - box.min.y) * autoScale;
        if (centerAfterGrounded > 1.8 || box.min.y > 1.5) {
          gltf.scene.position.y = middlePodY;
        } else {
          gltf.scene.position.y = bottomGroundedY;
        }
        
        wrapper.add(gltf.scene);
        wrapper.rotation.y = rotY;
        currentRotY = rotY;
        targetRotY = rotY;
        
        basePosY = 0.05;
        wrapper.position.y = basePosY;
        
        modelGroup = wrapper;
        scene.add(modelGroup);

        if (gltf.animations && gltf.animations.length > 0) {
          try {
            mixer = new THREE.AnimationMixer(gltf.scene);
            const clips = gltf.animations;
            // Prioritize battle_idle (animated tails, wings, alert posture) over slow ground_idle
            const chosenClip = 
              clips.find(a => a.name === "battle_idle") ||
              clips.find(a => a.name.includes("battle") && !a.name.includes("quirk")) ||
              clips.find(a => a.name.includes("air")) ||
              clips.find(a => a.name.includes("water") && !a.name.includes("swim")) ||
              clips.find(a => a.name === "ground_idle") ||
              clips.find(a => a.name.includes("idle")) ||
              clips[0];

            if (chosenClip) {
              const action = mixer.clipAction(chosenClip);
              action.setEffectiveTimeScale(1.18); // Energetic, lively tempo
              action.play();
              hasNativeAnim = true;
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

    // Responsive window resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const mob = w < 768;
      camera.fov = mob ? 38 : 36;
      camera.aspect = w / h;
      camera.position.set(0, mob ? 1.75 : 1.65, mob ? 5.8 : 5.3);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Pause rendering loop when component scrolled off-screen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Sleep when scrolled away to conserve GPU

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (mixer) {
        mixer.update(delta);
      }

      // Smooth model drag rotation with lerp inertia & living movements
      if (modelGroup) {
        // Slow auto-turntable spin when user is not actively dragging
        if (!isDragging) {
          targetRotY += 0.0035;
        }
        currentRotY += (targetRotY - currentRotY) * 0.08;
        modelGroup.rotation.y = currentRotY;

        // Dynamic Living Creature Movement (Tail sway, breathing, lively posture)
        if (hasNativeAnim) {
          // Living float & organic creature micro-tilt
          const aliveFloat = Math.sin(elapsedTime * 2.2) * 0.038;
          const aliveTiltZ = Math.sin(elapsedTime * 1.5) * 0.016;
          const alivePitchX = Math.cos(elapsedTime * 1.8) * 0.012;
          modelGroup.position.y = basePosY + aliveFloat;
          modelGroup.rotation.z = aliveTiltZ;
          modelGroup.rotation.x += (mouseOffsetRotX + alivePitchX - modelGroup.rotation.x) * 0.06;

          if (groundContact) {
            const shadowScale = 1 - (aliveFloat * 1.8);
            groundContact.scale.set(shadowScale, shadowScale, shadowScale);
          }
        } else {
          // For models without embedded skeletal tracks, provide a rich organic alive idle
          const breathY = Math.sin(elapsedTime * 2.4) * 0.065;
          const swayZ = Math.sin(elapsedTime * 1.6) * 0.035;
          const pitchX = Math.cos(elapsedTime * 1.9) * 0.025;
          modelGroup.position.y = basePosY + breathY;
          modelGroup.rotation.z = swayZ;
          modelGroup.rotation.x += (mouseOffsetRotX + pitchX - modelGroup.rotation.x) * 0.06;

          // Organic breathing scale
          const breathScaleY = 1 + Math.sin(elapsedTime * 2.4) * 0.024;
          const breathScaleXZ = 1 - Math.sin(elapsedTime * 2.4) * 0.012;
          modelGroup.scale.set(breathScaleXZ, breathScaleY, breathScaleXZ);

          if (groundContact) {
            const shadowScale = 1 - (breathY * 2.0);
            groundContact.scale.set(shadowScale, shadowScale, shadowScale);
          }
        }
      }

      // Rotate cyber-rings
      if (cyberRing) {
        cyberRing.rotation.z = elapsedTime * 0.35;
      }
      if (cyberRingOuter) {
        cyberRingOuter.rotation.z = -elapsedTime * 0.2;
      }

      // Float particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += 0.007;
        if (positions[i] > 4.2) {
          positions[i] = 0.1;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      if (mixer) mixer.stopAllAction();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      // Resource cleanup
      stageGeo.dispose();
      stageMat.dispose();
      shadowGeo.dispose();
      shadowTex.dispose();
      shadowMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      outerRingGeo.dispose();
      outerRingMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
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
        touchAction: "pan-y",
        opacity: isLoaded ? 1 : 0.4,
        transition: "opacity 0.4s ease"
      }} 
    />
  );
}
