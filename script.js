/**
 * Aavash Gyawali — Portfolio interactivity
 * No framework, no backend. Pure vanilla JS.
 *
 * Handles: persisted dark/light theme, mobile navigation, scroll-reveal
 * animations, typed hero role, scrollspy nav, scroll progress bar, dynamic
 * footer year, and back-to-top.
 */

(() => {
  "use strict";

  const root = document.documentElement;
  const reducedReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ------------------------------------------------------------------
     Theme: respect saved preference, else OS preference, else dark
     ------------------------------------------------------------------ */
  const themeToggle = document.querySelector(".theme-toggle");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  function initTheme() {
    const saved = localStorage.getItem("theme");
    if (saved) {
      applyTheme(saved);
      return;
    }
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next =
        root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
    });
  }

  /* ------------------------------------------------------------------
     Mobile navigation (hamburger → slide panel)
     ------------------------------------------------------------------ */
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector(".nav-list");

  function setMenu(open) {
    menuToggle?.setAttribute("aria-expanded", String(open));
    menuToggle?.classList.toggle("open", open);
    navList?.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
      setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    navList.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("click", (e) => {
      if (
        navList.classList.contains("open") &&
        !navList.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        setMenu(false);
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenu(false);
    });

    // Safe-guard: if the viewport grows to the desktop layout while the
    // menu is open, close it and release the scroll lock.
    const mobileMq = window.matchMedia("(max-width: 767px)");
    const onBreakpointChange = (e) => {
      if (!e.matches && navList.classList.contains("open")) setMenu(false);
    };
    if (mobileMq.addEventListener) {
      mobileMq.addEventListener("change", onBreakpointChange);
    } else if (mobileMq.addListener) {
      mobileMq.addListener(onBreakpointChange);
    }
  }

  /* ------------------------------------------------------------------
     Typed hero role
     ------------------------------------------------------------------ */
  const typedEl = document.getElementById("typed-role");
  const roles = [
    "Computer Engineer",
    "Web Developer",
    "Full-Stack Developer",
    "Tech Enthusiast from Nepal",
  ];

  function initTyped() {
    if (!typedEl || reducedReduced) return;
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const word = roles[roleIndex];
      typedEl.textContent = word.slice(0, charIndex);

      let delay = deleting ? 40 : 85;
      if (!deleting && charIndex === word.length) {
        delay = 1600;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
      } else {
        charIndex += deleting ? -1 : 1;
      }
      setTimeout(tick, delay);
    }
    tick();
  }

  /* ------------------------------------------------------------------
     Scroll-reveal animations via IntersectionObserver
     ------------------------------------------------------------------ */
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  function initReveal() {
    document
      .querySelectorAll(".reveal")
      .forEach((el) => revealObserver.observe(el));
    document.querySelectorAll("[data-stagger]").forEach((grid) => {
      Array.from(grid.children).forEach((child, i) => {
        child.classList.add("reveal");
        child.style.transitionDelay = `${i * 60}ms`;
        revealObserver.observe(child);
      });
    });
  }

  /* ------------------------------------------------------------------
     Scrollspy: highlight the nav link of the section in view
     ------------------------------------------------------------------ */
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = Array.from(
    document.querySelectorAll(".nav-list a[href^='#']"),
  );

  function setActiveNav(id) {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  }

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveNav(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  sections.forEach((section) => spyObserver.observe(section));

  /* ------------------------------------------------------------------
     Experience timeline accordion (compact rows, expand on click)
     ------------------------------------------------------------------ */
  function initTimeline() {
    document.querySelectorAll(".timeline-toggle").forEach((toggle) => {
      const item = toggle.closest(".timeline-item");
      if (!item) return;
      const setOpen = (open) => {
        item.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", String(open));
      };
      toggle.addEventListener("click", () => {
        setOpen(toggle.getAttribute("aria-expanded") !== "true");
      });
    });
  }

  /* ------------------------------------------------------------------
     Dynamic footer copyright
     ------------------------------------------------------------------ */
  function initCopyright() {
    const yearSpan = document.getElementById("copyright");
    if (yearSpan) {
      yearSpan.textContent = `© ${new Date().getFullYear()} Aavash Gyawali. All Rights Reserved.`;
    }
  }

  /* ------------------------------------------------------------------
     Unified scroll handler (progress bar, header state, back-to-top)
     ------------------------------------------------------------------ */
  const progressBar = document.getElementById("progress-bar");
  const siteHeader = document.querySelector(".site-header");
  const backToTop = document.getElementById("back-to-top");

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: reducedReduced ? "auto" : "smooth",
      });
    });
  }

  function handleScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    if (progressBar) {
      progressBar.style.width = max > 0 ? `${(y / max) * 100}%` : "0%";
    }
    if (siteHeader) siteHeader.classList.toggle("scrolled", y > 12);
    if (backToTop) backToTop.classList.toggle("show", y > 500);
  }

  /* ------------------------------------------------------------------
     Init
     ------------------------------------------------------------------ */
  function init() {
    initTheme();
    initReveal();
    initTyped();
    initTimeline();
    initCopyright();
    handleScroll();
  }

  window.addEventListener("scroll", handleScroll, { passive: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();