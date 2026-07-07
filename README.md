# szddddddd.github.io

A minimal Astro-powered GitHub Pages personal homepage for `szddddddd`.

The site is designed as a dark, editorial, academic portfolio with placeholder-only personal information. No real affiliation, research record, publication, email, or CV content is included yet.

## Local development

```bash
npm install
npm run dev
```

Open the local URL shown by Astro, usually `http://localhost:4321`.

## Build

```bash
npm run build
```

The static site is generated in `dist/`.

## Deployment

This repository is configured for GitHub Pages through GitHub Actions.

- Repository name: `szddddddd.github.io`
- Branch: `main`
- Site URL: `https://szddddddd.github.io`
- Astro `site`: `https://szddddddd.github.io`
- No `base` path is required for a GitHub user homepage repository.

After pushing to `main`, GitHub Actions runs `npm ci`, builds the Astro site, and deploys `dist/` to GitHub Pages.

If GitHub asks for a Pages source, choose **GitHub Actions** in repository settings.

## Edit personal information

Update this file first:

```text
src/data/profile.ts
```

It contains:

- name
- role
- affiliation
- bio
- researchInterests
- education / affiliation placeholders
- projects
- publications
- links: email, GitHub, CV

Most pages read from this data file, so routine content edits should not require changing layout or component files.
