/* =========================================================
   My Planetary Responsibility: SOLVE — presentation logic
   ========================================================= */
(function () {
  "use strict";

  const deck = document.getElementById("deck");
  const slides = Array.from(deck.querySelectorAll(".slide"));
  const total = slides.length;

  const progressBar = document.querySelector(".progress__bar");
  const counterCurrent = document.querySelector(".counter__current");
  const counterTotal = document.querySelector(".counter__total");
  const dotsNav = document.querySelector(".dots");
  const prevBtn = document.querySelector('.controls [data-action="prev"]');
  const nextBtn = document.querySelector('.controls [data-action="next"]');
  const fsBtn = document.querySelector('[data-action="fullscreen"]');

  let current = 0;
  let dots = [];

  const pad = (n) => String(n).padStart(2, "0");

  /* ---------- Setup ---------- */

  // Give each .reveal element a stagger index (read by CSS as --i)
  function assignRevealOrder() {
    slides.forEach((slide) => {
      slide.querySelectorAll(".reveal").forEach((el, i) => {
        el.style.setProperty("--i", i);
      });
    });
  }

  function buildDots() {
    slides.forEach((slide, i) => {
      const title = slide.dataset.title || `Slide ${i + 1}`;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "dot";
      btn.setAttribute("aria-label", `Go to slide ${i + 1}: ${title}`);
      const tip = document.createElement("span");
      tip.className = "dot__tip";
      tip.setAttribute("aria-hidden", "true");
      tip.textContent = `${pad(i + 1)} · ${title}`;
      btn.appendChild(tip);
      btn.addEventListener("click", () => goTo(i));
      dotsNav.appendChild(btn);
      dots.push(btn);
    });
  }

  /* ---------- Navigation ---------- */

  function goTo(index, opts = {}) {
    const target = Math.max(0, Math.min(total - 1, index));
    if (target === current && !opts.force) return;
    current = target;
    render(opts);
  }
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  function render(opts = {}) {
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-label", `${i + 1} of ${total}: ${slide.dataset.title}`);
      if (active) {
        slide.removeAttribute("aria-hidden");
        slide.inert = false;
        slide.scrollTop = 0;
        slide.querySelectorAll(".slide__text, .hero__content").forEach((el) => (el.scrollTop = 0));
      } else {
        slide.setAttribute("aria-hidden", "true");
        slide.inert = true;
      }
    });

    const n = current + 1;
    counterCurrent.textContent = pad(n);
    progressBar.style.width = `${(n / total) * 100}%`;

    dots.forEach((d, i) => {
      if (i === current) d.setAttribute("aria-current", "step");
      else d.removeAttribute("aria-current");
    });

    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;

    // Keep focus somewhere sensible if the focused control just became disabled
    if (document.activeElement && document.activeElement.disabled) {
      (current === 0 ? nextBtn : prevBtn).focus();
    }

    if (opts.focusHeading) {
      const heading = slides[current].querySelector("h1, h2");
      if (heading) heading.focus({ preventScroll: true });
    }

    const hash = `#slide-${n}`;
    if (location.hash !== hash) {
      try { history.replaceState(null, "", hash); } catch (e) { /* file:// in some browsers */ }
    }
    document.title = n === 1
      ? "My Planetary Responsibility: SOLVE"
      : `${slides[current].dataset.title} — SOLVE`;
  }

  function slideFromHash() {
    const m = /^#slide-(\d+)$/.exec(location.hash);
    if (!m) return 0;
    const n = parseInt(m[1], 10);
    return n >= 1 && n <= total ? n - 1 : 0;
  }

  /* ---------- Fullscreen ---------- */

  const fsEnabled = !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
  const fsElement = () => document.fullscreenElement || document.webkitFullscreenElement;

  function toggleFullscreen() {
    if (!fsEnabled) return;
    const root = document.documentElement;
    try {
      if (fsElement()) {
        (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      } else {
        const req = root.requestFullscreen || root.webkitRequestFullscreen;
        const p = req.call(root);
        if (p && typeof p.catch === "function") p.catch(() => {});
      }
    } catch (e) { /* ignore: fullscreen refused */ }
  }

  function updateFsButton() {
    const on = !!fsElement();
    fsBtn.setAttribute("aria-pressed", String(on));
    fsBtn.setAttribute("aria-label", on ? "Exit fullscreen" : "Enter fullscreen");
    fsBtn.querySelector("use").setAttribute("href", on ? "#i-minimize" : "#i-maximize");
  }

  /* ---------- Input: clicks ---------- */

  document.addEventListener("click", (e) => {
    const actionEl = e.target.closest("[data-action]");
    if (actionEl) {
      const action = actionEl.dataset.action;
      if (action === "next") next();
      else if (action === "prev") prev();
      else if (action === "fullscreen") toggleFullscreen();
      return;
    }
    const gotoEl = e.target.closest("[data-goto]");
    if (gotoEl) {
      goTo(parseInt(gotoEl.dataset.goto, 10) - 1, { focusHeading: true });
    }
  });

  /* ---------- Input: keyboard ---------- */

  document.addEventListener("keydown", (e) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    const tag = (e.target.tagName || "").toLowerCase();
    const onControl = tag === "button" || tag === "a" || tag === "input" || tag === "textarea" || tag === "select";

    switch (e.key) {
      case "ArrowRight":
      case "PageDown":
        e.preventDefault(); next(); break;
      case "ArrowLeft":
      case "PageUp":
        e.preventDefault(); prev(); break;
      case " ":
      case "Spacebar":
        if (onControl) return; // let Space activate the focused button
        e.preventDefault();
        if (e.shiftKey) prev(); else next();
        break;
      case "Home":
        e.preventDefault(); goTo(0); break;
      case "End":
        e.preventDefault(); goTo(total - 1); break;
      case "Escape":
        if (fsElement()) toggleFullscreen();
        break;
      case "f":
      case "F":
        if (!onControl || tag === "button") toggleFullscreen();
        break;
    }
  });

  /* ---------- Input: touch swipe (horizontal only) ---------- */

  let touchStart = null;
  deck.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) { touchStart = null; return; }
    const t = e.touches[0];
    touchStart = { x: t.clientX, y: t.clientY, time: Date.now() };
  }, { passive: true });

  deck.addEventListener("touchend", (e) => {
    if (!touchStart) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.x;
    const dy = t.clientY - touchStart.y;
    const dt = Date.now() - touchStart.time;
    touchStart = null;
    // Clearly horizontal, long enough, and reasonably quick — vertical scrolling is untouched
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.6 && dt < 800) {
      if (dx < 0) next(); else prev();
    }
  }, { passive: true });

  /* ---------- Init ---------- */

  // If a photograph is missing, show a soft golden-hour panel instead of a broken image
  slides.forEach((s) => s.querySelectorAll("img").forEach((img) => {
    const fig = img.closest("figure");
    const mark = () => fig && fig.classList.add("is-missing");
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) mark();
    img.addEventListener("error", mark);
    img.addEventListener("load", () => fig && fig.classList.remove("is-missing"));
  }));

  assignRevealOrder();
  buildDots();
  counterTotal.textContent = pad(total);

  if (fsEnabled) {
    document.addEventListener("fullscreenchange", updateFsButton);
    document.addEventListener("webkitfullscreenchange", updateFsButton);
  } else {
    fsBtn.hidden = true; // e.g. iPhone Safari
  }

  window.addEventListener("hashchange", () => goTo(slideFromHash()));

  current = slideFromHash();
  // Start with no slide active for one frame so the first reveal animates
  slides.forEach((s) => s.classList.remove("is-active"));
  requestAnimationFrame(() => requestAnimationFrame(() => render()));

  // Warm the cache for the remaining photographs once the first slide has painted
  window.addEventListener("load", () => {
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 600));
    idle(() => {
      slides.forEach((s) => {
        const img = s.querySelector("img");
        if (img && img.loading === "lazy") img.loading = "eager";
      });
    });
  });
})();
