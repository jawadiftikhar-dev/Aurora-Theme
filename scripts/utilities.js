/**
 * Aurora & Co. - Core Foundation
 * Central state, DOM utilities, and module registration.
 */
(() => {
    "use strict";

    // ==========================================
    // 1. CENTRALIZED APPLICATION STATE
    // ==========================================
    const AppState = {
        quoteIndex: 0,
        quoteInterval: null,
        calculator: {
            scopeMult: 1.0,
            scopeName: "Strategy",
            urgMult: 1.0,
            urgName: "Standard"
        }
    };

    // ==========================================
    // 2. PERFORMANCE & SECURITY UTILITIES
    // ==========================================
    const DOM = {
        select: (selector, parent = document) => parent.querySelector(selector),
        selectAll: (selector, parent = document) => Array.from(parent.querySelectorAll(selector)),

        on: (element, event, handler, options = {}) => {
            if (element) {
                element.addEventListener(event, handler, options);
            }
        },

        delegate: (parent, event, selector, handler, options = {}) => {
            if (!parent) return;
            parent.addEventListener(event, (e) => {
                const target = e.target.closest(selector);
                if (target && parent.contains(target)) {
                    handler(e, target);
                }
            }, options);
        },

        safeText: (element, text) => {
            if (element) element.textContent = text;
        }
    };

    // ==========================================
    // 3. MODULE REGISTRATION SYSTEM
    // ==========================================
    const _initQueue = [];

    function AuroraRegisterInit(initFn) {
        if (typeof initFn === "function") {
            _initQueue.push(initFn);
        }
    }

    function initApp() {
        _initQueue.forEach(fn => fn());
    }

    // Expose globally (used by ui.js and business.js)
    window.Aurora = {
        AppState,
        DOM,
        AuroraRegisterInit
    };

    // ==========================================
    // 4. COORDINATOR INITIALIZATION
    // ==========================================
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initApp);
    } else {
        initApp();
    }
})();
