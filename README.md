# Reiss Home Services website

Simplified static website for **Reiss Home Services LLC** built for GitHub Pages and the custom domain **reisshomeservices.com**.

## Current structure

- `index.html` — home page
- `services/index.html` — full service list with live search
- `contact/index.html` — direct contact page with quote request form
- `404.html` — custom not-found page
- `assets/` — shared styles, scripts, logos, icons, and OG image
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, `CNAME`, and `.nojekyll`

## Simplification pass included

- Removed the AI-sounding and meta/behind-the-scenes language
- Reduced the main navigation to **Home**, **Services**, and **Contact**
- Moved service areas into the main pages instead of a dedicated service-areas page
- Reworked the copy so it is shorter, more direct, and more action-oriented
- Kept legacy URLs as simple redirects to preserve old links if needed

## Contact flow

This site is static, so the quote form opens a prepared email draft addressed to:

- **matt@reisshomeservices.com**

Direct call button:

- **(714) 310-5163**

## Publishing to GitHub Pages

1. Create or open your GitHub repository.
2. Upload the contents of this folder to the repository root.
3. In GitHub, go to **Settings → Pages**.
4. Choose **Deploy from a branch**.
5. Select the `main` branch and the `/root` folder.
6. Save.

The included `CNAME` file is already set for `reisshomeservices.com`.
