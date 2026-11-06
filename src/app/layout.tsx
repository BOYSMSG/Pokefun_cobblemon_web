import "@/app/globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import GlobalSidebar from "@/components/GlobalSidebar";
import { Providers } from "@/components/Providers";
import AuthWidget from "@/components/AuthWidget";
import WelcomeLoginModal from "@/components/WelcomeLoginModal";
import AIChatWidget from "@/components/AIChatWidget";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ToastProvider } from "@/components/Toast";
import PushManager from "@/components/PushManager";
import MobileNavigation from "@/components/MobileNavigation";

export const metadata: Metadata = {
  title: "Pokefun | Best Cobblemon SMP Minecraft Server",
  description: "Join Pokefun, the premier Cobblemon SMP multiplayer server! Experience the best Minecraft Pokemon adventure with custom features, active community, and more.",
  keywords: ["Cobblemon server", "Minecraft Pokemon server", "Cobblemon SMP", "best cobblemon multiplayer", "India's best cobblemon server", "Minecraft server", "Pokemon Minecraft"],
  openGraph: {
    title: "Pokefun | Best Cobblemon SMP Minecraft Server",
    description: "Join Pokefun, the premier Cobblemon SMP multiplayer server! Experience the best Minecraft Pokemon adventure.",
    url: "https://pokefun.in", // Replace with actual domain if different
    siteName: "Pokefun",
    images: [
      {
        url: "https://raw.githubusercontent.com/BOYSMSG/webpokefun12-06-2026/main/public/images/logo.png", // Example logo/banner
        width: 1200,
        height: 630,
        alt: "Pokefun Cobblemon Server",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pokefun | Best Cobblemon SMP Minecraft Server",
    description: "Join Pokefun, the premier Cobblemon SMP multiplayer server! Experience the best Minecraft Pokemon adventure.",
    images: ["https://raw.githubusercontent.com/BOYSMSG/webpokefun12-06-2026/main/public/images/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Pokefun",
  "description": "Pokefun is a premier Cobblemon SMP Minecraft server featuring custom features and a great community.",
  "genre": ["Role-playing game", "Massively multiplayer online game"],
  "playMode": "MultiPlayer",
  "applicationCategory": "Game",
  "gamePlatform": ["PC", "Minecraft Java Edition", "Minecraft Bedrock Edition"],
  "publisher": {
    "@type": "Organization",
    "name": "Pokefun"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="HandheldFriendly" content="True" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        {/* CRITICAL ZERO-LATENCY STATIC HYDRATION & THEME GUARD */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Instant pre-hydration guard: Desktop must NEVER show mobile nav, Mobile must NEVER show desktop nav */
          @media (min-width: 992px) {
            .mobile-aqua-header,
            .mobile-aqua-backdrop,
            .mobile-aqua-drawer {
              display: none !important;
            }
          }
          @media (max-width: 991px) {
            .desktop-global-header,
            .desktop-sidebar-container,
            .global-sidebar,
            .global-sidebar-toggle,
            .auth-widget-wrapper {
              display: none !important;
            }
          }
          /* Instant white & electric aqua theme background to eliminate dark flash */
          html, body, .viewport {
            background-color: #F8FBFF !important;
            color: #0B1524 !important;
          }
        `}} />
        <link rel="stylesheet" href="/css/custom.css" />
        <link rel="stylesheet" type="text/css" href="/css/cards.min.css" />
        <link rel="stylesheet" type="text/css" href="/css/animate.min.css" />
        <link rel="stylesheet" type="text/css" href="/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          <ToastProvider>
            <div className="viewport">
              <MobileNavigation />
              {/* Modern Desktop Navigation Bar */}
              <header className="desktop-global-header">
                <nav id="nav" className="custom-global-nav">
                    <div className="container desktop-nav-container">
                        <a href="/" className="nav-brand-link">
                            <img src="/images/pokefun_logo_transparent.png" alt="Pokefun" className="nav-brand-logo" />
                            <span className="nav-brand-text">POKEFUN</span>
                        </a>
                        <div className="nav-links-center">
                            <a href="/">Home</a>
                            <a href="/community">Community</a>
                            <a href="/community/reels">Reels</a>
                            <a href="/messages" id="desktop-nav-messages">Messages</a>
                            <a href="/leaderboard" className="nav-gold-link">
                                <i className="fa-solid fa-trophy"></i> Leaderboards
                            </a>
                            <a href="/wiki">Wiki</a>
                            <a href="/modpacks">Modpacks</a>
                            <a href="/rules">Rules</a>
                            <a href="/vote">Vote</a>
                            <a href="https://store.pokefun.in" target="_blank" rel="noopener noreferrer" className="nav-store-link">
                                <i className="fa-solid fa-cart-shopping"></i> Store
                            </a>
                            <a href="/showcase">Showcase</a>
                            <a href="/team">Team</a>
                            <a href="/changelogs">Changelogs</a>
                            <a href="https://discord.gg/pokefun" target="_blank" rel="noopener noreferrer" className="nav-discord-link">
                                <i className="fa-brands fa-discord"></i> Discord
                            </a>
                        </div>
                    </div>
                </nav>
              </header>
            
              <main className="site-main-viewport">
                 <div className="site-content-layout">
                     <div className="desktop-sidebar-container">
                         <GlobalSidebar />
                     </div>
                     <div className="site-page-content">
                         {children}
                     </div>
                 </div>
              </main>

            <section id="footer">
                <div className="inner">
                    <div className="footer-col">
                        <div className="left">
                            <h1>2026 © <strong>Pokefun</strong></h1>
                            <p>
                                We are not affiliated with or endorsed by Mojang, AB or Pokemon.<br/>
                                <small>Updated for Pokefun | <a href="/rules">Rules</a> | <a href="/team">Staff Team</a></small>
                            </p>
                            <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                                New videos, guides, and features come fast on Discord and YouTube! Must join!
                            </p>
                        </div>
                        <div className="right">
                            <ul style={{ display: 'flex', gap: '15px', listStyle: 'none', padding: 0 }}>
                                <li><a href="https://discord.com/invite/NtE8QBkmwR" target="_blank" rel="noopener noreferrer" style={{ fontSize: '24px', color: '#5865F2' }}><i className="fa-brands fa-discord"></i></a></li>
                                <li><a href="https://www.youtube.com/@Pokefunsmp" target="_blank" rel="noopener noreferrer" style={{ fontSize: '24px', color: '#FF0000' }}><i className="fa-brands fa-youtube"></i></a></li>
                                <li><a href="https://www.instagram.com/pokefunsmp/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '24px', color: '#E1306C' }}><i className="fa-brands fa-instagram"></i></a></li>
                                <li><a href="#" className="back-to-top" style={{ fontSize: '24px' }}><i className="fa-solid fa-arrow-turn-up"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
          </div>

          <Script src="/js/jquery-3.5.1.min.js" strategy="beforeInteractive" />
          <Script src="/js/jquery-ui.js" strategy="lazyOnload" />
          <Script src="/js/casper.js" strategy="lazyOnload" />
          <Script src="/js/tsparticles.preset.stars.bundle.min.js" strategy="lazyOnload" />
          <Script id="init-scripts" strategy="lazyOnload">{`
            if (typeof tsParticles !== 'undefined') {
              tsParticles.load("tsparticles", { preset: "stars" });
            }
            
            // Set active navigation link
            const path = window.location.pathname;
            document.querySelectorAll('#nav a, .nav a').forEach(link => {
              const href = link.getAttribute('href');
              if (href && (href === path || (href !== '/' && path.startsWith(href)))) {
                link.classList.add('active-pill');
                if (link.parentElement.tagName === 'LI') {
                  link.parentElement.classList.add('nav-current');
                }
              } else {
                link.classList.remove('active-pill');
                if (link.parentElement.tagName === 'LI') {
                  link.parentElement.classList.remove('nav-current');
                }
              }
            });

            const initBurger = () => {
              const burger = document.querySelector('.gh-burger');
              if (burger && !burger.dataset.initialized) {
                burger.addEventListener('click', () => {
                  document.body.classList.toggle('gh-head-open');
                });
                burger.dataset.initialized = "true";
              }
            };
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', initBurger);
            } else {
              initBurger();
            }

            // Unread polling is now handled by PushManager component
          `}</Script>
          <PushManager />
          <WelcomeLoginModal />
          <AuthWidget />
          <AIChatWidget />
          <Analytics />
          <Script 
            async 
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1109532875069224" 
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
