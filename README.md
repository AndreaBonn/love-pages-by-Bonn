**English** | [Italiano](README.it.md)

# Love Pages by Bonn

A GitHub Pages template that displays a seasonal romantic question to your partner. Fork it, edit one file, deploy in 5 minutes. Zero dependencies, works offline.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## What it does

Love Pages by Bonn generates a full-screen page with an animated question that changes based on the time of year. Your partner can click "Yes" (which opens a popup with your photo and a custom message) or "No" (which runs away from the cursor and can never be clicked).

The page adapts its colors, particles, and question text to 9 calendar events:

| Event | Date range | Question |
|---|---|---|
| Valentine's Day | Feb 10 -- 14 | "Do you want to be my Valentine?" |
| St. Patrick's Day | Mar 14 -- 17 | "Do you want to be my Lucky Charm?" |
| Spring | Mar 20 -- Apr 10 | "Do you want to be my Blossom?" |
| Liberation Day | Apr 23 -- 25 | "Do you want to be my Liberation?" |
| Summer Solstice | Jun 18 -- 24 | "Do you want to be my Sunshine?" |
| Halloween | Oct 27 -- 31 | "Do you want to be my Pumpkin?" |
| Christmas | Dec 20 -- 26 | "Do you want to be my Christmas?" |
| New Year | Dec 28 -- Jan 2 | "Do you want to be my New Year?" |
| Generic (fallback) | All year | "Do you want to be mine?" |

Each event has its own color theme, emoji, and animated background particles (hearts, snowflakes, pumpkins, clovers, etc.).

---

## Features

- Automatic calendar detection with 9 seasonal themes
- Animated background particles (hearts, stars, snowflakes, clovers, flowers, pumpkins)
- "No" button that flees from the cursor on desktop and from taps on mobile
- "Yes" button triggers a confetti explosion and opens a modal with your photo and message
- Two languages: English and Italian (selected in config)
- Three optional color overrides: dark, light, pastel
- Works on phones, tablets, and desktops (320px to 2560px)
- Zero external requests: no CDN, no analytics, no web fonts
- Deploys automatically via GitHub Actions on every push to `main`

---

## How to set it up (step by step)

You do not need to know how to code. Follow these steps exactly.

### Step 1 -- Star this repository

On this page, click the "Star" button near the top right. This helps the project reach more people.

### Step 2 -- Fork the repository

1. Click the **Fork** button (top right of this page)
2. On the next screen, leave everything as-is and click **Create fork**
3. Wait a few seconds. You now have your own copy of the project under your GitHub account.

### Step 3 -- Upload your photo

1. In your fork, click the `assets` folder, then click `photos`
2. Click **Add file** > **Upload files**
3. Drag your photo into the upload area (or click "choose your files")
4. Scroll down and click **Commit changes**
5. Remember the exact filename (e.g. `us.jpg`)

### Step 4 -- Edit the configuration

1. Go back to the main page of your fork (click the repository name at the top)
2. Click on the file `config.js`
3. Click the pencil icon (Edit this file) in the top right of the file view
4. Change these values:

```javascript
yourName: "Your Name",          // Replace with your name
partnerName: "Partner Name",    // Replace with your partner's name
language: "en",                 // "en" for English, "it" for Italian
successPhoto: "assets/photos/us.jpg",  // The filename you uploaded in Step 3
successMessage: "Your message here",   // The message shown after clicking Yes
```

5. Leave the other options as they are (or see the Configuration section below for advanced options)
6. Scroll down and click **Commit changes**

### Step 5 -- Enable GitHub Pages

1. In your fork, click **Settings** (the tab with the gear icon)
2. In the left sidebar, click **Pages**
3. Under "Source", select **GitHub Actions**
4. That's it. No other changes needed.

### Step 6 -- Get your link

After about 60 seconds, your page will be live at:

```
https://YOUR-USERNAME.github.io/lovepage/
```

Replace `YOUR-USERNAME` with your actual GitHub username. Send this link to your partner.

---

## Configuration

All options are in `config.js`. Only `yourName`, `partnerName`, `successPhoto`, and `successMessage` are required. Everything else has a working default.

| Option | Type | Default | Description |
|---|---|---|---|
| `yourName` | string | `"Romeo"` | Your name, displayed at the top |
| `partnerName` | string | `"Giulietta"` | Your partner's name, used in the header and popup |
| `language` | string | `"en"` | `"en"` or `"it"` |
| `successPhoto` | string | `"assets/photos/example.jpg"` | Path to the photo shown in the Yes popup |
| `successMessage` | string | (see config.js) | Message shown in the Yes popup |
| `forceEvent` | string or null | `null` | Force a specific theme: `"valentine"`, `"patrick"`, `"spring"`, `"liberation"`, `"summer"`, `"halloween"`, `"christmas"`, `"newyear"`, `"generic"` |
| `customQuestion` | string or null | `null` | Replace the automatic seasonal question with your own |
| `theme` | string or null | `null` | Color override: `"dark"`, `"light"`, or `"pastel"` |
| `showFooter` | boolean | `true` | Show or hide the attribution footer |

---

## Troubleshooting

**My photo doesn't appear.**
Check that the filename in `successPhoto` matches exactly what you uploaded, including uppercase and lowercase letters. GitHub paths are case-sensitive. If the photo fails to load, a heart emoji is shown as fallback.

**The page still shows the old version.**
GitHub Pages can take up to 2 minutes to update. Clear your browser cache with Ctrl+Shift+R (Cmd+Shift+R on Mac).

**I want to test a specific event.**
Set `forceEvent` in `config.js` to any event ID (e.g. `"valentine"`). This overrides the calendar detection.

**The No button disappeared.**
After 50 attempts to catch it, the button hides itself. Reload the page to reset it.

**I want to use a language other than English or Italian.**
Only `"en"` and `"it"` are supported at this time.

---

## How it works (technical)

The project is four files:

- `index.html` -- HTML shell with placeholder elements
- `config.js` -- user configuration (the only file to edit)
- `engine.js` -- calendar detection, theming, i18n, particles, button behavior, modal
- `style.css` -- layout, animations, responsive design

No build step, no bundler, no external dependencies. Open `index.html` in a browser and it works.

For debugging, open the browser console and run `__LOVEPAGE_DEBUG__()` to see the detected event, applied theme, and current configuration.

---

## Contributing

Bug reports and pull requests are welcome. For new events or languages, open an issue first.

1. Fork the repository
2. Create a branch (`git checkout -b fix/description`)
3. Test by opening `index.html` in a browser
4. Open a pull request with a description of what changed and why

---

## Security

See [SECURITY.md](SECURITY.md) for the vulnerability disclosure policy.

---

## License

Released under the MIT License -- see [LICENSE](LICENSE).

---

Andrea Bonacci -- [@AndreaBonn](https://github.com/AndreaBonn)

If this project is useful to you, a star on GitHub is appreciated.
