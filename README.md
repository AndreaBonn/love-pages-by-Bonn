# LovePage 💌

A GitHub Pages template for a romantic page that adapts to the time of year. Fork it, edit one file, and send the link to your partner.

> **Demo GIF** — *(add a screen recording here once the project is live)*

---

## 🎨 How it looks

The page automatically picks a seasonal theme based on the current date. There are 9 built-in themes:

| Theme | Period | Mood |
|---|---|---|
| Valentine | Feb 10–14 | Red and pink, falling hearts |
| St. Patrick | Mar 14–17 | Green, spinning clovers |
| Spring / Hanami | Mar 20–Apr 10 | Soft pink, falling blossoms |
| Liberation Day | Apr 23–25 | Italian tricolor palette |
| Summer Solstice | Jun 18–24 | Yellow and orange, sunshine |
| Halloween | Oct 27–31 | Dark orange and black, floating pumpkins |
| Christmas | Dec 20–26 | Red and green, snowflakes |
| New Year | Dec 28–Jan 2 | Gold and silver on dark, stars |
| Generic | All year | Soft purple — the fallback when no event is active |

Each theme changes the colors, the animated particles in the background, and the question displayed to your partner.

---

## ⚡ Quick start (5 minutes)

1. ⭐ **Star this repo** — it helps the project grow
2. 🍴 **Click Fork** in the top right corner, then confirm
3. ✏️ **Open `config.js`** in your fork and click the pencil icon (Edit this file)
4. 📝 **Change the names and message** — at minimum, set `yourName`, `partnerName`, and `successMessage`
5. 📸 **Upload your photo** to `assets/photos/` using the GitHub web interface (Add file → Upload files), then update `successPhoto` in `config.js` with the filename
6. ⚙️ Go to **Settings → Pages → Branch: main → Save**
7. 🔗 After about 60 seconds, your page is live at `https://YOUR-USERNAME.github.io/lovepage/`

Send the link to your partner and wait. 🎉

---

## ⚙️ Customization

All configuration lives in a single file: `config.js`. Open it and change the values below.

| Option | Type | Default | Description |
|---|---|---|---|
| `yourName` | string | `"Marco"` | Your name, shown at the top of the page |
| `partnerName` | string | `"Giulia"` | Your partner's name, used in the success popup |
| `language` | string | `"it"` | Interface language. Supported: `"en"`, `"it"` |
| `successPhoto` | string | `"assets/photos/example.jpg"` | Path to the photo shown when your partner clicks Yes |
| `successMessage` | string | — | The message shown in the popup alongside the photo |
| `forceEvent` | string \| null | `null` | Force a specific theme regardless of the date. See event IDs below. |
| `customQuestion` | string \| null | `null` | Override the automatic seasonal question with your own text |
| `theme` | string \| null | `null` | Color override: `"dark"`, `"light"`, or `"pastel"`. Keeps event colors but changes background/text. |
| `showFooter` | boolean | `true` | Show or hide the "Made with LovePage" credit at the bottom |

**Example `config.js`:**

```javascript
window.LOVEPAGE_CONFIG = {
  yourName: "Luca",
  partnerName: "Sofia",
  language: "en",
  successPhoto: "assets/photos/us.jpg",
  successMessage: "You are my favorite person.",
  forceEvent: null,
  customQuestion: null,
  theme: null,
  showFooter: true,
};
```

**To force a specific theme** (useful for testing or for anniversaries outside the automatic date ranges), set `forceEvent` to one of: `"valentine"`, `"patrick"`, `"spring"`, `"liberation"`, `"summer"`, `"halloween"`, `"christmas"`, `"newyear"`, `"generic"`.

---

## 📅 Automatic events

The page reads the current date and picks the first matching event in this table. If no event matches, it falls back to `generic`.

| Event ID | Date range | Question (EN) | Question (IT) |
|---|---|---|---|
| `valentine` | Feb 10 – Feb 14 | "Do you want to be my Valentine?" | "Vuoi essere il mio/la mia Valentino/a?" |
| `patrick` | Mar 14 – Mar 17 | "Do you want to be my Lucky Charm?" | "Vuoi essere il mio portafortuna?" |
| `spring` | Mar 20 – Apr 10 | "Do you want to be my Blossom?" | "Vuoi essere il mio fiore di primavera?" |
| `liberation` | Apr 23 – Apr 25 | "Do you want to be my Liberation?" | "Vuoi essere la mia Liberazione?" |
| `summer` | Jun 18 – Jun 24 | "Do you want to be my Sunshine?" | "Vuoi essere il mio sole?" |
| `halloween` | Oct 27 – Oct 31 | "Do you want to be my Pumpkin?" | "Vuoi essere la mia zucca?" |
| `christmas` | Dec 20 – Dec 26 | "Do you want to be my Christmas?" | "Vuoi essere il mio Natale?" |
| `newyear` | Dec 28 – Jan 2 | "Do you want to be my New Year?" | "Vuoi essere il mio Anno Nuovo?" |
| `generic` | All year | "Do you want to be mine?" | "Vuoi essere mio/mia?" |

---

## ❓ FAQ

**Can I use a custom question instead of the automatic ones?**
Yes. Set `customQuestion: "Your question here"` in `config.js`. This overrides the seasonal question for all events.

**What if my photo doesn't show up?**
Check that the filename in `successPhoto` matches exactly (including uppercase/lowercase) the file you uploaded to `assets/photos/`. GitHub file paths are case-sensitive.

**The page isn't updating after I edited `config.js`.**
GitHub Pages can take up to 2 minutes to publish changes. Try a hard refresh (Ctrl+Shift+R) to bypass your browser cache.

**Can I use a photo hosted elsewhere (e.g. Google Drive, Dropbox)?**
Not recommended. Hosting the photo in `assets/photos/` inside the repo is the most reliable option and avoids broken links.

**What does the No button do?**
On desktop, the button moves away each time the cursor approaches it and disappears after 5 attempts. On mobile, it is visually faded and unresponsive with a small tooltip.

**Can I remove the "Made with LovePage" footer?**
Yes, set `showFooter: false` in `config.js`.

**My partner's language is not Italian or English. Is that supported?**
Currently the interface is available in English (`"en"`) and Italian (`"it"`). More languages may be added in future releases.

**Does the page work without internet?**
Yes. There are no external dependencies — no CDN, no analytics, no Google Fonts. The page works fully offline once loaded.

---

## 🤝 Contributing

Bug reports and pull requests are welcome.

1. Fork the repository
2. Create a branch: `git checkout -b fix/my-fix`
3. Make your changes and test them locally by opening `index.html` in a browser
4. Open a pull request against `main` with a clear description of what you changed and why

For new event ideas or language additions, open an issue first so we can discuss the approach before writing code.

---

## 📄 License

MIT — see [LICENSE](LICENSE) for the full text.

You are free to use, modify, and distribute this project, including in commercial contexts. Attribution is appreciated but not required.
