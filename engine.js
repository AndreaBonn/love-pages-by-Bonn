// LovePage Engine v1.0
// Handles: calendar detection, theming, i18n, particles, interactions

(function () {
  "use strict";

  // ── Events Database ──────────────────────────────────────────────

  var EVENTS = [
    {
      id: "valentine",
      label: { en: "Valentine's Day", it: "San Valentino" },
      question: {
        en: "Do you want to be my Valentine?",
        it: "Vuoi essere il mio/la mia Valentino/a?",
      },
      emoji: "\u2764\uFE0F",
      theme: {
        primary: "#e63946",
        secondary: "#f1a7b3",
        background: "#fff0f3",
        accent: "#c1121f",
        text: "#1a1a2e",
        textLight: "#ffffff",
      },
      particles: "hearts",
      dateRange: { start: [2, 10], end: [2, 14] },
    },
    {
      id: "patrick",
      label: { en: "St. Patrick's Day", it: "San Patrizio" },
      question: {
        en: "Do you want to be my Lucky Charm?",
        it: "Vuoi essere il mio portafortuna?",
      },
      emoji: "\u2618\uFE0F",
      theme: {
        primary: "#2d6a4f",
        secondary: "#74c69d",
        background: "#f0fff4",
        accent: "#1b4332",
        text: "#1a1a2e",
        textLight: "#ffffff",
      },
      particles: "clovers",
      dateRange: { start: [3, 14], end: [3, 17] },
    },
    {
      id: "spring",
      label: { en: "Spring", it: "Primavera" },
      question: {
        en: "Do you want to be my Blossom?",
        it: "Vuoi essere il mio fiore di primavera?",
      },
      emoji: "\uD83C\uDF38",
      theme: {
        primary: "#ff9a9e",
        secondary: "#fecfef",
        background: "#fff9fb",
        accent: "#e06070",
        text: "#1a1a2e",
        textLight: "#ffffff",
      },
      particles: "flowers",
      dateRange: { start: [3, 20], end: [4, 10] },
    },
    {
      id: "liberation",
      label: { en: "Liberation Day", it: "Festa della Liberazione" },
      question: {
        en: "Do you want to be my Liberation?",
        it: "Vuoi essere la mia Liberazione?",
      },
      emoji: "\uD83C\uDDEE\uD83C\uDDF9",
      theme: {
        primary: "#003366",
        secondary: "#cc0000",
        background: "#f5f5f0",
        accent: "#006633",
        text: "#1a1a2e",
        textLight: "#ffffff",
      },
      particles: "stars",
      dateRange: { start: [4, 23], end: [4, 25] },
    },
    {
      id: "summer",
      label: { en: "Summer Solstice", it: "Solstizio d'Estate" },
      question: {
        en: "Do you want to be my Sunshine?",
        it: "Vuoi essere il mio sole?",
      },
      emoji: "\u2600\uFE0F",
      theme: {
        primary: "#f9c74f",
        secondary: "#f8961e",
        background: "#fffbf0",
        accent: "#e07b00",
        text: "#1a1a2e",
        textLight: "#ffffff",
      },
      particles: "stars",
      dateRange: { start: [6, 18], end: [6, 24] },
    },
    {
      id: "halloween",
      label: { en: "Halloween", it: "Halloween" },
      question: {
        en: "Do you want to be my Pumpkin?",
        it: "Vuoi essere la mia zucca?",
      },
      emoji: "\uD83C\uDF83",
      theme: {
        primary: "#e85d04",
        secondary: "#9d0208",
        background: "#1a0a00",
        accent: "#ff7b00",
        text: "#f0e6d3",
        textLight: "#ffffff",
      },
      particles: "pumpkins",
      dateRange: { start: [10, 27], end: [10, 31] },
    },
    {
      id: "christmas",
      label: { en: "Christmas", it: "Natale" },
      question: {
        en: "Do you want to be my Christmas?",
        it: "Vuoi essere il mio Natale?",
      },
      emoji: "\uD83C\uDF84",
      theme: {
        primary: "#c1121f",
        secondary: "#006400",
        background: "#f5fff5",
        accent: "#8b0000",
        text: "#1a1a2e",
        textLight: "#ffffff",
      },
      particles: "snowflakes",
      dateRange: { start: [12, 20], end: [12, 26] },
    },
    {
      id: "newyear",
      label: { en: "New Year", it: "Anno Nuovo" },
      question: {
        en: "Do you want to be my New Year?",
        it: "Vuoi essere il mio Anno Nuovo?",
      },
      emoji: "\uD83C\uDF89",
      theme: {
        primary: "#ffd700",
        secondary: "#c0c0c0",
        background: "#0a0a1a",
        accent: "#ffaa00",
        text: "#e0e0e0",
        textLight: "#ffffff",
      },
      particles: "stars",
      dateRange: { start: [12, 28], end: [1, 2] },
    },
  ];

  var GENERIC_EVENT = {
    id: "generic",
    label: { en: "Love", it: "Amore" },
    question: {
      en: "Do you want to be mine?",
      it: "Vuoi essere mio/mia?",
    },
    emoji: "\uD83D\uDC9C",
    theme: {
      primary: "#6c63ff",
      secondary: "#c3bef7",
      background: "#f5f4ff",
      accent: "#4a42e0",
      text: "#1a1a2e",
      textLight: "#ffffff",
    },
    particles: "hearts",
  };

  // ── Translations ─────────────────────────────────────────────────

  var TRANSLATIONS = {
    en: {
      yesButton: "Yes! \uD83D\uDC95",
      noButton: "No",
      noTooltipMobile: "This button doesn't work \uD83D\uDE04",
      popupTitle: "Yes, {partnerName}! \uD83C\uDF89",
      closeButton: "Close",
      footerText: "Made with \u2764\uFE0F using",
      footerLink: "LovePage",
    },
    it: {
      yesButton: "S\u00EC! \uD83D\uDC95",
      noButton: "No",
      noTooltipMobile: "Questo bottone non funziona \uD83D\uDE04",
      popupTitle: "S\u00EC, {partnerName}! \uD83C\uDF89",
      closeButton: "Chiudi",
      footerText: "Fatto con \u2764\uFE0F usando",
      footerLink: "LovePage",
    },
  };

  var REPO_URL = "https://github.com/USER/lovepage";

  // ── Config Reading ───────────────────────────────────────────────

  function getConfig() {
    var defaults = {
      yourName: "Someone",
      partnerName: "You",
      language: "en",
      successPhoto: "assets/photos/example.jpg",
      successMessage: "You are the best thing that ever happened to me",
      forceEvent: null,
      customQuestion: null,
      theme: null,
      showFooter: true,
    };

    if (!window.LOVEPAGE_CONFIG) {
      console.warn("[LovePage] config.js not found or empty. Using defaults.");
      return defaults;
    }

    var cfg = window.LOVEPAGE_CONFIG;
    var result = {};
    for (var key in defaults) {
      result[key] =
        cfg[key] !== undefined && cfg[key] !== null
          ? cfg[key]
          : defaults[key];
    }

    // Validate language
    if (!TRANSLATIONS[result.language]) {
      console.warn(
        '[LovePage] Language "' +
          result.language +
          '" not supported. Falling back to "en".'
      );
      result.language = "en";
    }

    return result;
  }

  // ── Event Detection ──────────────────────────────────────────────

  function isDateInRange(date, range) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var startMonth = range.start[0];
    var startDay = range.start[1];
    var endMonth = range.end[0];
    var endDay = range.end[1];

    // Handle year-crossing ranges (e.g. Dec 28 - Jan 2)
    if (startMonth > endMonth) {
      return (
        (month > startMonth || (month === startMonth && day >= startDay)) ||
        (month < endMonth || (month === endMonth && day <= endDay))
      );
    }

    var dateVal = month * 100 + day;
    var startVal = startMonth * 100 + startDay;
    var endVal = endMonth * 100 + endDay;
    return dateVal >= startVal && dateVal <= endVal;
  }

  function detectEvent(config) {
    // forceEvent override
    if (config.forceEvent) {
      var forced = EVENTS.find(function (e) {
        return e.id === config.forceEvent;
      });
      if (forced) return forced;
      if (config.forceEvent === "generic") return GENERIC_EVENT;
      console.warn(
        '[LovePage] forceEvent "' +
          config.forceEvent +
          '" not found. Using auto-detection.'
      );
    }

    var now = new Date();
    for (var i = 0; i < EVENTS.length; i++) {
      if (isDateInRange(now, EVENTS[i].dateRange)) {
        return EVENTS[i];
      }
    }

    return GENERIC_EVENT;
  }

  // ── Theme Application ────────────────────────────────────────────

  var THEME_OVERRIDES = {
    dark: {
      background: "#1a1a2e",
      text: "#e0e0e0",
      textLight: "#ffffff",
    },
    light: {
      background: "#ffffff",
      text: "#1a1a2e",
      textLight: "#ffffff",
    },
    pastel: {
      background: "#fdf6f0",
      text: "#3d3d3d",
      textLight: "#ffffff",
    },
  };

  function applyTheme(event, themeOverride) {
    var root = document.documentElement;
    var t = event.theme;
    var overrides = themeOverride ? THEME_OVERRIDES[themeOverride] : null;

    if (themeOverride && !overrides) {
      console.warn(
        '[LovePage] Theme "' + themeOverride + '" not recognized. Using event default.'
      );
    }

    root.style.setProperty("--lp-primary", t.primary);
    root.style.setProperty("--lp-secondary", t.secondary);
    root.style.setProperty("--lp-background", overrides ? overrides.background : t.background);
    root.style.setProperty("--lp-accent", t.accent);
    root.style.setProperty("--lp-text", overrides ? overrides.text : t.text);
    root.style.setProperty("--lp-text-light", overrides ? overrides.textLight : t.textLight);
  }

  // ── i18n Helper ──────────────────────────────────────────────────

  function t(key, lang, replacements) {
    var str = TRANSLATIONS[lang][key] || TRANSLATIONS.en[key] || key;
    if (replacements) {
      for (var k in replacements) {
        str = str.replace("{" + k + "}", replacements[k]);
      }
    }
    return str;
  }

  // ── DOM Population ───────────────────────────────────────────────

  function populateDOM(config, event) {
    var lang = config.language;

    // HTML lang attribute
    document.documentElement.lang = lang;

    // Header
    var header = document.getElementById("lp-header");
    header.innerHTML =
      '<span>' + escapeHTML(config.yourName) + '</span>' +
      '<span class="lp-header-arrow">\u2192</span>' +
      '<span>' + escapeHTML(config.partnerName) + '</span>';

    // Emoji
    document.getElementById("lp-emoji").textContent = event.emoji;

    // Question
    var question = config.customQuestion || event.question[lang] || event.question.en;
    document.getElementById("lp-question").textContent = question;

    // Buttons
    var btnYes = document.getElementById("lp-btn-yes");
    btnYes.textContent = t("yesButton", lang);
    btnYes.setAttribute("aria-label", t("yesButton", lang));

    var btnNo = document.getElementById("lp-btn-no");
    btnNo.textContent = t("noButton", lang);
    btnNo.setAttribute("aria-label", t("noButton", lang));

    // Mobile tooltip
    document.getElementById("lp-no-tooltip").textContent = t("noTooltipMobile", lang);

    // Modal
    document.getElementById("lp-modal-title").textContent = t("popupTitle", lang, {
      partnerName: config.partnerName,
    });
    document.getElementById("lp-modal-message").textContent = config.successMessage;
    document.getElementById("lp-modal-close").textContent = t("closeButton", lang);

    // Modal photo with fallback
    var photo = document.getElementById("lp-modal-photo");
    var fallback = document.getElementById("lp-modal-photo-fallback");
    photo.src = config.successPhoto;
    photo.alt = config.partnerName;
    photo.onerror = function () {
      photo.style.display = "none";
      fallback.textContent = "\u2764\uFE0F";
      fallback.style.display = "block";
    };

    // Footer
    var footer = document.getElementById("lp-footer");
    if (config.showFooter) {
      footer.innerHTML =
        t("footerText", lang) +
        ' <a href="' + REPO_URL + '" target="_blank" rel="noopener">' +
        t("footerLink", lang) +
        "</a>";
    } else {
      footer.style.display = "none";
    }

    // OG meta tags (runtime update, limited value for crawlers)
    updateMeta("lp-og-title", config.partnerName + " \u2764\uFE0F");
    updateMeta("lp-og-description", question);
    updateMeta("lp-og-image", config.successPhoto);
  }

  function escapeHTML(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function updateMeta(id, content) {
    var el = document.getElementById(id);
    if (el) el.setAttribute("content", content);
  }

  // ── No Button Behavior ───────────────────────────────────────────

  function initNoButton(config) {
    var btnNo = document.getElementById("lp-btn-no");
    var tooltip = document.getElementById("lp-no-tooltip");
    var isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    var fleeCount = 0;
    var MAX_FLEE = 5;

    if (isMobile) {
      btnNo.classList.add("lp-btn-no--disabled");
      tooltip.classList.add("lp-no-tooltip--visible");
      return;
    }

    // Desktop: fleeing button — disappears after MAX_FLEE moves
    btnNo.addEventListener("mouseenter", function () {
      fleeCount++;

      if (fleeCount > MAX_FLEE) {
        btnNo.classList.add("lp-btn-no--hidden");
        btnNo.setAttribute("aria-hidden", "true");
        return;
      }

      if (!btnNo.classList.contains("lp-btn-no--fleeing")) {
        btnNo.classList.add("lp-btn-no--fleeing");
      }

      var btnYes = document.getElementById("lp-btn-yes");
      var yesRect = btnYes.getBoundingClientRect();
      var yesCenterX = yesRect.left + yesRect.width / 2;
      var yesCenterY = yesRect.top + yesRect.height / 2;

      var margin = 20;
      var btnW = btnNo.offsetWidth;
      var btnH = btnNo.offsetHeight;
      var maxX = window.innerWidth - btnW - margin;
      var maxY = window.innerHeight - btnH - margin;
      var minDistance = 80;

      var newX, newY, attempts = 0;
      do {
        newX = margin + Math.random() * (maxX - margin);
        newY = margin + Math.random() * (maxY - margin);
        var centerX = newX + btnW / 2;
        var centerY = newY + btnH / 2;
        var dist = Math.sqrt(
          Math.pow(centerX - yesCenterX, 2) + Math.pow(centerY - yesCenterY, 2)
        );
        attempts++;
      } while (dist < minDistance && attempts < 50);

      btnNo.style.left = newX + "px";
      btnNo.style.top = newY + "px";
    });
  }

  // ── Yes Button + Confetti ────────────────────────────────────────

  function initYesButton(config, event) {
    var btnYes = document.getElementById("lp-btn-yes");

    btnYes.addEventListener("click", function () {
      spawnConfetti(event);
      openModal();
    });
  }

  function spawnConfetti(event) {
    var emojis = getParticleEmojis(event.particles);
    var count = 30;

    for (var i = 0; i < count; i++) {
      var el = document.createElement("div");
      el.className = "lp-confetti";
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      var startX = window.innerWidth / 2 + (Math.random() - 0.5) * 100;
      var startY = window.innerHeight / 2;
      el.style.left = startX + "px";
      el.style.top = startY + "px";

      document.body.appendChild(el);
      animateConfettiPiece(el, startX, startY);
    }
  }

  function animateConfettiPiece(el, startX, startY) {
    var angle = Math.random() * Math.PI * 2;
    var velocity = 200 + Math.random() * 300;
    var vx = Math.cos(angle) * velocity;
    var vy = Math.sin(angle) * velocity - 200;
    var gravity = 400;
    var rotation = (Math.random() - 0.5) * 720;
    var startTime = performance.now();
    var duration = 1500 + Math.random() * 500;

    function step(now) {
      var elapsed = (now - startTime) / 1000;
      var progress = (now - startTime) / duration;

      if (progress >= 1) {
        el.remove();
        return;
      }

      var x = startX + vx * elapsed;
      var y = startY + vy * elapsed + 0.5 * gravity * elapsed * elapsed;
      var rot = rotation * elapsed;
      var opacity = 1 - progress;

      el.style.transform =
        "translate(" + (x - startX) + "px, " + (y - startY) + "px) rotate(" + rot + "deg)";
      el.style.opacity = opacity;

      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  // ── Modal ────────────────────────────────────────────────────────

  var focusableBeforeModal = null;

  function openModal() {
    var overlay = document.getElementById("lp-modal");
    focusableBeforeModal = document.activeElement;

    overlay.classList.add("lp-overlay--visible");
    overlay.setAttribute("aria-hidden", "false");

    // Focus trap — remove first to prevent duplicates on repeated opens
    document.removeEventListener("keydown", trapFocus);
    document.addEventListener("keydown", trapFocus);

    var closeBtn = document.getElementById("lp-modal-close");
    closeBtn.focus();
  }

  function closeModal() {
    var overlay = document.getElementById("lp-modal");
    overlay.classList.remove("lp-overlay--visible");
    overlay.setAttribute("aria-hidden", "true");
    document.removeEventListener("keydown", trapFocus);

    if (focusableBeforeModal) {
      focusableBeforeModal.focus();
    }
  }

  function trapFocus(e) {
    if (e.key === "Escape") {
      closeModal();
      return;
    }

    if (e.key !== "Tab") return;

    var modal = document.querySelector(".lp-modal");
    var focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        last.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  }

  function initModal() {
    var overlay = document.getElementById("lp-modal");
    var closeBtn = document.getElementById("lp-modal-close");

    closeBtn.addEventListener("click", closeModal);

    // Close on overlay click (not modal itself)
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        closeModal();
      }
    });
  }

  // ── Particles System ─────────────────────────────────────────────

  var PARTICLE_MAP = {
    hearts: ["\u2764\uFE0F", "\uD83E\uDE77", "\uD83D\uDC95"],
    stars: ["\u2728", "\u2B50", "\uD83C\uDF1F"],
    leaves: ["\uD83C\uDF42", "\uD83C\uDF41", "\uD83C\uDF43"],
    snowflakes: ["\u2744\uFE0F", "\uD83C\uDF28\uFE0F", "\u2745"],
    pumpkins: ["\uD83C\uDF83", "\uD83D\uDC7B", "\uD83E\uDDA7"],
    clovers: ["\uD83C\uDF40", "\u2618\uFE0F", "\uD83C\uDF3F"],
    flowers: ["\uD83C\uDF38", "\uD83C\uDF3A", "\uD83C\uDF37"],
  };

  function getParticleEmojis(type) {
    return PARTICLE_MAP[type] || PARTICLE_MAP.hearts;
  }

  function initParticles(event) {
    var container = document.getElementById("lp-particles");
    var emojis = getParticleEmojis(event.particles);
    var maxParticles = 20;
    var particles = [];
    var type = event.particles;

    function createParticle() {
      var el = document.createElement("span");
      el.className = "lp-particle";
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = Math.random() * 100 + "%";
      el.style.fontSize = (0.8 + Math.random() * 1.2) + "rem";
      el.style.opacity = 0.3 + Math.random() * 0.5;
      container.appendChild(el);

      return {
        el: el,
        x: Math.random() * window.innerWidth,
        y: -30,
        speed: 0.3 + Math.random() * 0.7,
        wobbleSpeed: 0.5 + Math.random() * 1.5,
        wobbleAmount: 20 + Math.random() * 40,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 2,
        phase: Math.random() * Math.PI * 2,
      };
    }

    function spawnIfNeeded() {
      while (particles.length < maxParticles) {
        var p = createParticle();
        // Distribute initial particles across the screen
        if (particles.length < maxParticles - 2) {
          p.y = Math.random() * window.innerHeight;
        }
        particles.push(p);
      }
    }

    var lastTime = 0;
    var running = true;

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        running = false;
      } else {
        running = true;
        lastTime = 0;
        requestAnimationFrame(animate);
      }
    });

    function animate(now) {
      if (!running) return;
      if (!lastTime) lastTime = now;
      var dt = (now - lastTime) / 16; // normalize to ~60fps
      lastTime = now;

      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.y += p.speed * dt;
        p.phase += 0.02 * dt;
        p.rotation += p.rotationSpeed * dt;

        var wobble = Math.sin(p.phase * p.wobbleSpeed) * p.wobbleAmount;

        if (type === "stars") {
          // Stars twinkle in place
          p.y = p.y > window.innerHeight ? Math.random() * window.innerHeight : p.y;
          var twinkle = 0.3 + Math.abs(Math.sin(p.phase)) * 0.7;
          p.el.style.opacity = twinkle;
          p.el.style.transform =
            "translate(" + wobble + "px, 0px) scale(" + (0.8 + twinkle * 0.4) + ")";
        } else {
          p.el.style.transform =
            "translate(" + wobble + "px, " + p.y + "px) rotate(" + p.rotation + "deg)";
        }

        // Reset when off screen
        if (p.y > window.innerHeight + 50 && type !== "stars") {
          p.y = -30;
          p.x = Math.random() * window.innerWidth;
          p.el.style.left = p.x + "px";
        }
      }

      requestAnimationFrame(animate);
    }

    spawnIfNeeded();
    requestAnimationFrame(animate);
  }

  // ── Debug Function ───────────────────────────────────────────────

  window.__LOVEPAGE_DEBUG__ = function () {
    var config = getConfig();
    var event = detectEvent(config);
    console.group("[LovePage Debug]");
    console.log("Config:", config);
    console.log("Detected event:", event.id, "-", event.label.en);
    console.log("Theme:", event.theme);
    console.log("Theme override:", config.theme || "none");
    console.log("Language:", config.language);
    console.log("Date:", new Date().toISOString());
    console.groupEnd();
  };

  // ── Initialization ───────────────────────────────────────────────

  function init() {
    var config = getConfig();
    var event = detectEvent(config);

    applyTheme(event, config.theme);
    populateDOM(config, event);
    initNoButton(config);
    initYesButton(config, event);
    initModal();
    initParticles(event);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
