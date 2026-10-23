# MUSE — Specialty Coffee & Beverage Sanctuary

> *“A little pause. A better day.”*

MUSE is an award-winning, fictional premium specialty coffee and beverage web experience created for a competitive web design hackathon. Moving far beyond generic café templates, MUSE is built like a luxury editorial campaign brought to life with real-time 3D WebGL physics, tactile micro-interactions, and an interactive drink discovery ritual.

---

## ☕ Key Features

- **Signature 3D Floating Coffee Beans (Three.js WebGL):** Parametric roasted coffee beans with natural longitudinal clefts, organic physics, mouse-responsive parallax, cursor deflection, and celebratory roasted spark particles on click.
- **Fluid Crema Wave Transition:** Custom SVG crema transition between the hero and menu sections.
- **Curated Signature Drinks Showcase:**
  1. *Velvet Latte* (₹220)
  2. *Cloud Nine Cold Brew* (₹240)
  3. *Rose Vanilla Matcha* (₹260)
  4. *Midnight Mocha* (₹250)
  5. *Honey Cinnamon Latte* (₹230)
  6. *Pistachio Cream Latte* (₹280)
- **3D Perspective Hover Tilt:** Drink cards calculate real-time cursor offsets to tilt with depth shadows, dynamic radial spotlights, and independent image scale zoom.
- **“Find Your Pour” Interactive Ritual:** 4 selectable moods (*The Focus Mode, The Slow Moment, The Creative Spark, The Comfort Ritual*) with real-time Hot/Iced toggling and deterministic recommendation matching with coffee-colored confetti bursts.
- **The Art of Coffee:** 3-stage interactive timeline (*01 The Origin, 02 The Roast, 03 The Ritual*) with estate storytelling and photography.
- **A Coffee Moment:** Atmospheric full-width dark espresso pause featuring macro crema extraction and steam.
- **Seasonal Specials:** Asymmetrical editorial feature showcasing the limited *“Golden Hour Latte”* (₹290).
- **The Coffee Menu Archive:** Live keyword search, category filters (*All, Signature, Espresso, Lattes, Cold Brew, Matcha*), and temperature filters.
- **Slide-out Cart Drawer & Prototype Checkout:**
  - Live bag counter in navigation.
  - Size customizer (*Small 240ml, Regular 350ml, Grande 480ml*) with dynamic price recalculation.
  - Temperature customizer (*Hot / Iced*).
  - Accurate subtotal, 5% Hospitality GST, and complimentary packaging.
  - Persistent storage in `localStorage`.
  - Prototype checkout modal with Dine-In vs Takeaway and simulated order confirmation ticket (`MUSE-XXXX`).
- **Sanctuary & Reservations:** Flagship details in Indiranagar, Bengaluru, ritual hours, and interactive table planner.
- **Desktop Coffee-Bean Cursor Trail:** Subtle trail of roasted bean micro-particles following the mouse pointer.

---

## 🎨 Color Palette & Typography

- **Deep Espresso:** `#241713` / `#180F0C`
- **Roasted Cocoa:** `#704735` / `#583627`
- **Oat Cream:** `#F5EFE5` / `#FAF6EE`
- **Caramel:** `#C6A47D` / `#B28F66`
- **Muted Sage:** `#9BA28A` / `#7D846C`
- **Editorial Serif:** *Playfair Display*
- **Interface Sans:** *DM Sans*

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS with bespoke tokens & utilities
- **3D WebGL:** Three.js with custom procedural geometry & ACESFilmic tone mapping
- **Icons:** Lucide React
- **Confetti:** Canvas-Confetti
- **State Management:** React Context API + LocalStorage persistence

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Web-Lumina-2026/Muse.git
cd Muse
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

---

© 2026 MUSE Specialty Coffee. Created for Web Design Hackathon.
