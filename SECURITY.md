**English** | [Italiano](SECURITY.it.md)

# Security Policy

## Supported versions

| Version | Supported |
|---|---|
| 1.x (current, `main` branch) | Yes |

## Reporting a vulnerability

If you find a security vulnerability in this project, report it through [GitHub Security Advisories](https://github.com/AndreaBonn/lovepage/security/advisories/new).

Do not open a public issue for security vulnerabilities.

Your report should include:

- A description of the vulnerability
- Steps to reproduce it
- The potential impact (what an attacker could achieve)
- Suggested fix, if you have one

**Response timeline:**

- Acknowledgment within 72 hours
- Fix for critical vulnerabilities within 30 days
- Coordinated public disclosure after the fix is released

## Security measures implemented

LovePage is a static website with no server-side code, no database, no authentication, and no external network requests. The attack surface is limited to the client-side code that runs in the browser.

The following measures are implemented:

- **XSS prevention**: user-provided names (`yourName`, `partnerName`) are sanitized through `escapeHTML()` before DOM insertion (`engine.js`, `escapeHTML` function at line 420). All other user-configurable text is inserted via `textContent`, not `innerHTML`.
- **Input validation**: unsupported `language` values fall back to `"en"` (`engine.js`, lines 238-244). Invalid `forceEvent` values are ignored and auto-detection is used instead (`engine.js`, lines 276-287).
- **No external requests**: the page loads zero external resources. No CDN, no analytics, no third-party fonts, no tracking. Everything runs from the local files served by GitHub Pages.
- **Link security**: external links use `rel="noopener"` to prevent reverse tabnapping (`engine.js`, line 407).
- **Graceful failure**: if the configured photo fails to load, the page displays a fallback emoji instead of a broken image (`engine.js`, lines 396-400).

## Security best practices for users

- Do not put sensitive information (passwords, API keys, personal addresses) in `config.js`. This file is publicly visible in your GitHub repository.
- If you upload photos to `assets/photos/`, be aware they are publicly accessible to anyone with the URL.

## Out of scope

The following are not considered vulnerabilities for this project:

- Self-XSS (an attacker who can edit `config.js` already has write access to the repository)
- Social engineering attacks
- Vulnerabilities in GitHub Pages infrastructure
- Vulnerabilities in the user's browser
- Content injection by repository owners in their own forks (this is by design)

## Acknowledgments

No vulnerabilities have been reported yet.

---

[Back to README](README.md)
