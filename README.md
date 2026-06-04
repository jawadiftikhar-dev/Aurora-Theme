# [Aurora & Co.](https://aurora-co.jawadiftikhar.com/) — Strategy, Brand, and Performance Theme

A modern, responsive, and performance-oriented single-page agency portfolio theme. Built upon a framework-free frontend stack consisting of semantic HTML5, Tailwind CSS, and optimized vanilla JavaScript, this theme leverages advanced browser-native APIs and modular CSS architectures to deliver interactive UX components without importing heavy runtime frameworks.

Developed by [Jawad Iftikhar](https://github.com/jawadiftikhar-dev) - [Portfolio](https://jawadiftikhar.com/)

---

## 📝 Project Descriptions

> [Aurora & Co.](https://aurora-co.jawadiftikhar.com/) is a premium strategy, branding, and growth marketing agency theme developed by Jawad Iftikhar. It showcases a framework-free frontend stack utilizing semantic HTML, Tailwind CSS, and vanilla JS. Key features include a custom cursor light, dynamic scroll counters, client telemetry campaign simulator, responsive tabbed services panels, interactive FAQs, and a custom ROI investment calculator. It is highly optimized for performance, SEO standards, and screen-reader accessibility. 

---

## 🚀 Key Features & UX Modules

* **Custom Composited Cursor Light:** A hardware-accelerated pointer tracking backdrop light built using native WAAPI (`element.animate`), avoiding layout thrashing.
* **Dynamic ROI Calculator:** A custom client-side budget estimation engine matching customizable team variables and scope metrics to specific calculation parameters.
* **Dynamic Telemetry Dashboard:** A simulation dashboard updating live statistical numbers, generating simulated graphs, and altering heights via lightweight execution cycles.
* **Adaptive Work Category Filter:** Categorized portfolio filters hiding and showing projects using class toggles without resetting layout scroll bounds.
* **Custom Floating Image Hover Follower:** A floating image modal tracking desktop coordinates with high-performance CSS 3D translation matrices.
* **Fluid Responsive Typography & Spacing:** Integrated native CSS variables calculating layout scaling variables fluidly across standard viewports.
* **Accessible Accordions & Bios:** Semantically fully keyboard-navigable team panels and FAQ accordions with calculated height expansions.
* **Clean Print Styles & High Contrast Overrides:** Out-of-the-box support for Windows High Contrast operating modes and styled output parameters for clean print rendering.

---

## 📂 File & Directory Structure

To organize the code in this single-file source (`Aurora-Co.html`) into a production-ready, modular repository structure, organize your files as follows:

```text
Aurora-Co/
├── index.html                   # Core single-page layout & structural elements
├── LICENSE                      # Mozilla Public License 2.0 (MPL-2.0)
├── README.md                    # Project documentation & descriptions
├── assets/                      # Static resources and media assets
│   └── images/                  # Performance-optimized theme imagery (WebP)
├── styles/                      # Stylesheet directory
│   ├── design-system.css        # Color Palette , Spacing Scale & Typography
│   ├── global.css               # Reset & Global Styles
│   ├── components.css           # Website Components
│   ├── frames.css               # KEYFRAMES
│   ├── utilities.css            # Reusable Helper Classes
│   └── responsive.css           # Media Queries & Reduced Motion
└── scripts/                     # Vanilla JS application modules
    ├── data_modules.js          # Calculator, telemetry dashboard, lead generation, cookie consent, contact form.
    ├── utilities.js             # Central state, DOM utilities, and module registration.
    └── visuals.js               # Aurora & Co. - UI Modules

🛠️ Codebase Architecture

1. HTML Outline & Schema Structured Data

The template utilizes structured markup patterns to ensure clean accessibility
and metadata consistency:

  - Semantic SEO Metadata: Optimized with distinct Meta descriptions, Open Graph
    targets, Twitter Cards, resource hints (preconnect), and localized parameter
    scales.
  - JSON-LD FAQ and Service Schema: Implements multiple structured micro-data
    schemas matching professional business services and active FAQs directly to
    Google's indexing engine.
  - Access Shortcuts: Features a global .skip-link layer enabling direct bypass
    of global headers for assistive devices.

2. Hybrid CSS Layering (Tailwind & Tokens)

The layout uses a custom design token configuration embedded into Tailwind CSS
through specific @layer overrides:

@layer base, components, utilities, overrides;

  - Fluid Sizing: Variables calculated using clamp() functions dynamically scale
    structural sections, margins, and typography directly with viewport
    dimensions:
    --fluid-hero-title: clamp(3.6rem, 10vw, 10.8rem);
    --fluid-body: clamp(1rem, 1.6vw, 1.25rem);
  - Interactive Components: Marquees, mobile overlay systems, custom cursor
    backdrops, and active tab buttons are isolated directly in @layer
    components.
  - Tailwind Integration: The stylesheet operates cleanly with utility layers
    while custom design overrides (like forced-colors and print layouts) are
    managed in @layer overrides.

3. JavaScript Execution Engine

Scripts are isolated in a self-executing modular system (IIFE) using an
optimized delegation pattern to keep event handling performant:

(() => {
    "use strict";
    
    // Centralized Application State
    const AppState = { ... };

    // Common DOM utility functions
    const DOM = {
        select: (selector, parent = document) => parent.querySelector(selector),
        delegate: (parent, event, selector, handler, options = {}) => { ... }
    };
})();

Event Delegation Pattern

Rather than attaching event listeners to individual items (e.g., team cards,
filter buttons, accordions), a single event handler is bound to the parent
container. This reduces memory usage and ensures that dynamic items are covered:

DOM.delegate(parentContainer, "click", ".target-selector", (e, targetElement) => {
    // Action handler logic
});

Composite WAAPI Translations

To track mouse coordinates cleanly without layout thrashing, coordinates are
translated using the Web Animations API (WAAPI), executing rendering
calculations directly on the browser's compositor thread:

workImage.animate(
    [{ transform: `translate3d(${e.clientX}px, ${e.clientY}px, 0)` }],
    { duration: 120, fill: "forwards", easing: "cubic-bezier(.25, .8, .25, 1)" }
);

💻 Getting Started & Local Setup

Installation

1.  Clone the repository to your local drive:
    git clone https://github.com/jawadiftikhar-dev/Aurora-Co.git
    cd Aurora-Co
2.  Rename the main template file to index.html if you want to deploy it as a
    single-file template:
    mv Aurora-Co.html index.html
3.  Run the project locally using a basic HTTP server. For example, using
    Python's built-in module:
    python -m http.server 8000
4.  Open your web browser and navigate to: http://localhost:8000

🎨 Customization Guide

Designing Custom Color Palettes

To change the look and feel, update your primary color values in the :root
pseudo-class:

:root {
    /* Color Palette */
    --ink: #111111;                 /* Primary Text Color */
    --paper: #f6f0e7;               /* Main Dark Theme Background */
    --accent: #d65626;              /* Primary Accent Color */
    --accent-dark: #9e3418;         /* Primary Dark Accent */
    --blue: #22384c;                /* Highlight Base Variable */
}

Modifying the ROI Calculator Rates

To adjust the baseline calculations used in the ROI estimator, change the core
multiplier values in the JavaScript module:

const baseCalculation = weeks * teamSize * 2900; // Change 2900 to your base rate constant

♿ Accessibility & Performance Details

Accessibility Standards

  - Forced Contrast Adjustments: Implements styles that support operating system
    high-contrast configurations (prefers-contrast: high), preserving interface
    usability and focus indicators.
  - Reduced Motion Compatibility: An embedded prefers-reduced-motion media block
    scales down keyframes and transitions for users sensitive to motion.
  - Keyboard Focus Management: Form controls, accordions, and team dropdowns
    support focus visibility and include keydown listeners (Enter, Space) for
    full keyboard accessibility.

Performance Optimizations

  - Composite Layering: Offloads heavy pointer tracking calculations to the GPU
    compositor thread using translate3d and WAAPI.
  - Scroll Performance: Scroll handlers are configured as { passive: true } to
    keep viewport scrolling smooth and prevent main-thread blocking.

