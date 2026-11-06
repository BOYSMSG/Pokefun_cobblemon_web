"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ModpacksPage() {
  const [copied, setCopied] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const handleCopyIP = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("play.pokefun.in");
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#F8FBFF", 
      color: "#0B1524",
      padding: "50px 20px 100px 20px",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Breadcrumb & Navigation */}
        <div style={{ marginBottom: "28px", display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#64748B" }}>
          <Link href="/" style={{ color: "#1677FF", textDecoration: "none", fontWeight: 700 }}>Home</Link>
          <span>/</span>
          <span style={{ color: "#0B1524", fontWeight: 700 }}>Modpacks &amp; Clients</span>
        </div>

        {/* Hero Header */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <div style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "8px", 
            padding: "6px 18px", 
            borderRadius: "9999px", 
            background: "rgba(22, 119, 255, 0.08)", 
            border: "1px solid rgba(22, 119, 255, 0.2)",
            marginBottom: "16px"
          }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981" }}></span>
            <span style={{ fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.8px", color: "#1677FF", textTransform: "uppercase" }}>
              Official Modpacks • Cobblemon 1.21.1
            </span>
          </div>

          <h1 style={{ 
            fontFamily: "'Righteous', cursive, sans-serif", 
            fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", 
            fontWeight: 900, 
            color: "#0B1524", 
            margin: "0 0 14px 0",
            letterSpacing: "0.5px"
          }}>
            Get the Official <span style={{ 
              background: "linear-gradient(135deg, #00C9D8 0%, #1677FF 100%)", 
              WebkitBackgroundClip: "text", 
              WebkitTextFillColor: "transparent" 
            }}>POKEFUN</span> Modpack
          </h1>

          <p style={{ 
            fontSize: "clamp(1rem, 1.8vw, 1.15rem)", 
            color: "#3D567A", 
            maxWidth: "680px", 
            margin: "0 auto", 
            lineHeight: 1.6,
            fontWeight: 500
          }}>
            Experience custom Pokémon DNA fusions, shaders, voice chat, and 120+ FPS optimizations tailored specifically for POKEFUN SMP.
          </p>
        </div>

        {/* 3-Column Platform Downloads Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
          gap: "24px", 
          marginBottom: "70px" 
        }}>
          
          {/* Card 1: PC Players (CurseForge & Modrinth) */}
          <div style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            border: "1.5px solid rgba(22, 119, 255, 0.16)",
            boxShadow: "0 10px 30px rgba(11, 21, 36, 0.06)",
            padding: "32px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "4px",
              background: "linear-gradient(90deg, #F16436 0%, #1BD96A 100%)"
            }} />

            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
                <div style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: "rgba(22, 119, 255, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.6rem",
                  color: "#1677FF"
                }}>
                  <i className="fa-solid fa-desktop"></i>
                </div>
                <span style={{
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  background: "rgba(16, 185, 129, 0.1)",
                  color: "#059669",
                  border: "1px solid rgba(16, 185, 129, 0.25)"
                }}>
                  Recommended
                </span>
              </div>

              <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0B1524", margin: "0 0 8px 0" }}>
                PC Players
              </h2>
              <p style={{ color: "#475569", fontSize: "0.92rem", lineHeight: 1.5, margin: "0 0 24px 0" }}>
                Full experience with Iris shaders, sodium performance boost, custom DNA textures, and voice chat.
              </p>
            </div>

            {/* PC Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* CurseForge Button */}
              <a 
                href="https://www.curseforge.com/minecraft/modpacks/pokefun-cobblemon" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  background: "linear-gradient(135deg, #F16436 0%, #E04E1D 100%)",
                  color: "#FFFFFF",
                  padding: "13px 20px",
                  borderRadius: "14px",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 18px rgba(241, 100, 54, 0.32)",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fa-solid fa-fire" style={{ fontSize: "1.2rem" }}></i>
                  <div style={{ textAlign: "left", lineHeight: 1.2 }}>
                    <div style={{ fontSize: "0.92rem", fontWeight: 900 }}>CurseForge Modpack</div>
                    <div style={{ fontSize: "0.7rem", opacity: 0.88, fontWeight: 600 }}>1-Click Install • Auto Updates</div>
                  </div>
                </div>
                <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.85rem" }}></i>
              </a>

              {/* Modrinth Button */}
              <a 
                href="https://modrinth.com/modpack/pokefun/versions" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  background: "linear-gradient(135deg, #1BD96A 0%, #12A14D 100%)",
                  color: "#FFFFFF",
                  padding: "13px 20px",
                  borderRadius: "14px",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 18px rgba(27, 217, 106, 0.32)",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fa-solid fa-cube" style={{ fontSize: "1.2rem" }}></i>
                  <div style={{ textAlign: "left", lineHeight: 1.2 }}>
                    <div style={{ fontSize: "0.92rem", fontWeight: 900 }}>Modrinth Versions</div>
                    <div style={{ fontSize: "0.7rem", opacity: 0.88, fontWeight: 600 }}>Fabric • Fast &amp; Lightweight</div>
                  </div>
                </div>
                <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.85rem" }}></i>
              </a>
            </div>
          </div>

          {/* Card 2: Advanced & Direct Links */}
          <div style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            border: "1.5px solid rgba(22, 119, 255, 0.16)",
            boxShadow: "0 10px 30px rgba(11, 21, 36, 0.06)",
            padding: "32px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "4px",
              background: "linear-gradient(90deg, #00C9D8 0%, #1677FF 100%)"
            }} />

            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
                <div style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: "rgba(0, 201, 216, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.6rem",
                  color: "#08979C"
                }}>
                  <i className="fa-solid fa-bolt"></i>
                </div>
                <span style={{
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  background: "rgba(22, 119, 255, 0.08)",
                  color: "#1677FF",
                  border: "1px solid rgba(22, 119, 255, 0.2)"
                }}>
                  Power Users
                </span>
              </div>

              <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0B1524", margin: "0 0 8px 0" }}>
                Advanced Links
              </h2>
              <p style={{ color: "#475569", fontSize: "0.92rem", lineHeight: 1.5, margin: "0 0 24px 0" }}>
                Direct server resource packs, custom launcher zip packages, Prism/MultiMC instances, and mirrors.
              </p>
            </div>

            {/* Advanced Button */}
            <div>
              <a 
                href="https://store.pokefun.in/modpacks" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  background: "linear-gradient(135deg, #00C9D8 0%, #1677FF 100%)",
                  color: "#FFFFFF",
                  padding: "15px 20px",
                  borderRadius: "14px",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 18px rgba(0, 201, 216, 0.32)",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fa-solid fa-cloud-arrow-down" style={{ fontSize: "1.3rem" }}></i>
                  <div style={{ textAlign: "left", lineHeight: 1.2 }}>
                    <div style={{ fontSize: "0.94rem", fontWeight: 900 }}>Advanced &amp; Direct Links</div>
                    <div style={{ fontSize: "0.7rem", opacity: 0.88, fontWeight: 600 }}>Zip Mirrors &amp; Modpack Store</div>
                  </div>
                </div>
                <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.85rem" }}></i>
              </a>
            </div>
          </div>

          {/* Card 3: Mobile Players (Controls & PojavLauncher) */}
          <div style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            border: "1.5px solid rgba(22, 119, 255, 0.16)",
            boxShadow: "0 10px 30px rgba(11, 21, 36, 0.06)",
            padding: "32px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "4px",
              background: "linear-gradient(90deg, #F59E0B 0%, #10B981 100%)"
            }} />

            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
                <div style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: "rgba(245, 158, 11, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.6rem",
                  color: "#D97706"
                }}>
                  <i className="fa-solid fa-mobile-screen-button"></i>
                </div>
                <span style={{
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  background: "rgba(245, 158, 11, 0.1)",
                  color: "#D97706",
                  border: "1px solid rgba(245, 158, 11, 0.25)"
                }}>
                  Android Java
                </span>
              </div>

              <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0B1524", margin: "0 0 8px 0" }}>
                Mobile Controls
              </h2>
              <p style={{ color: "#475569", fontSize: "0.92rem", lineHeight: 1.5, margin: "0 0 24px 0" }}>
                Dedicated PojavLauncher touch controls (.json keymap file) optimized for battle menus and Pokémon movement.
              </p>
            </div>

            {/* Mobile Controls Button */}
            <div>
              <a 
                href="https://drive.google.com/file/d/1cKrdzKCoLeH9vbzwehHf5sO0JpxGCBi6/view?usp=sharing" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                  color: "#FFFFFF",
                  padding: "15px 20px",
                  borderRadius: "14px",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 18px rgba(245, 158, 11, 0.32)",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fa-solid fa-gamepad" style={{ fontSize: "1.3rem" }}></i>
                  <div style={{ textAlign: "left", lineHeight: 1.2 }}>
                    <div style={{ fontSize: "0.94rem", fontWeight: 900 }}>Download Mobile Controls</div>
                    <div style={{ fontSize: "0.7rem", opacity: 0.88, fontWeight: 600 }}>Google Drive (.json Keymap)</div>
                  </div>
                </div>
                <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.85rem" }}></i>
              </a>
            </div>
          </div>

        </div>

        {/* Video Guides Section */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span style={{ 
              fontSize: "0.8rem", 
              fontWeight: 800, 
              color: "#1677FF", 
              textTransform: "uppercase", 
              letterSpacing: "1px" 
            }}>
              Official Video Tutorials
            </span>
            <h2 style={{ 
              fontFamily: "'Righteous', cursive, sans-serif", 
              fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)", 
              fontWeight: 900, 
              color: "#0B1524", 
              margin: "6px 0 10px 0" 
            }}>
              Step-by-Step Installation Guides
            </h2>
            <p style={{ color: "#475569", fontSize: "0.95rem", maxWidth: "600px", margin: "0 auto" }}>
              Follow these quick 2-minute video guides to get Cobblemon running smoothly on your device.
            </p>
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", 
            gap: "28px" 
          }}>
            
            {/* Guide 1: PC Installation Guide */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              border: "1px solid rgba(22, 119, 255, 0.16)",
              boxShadow: "0 10px 30px rgba(11, 21, 36, 0.06)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column"
            }}>
              <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", background: "#0B1524" }}>
                <img 
                  src="/images/pcguide.png" 
                  alt="How to Play on PC" 
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(11, 21, 36, 0.75) 0%, rgba(11, 21, 36, 0.2) 100%)"
                }} />
                <a 
                  href="https://youtu.be/eTZY2fRo8Wc" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "68px",
                    height: "68px",
                    borderRadius: "50%",
                    background: "rgba(22, 119, 255, 0.95)",
                    boxShadow: "0 8px 24px rgba(22, 119, 255, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    fontSize: "1.6rem",
                    textDecoration: "none",
                    transition: "transform 0.2s, background 0.2s"
                  }}
                  title="Play PC Guide on YouTube"
                >
                  <i className="fa-solid fa-play" style={{ marginLeft: "4px" }}></i>
                </a>
                <span style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  background: "rgba(0, 0, 0, 0.8)",
                  color: "#FFFFFF",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  padding: "4px 8px",
                  borderRadius: "6px"
                }}>
                  YouTube • 1080p
                </span>
              </div>

              <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "10px", flex: 1, justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span style={{
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      padding: "3px 8px",
                      borderRadius: "6px",
                      background: "rgba(22, 119, 255, 0.1)",
                      color: "#1677FF"
                    }}>
                      PC TUTORIAL
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0B1524", margin: "0 0 6px 0" }}>
                    How to Play on PC (CurseForge &amp; Modrinth)
                  </h3>
                  <p style={{ color: "#64748B", fontSize: "0.9rem", lineHeight: 1.5, margin: 0 }}>
                    Step-by-step video tutorial covering launcher setup, memory allocation (4GB+), and joining the server seamlessly.
                  </p>
                </div>

                <a 
                  href="https://youtu.be/eTZY2fRo8Wc" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#1677FF",
                    textDecoration: "none",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    marginTop: "12px"
                  }}
                >
                  <span>Watch PC Tutorial</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>

            {/* Guide 2: Mobile Installation Guide */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              border: "1px solid rgba(22, 119, 255, 0.16)",
              boxShadow: "0 10px 30px rgba(11, 21, 36, 0.06)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column"
            }}>
              <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", background: "#0B1524" }}>
                <img 
                  src="/images/mobileguide.png" 
                  alt="How to Play on Mobile" 
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(11, 21, 36, 0.75) 0%, rgba(11, 21, 36, 0.2) 100%)"
                }} />
                <a 
                  href="https://youtu.be/cti3gLQTT1M" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "68px",
                    height: "68px",
                    borderRadius: "50%",
                    background: "rgba(245, 158, 11, 0.95)",
                    boxShadow: "0 8px 24px rgba(245, 158, 11, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    fontSize: "1.6rem",
                    textDecoration: "none",
                    transition: "transform 0.2s, background 0.2s"
                  }}
                  title="Play Mobile Guide on YouTube"
                >
                  <i className="fa-solid fa-play" style={{ marginLeft: "4px" }}></i>
                </a>
                <span style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  background: "rgba(0, 0, 0, 0.8)",
                  color: "#FFFFFF",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  padding: "4px 8px",
                  borderRadius: "6px"
                }}>
                  YouTube • 1080p
                </span>
              </div>

              <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "10px", flex: 1, justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span style={{
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      padding: "3px 8px",
                      borderRadius: "6px",
                      background: "rgba(245, 158, 11, 0.12)",
                      color: "#D97706"
                    }}>
                      MOBILE TUTORIAL
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0B1524", margin: "0 0 6px 0" }}>
                    How to Play on Mobile (PojavLauncher Setup)
                  </h3>
                  <p style={{ color: "#64748B", fontSize: "0.9rem", lineHeight: 1.5, margin: 0 }}>
                    Complete walkthrough for downloading PojavLauncher on Android, importing the custom POKEFUN controls keymap, and logging in.
                  </p>
                </div>

                <a 
                  href="https://youtu.be/cti3gLQTT1M" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#D97706",
                    textDecoration: "none",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    marginTop: "12px"
                  }}
                >
                  <span>Watch Mobile Tutorial</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Server IP Quick Gateway Banner */}
        <div style={{
          background: "#FFFFFF",
          borderRadius: "20px",
          border: "1.5px solid rgba(0, 201, 216, 0.4)",
          boxShadow: "0 10px 30px rgba(22, 119, 255, 0.08)",
          padding: "28px 32px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981" }}></span>
              <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#1677FF", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                Ready to Join?
              </span>
            </div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0B1524", margin: 0 }}>
              Server IP: <span style={{ fontFamily: "monospace", color: "#1677FF" }}>play.pokefun.in</span>
            </h3>
            <p style={{ color: "#64748B", fontSize: "0.85rem", margin: "4px 0 0 0" }}>
              Port: 25565 • Minecraft Java 1.21.1 • Mobile Supported via PojavLauncher
            </p>
          </div>

          <button
            onClick={handleCopyIP}
            style={{
              background: "linear-gradient(135deg, #00C9D8 0%, #1677FF 100%)",
              color: "#FFFFFF",
              border: "none",
              padding: "13px 28px",
              borderRadius: "14px",
              fontFamily: "'Righteous', cursive, sans-serif",
              fontSize: "0.96rem",
              fontWeight: 900,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              boxShadow: "0 6px 20px rgba(0, 201, 216, 0.35)",
              transition: "transform 0.2s"
            }}
          >
            <i className={`fa-solid ${copied ? "fa-check" : "fa-copy"}`}></i>
            <span>{copied ? "IP COPIED! ⚡" : "COPY SERVER IP"}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
