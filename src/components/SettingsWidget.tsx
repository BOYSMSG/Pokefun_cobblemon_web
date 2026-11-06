"use client";

import React, { useState, useEffect, useRef } from "react";

export default function SettingsWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize theme from local storage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      // locked light
      // locked light
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark-mode");
    }

    // Try to autoplay music
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }

    // Load Google Translate script safely
    const addGoogleTranslateScript = () => {
      try {
        if (typeof window !== "undefined" && !document.getElementById("google-translate-script") && !(window as any).google?.translate) {
          const script = document.createElement("script");
          script.id = "google-translate-script";
          script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
          script.async = true;
          (window as any).googleTranslateElementInit = () => {
            try {
              if ((window as any).google?.translate?.TranslateElement) {
                new (window as any).google.translate.TranslateElement(
                  { pageLanguage: 'en', autoDisplay: false },
                  'google_translate_element'
                );
              }
            } catch (err) {}
          };
          document.body.appendChild(script);
        }
      } catch (err) {}
    };
    addGoogleTranslateScript();

    // Event listener for auto-pausing music (e.g. when Reels play)
    const handlePauseMusic = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener("pauseGlobalMusic", handlePauseMusic);

    return () => {
      window.removeEventListener("pauseGlobalMusic", handlePauseMusic);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      // locked light
      localStorage.setItem("theme", "dark");
      // locked light
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/north_province.ogg" loop />
      
      <div className="settings-widget-container">
        {/* Menu Options */}
        <div style={{
          display: isOpen ? "flex" : "none",
          flexDirection: "column",
          gap: "10px",
          background: "rgba(255, 255, 255, 0.95)",
          border: "1.5px solid rgba(0, 201, 216, 0.4)",
          backdropFilter: "blur(16px)",
          padding: "15px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0, 201, 216, 0.25)",
          animation: "fadeInUp 0.3s ease"
        }}>
          
          <div id="google_translate_element" style={{ background: "rgba(22, 119, 255, 0.08)", borderRadius: "10px", padding: "5px", border: "1px solid rgba(0, 201, 216, 0.3)" }}></div>
          
          <button onClick={togglePlay} className="settings-btn" title="Toggle Music">
            <i className={`fa-solid ${isPlaying ? "fa-volume-high" : "fa-volume-xmark"}`} style={{ color: "#1677FF" }}></i>
            <span>Music</span>
          </button>
          
          <button onClick={toggleTheme} className="settings-btn" title="Toggle Theme">
            <i className={`fa-solid ${isDarkMode ? "fa-sun" : "fa-moon"}`} style={{ color: "#d97706" }}></i>
            <span>Theme</span>
          </button>
        </div>

        {/* Main Toggle Button - Sleek Frosted Glass with Aqua Glow */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="settings-widget-toggle-btn"
          title="Pokéfun Audio & Settings"
          aria-label="Settings"
        >
          <i className={`fa-solid ${isOpen ? "fa-times" : "fa-gear"}`} style={{ transition: "0.3s transform ease", transform: isOpen ? "rotate(90deg)" : "none" }}></i>
        </button>
      </div>
      
      <style>{`
        .settings-widget-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          z-index: 9999;
        }
        .settings-widget-toggle-btn {
          background: rgba(255, 255, 255, 0.92);
          color: #1677FF;
          border: 1.5px solid rgba(0, 201, 216, 0.45);
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(0, 201, 216, 0.25);
          backdrop-filter: blur(12px);
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .settings-widget-toggle-btn:hover {
          transform: scale(1.1);
          border-color: #00C9D8;
          color: #0088A3;
          box-shadow: 0 6px 24px rgba(0, 201, 216, 0.4);
        }
        .settings-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #F0F6FE;
          color: #0B1524;
          border: 1px solid rgba(0, 201, 216, 0.25);
          padding: 8px 15px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 14px;
          font-weight: bold;
          transition: 0.2s;
        }
        .settings-btn:hover {
          background: #E6F8FF;
          color: #1677FF;
          border-color: #00C9D8;
          transform: translateX(-3px);
        }
        .settings-btn i {
          width: 20px;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .settings-widget-container {
            bottom: 16px;
            right: 16px;
          }
          .settings-widget-toggle-btn {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }
        }
        
        /* Hide Google Translate Branding */
        .goog-te-gadget {
          font-size: 0px !important;
          color: transparent !important;
          pointer-events: none !important;
        }
        .goog-te-gadget .goog-te-combo {
          font-size: 14px !important;
          color: black !important;
          margin: 0 !important;
          pointer-events: auto !important;
        }
        .goog-te-gadget a, .goog-logo-link {
          display: none !important;
          pointer-events: none !important;
        }
        .goog-te-gadget img {
          display: none !important;
        }
        #goog-gt-tt, .goog-te-balloon-frame {
          display: none !important;
        }
        .goog-text-highlight {
          background: none !important;
          box-shadow: none !important;
        }
        body { top: 0 !important; }
        .skiptranslate iframe { display: none !important; }
      `}</style>
    </>
  );
}
