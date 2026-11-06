"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface HeroSceneProps {
  modelPath?: string;
  rotY?: number;
  arrowDirection?: number;
}

export default function HeroScene({ 
  modelPath = "/models/fusion-venustoise.glb",
  rotY = Math.PI + 0.25, // ~3.39 rad: faces camera (+Z) with heroic 3/4 angle
  arrowDirection = 0
}: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const arrowDirectionRef = useRef(arrowDirection);

  useEffect(() => {
    arrowDirectionRef.current = arrowDirection;
  }, [arrowDirection]);

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

// Seamless world floor (no opaque cylinder disc)

    // Glowing Cyan Radial Floor Disc (Illuminates ground beneath Pokemon)
    const shadowGeo = new THREE.PlaneGeometry(4.2, 4.2);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0, "rgba(0, 245, 255, 0.65)");
      grad.addColorStop(0.35, "rgba(0, 201, 216, 0.35)");
      grad.addColorStop(0.7, "rgba(22, 119, 255, 0.12)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });
    groundContact = new THREE.Mesh(shadowGeo, shadowMat);
    groundContact.rotation.x = -Math.PI / 2;
    groundContact.position.y = 0.01;
    scene.add(groundContact);

    // Concentric Neon Cyber-Rings (Inner, Middle, Outer)
    const ringGeo = new THREE.RingGeometry(2.1, 2.22, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95
    });
    cyberRing = new THREE.Mesh(ringGeo, ringMat);
    cyberRing.rotation.x = -Math.PI / 2;
    cyberRing.position.y = 0.02;
    scene.add(cyberRing);

    const outerRingGeo = new THREE.RingGeometry(3.05, 3.16, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x1677ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    cyberRingOuter = new THREE.Mesh(outerRingGeo, outerRingMat);
    cyberRingOuter.rotation.x = -Math.PI / 2;
    cyberRingOuter.position.y = 0.02;
    scene.add(cyberRingOuter);

    // Sleek Low-Profile Holographic Emitter Collar (Matching Reference B Greninja: Base rim only, never blocks body)
    const cylCanvas = document.createElement("canvas");
    cylCanvas.width = 512;
    cylCanvas.height = 128;
    const cCtx = cylCanvas.getContext("2d");
    if (cCtx) {
      const cGrad = cCtx.createLinearGradient(0, 0, 0, 128);
      cGrad.addColorStop(0, "rgba(0, 245, 255, 0.85)");    // Glowing top emitter lip
      cGrad.addColorStop(0.3, "rgba(0, 201, 216, 0.28)");  // Soft translucent energetic wash
      cGrad.addColorStop(0.8, "rgba(22, 119, 255, 0.15)");
      cGrad.addColorStop(1, "rgba(22, 119, 255, 0.75)");   // Ground anchor rim
      cCtx.fillStyle = cGrad;
      cCtx.fillRect(0, 0, 512, 128);
    }
    const cylTex = new THREE.CanvasTexture(cylCanvas);
    cylTex.wrapS = THREE.RepeatWrapping;
    cylTex.wrapT = THREE.ClampToEdgeWrapping;

    // Sleek, low-profile collar: height 0.16 units, hugging the stage floor
    const holoCylGeo = new THREE.CylinderGeometry(2.78, 2.78, 0.16, 64, 1, true);
    const holoCylMat = new THREE.MeshBasicMaterial({
      map: cylTex,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const holoCylinder = new THREE.Mesh(holoCylGeo, holoCylMat);
    holoCylinder.position.y = 0.08;
    scene.add(holoCylinder);

    // Glowing Precision Emitter Lip on the low-profile rim
    const topRimGeo = new THREE.RingGeometry(2.76, 2.80, 64);
    const topRimMat = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const topRim = new THREE.Mesh(topRimGeo, topRimMat);
    topRim.rotation.x = -Math.PI / 2;
    topRim.position.y = 0.16;
    scene.add(topRim);

    // 4 Cardinal Emitter Nodes (Esports Stage Design)
    const nodeGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const nodes = [
      [2.78, 0.04, 0],
      [-2.78, 0.04, 0],
      [0, 0.04, 2.78],
      [0, 0.04, -2.78]
    ];
    nodes.forEach(([x, y, z]) => {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(x, y, z);
      scene.add(node);
    });

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

    // Tactile 360° Drag & Pointer Interaction (Manual inspect only - no continuous auto-spin)
    let currentRotY = rotY;
    let targetRotY = rotY;
    let currentRotX = 0;
    let targetRotX = 0;
    let mouseOffsetRotX = 0;
    let mouseOffsetRotY = 0;
    let isDragging = false;
    let lastPointerX = 0;
    let lastPointerY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      if (container) container.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - lastPointerX;
        const deltaY = e.clientY - lastPointerY;
        lastPointerX = e.clientX;
        lastPointerY = e.clientY;
        // Horizontal 360 drag rotation
        targetRotY += deltaX * 0.015;
        // 2X Vertical pitch/tilt rotation (approx 60-70 degree full range as requested)
        targetRotX = THREE.MathUtils.clamp(targetRotX + deltaY * 0.024, -0.72, 0.65);
      } else {
        const rect = container.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 (left arrow) to +0.5 (right arrow)
        const relY = (e.clientY - rect.top) / rect.height - 0.5;   // -0.5 (top) to +0.5 (bottom)
        // 2X Responsive body/gaze tracking up & down: tilts expressively following cursor
        mouseOffsetRotX = -relY * 0.46;
        mouseOffsetRotY = relX * 0.45;
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
        // Auto-normalize scale and grounding to match the approved Lapras golden standard
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const widthFootprint = Math.max(size.x, size.z);
        const heightDim = size.y || 1;

        // Balanced scaling: target height ~2.08, footprint ~2.3
        const scaleForHeight = 2.12 / heightDim;
        const scaleForWidth = 2.38 / (widthFootprint || 1);
        let autoScale = Math.min(scaleForHeight, scaleForWidth);

        // For slender humanoid/tall models, ensure generous body presence
        if (widthFootprint < heightDim * 0.72) {
          autoScale = Math.min(scaleForHeight * 1.08, 2.22 / heightDim);
        }
        // For compact/quadruped models like Pikachu, ensure solid presence
        if (maxDim < 1.0) {
          autoScale = 2.38 / maxDim;
        }
        
        const wrapper = new THREE.Group();
        gltf.scene.scale.set(autoScale, autoScale, autoScale);
        gltf.scene.position.x = -center.x * autoScale;
        gltf.scene.position.z = -center.z * autoScale;
        
        // Exact Lapras Grounding: ensure lowest point of model rests right on the pedestal (y = 0.05)
        const scaledBox = new THREE.Box3().setFromObject(gltf.scene);
        gltf.scene.position.y = -scaledBox.min.y + 0.05;
        
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
        // Interactive arrow following: If arrow button is hovered, turn smoothly to face it; otherwise follow cursor look
        const arrowTargetOffset = (arrowDirectionRef.current || 0) * 0.55;
        const dynamicLookY = arrowDirectionRef.current !== 0 ? arrowTargetOffset : mouseOffsetRotY;
        currentRotY += (targetRotY + dynamicLookY - currentRotY) * 0.08;
        modelGroup.rotation.y = currentRotY;

        // Gentle living shimmer on the holographic cylinder
        if (cylTex) {
          cylTex.offset.x += 0.0012;
        }

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
