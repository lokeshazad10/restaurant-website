/* ============================================================
   Pasta Maniac — premium interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- scroll progress + back to top ---------- */
  const progressBar = document.getElementById("scroll-progress");
  const backToTop = document.getElementById("back-to-top");

  function updateScrollUI() {
    const doc = document.documentElement;
    const scrolled = window.scrollY / (doc.scrollHeight - window.innerHeight);
    if (progressBar) progressBar.style.width = `${Math.min(scrolled, 1) * 100}%`;
    if (backToTop) backToTop.classList.toggle("show", window.scrollY > 600);
  }

  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- smooth scroll for anchors / data-scroll-to ---------- */
  function initSmoothScroll() {
    const scrollToEl = (selector) => {
      const target = document.querySelector(selector);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href && href.length > 1 && document.querySelector(href)) {
          e.preventDefault();
          scrollToEl(href);
        }
      });
    });

    document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
      btn.addEventListener("click", () => scrollToEl(btn.dataset.scrollTo));
    });
  }

  /* ---------- scroll reveals ---------- */
  function initReveals() {
    const revealItems = document.querySelectorAll(".reveal");
    const menuSection = document.querySelector(".menu-section.animate-in");
    const exploreBtn = document.getElementById("explore-f-menu");
    const targets = [...revealItems, menuSection, exploreBtn].filter(Boolean);

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add("is-visible");
            if (el === menuSection) {
              setTimeout(() => el.classList.remove("animate-in"), 1150);
            }
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    targets.forEach((el) => io.observe(el));
  }

  /* ---------- animated stat counters ---------- */
  function animateStat(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initStats() {
    const nums = document.querySelectorAll(".stat-num");
    if (!nums.length) return;

    if (!("IntersectionObserver" in window)) {
      nums.forEach(animateStat);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStat(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    nums.forEach((el) => io.observe(el));
  }

  /* ---------- newsletter toast ---------- */
  function initNewsletter() {
    const form = document.getElementById("newsletter-form");
    const toast = document.getElementById("toast");
    if (!form || !toast) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      const email = input ? input.value.trim() : "";
      if (!email) return;

      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      toast.textContent = valid
        ? "Welcome to the table. See you soon!"
        : "Hmm, that email doesn't look quite right.";
      toast.classList.add("show");
      if (valid) form.reset();

      clearTimeout(form._toastTimer);
      form._toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
    });
  }

  /* ---------- hero entrance ---------- */
  function initHeroEntrance() {
    if (!window.gsap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.addEventListener("DOMContentLoaded", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.95 });
      tl.from(".hero-badge", { y: 22, opacity: 0, duration: 0.7 })
        .from(".first-line", { y: 30, opacity: 0, duration: 0.8 }, "-=0.45")
        .from(".tag-line", { y: 44, opacity: 0, duration: 0.95, scale: 0.985 }, "-=0.5")
        .from(".hero-description", { y: 26, opacity: 0, duration: 0.7 }, "-=0.55")
        .from(".hero-btn-box .btn", { y: 22, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
        .from(".scroll-indicator", { opacity: 0, duration: 0.6 }, "-=0.3");
    });
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initSmoothScroll();
    initReveals();
    initStats();
    initNewsletter();
    initHeroEntrance();
  });
})();