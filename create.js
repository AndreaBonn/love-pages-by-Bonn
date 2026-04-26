// Love Pages — Configurator
// Handles form, i18n, Cloudinary upload, config encoding, share buttons

(function () {
  "use strict";

  // ── Configuration ───────────────────────────────────────────────

  var CLOUDINARY_CLOUD_NAME = "YOUR_CLOUD_NAME";
  var CLOUDINARY_UPLOAD_PRESET = "YOUR_UPLOAD_PRESET";

  var EVENTS = [
    { id: "auto", label: { en: "Automatic (by date)", it: "Automatico (per data)" } },
    { id: "valentine", label: { en: "Valentine's Day", it: "San Valentino" } },
    { id: "patrick", label: { en: "St. Patrick's Day", it: "San Patrizio" } },
    { id: "spring", label: { en: "Spring", it: "Primavera" } },
    { id: "liberation", label: { en: "Liberation Day", it: "Festa della Liberazione" } },
    { id: "summer", label: { en: "Summer Solstice", it: "Solstizio d'Estate" } },
    { id: "halloween", label: { en: "Halloween", it: "Halloween" } },
    { id: "christmas", label: { en: "Christmas", it: "Natale" } },
    { id: "newyear", label: { en: "New Year", it: "Anno Nuovo" } },
    { id: "generic", label: { en: "Generic (all year)", it: "Generico (tutto l'anno)" } },
  ];

  var THEMES = [
    { id: "auto", label: { en: "Automatic (by event)", it: "Automatico (per evento)" } },
    { id: "dark", label: { en: "Dark", it: "Scuro" } },
    { id: "light", label: { en: "Light", it: "Chiaro" } },
    { id: "pastel", label: { en: "Pastel", it: "Pastello" } },
  ];

  var UI_STRINGS = {
    en: {
      title: "Create your Love Page",
      subtitle: "Fill in the fields, get a unique link to send to your partner",
      labelYourName: "Your name",
      labelPartnerName: "Your partner's name",
      labelLanguage: "Page language",
      labelEvent: "Event / occasion",
      labelTheme: "Color theme",
      labelCustomQuestion: "Custom question (optional)",
      hintCustomQuestion: "Leave empty to use the automatic question for the event",
      labelSuccessMessage: "Message shown after \"Yes\"",
      labelPhoto: "Photo (shown after \"Yes\")",
      photoTabUrl: "Paste URL",
      photoTabUpload: "Upload",
      photoUrlPlaceholder: "https://example.com/photo.jpg",
      photoUrlHint: "Direct link to an image (jpg, png, webp)",
      uploadText: "Click or drag a photo here",
      uploadHint: "Max 5 MB — jpg, png, webp",
      photoWarning: "The image URL could not be verified. The page will show a fallback emoji instead.",
      btnPreview: "Preview",
      btnCreate: "Create your Love Page",
      resultTitle: "Your Love Page is ready!",
      btnCopy: "Copy link",
      btnCopied: "Copied!",
      btnWhatsapp: "WhatsApp",
      btnTelegram: "Telegram",
      uploading: "Uploading...",
      uploadSuccess: "Photo uploaded!",
      uploadError: "Upload failed. Try pasting a URL instead.",
      demoLink: "See a demo",
      langEn: "English",
      langIt: "Italiano",
    },
    it: {
      title: "Crea la tua Love Page",
      subtitle: "Compila i campi, ottieni un link unico da inviare al tuo partner",
      labelYourName: "Il tuo nome",
      labelPartnerName: "Il nome del/della partner",
      labelLanguage: "Lingua della pagina",
      labelEvent: "Evento / occasione",
      labelTheme: "Tema colori",
      labelCustomQuestion: "Domanda personalizzata (opzionale)",
      hintCustomQuestion: "Lascia vuoto per usare la domanda automatica dell'evento",
      labelSuccessMessage: "Messaggio mostrato dopo il \"S\u00EC\"",
      labelPhoto: "Foto (mostrata dopo il \"S\u00EC\")",
      photoTabUrl: "Incolla URL",
      photoTabUpload: "Carica",
      photoUrlPlaceholder: "https://esempio.com/foto.jpg",
      photoUrlHint: "Link diretto a un'immagine (jpg, png, webp)",
      uploadText: "Clicca o trascina una foto qui",
      uploadHint: "Max 5 MB — jpg, png, webp",
      photoWarning: "L'URL dell'immagine non \u00E8 verificabile. La pagina mostrer\u00E0 un'emoji al posto della foto.",
      btnPreview: "Anteprima",
      btnCreate: "Crea la tua Love Page",
      resultTitle: "La tua Love Page \u00E8 pronta!",
      btnCopy: "Copia link",
      btnCopied: "Copiato!",
      btnWhatsapp: "WhatsApp",
      btnTelegram: "Telegram",
      uploading: "Caricamento...",
      uploadSuccess: "Foto caricata!",
      uploadError: "Caricamento fallito. Prova a incollare un URL.",
      demoLink: "Vedi una demo",
      langEn: "English",
      langIt: "Italiano",
    },
  };

  // ── State ───────────────────────────────────────────────────────

  var currentLang = navigator.language.startsWith("it") ? "it" : "en";
  var photoUrl = "";

  // ── Encoding (via shared codec.js) ──────────────────────────────

  var codec = window.__LOVEPAGE_CODEC__;

  function encodeConfig(config) {
    return codec.encodeConfig(config);
  }

  // ── Cloudinary Upload ───────────────────────────────────────────

  function uploadToCloudinary(file, onProgress, onSuccess, onError) {
    if (CLOUDINARY_CLOUD_NAME === "YOUR_CLOUD_NAME") {
      onError("Cloudinary not configured");
      return;
    }

    var formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    var xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://api.cloudinary.com/v1_1/" + CLOUDINARY_CLOUD_NAME + "/image/upload"
    );

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        var data = JSON.parse(xhr.responseText);
        onSuccess(data.secure_url);
      } else {
        onError("HTTP " + xhr.status);
      }
    };

    xhr.onerror = function () {
      onError("Network error");
    };

    if (onProgress) {
      xhr.upload.onprogress = function (e) {
        if (e.lengthComputable) onProgress(e.loaded / e.total);
      };
    }

    xhr.send(formData);
  }

  // ── Photo URL Validation ────────────────────────────────────────

  function validateImageUrl(url, callback) {
    if (!url) {
      callback(true);
      return;
    }
    var img = new Image();
    var timeout = setTimeout(function () {
      img.onload = null;
      img.onerror = null;
      callback(false);
    }, 5000);

    img.onload = function () {
      clearTimeout(timeout);
      callback(true);
    };
    img.onerror = function () {
      clearTimeout(timeout);
      callback(false);
    };
    img.src = url;
  }

  // ── i18n ────────────────────────────────────────────────────────

  function t(key) {
    return (UI_STRINGS[currentLang] || UI_STRINGS.en)[key] || key;
  }

  function applyI18n() {
    var els = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute("data-i18n");
      var attr = els[i].getAttribute("data-i18n-attr");
      if (attr) {
        els[i].setAttribute(attr, t(key));
      } else {
        els[i].textContent = t(key);
      }
    }

    populateSelect("cr-event", EVENTS);
    populateSelect("cr-theme", THEMES);

    var langSelect = document.getElementById("cr-ui-lang");
    if (langSelect) langSelect.value = currentLang;
  }

  function populateSelect(id, items) {
    var sel = document.getElementById(id);
    if (!sel) return;
    var val = sel.value;
    sel.innerHTML = "";
    for (var i = 0; i < items.length; i++) {
      var opt = document.createElement("option");
      opt.value = items[i].id;
      opt.textContent = items[i].label[currentLang] || items[i].label.en;
      sel.appendChild(opt);
    }
    if (val) sel.value = val;
  }

  // ── Build Config ────────────────────────────────────────────────

  function buildConfig() {
    var yourName = document.getElementById("cr-your-name").value.trim();
    var partnerName = document.getElementById("cr-partner-name").value.trim();
    var language = document.getElementById("cr-page-lang").value;
    var event = document.getElementById("cr-event").value;
    var theme = document.getElementById("cr-theme").value;
    var question = document.getElementById("cr-question").value.trim();
    var message = document.getElementById("cr-message").value.trim();

    var config = {
      y: yourName || undefined,
      p: partnerName || undefined,
      l: language,
      ph: photoUrl || undefined,
      m: message || undefined,
      e: event !== "auto" ? event : undefined,
      q: question || undefined,
      t: theme !== "auto" ? theme : undefined,
    };

    // Remove undefined keys to shorten URL
    var clean = {};
    for (var k in config) {
      if (config[k] !== undefined) clean[k] = config[k];
    }
    return clean;
  }

  function getPageUrl(config) {
    var base = window.location.origin + window.location.pathname;
    // Navigate from / to /p/
    base = base.replace(/\/?(index\.html)?$/, "/p/");
    return base + "#" + encodeConfig(config);
  }

  // ── Form Validation ─────────────────────────────────────────────

  function validateForm() {
    var valid = true;
    var yourName = document.getElementById("cr-your-name");
    var partnerName = document.getElementById("cr-partner-name");

    if (!yourName.value.trim()) {
      yourName.classList.add("cr-invalid");
      valid = false;
    } else {
      yourName.classList.remove("cr-invalid");
    }

    if (!partnerName.value.trim()) {
      partnerName.classList.add("cr-invalid");
      valid = false;
    } else {
      partnerName.classList.remove("cr-invalid");
    }

    return valid;
  }

  // ── Event Handlers ──────────────────────────────────────────────

  function initPhotoTabs() {
    var tabs = document.querySelectorAll(".cr-photo-tab");
    var panels = document.querySelectorAll(".cr-photo-panel");

    for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener("click", function () {
        var target = this.getAttribute("data-tab");
        for (var j = 0; j < tabs.length; j++) tabs[j].classList.remove("cr-active");
        for (var j = 0; j < panels.length; j++) panels[j].classList.remove("cr-active");
        this.classList.add("cr-active");
        var panel = document.getElementById("cr-photo-" + target);
        if (panel) panel.classList.add("cr-active");
        photoUrl = "";
      });
    }
  }

  function initUpload() {
    var area = document.getElementById("cr-upload-area");
    var fileInput = document.getElementById("cr-file-input");
    var status = document.getElementById("cr-upload-status");

    if (!area || !fileInput) return;

    area.addEventListener("click", function () {
      fileInput.click();
    });

    area.addEventListener("dragover", function (e) {
      e.preventDefault();
      area.style.borderColor = "var(--cr-primary)";
    });

    area.addEventListener("dragleave", function () {
      area.style.borderColor = "";
    });

    area.addEventListener("drop", function (e) {
      e.preventDefault();
      area.style.borderColor = "";
      if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
    });

    fileInput.addEventListener("change", function () {
      if (fileInput.files.length > 0) handleFile(fileInput.files[0]);
    });

    function handleFile(file) {
      var maxSize = 5 * 1024 * 1024;
      var allowed = ["image/jpeg", "image/png", "image/webp"];

      if (allowed.indexOf(file.type) === -1) {
        showUploadStatus(t("uploadError"), true);
        return;
      }
      if (file.size > maxSize) {
        showUploadStatus(t("uploadError"), true);
        return;
      }

      area.classList.add("cr-uploading");
      showUploadStatus(t("uploading"), false);

      uploadToCloudinary(
        file,
        null,
        function (url) {
          photoUrl = url;
          area.classList.remove("cr-uploading");
          showUploadStatus(t("uploadSuccess"), false);
        },
        function () {
          area.classList.remove("cr-uploading");
          showUploadStatus(t("uploadError"), true);
        }
      );
    }

    function showUploadStatus(msg, isError) {
      status.textContent = msg;
      status.classList.add("cr-visible");
      status.classList.toggle("cr-upload-error", isError);
    }
  }

  function initPhotoUrl() {
    var input = document.getElementById("cr-photo-url");
    var warning = document.getElementById("cr-photo-warning");
    if (!input) return;

    var debounce = null;
    input.addEventListener("input", function () {
      clearTimeout(debounce);
      var url = input.value.trim();
      warning.classList.remove("cr-visible");

      if (!url) {
        photoUrl = "";
        return;
      }

      // Only allow http(s) URLs
      if (!/^https?:\/\//i.test(url)) {
        photoUrl = "";
        warning.classList.add("cr-visible");
        return;
      }

      debounce = setTimeout(function () {
        validateImageUrl(url, function (valid) {
          if (valid) {
            photoUrl = url;
            warning.classList.remove("cr-visible");
          } else {
            photoUrl = url;
            warning.classList.add("cr-visible");
          }
        });
      }, 800);
    });
  }

  function initActions() {
    var btnPreview = document.getElementById("cr-btn-preview");
    var btnCreate = document.getElementById("cr-btn-create");

    btnPreview.addEventListener("click", function () {
      var config = buildConfig();
      var url = getPageUrl(config);
      window.open(url, "_blank");
    });

    btnCreate.addEventListener("click", function () {
      if (!validateForm()) return;

      var config = buildConfig();
      var url = getPageUrl(config);

      var result = document.getElementById("cr-result");
      var urlInput = document.getElementById("cr-result-url");
      urlInput.value = url;
      result.classList.add("cr-visible");
      result.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  function initShareButtons() {
    var btnCopy = document.getElementById("cr-btn-copy");
    var btnWhatsapp = document.getElementById("cr-btn-whatsapp");
    var btnTelegram = document.getElementById("cr-btn-telegram");

    btnCopy.addEventListener("click", function () {
      var urlEl = document.getElementById("cr-result-url");
      var url = urlEl.value;

      function onCopied() {
        btnCopy.textContent = t("btnCopied");
        btnCopy.classList.add("cr-share-btn--copied");
        setTimeout(function () {
          btnCopy.textContent = t("btnCopy");
          btnCopy.classList.remove("cr-share-btn--copied");
        }, 2000);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(onCopied).catch(function () {
          urlEl.select();
          document.execCommand("copy");
          onCopied();
        });
      } else {
        urlEl.select();
        document.execCommand("copy");
        onCopied();
      }
    });

    btnWhatsapp.addEventListener("click", function () {
      var url = document.getElementById("cr-result-url").value;
      window.open("https://wa.me/?text=" + encodeURIComponent(url), "_blank");
    });

    btnTelegram.addEventListener("click", function () {
      var url = document.getElementById("cr-result-url").value;
      window.open("https://t.me/share/url?url=" + encodeURIComponent(url), "_blank");
    });
  }

  function initLangSwitcher() {
    var sel = document.getElementById("cr-ui-lang");
    if (!sel) return;
    sel.addEventListener("change", function () {
      currentLang = sel.value;
      applyI18n();
    });
  }

  // ── Init ────────────────────────────────────────────────────────

  function init() {
    applyI18n();
    initPhotoTabs();
    initPhotoUrl();
    initUpload();
    initActions();
    initShareButtons();
    initLangSwitcher();
  }

  // Expose for testing
  window.__CREATOR_INTERNALS__ = {
    encodeConfig: encodeConfig,
    buildConfig: buildConfig,
    getPageUrl: getPageUrl,
    validateForm: validateForm,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
