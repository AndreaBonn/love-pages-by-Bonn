window.LOVEPAGE_CONFIG = {

  // --- YOUR NAMES ---
  // Your name (the sender)
  yourName: "Marco",
  // Your partner's name (the receiver)
  partnerName: "Giulia",

  // --- LANGUAGE ---
  // Supported: "it", "en"
  language: "it",

  // --- SUCCESS PHOTO ---
  // Shown in the popup when your partner clicks "Yes"
  // Place your image in the assets/photos/ folder
  successPhoto: "assets/photos/example.jpg",

  // --- SUCCESS MESSAGE ---
  // Shown in the popup alongside the photo
  successMessage: "Sei la cosa più bella che mi sia mai capitata",

  // --- MANUAL OVERRIDE (optional) ---
  // If set, ignores automatic calendar detection
  // Leave null for automatic behavior
  // Possible values: "valentine", "newyear", "halloween", "patrick",
  //                  "spring", "summer", "christmas", "liberation", "generic"
  forceEvent: null,

  // --- CUSTOM QUESTION (optional) ---
  // Overrides the automatic question with a custom one
  customQuestion: null,
  // Example: customQuestion: "Vuoi essere la mia persona per sempre?"

  // --- COLOR THEME (optional) ---
  // If null, theme is chosen automatically based on the event
  // Possible values: "dark", "light", "pastel"
  theme: null,

  // --- FOOTER ---
  // Show/hide the "Made with LovePage" footer
  showFooter: true,
};
