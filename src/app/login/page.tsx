"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/admin"
      });
      if (result?.error) {
        setErrorMsg("Invalid administrator credentials");
      }
    } catch (err) {
      setErrorMsg("Failed to authenticate. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'radial-gradient(ellipse at top, #0b1c2d 0%, #060b13 70%, #03060a 100%)',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient background glow accents */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '20%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '20%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none'
      }} />

      {/* Main Glass Card */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        background: 'rgba(11, 20, 36, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(6, 182, 212, 0.25)',
        borderRadius: '24px',
        padding: '45px 36px',
        width: '100%',
        maxWidth: '460px',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(6, 182, 212, 0.1)',
        textAlign: 'center'
      }}>
        {/* Logo / Emblem */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{
            width: '76px',
            height: '76px',
            margin: '0 auto 18px',
            borderRadius: '22px',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(16, 185, 129, 0.2))',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(6, 182, 212, 0.3)'
          }}>
            <i className="fa-solid fa-gamepad" style={{ fontSize: '2.4rem', color: '#06b6d4' }}></i>
          </div>
          <h1 style={{ 
            color: '#0B1524', 
            margin: 0, 
            fontSize: '2rem', 
            fontWeight: 800,
            letterSpacing: '-0.5px'
          }}>
            {isAdmin ? 'Staff Access' : 'Trainer Portal'}
          </h1>
          <p style={{ color: '#94a3b8', marginTop: '8px', fontSize: '0.95rem' }}>
            {isAdmin ? 'Authenticate with administrator credentials' : 'Sign in to access your inventory, rewards & community.'}
          </p>
        </div>

        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#fca5a5',
            padding: '10px 14px',
            borderRadius: '10px',
            fontSize: '0.88rem',
            marginBottom: '20px',
            textAlign: 'left'
          }}>
            <i className="fa-solid fa-circle-exclamation" style={{ marginRight: '8px' }}></i>
            {errorMsg}
          </div>
        )}

        {!isAdmin ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Discord SSO Button */}
            <button 
              onClick={() => signIn('discord', { callbackUrl: '/' })} 
              style={{
                background: 'linear-gradient(135deg, #5865F2 0%, #4752c4 100%)',
                color: '#0B1524',
                padding: '15px 20px',
                borderRadius: '14px',
                fontSize: '1rem',
                fontWeight: 700,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                boxShadow: '0 6px 20px rgba(88, 101, 242, 0.35)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(88, 101, 242, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(88, 101, 242, 0.35)';
              }}
            >
              <i className="fa-brands fa-discord" style={{ fontSize: '1.25rem' }}></i> Continue with Discord
            </button>

            {/* Google SSO Button */}
            <button 
              onClick={() => signIn('google', { callbackUrl: '/' })} 
              style={{
                background: 'linear-gradient(135deg, rgba(234, 67, 53, 0.9) 0%, rgba(197, 34, 31, 0.9) 100%)',
                color: '#0B1524',
                padding: '15px 20px',
                borderRadius: '14px',
                fontSize: '1rem',
                fontWeight: 700,
                border: '1px solid rgba(255, 255, 255, 0.15)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                boxShadow: '0 6px 20px rgba(219, 68, 55, 0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(219, 68, 55, 0.45)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(219, 68, 55, 0.3)';
              }}
            >
              <i className="fa-brands fa-google" style={{ fontSize: '1.15rem' }}></i> Continue with Google
            </button>

            {/* Divider */}
            <div style={{ margin: '18px 0', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
              <span style={{ color: '#64748b', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>or</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
            </div>

            {/* Staff / Admin Toggle */}
            <button 
              onClick={() => setIsAdmin(true)} 
              style={{
                background: 'rgba(255,255,255,0.03)',
                color: '#94a3b8',
                padding: '12px',
                borderRadius: '12px',
                fontSize: '0.92rem',
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => { 
                e.currentTarget.style.color = '#06b6d4'; 
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
                e.currentTarget.style.background = 'rgba(6, 182, 212, 0.05)';
              }}
              onMouseOut={(e) => { 
                e.currentTarget.style.color = '#94a3b8'; 
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              }}
            >
              <i className="fa-solid fa-shield-halved"></i> Staff Portal Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
                Administrator Email
              </label>
              <div style={{ position: 'relative' }}>
                <i className="fa-solid fa-envelope" style={{ position: 'absolute', left: '16px', top: '16px', color: '#64748b' }}></i>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@pokefun.in"
                  style={{ 
                    width: '100%', 
                    padding: '14px 16px 14px 44px', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(255,255,255,0.12)', 
                    background: 'rgba(6, 11, 19, 0.7)', 
                    color: '#0B1524', 
                    outline: 'none',
                    fontSize: '0.95rem'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#06b6d4'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
                Master Password
              </label>
              <div style={{ position: 'relative' }}>
                <i className="fa-solid fa-lock" style={{ position: 'absolute', left: '16px', top: '16px', color: '#64748b' }}></i>
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{ 
                    width: '100%', 
                    padding: '14px 16px 14px 44px', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(255,255,255,0.12)', 
                    background: 'rgba(6, 11, 19, 0.7)', 
                    color: '#0B1524', 
                    outline: 'none',
                    fontSize: '0.95rem'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#06b6d4'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', 
                color: '#060b13', 
                padding: '15px', 
                borderRadius: '12px',
                fontSize: '1rem', 
                fontWeight: 800, 
                border: 'none', 
                cursor: loading ? 'not-allowed' : 'pointer', 
                marginTop: '10px',
                boxShadow: '0 6px 20px rgba(6, 182, 212, 0.35)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i> Authenticating...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-shield-check"></i> Sign In to Dashboard
                </>
              )}
            </button>

            <button 
              type="button"
              onClick={() => setIsAdmin(false)} 
              style={{
                background: 'transparent', 
                color: '#94a3b8', 
                padding: '10px', 
                borderRadius: '10px',
                fontSize: '0.88rem', 
                border: 'none', 
                cursor: 'pointer',
                textAlign: 'center',
                marginTop: '4px'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#f8fafc'}
              onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
            >
              <i className="fa-solid fa-arrow-left" style={{ marginRight: '6px' }}></i> Back to Player Sign In
            </button>
          </form>
        )}

        {/* Back to Home Link */}
        <div style={{ marginTop: '28px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
          <Link href="/" style={{ color: '#64748b', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#06b6d4'}
            onMouseOut={(e) => e.currentTarget.style.color = '#64748b'}
          >
            <i className="fa-solid fa-house" style={{ marginRight: '6px' }}></i> Return to Pokéfun Home
          </Link>
        </div>

      </div>
    </div>
  );
}