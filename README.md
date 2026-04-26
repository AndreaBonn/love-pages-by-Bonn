**English** | [Italiano](README.it.md)

# Love Pages by Bonn

Create a personalized romantic page for your partner in under 2 minutes. No coding required, no account needed. Just fill in a form and send the link.

<div align="center">

[![CI](https://github.com/AndreaBonn/love-pages-by-Bonn/actions/workflows/ci.yml/badge.svg)](https://github.com/AndreaBonn/love-pages-by-Bonn/actions/workflows/ci.yml)
[![Tests](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AndreaBonn/love-pages-by-Bonn/main/badges/test-badge.json)](https://github.com/AndreaBonn/love-pages-by-Bonn/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AndreaBonn/love-pages-by-Bonn/main/badges/coverage-badge.json)](https://github.com/AndreaBonn/love-pages-by-Bonn/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Security Policy](https://img.shields.io/badge/security-policy-blueviolet.svg)](SECURITY.md)

</div>

![Demo](assets/screenshots/demo-generic.png)

---

## What it does

Love Pages by Bonn generates a full-screen page with an animated question that changes based on the time of year. Your partner can click "Yes" (which opens a popup with your photo and a custom message) or "No" (which runs away from the cursor and can never be clicked).

![Generated page example](./docs/assets/generated-page.png)

The page adapts its colors, particles, and question text to 9 calendar events:

| Event              | Date range       | Question                            |
| ------------------ | ---------------- | ----------------------------------- |
| Valentine's Day    | Feb 10 -- 14     | "Do you want to be my Valentine?"   |
| St. Patrick's Day  | Mar 14 -- 17     | "Do you want to be my Lucky Charm?" |
| Spring             | Mar 20 -- Apr 10 | "Do you want to be my Blossom?"     |
| Liberation Day     | Apr 23 -- 25     | "Do you want to be my Liberation?"  |
| Summer Solstice    | Jun 18 -- 24     | "Do you want to be my Sunshine?"    |
| Halloween          | Oct 27 -- 31     | "Do you want to be my Pumpkin?"     |
| Christmas          | Dec 20 -- 26     | "Do you want to be my Christmas?"   |
| New Year           | Dec 28 -- Jan 2  | "Do you want to be my New Year?"    |
| Generic (fallback) | All year         | "Do you want to be mine?"           |

Each event has its own color theme, emoji, and animated background particles (hearts, snowflakes, pumpkins, clovers, etc.).

|                   Valentine's Day                   |                      Halloween                      |                      Christmas                      |
| :-------------------------------------------------: | :-------------------------------------------------: | :-------------------------------------------------: |
| ![Valentine](assets/screenshots/demo-valentine.png) | ![Halloween](assets/screenshots/demo-halloween.png) | ![Christmas](assets/screenshots/demo-christmas.png) |

The "No" button runs away every time you try to click it:

![No button demo](assets/screenshots/demo-no-button.gif)

When your partner clicks "Yes", a confetti explosion reveals your photo and message:

![Modal](assets/screenshots/demo-modal.png)

---

## Features

- Automatic calendar detection with 9 seasonal themes
- Animated background particles (hearts, stars, snowflakes, clovers, flowers, pumpkins)
- "No" button that flees from the cursor on desktop and from taps on mobile
- "Yes" button triggers a confetti explosion and opens a modal with your photo and message
- Two languages: English and Italian
- Three optional color overrides: dark, light, pastel
- Works on phones, tablets, and desktops (320px to 2560px)
- Zero external requests: no CDN, no analytics, no web fonts

---

## Two ways to use it

|                  | Online configurator    | Fork on GitHub           |
| ---------------- | ---------------------- | ------------------------ |
| **For**          | Everyone               | Developers               |
| **Time**         | 2 minutes              | 5 minutes                |
| **Requires**     | A browser              | A GitHub account         |
| **Custom photo** | Upload or paste a link | Upload to your repo      |
| **Custom URL**   | No (shared domain)     | Yes (your own github.io) |
| **Hosting**      | Included               | GitHub Pages (free)      |

---

## Option A -- Online configurator (no coding)

This is the fastest way. No account needed, no coding, nothing to install.

### Step 1 -- Open the configurator

Go to the Love Pages website and you will see the configurator form.

### Step 2 -- Fill in the form

- **Your name** and **your partner's name** (required)
- **Page language**: English or Italian
- **Event**: pick a specific occasion (Valentine's, Halloween, Christmas...) or leave "Automatic" to let the page choose based on today's date
- **Color theme**: leave "Automatic" or pick dark, light, or pastel
- **Custom question** (optional): write your own question instead of the automatic one
- **Message**: the text shown after your partner clicks "Yes"

![Configurator form](./docs/assets/configurator-form.png)

### Step 3 -- Add a photo

You have two options:

- **Paste URL**: if your photo is already online (e.g. shared from Google Drive, Imgur, or any website), paste the direct link
- **Upload**: click the upload area and select a photo from your device (max 5 MB, jpg/png/webp)

The photo is optional. If you skip it, a heart emoji will be shown instead.

### Step 4 -- Preview and create

1. Click **Preview** to see how the page looks (opens in a new tab)
2. When you're happy, click **Create your Love Page**
3. Your unique link appears at the bottom of the page

### Step 5 -- Share the link

- Click **Copy link** to copy it to your clipboard
- Or click **WhatsApp** / **Telegram** to send it directly

![Result with share buttons](./docs/assets/configurator-result.png)

That's it. Your partner opens the link and sees the page with your names, your question, and your photo.

---

## Option B -- Fork on GitHub (for developers)

If you want your own URL (yourusername.github.io) or want to customize the code, use the fork method.

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
https://YOUR-USERNAME.github.io/love-pages-by-Bonn/
```

Replace `YOUR-USERNAME` with your actual GitHub username. Send this link to your partner.

---

## Configuration (fork method)

All options are in `config.js`. Only `yourName`, `partnerName`, `successPhoto`, and `successMessage` are required. Everything else has a working default.

| Option           | Type           | Default                       | Description                                                                                                                                        |
| ---------------- | -------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `yourName`       | string         | `"Romeo"`                     | Your name, displayed at the top                                                                                                                    |
| `partnerName`    | string         | `"Giulietta"`                 | Your partner's name, used in the header and popup                                                                                                  |
| `language`       | string         | `"en"`                        | `"en"` or `"it"`                                                                                                                                   |
| `successPhoto`   | string         | `"assets/photos/example.jpg"` | Path to the photo shown in the Yes popup                                                                                                           |
| `successMessage` | string         | (see config.js)               | Message shown in the Yes popup                                                                                                                     |
| `forceEvent`     | string or null | `null`                        | Force a specific theme: `"valentine"`, `"patrick"`, `"spring"`, `"liberation"`, `"summer"`, `"halloween"`, `"christmas"`, `"newyear"`, `"generic"` |
| `customQuestion` | string or null | `null`                        | Replace the automatic seasonal question with your own                                                                                              |
| `theme`          | string or null | `null`                        | Color override: `"dark"`, `"light"`, or `"pastel"`                                                                                                 |
| `showFooter`     | boolean        | `true`                        | Show or hide the attribution footer                                                                                                                |

---

## Troubleshooting

**My photo doesn't appear.**
If you used the configurator: check that the URL you pasted is a direct link to an image (it should end in .jpg, .png, or .webp). Links to Google Drive pages or Instagram posts won't work -- you need the direct image URL. If the photo fails to load, a heart emoji is shown as fallback.

If you used the fork method: check that the filename in `successPhoto` matches exactly what you uploaded, including uppercase and lowercase letters.

**The page still shows the old version.**
GitHub Pages can take up to 2 minutes to update. Clear your browser cache with Ctrl+Shift+R (Cmd+Shift+R on Mac).

**I want to test a specific event.**
In the configurator, select the event from the dropdown. In the fork method, set `forceEvent` in `config.js` to any event ID (e.g. `"valentine"`).

**The No button disappeared.**
After 50 attempts to catch it, the button hides itself. Reload the page to reset it.

**I want to use a language other than English or Italian.**
Only `"en"` and `"it"` are supported at this time.

---

## How it works (technical)

The project has two modes:

**Configurator mode** (home page):

- `index.html` + `create.js` + `create.css` -- the form-based configurator
- `codec.js` -- encodes the configuration as a base64url hash in the URL
- `p/index.html` -- decodes the hash and loads the page with the user's configuration

**Fork mode** (traditional):

- `config.js` -- user configuration (the only file to edit)
- `engine.js` -- calendar detection, theming, i18n, particles, button behavior, modal
- `style.css` -- layout, animations, responsive design

No build step, no bundler, no external dependencies. The configurator generates a self-contained URL that works forever -- no server, no database, no account.

For debugging, open the browser console and run `__LOVEPAGE_DEBUG__()` to see the detected event, applied theme, and current configuration.

---

## Contributing

Bug reports and pull requests are welcome. For new events or languages, open an issue first.

1. Fork the repository
2. Create a branch (`git checkout -b fix/description`)
3. Test by opening `index.html` in a browser
4. Run the tests by opening `test.html` in a browser (all must pass)
5. Open a pull request with a description of what changed and why

---

## Security

See [SECURITY.md](SECURITY.md) for the vulnerability disclosure policy.

---

## License

Released under the MIT License -- see [LICENSE](LICENSE).

---

Andrea Bonacci -- [@AndreaBonn](https://github.com/AndreaBonn)

If this project is useful to you, a star on GitHub is appreciated.
