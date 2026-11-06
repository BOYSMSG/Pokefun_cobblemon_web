p = r'd:\Downloads\websitework\website\pokefun-nextjs-app\public\css\custom.css'
with open(p, 'r', encoding='utf-8') as f:
    c = f.read()

target = """/* ===================================================================
   SMOOTH PROFESSIONAL MICRO-ANIMATIONS & HOVER INTERACTIONS
   =================================================================== */"""

replacement = """/* ===================================================================
   SMOOTH PROFESSIONAL MICRO-ANIMATIONS & HOVER INTERACTIONS
   =================================================================== */
.scifi-sheen-btn,
button,
.btn,
a.btn-interactive,
.cta-button,
.nav-store-pill {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s ease !important;
  cursor: pointer !important;
  will-change: transform, box-shadow;
}

.scifi-sheen-btn:hover,
button:hover,
.btn:hover,
a.btn-interactive:hover,
.cta-button:hover,
.nav-store-pill:hover {
  transform: translateY(-3.5px) scale(1.02) !important;
  filter: brightness(1.08) !important;
}

.scifi-sheen-btn:active,
button:active,
.btn:active,
a.btn-interactive:active,
.cta-button:active,
.nav-store-pill:active {
  transform: translateY(1px) scale(0.97) !important;
  filter: brightness(0.95) !important;
}

/* Specific Glowing Shadows on Hover */
.cta-btn-play:hover {
  box-shadow: 0 10px 28px rgba(0, 201, 216, 0.55) !important;
}
.cta-btn-discord:hover {
  box-shadow: 0 10px 28px rgba(88, 101, 242, 0.5) !important;
}
.cta-btn-store:hover {
  box-shadow: 0 10px 28px rgba(245, 158, 11, 0.5) !important;
}
.cta-btn-owner:hover {
  box-shadow: 0 10px 28px rgba(14, 165, 233, 0.55) !important;
}

/* Micro Icon Animations inside CTAs on Hover */
.scifi-sheen-btn:hover i.fa-arrow-up-right-from-square {
  transform: translate(2.5px, -2.5px);
  transition: transform 0.2s ease;
}
.scifi-sheen-btn:hover i.fa-copy,
.scifi-sheen-btn:hover i.fa-check {
  transform: scale(1.2);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.scifi-sheen-btn:hover i.fa-crown {
  transform: rotate(-12deg) scale(1.2);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.scifi-sheen-btn:hover i.fa-discord {
  transform: scale(1.18);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.scifi-sheen-btn:hover i.fa-cart-shopping {
  transform: scale(1.18);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Smooth Dropdown & Modal Open Animations */
@keyframes scifiPopIn {
  0% {
    opacity: 0;
    transform: scale(0.94) translateY(6px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.scifi-popup, .modal-content, .dropdown-menu {
  animation: scifiPopIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transform-origin: top center;
}

/* Subtle Sci-Fi Sheen on Hover */
.scifi-sheen-btn {
  position: relative;
  overflow: hidden;
}
.scifi-sheen-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -120%;
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.38), transparent);
  transform: skewX(-25deg);
  transition: left 0.65s ease;
  pointer-events: none;
}
.scifi-sheen-btn:hover::after {
  left: 150%;
}
"""

if target in c:
    idx = c.find(target)
    c = c[:idx] + replacement
    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print("Replaced hover section successfully!")
else:
    c = c + "\n" + replacement
    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print("Appended hover section!")
