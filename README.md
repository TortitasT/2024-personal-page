[![Playwright Tests](https://github.com/TortitasT/2024-personal-page/actions/workflows/playwright.yml/badge.svg)](https://github.com/TortitasT/2024-personal-page/actions/workflows/playwright.yml)

# 2024 Personal Page

Made in Preact using Vite

## Development

Install dependencies

```bash
pnpm i
```

Start server

```bash
pnpm run dev
```

Download technologies from svgl.app

```bash
pnpm run bin:download-tech
```

Download projects from GitHub

```bash
pnpm run bin:download-projects

# With auth, github has a huge limit on requests for non auth users
GITHUB_API_KEY=<YOUR_GITHUB_API_TOKEN> pnpm run bin:download-projects
```
