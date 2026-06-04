/**
 * Aurora & Co. - UI Modules
 * Navigation, animations, tabs, portfolio, counters, carousel, accordion, team bios, cursor light, back to top.
 */
(() => {
    "use strict";

    const { AppState, DOM, AuroraRegisterInit } = window.Aurora;

    // ========== UI MODULE DEFINITIONS ==========

    const initNavigation = () => {
        const body = document.body;
        const nav = DOM.select(".nav");
        const menuToggle = DOM.select(".menu-toggle");
        const mobilePanel = DOM.select(".mobile-panel");

        if (!nav || !menuToggle) return;

        const setScrolledState = () => {
            nav.classList.toggle("is-scrolled", window.scrollY > 24);
        };

        setScrolledState();
        DOM.on(window, "scroll", setScrolledState, { passive: true });

        DOM.on(menuToggle, "click", () => {
            const isOpen = body.classList.toggle("menu-open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
        });

        DOM.delegate(mobilePanel, "click", "a", () => {
            body.classList.remove("menu-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open menu");
        });
    };

    const initEntranceAnimations = () => {
        const reveals = DOM.selectAll(".reveal");
        if (reveals.length === 0) return;

        reveals.forEach((el, index) => {
            el.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
        });

        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
        );

        reveals.forEach((el) => revealObserver.observe(el));
    };

    const initServiceTabs = () => {
        const tabList = DOM.select(".service-tabs");
        const panels = DOM.selectAll(".service-panel");

        if (!tabList || panels.length === 0) return;

        DOM.delegate(tabList, "click", ".tab-btn", (e, activeTab) => {
            const targetId = activeTab.getAttribute("aria-controls");
            const targetPanel = document.getElementById(targetId);

            if (!targetPanel) return;

            const tabButtons = DOM.selectAll(".tab-btn", tabList);
            tabButtons.forEach((tab) => tab.setAttribute("aria-selected", "false"));
            panels.forEach((panel) => panel.classList.remove("active"));

            activeTab.setAttribute("aria-selected", "true");
            targetPanel.classList.add("active");
        });
    };

    const initPortfolio = () => {
        const workList = DOM.select(".work-list");
        const workImage = DOM.select(".work-image");
        const filterContainer = DOM.select('[aria-label="Work category filters"]');
        const workItems = DOM.selectAll(".work-item");

        if (filterContainer && workItems.length > 0) {
            DOM.delegate(filterContainer, "click", ".filter-pill", (e, activePill) => {
                const pills = DOM.selectAll(".filter-pill", filterContainer);
                pills.forEach((p) => p.classList.remove("active"));
                activePill.classList.add("active");

                const filter = activePill.dataset.filter;
                workItems.forEach((item) => {
                    const isMatched = filter === "all" || item.dataset.category === filter;
                    item.classList.toggle("hidden-project", !isMatched);
                });
            });
        }

        if (workList && workImage) {
            let activeAnimateFrame = null;

            DOM.delegate(workList, "pointerover", ".work-item", (e, item) => {
                const imageUrl = item.dataset.image;
                if (imageUrl) {
                    workImage.style.backgroundImage = `url(${imageUrl})`;
                    workImage.classList.add("visible");
                }
            });

            DOM.delegate(workList, "pointermove", ".work-item", (e) => {
                if (activeAnimateFrame) cancelAnimationFrame(activeAnimateFrame);
                activeAnimateFrame = requestAnimationFrame(() => {
                    workImage.animate(
                        [{ transform: `translate3d(${e.clientX}px, ${e.clientY}px, 0)` }],
                        { duration: 120, fill: "forwards", easing: "cubic-bezier(.25, .8, .25, 1)" }
                    );
                });
            });

            DOM.delegate(workList, "pointerout", ".work-item", () => {
                if (activeAnimateFrame) cancelAnimationFrame(activeAnimateFrame);
                workImage.classList.remove("visible");
            });
        }
    };

    const initCounters = () => {
        const counters = DOM.selectAll(".counter");
        if (counters.length === 0) return;

        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const el = entry.target;
                    const targetVal = Number(el.dataset.target);
                    const suffix = el.dataset.suffix || "";
                    const isDecimal = String(targetVal).includes(".");
                    const startTime = performance.now();
                    const duration = 1300;

                    const step = (now) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                        const currentVal = targetVal * easeOutCubic;

                        DOM.safeText(
                            el,
                            `${isDecimal ? currentVal.toFixed(1) : Math.round(currentVal)}${suffix}`
                        );

                        if (progress < 1) {
                            requestAnimationFrame(step);
                        }
                    };

                    requestAnimationFrame(step);
                    counterObserver.unobserve(el);
                });
            },
            { threshold: 0.45 }
        );

        counters.forEach((counter) => counterObserver.observe(counter));
    };

    const initQuotesCarousel = () => {
        const quotes = DOM.selectAll(".quote");
        const dotContainer = DOM.select(".quote-nav");
        const dots = DOM.selectAll(".quote-dot");

        if (quotes.length === 0 || dots.length === 0) return;

        const showQuote = (index) => {
            AppState.quoteIndex = index;
            quotes.forEach((quote, i) => quote.classList.toggle("active", i === index));
            dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
        };

        const resetCarouselTimer = () => {
            clearInterval(AppState.quoteInterval);
            AppState.quoteInterval = setInterval(() => {
                showQuote((AppState.quoteIndex + 1) % quotes.length);
            }, 5200);
        };

        if (dotContainer) {
            DOM.delegate(dotContainer, "click", ".quote-dot", (e, selectedDot) => {
                const index = dots.indexOf(selectedDot);
                if (index !== -1) {
                    showQuote(index);
                    resetCarouselTimer();
                }
            });
        }

        resetCarouselTimer();
    };

    const initFaqAccordion = () => {
        const faqWrapper = DOM.select(".faq-wrap");
        if (!faqWrapper) return;

        DOM.delegate(faqWrapper, "click", ".faq-question", (e, currentBtn) => {
            const currentAnswer = currentBtn.nextElementSibling;
            const isCurrentlyOpen = currentBtn.getAttribute("aria-expanded") === "true";

            const allButtons = DOM.selectAll(".faq-question", faqWrapper);
            allButtons.forEach((btn) => {
                btn.setAttribute("aria-expanded", "false");
                const ans = btn.nextElementSibling;
                if (ans) ans.style.maxHeight = null;
            });

            if (!isCurrentlyOpen && currentAnswer) {
                currentBtn.setAttribute("aria-expanded", "true");
                currentAnswer.style.maxHeight = `${currentAnswer.scrollHeight}px`;
            }
        });
    };

    const initTeamBios = () => {
        const teamList = DOM.select(".team-list");
        if (!teamList) return;

        const toggleBio = (header) => {
            const person = header.parentElement;
            const panel = header.nextElementSibling;
            if (!person || !panel) return;

            const isNowActive = person.classList.toggle("active");
            header.setAttribute("aria-expanded", String(isNowActive));
            panel.style.maxHeight = isNowActive ? `${panel.scrollHeight}px` : null;
        };

        DOM.delegate(teamList, "click", ".team-header", (e, header) => {
            toggleBio(header);
        });

        DOM.delegate(teamList, "keydown", ".team-header", (e, header) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleBio(header);
            }
        });
    };

    const initCursorLight = () => {
        const cursorLight = DOM.select(".cursor-light");
        const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

        if (!cursorLight || !hasFinePointer) return;

        let cursorAnimateFrame = null;

        DOM.on(window, "pointermove", (e) => {
            if (cursorAnimateFrame) cancelAnimationFrame(cursorAnimateFrame);
            cursorAnimateFrame = requestAnimationFrame(() => {
                cursorLight.animate(
                    [{ transform: `translate3d(${e.clientX - 210}px, ${e.clientY - 210}px, 0)` }],
                    { duration: 650, fill: "forwards", easing: "cubic-bezier(.2, .8, .2, 1)" }
                );
            });
        }, { passive: true });
    };

    const initBackToTop = () => {
        const backTopBtn = DOM.select("#backTop");
        if (!backTopBtn) return;

        DOM.on(window, "scroll", () => {
            const isScrolledEnough = window.scrollY > 300;
            backTopBtn.classList.toggle("show", isScrolledEnough);
        }, { passive: true });

        DOM.on(backTopBtn, "click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    };

    // ========== REGISTER UI MODULES ==========
    AuroraRegisterInit(initNavigation);
    AuroraRegisterInit(initEntranceAnimations);
    AuroraRegisterInit(initServiceTabs);
    AuroraRegisterInit(initPortfolio);
    AuroraRegisterInit(initCounters);
    AuroraRegisterInit(initQuotesCarousel);
    AuroraRegisterInit(initFaqAccordion);
    AuroraRegisterInit(initTeamBios);
    AuroraRegisterInit(initCursorLight);
    AuroraRegisterInit(initBackToTop);
})();
