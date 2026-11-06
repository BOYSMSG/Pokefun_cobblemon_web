"use client";

import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

export default function WelcomeLoginModal() {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Listen for contextual login events (e.g. when unauthenticated user attempts an action)
    const handleTrigger = () => setShowModal(true);
    window.addEventListener("open-login-modal", handleTrigger);
    return () => window.removeEventListener("open-login-modal", handleTrigger);
  }, []);

  const handleDismiss = () => {
    setShowModal(false);
  };

  if (!showModal || session) return null;

  return (
    <div 
      className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={handleDismiss}
    >
      <div 
        className="relative w-full max-w-md p-8 overflow-hidden text-center rounded-3xl bg-slate-900/90 border border-cyan-500/30 shadow-[0_25px_60px_-15px_rgba(0,201,216,0.3)] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow backdrop behind logo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700/80 transition-all text-sm font-bold"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Logo & Header */}
        <div className="mb-6 flex flex-col items-center">
          <img 
            src="/images/pokefun_logo_transparent.png" 
            alt="POKEFUN" 
            className="w-36 h-auto drop-shadow-[0_4px_20px_rgba(0,201,216,0.4)] mb-3"
          />
          <span className="px-3 py-1 text-xs font-extrabold tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 rounded-full uppercase">
            Cobblemon Network
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-3">
            Join POKEFUN
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Sign in to access your profile, post reels, claim daily rewards, and connect with the community.
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="flex flex-col gap-3 mb-4">
          <button 
            onClick={() => signIn('discord')} 
            className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-[#5865F2] hover:bg-[#4752c4] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#5865F2]/25 hover:-translate-y-0.5 active:translate-y-0"
          >
            <i className="fa-brands fa-discord text-xl"></i>
            <span>Continue with Discord</span>
          </button>
          
          <button 
            onClick={() => signIn('google')} 
            className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-[#EA4335] hover:bg-[#d33426] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#EA4335]/25 hover:-translate-y-0.5 active:translate-y-0"
          >
            <i className="fa-brands fa-google text-lg"></i>
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
          <a href="/login" className="hover:text-cyan-400 transition-colors">Admin Login</a>
          <button onClick={handleDismiss} className="hover:text-slate-300 transition-colors font-medium">
            Explore as Guest →
          </button>
        </div>
      </div>
    </div>
  );
}
