# szddddddd.github.io

Modern academic portfolio website for GitHub user `szddddddd`.

Live site:

```text
https://szddddddd.github.io
```

The site is built with Astro and TypeScript, uses a custom dark visual system, and deploys to GitHub Pages through GitHub Actions. It is static-only: no backend, no database, no CMS, and no client-side SPA framework.

## Content policy

Only the provided personal information is included:

- 宋梓冬 / Song Zidong
- Undergraduate Student
- ShanghaiTech University
- VRVC Lab
- Major in Computer Science
- Email: `songzd2024@shanghaitech.edu.cn`
- GitHub: `https://github.com/szddddddd`

The BME1312 MRI reconstruction course project is included as a real academic course project. Publications, CV, notes, and other future projects remain placeholders until real content is provided.

## Local development

```bash
npm install
npm run dev
```

Open the local URL shown by Astro, usually:

```text
http://localhost:4321
```

## Build

```bash
npm run build
```

The static site is generated in:

```text
dist/
```

## Deployment

This repository is configured for GitHub Pages using GitHub Actions.

Repository settings:

1. Open `Settings` → `Pages`.
2. Under `Build and deployment`, set `Source` to `GitHub Actions`.
3. Push to the `main` branch.
4. The workflow in `.github/workflows/deploy.yml` runs `npm ci`, builds the Astro site, and deploys `dist/`.

Important configuration:

```js
site: 'https://szddddddd.github.io'
```

Because this is a GitHub user homepage repository named `szddddddd.github.io`, no Astro `base` path is configured.

## Edit content

Primary personal/profile data:

```text
src/data/profile.ts
```

This contains:

- names
- role
- university
- lab
- major
- email
- GitHub URL
- research interests
- CV placeholder
- BME1312 course project card
- future project placeholders
- publication data structure
- course project data structure

English UI and page text:

```text
src/i18n/en.ts
```

Chinese UI and page text:

```text
src/i18n/zh.ts
```

Main pages:

```text
src/pages/index.astro
src/pages/about.astro
src/pages/projects.astro
src/pages/projects/bme1312.astro
src/pages/publications.astro
src/pages/coursework.astro
src/pages/notes.astro
src/pages/zh/*.astro
```

Most page layout is shared through:

```text
src/components/LocalizedPage.astro
```

Visual system:

```text
src/styles/global.css
```

BME1312 project assets:

```text
public/projects/bme1312/
```

The public report PDF is a web-safe version with student IDs and emails removed:

```text
public/projects/bme1312/bme1312-mri-reconstruction-report.pdf
```

## Routes

English:

- `/`
- `/about`
- `/projects`
- `/projects/bme1312`
- `/publications`
- `/coursework`
- `/notes`

Chinese:

- `/zh/`
- `/zh/about`
- `/zh/projects`
- `/zh/projects/bme1312`
- `/zh/publications`
- `/zh/coursework`
- `/zh/notes`
