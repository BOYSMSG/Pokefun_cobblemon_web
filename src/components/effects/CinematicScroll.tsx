"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CinematicScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero Entrance Animation
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      heroTl.from(".hero-text-column h1", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        delay: 0.15
      })
      .from(".hero-text-column p", {
        y: 18,
        opacity: 0,
        duration: 0.65
      }, "-=0.5")
      .from(".apex-gateway-card", {
        y: 24,
        opacity: 0,
        scale: 0.98,
        duration: 0.75
      }, "-=0.4")
      .from(".hero-satellite-btn", {
        y: 14,
        opacity: 0,
        stagger: 0.08,
        duration: 0.55
      }, "-=0.4")
      .from(".hero-pod-wrapper", {
        scale: 0.94,
        opacity: 0,
        duration: 0.9
      }, "-=0.7");

      // 2. Feature Cards Scroll Reveal
      gsap.from(".feature-card-item", {
        scrollTrigger: {
          trigger: ".features-grid-container",
          start: "top 82%",
          toggleActions: "play none none none"
        },
        y: 35,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out"
      });

      // 3. Community Hub Card Reveal
      gsap.from(".community-hub-card", {
        scrollTrigger: {
          trigger: ".community-hub-card",
          start: "top 85%",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out"
      });

      // 4. Leaderboard Card Reveal
      gsap.from(".leaderboard-promo-section", {
        scrollTrigger: {
          trigger: ".leaderboard-promo-section",
          start: "top 85%",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out"
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
