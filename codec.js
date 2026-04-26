// Love Pages — Config Codec
// Shared encode/decode for config objects passed via URL hash

(function () {
  "use strict";

  function encodeConfig(config) {
    var json = JSON.stringify(config);
    var utf8 = encodeURIComponent(json)
      .replace(/%([0-9A-F]{2})/g, function (_, hex) {
        return String.fromCharCode(parseInt(hex, 16));
      });
    return btoa(utf8)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  function decodeConfig(hash) {
    if (!hash || hash.length < 2) return null;
    try {
      var raw = hash.charAt(0) === "#" ? hash.substring(1) : hash;
      var base64 = raw
        .replace(/-/g, "+")
        .replace(/_/g, "/");
      var pad = base64.length % 4;
      if (pad) base64 += "====".substring(pad);
      var json = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  }

  var CONFIG_KEYS = {
    y: "yourName",
    p: "partnerName",
    l: "language",
    ph: "successPhoto",
    m: "successMessage",
    e: "forceEvent",
    q: "customQuestion",
    t: "theme",
  };

  var CONFIG_DEFAULTS = {
    yourName: "Someone",
    partnerName: "You",
    language: "en",
    successPhoto: "",
    successMessage: "",
    forceEvent: null,
    customQuestion: null,
    theme: null,
    showFooter: true,
  };

  function isSafeUrl(url) {
    if (!url || typeof url !== "string") return false;
    return /^https?:\/\//i.test(url);
  }

  function expandConfig(compact) {
    if (!compact) return null;
    var full = {};
    for (var short in CONFIG_KEYS) {
      var long = CONFIG_KEYS[short];
      full[long] = compact[short] !== undefined ? compact[short] : CONFIG_DEFAULTS[long];
    }
    // Sanitize photo URL: only allow http(s) schemes
    if (full.successPhoto && !isSafeUrl(full.successPhoto)) {
      full.successPhoto = "";
    }
    full.showFooter = true;
    return full;
  }

  window.__LOVEPAGE_CODEC__ = {
    encodeConfig: encodeConfig,
    decodeConfig: decodeConfig,
    expandConfig: expandConfig,
    CONFIG_KEYS: CONFIG_KEYS,
    CONFIG_DEFAULTS: CONFIG_DEFAULTS,
  };
})();
