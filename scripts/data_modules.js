/**
 * Aurora & Co. - Business Modules
 * Calculator, telemetry dashboard, lead generation, cookie consent, contact form.
 */
(() => {
    "use strict";

    const { AppState, DOM, AuroraRegisterInit } = window.Aurora;

    // ========== BUSINESS MODULE DEFINITIONS ==========

    const initCalculator = () => {
        const lenRange = DOM.select("#lenRange");
        const teamRange = DOM.select("#teamRange");
        const lenVal = DOM.select("#lenVal");
        const teamVal = DOM.select("#teamVal");
        const priceVal = DOM.select("#priceVal");
        const priceRange = DOM.select("#priceRange");
        const sumLen = DOM.select("#sumLen");
        const sumTeam = DOM.select("#sumTeam");
        const sumScope = DOM.select("#sumScope");
        const sumUrg = DOM.select("#sumUrg");
        const scopeChips = DOM.select("#scopeChips");
        const urgChips = DOM.select("#urgChips");

        if (!lenRange || !teamRange) return;

        const fmtPrice = (amount) => `$${Math.round(amount / 1000)}k`;

        const recalc = () => {
            const weeks = Number(lenRange.value);
            const teamSize = Number(teamRange.value);
            const baseCalculation = weeks * teamSize * 2900;
            const totalEst = baseCalculation * AppState.calculator.scopeMult * AppState.calculator.urgMult;

            DOM.safeText(lenVal, `${weeks} weeks`);
            DOM.safeText(teamVal, `${teamSize} people`);
            DOM.safeText(priceVal, fmtPrice(totalEst));

            if (priceRange) {
                priceRange.textContent = `USD · Range ${fmtPrice(totalEst * 0.85)} – ${fmtPrice(totalEst * 1.17)}`;
            }

            DOM.safeText(sumLen, `${weeks} weeks`);
            DOM.safeText(sumTeam, `${teamSize} senior`);
            DOM.safeText(sumScope, AppState.calculator.scopeName);
            DOM.safeText(sumUrg, AppState.calculator.urgName);
        };

        if (scopeChips) {
            DOM.delegate(scopeChips, "click", ".calc-chip", (e, clickedChip) => {
                const chips = DOM.selectAll(".calc-chip", scopeChips);
                chips.forEach((c) => c.classList.remove("active"));
                clickedChip.classList.add("active");

                AppState.calculator.scopeMult = parseFloat(clickedChip.dataset.mult);
                AppState.calculator.scopeName = clickedChip.textContent.trim();
                recalc();
            });
        }

        if (urgChips) {
            DOM.delegate(urgChips, "click", ".calc-chip", (e, clickedChip) => {
                const chips = DOM.selectAll(".calc-chip", urgChips);
                chips.forEach((c) => c.classList.remove("active"));
                clickedChip.classList.add("active");

                AppState.calculator.urgMult = parseFloat(clickedChip.dataset.mult);
                AppState.calculator.urgName = clickedChip.textContent.trim();
                recalc();
            });
        }

        DOM.on(lenRange, "input", recalc);
        DOM.on(teamRange, "input", recalc);

        recalc();
    };

    const initTelemetryDashboard = () => {
        const simulateBtn = DOM.select("#simulateDashboardBtn");
        const dCtr = DOM.select("#dashCtr");
        const dCac = DOM.select("#dashCac");
        const dVal = DOM.select("#dashVal");
        const statusText = DOM.select("#telemetryStatus");

        if (!simulateBtn) return;

        DOM.on(simulateBtn, "click", () => {
            DOM.safeText(statusText, "Processing Signal...");
            simulateBtn.setAttribute("disabled", "true");

            const bars = Array.from({ length: 10 }, (_, i) => DOM.select(`#bar${i + 1}`));

            setTimeout(() => {
                const ctrFloat = (Math.random() * (4.8 - 1.9) + 1.9).toFixed(2);
                const cacInt = Math.floor(Math.random() * (90 - 30) + 30);
                const pipelineMultiplier = (Math.random() * (3.8 - 1.1) + 1.1).toFixed(1);

                DOM.safeText(dCtr, `${ctrFloat}%`);
                DOM.safeText(dCac, `-$${cacInt}.00`);
                DOM.safeText(dVal, `${pipelineMultiplier}x`);
                DOM.safeText(statusText, "System Optimized");

                simulateBtn.removeAttribute("disabled");

                bars.forEach((bar) => {
                    if (bar) {
                        const randomHeight = Math.floor(Math.random() * (98 - 15) + 15);
                        bar.style.height = `${randomHeight}%`;
                    }
                });
            }, 1100);
        });
    };

    const initLeadGeneration = () => {
        const resourceForm = DOM.select("#resourceForm");
        const resourceStatus = DOM.select("#resourceStatus");

        if (!resourceForm || !resourceStatus) return;

        DOM.on(resourceForm, "submit", (e) => {
            e.preventDefault();
            const emailInput = DOM.select("#resourceEmail");
            const email = emailInput ? emailInput.value : "";
            if (!email) return;

            DOM.safeText(resourceStatus, "Sending Playbook PDF...");
            setTimeout(() => {
                DOM.safeText(resourceStatus, "✓ Playbook dispatched to your inbox.");
                resourceForm.reset();
            }, 1200);
        });
    };

    const initCookieConsent = () => {
        const cookieBanner = DOM.select("#cookieBanner");
        if (!cookieBanner) return;

        const hasAccepted = localStorage.getItem("aurora-cookies");
        if (!hasAccepted) {
            setTimeout(() => cookieBanner.classList.add("show"), 1400);
        }

        const closeCookies = (consentValue) => {
            localStorage.setItem("aurora-cookies", consentValue);
            cookieBanner.classList.remove("show");
        };

        DOM.delegate(cookieBanner, "click", "#cookieAccept", () => closeCookies("accepted"));
        DOM.delegate(cookieBanner, "click", "#cookieLater", () => closeCookies("dismissed"));
    };

    const initContactForm = () => {
        const form = DOM.select("#contactForm");
        const formNote = DOM.select("#formNote");

        if (!form || !formNote) return;

        DOM.on(form, "submit", (e) => {
            e.preventDefault();
            const fields = DOM.selectAll("input, select, textarea", form);
            const invalidField = fields.find((field) => !field.checkValidity());

            if (invalidField) {
                invalidField.focus();
                DOM.safeText(formNote, "Please complete all fields with a valid email address.");
                return;
            }

            form.reset();
            DOM.safeText(formNote, "Thanks. Your project note is ready for a real inbox integration.");
        });
    };

    // ========== REGISTER BUSINESS MODULES ==========
    AuroraRegisterInit(initCalculator);
    AuroraRegisterInit(initTelemetryDashboard);
    AuroraRegisterInit(initLeadGeneration);
    AuroraRegisterInit(initCookieConsent);
    AuroraRegisterInit(initContactForm);
})();
