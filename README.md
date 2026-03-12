# Reiss Home Services website

Static website for **Reiss Home Services LLC** built for GitHub Pages and the custom domain **reisshomeservices.com**.

## What is included

- Fast static HTML, CSS, and JavaScript
- Mobile-friendly responsive layout
- Home page, services hub, about page, contact page
- 6 service detail pages
- 6 local service area pages
- Structured data (JSON-LD) for business, service, FAQ, breadcrumbs, and collection pages
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, `CNAME`, and `.nojekyll`
- Local image assets, favicon set, and Open Graph image

## Repository structure

- `index.html` - home page
- `services/` - services hub + detailed service pages
- `service-areas/` - service area hub
- `locations/` - localized city pages
- `about/` - about page
- `contact/` - contact page with static-friendly quote form
- `assets/css/styles.css` - global styles
- `assets/js/main.js` - menu, reveal animations, live service search, quote form
- `assets/img/` - logo, icons, and social preview image

## GitHub Pages notes

This site is a plain static site and is ready for GitHub Pages branch publishing.

### Publish flow

1. Upload these files to the root of your repository.
2. In GitHub, open **Settings -> Pages**.
3. Choose **Deploy from a branch**.
4. Select your main branch and the **root** folder.
5. Save, then confirm the custom domain is **reisshomeservices.com**.
6. Enable HTTPS after the domain is connected.

A `CNAME` file is already included for the custom domain.

## DNS reminder

Make sure your DNS provider is configured for GitHub Pages for the apex/root domain and, if desired, the `www` variant. DNS values can change over time, so verify the current records in GitHub's documentation before updating DNS.

## Contact form behavior

Because GitHub Pages is static hosting, the contact form opens a prefilled `mailto:` email instead of posting to a backend.

If you want form submissions to arrive without opening the visitor's email app later, replace the form action with a service such as:

- Formspree
- Basin
- Getform

## Recommended next SEO steps

1. Connect Google Search Console and submit `https://reisshomeservices.com/sitemap.xml`.
2. Create or finish the Google Business Profile for the business.
3. Add real project photos and before/after images once available.
4. Add real testimonials or reviews when you have them.
5. Expand with more service detail pages if you want to target more long-tail searches.

## Easy edits

- Update company text in the HTML files directly.
- Update styles in `assets/css/styles.css`.
- Update interactivity in `assets/js/main.js`.
- Replace icons or social image in `assets/img/`.
