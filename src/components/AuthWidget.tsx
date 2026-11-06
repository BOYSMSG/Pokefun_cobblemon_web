"use client";

import React, { useState, useRef, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthWidget() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session) {
    return (
      <div className="auth-navbar-item" style={{ display: "inline-flex", alignItems: "center", marginLeft: "12px", flexShrink: 0 }}>
        <Link
          href="/login"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 20px",
            borderRadius: "9999px",
            background: "linear-gradient(135deg, #1677FF 0%, #00C9D8 100%)",
            color: "#FFFFFF",
            fontSize: "0.85rem",
            fontWeight: 800,
            letterSpacing: "0.5px",
            textDecoration: "none",
            boxShadow: "0 4px 15px rgba(0, 201, 216, 0.3)",
            transition: "all 0.2s ease",
            whiteSpace: "nowrap"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 201, 216, 0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 201, 216, 0.3)";
          }}
        >
          <i className="fa-solid fa-arrow-right-to-bracket" style={{ fontSize: "0.88rem" }}></i>
          <span>Sign In</span>
        </Link>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="auth-navbar-item" style={{ position: "relative", display: "inline-flex", alignItems: "center", marginLeft: "12px", flexShrink: 0 }}>
      {/* Logged in User Pill Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "#FFFFFF",
          color: "#0B1524",
          border: "1.5px solid rgba(0, 201, 216, 0.35)",
          borderRadius: "9999px",
          padding: "4px 14px 4px 4px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "0.85rem",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 2px 10px rgba(0, 201, 216, 0.12)",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#00C9D8";
          e.currentTarget.style.boxShadow = "0 4px 14px rgba(0, 201, 216, 0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(0, 201, 216, 0.35)";
          e.currentTarget.style.boxShadow = "0 2px 10px rgba(0, 201, 216, 0.12)";
        }}
      >
        <img 
          src={session.user?.image || "/images/default-avatar.png"} 
          alt={session.user?.name || "User"}
          style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(0, 201, 216, 0.4)" }} 
        />
        <span style={{ maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {session.user?.name || "Trainer"}
        </span>
        <i className="fa-solid fa-chevron-down" style={{ fontSize: "0.68rem", color: "#64748B", transition: "transform 0.2s ease", transform: isOpen ? "rotate(180deg)" : "none" }}></i>
      </button>

      {/* Modern Sci-Fi Dropdown Menu */}
      {isOpen && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 10px)",
          right: 0,
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          background: "#FFFFFF",
          padding: "14px",
          borderRadius: "18px",
          border: "1.5px solid rgba(0, 201, 216, 0.25)",
          boxShadow: "0 12px 35px rgba(22, 119, 255, 0.12)",
          minWidth: "220px",
          zIndex: 10000,
          animation: "fadeInDown 0.2s ease"
        }}>
          {/* User Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingBottom: "10px", borderBottom: "1px solid rgba(0, 201, 216, 0.15)", marginBottom: "4px" }}>
            <img src={session.user?.image || "/images/default-avatar.png"} alt="User" style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }} />
            <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <span style={{ fontWeight: 800, fontSize: "0.88rem", color: "#0B1524", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{session.user?.name}</span>
              <span style={{ color: "#1677FF", fontSize: "0.74rem", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{session.user?.email}</span>
            </div>
          </div>

          <Link href="/profile" onClick={() => setIsOpen(false)} className="auth-menu-link">
            <i className="fa-solid fa-user" style={{ color: "#1677FF", width: "16px" }}></i>
            <span>My Profile</span>
          </Link>
          <Link href="/studio" onClick={() => setIsOpen(false)} className="auth-menu-link">
            <i className="fa-solid fa-clapperboard" style={{ color: "#00C9D8", width: "16px" }}></i>
            <span>Creator Studio</span>
          </Link>
          <Link href="/messages" onClick={() => setIsOpen(false)} className="auth-menu-link">
            <i className="fa-solid fa-envelope" style={{ color: "#f59e0b", width: "16px" }}></i>
            <span>Messages</span>
          </Link>
          
          <div style={{ height: "1px", background: "rgba(0, 201, 216, 0.12)", margin: "4px 0" }}></div>

          <button 
            onClick={() => { setIsOpen(false); signOut(); }} 
            className="auth-menu-link" 
            style={{ width: "100%", background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}
          >
            <i className="fa-solid fa-arrow-right-from-bracket" style={{ color: "#ef4444", width: "16px" }}></i>
            <span>Sign Out</span>
          </button>
        </div>
      )}

      <style>{`
        .auth-menu-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border-radius: 10px;
          color: #0B1524;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.15s ease;
        }
        .auth-menu-link:hover {
          background: rgba(22, 119, 255, 0.08);
          color: #1677FF;
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
