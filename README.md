<img src=".github/eglador-logo.svg" alt="eglador-ui-react-carousel" width="200" />

# eglador-ui-react-carousel

[![npm version](https://img.shields.io/npm/v/eglador-ui-react-carousel?style=flat-square&color=blue)](https://www.npmjs.com/package/eglador-ui-react-carousel)
[![npm downloads](https://img.shields.io/npm/dm/eglador-ui-react-carousel?style=flat-square&color=green)](https://www.npmjs.com/package/eglador-ui-react-carousel)
[![license](https://img.shields.io/npm/l/eglador-ui-react-carousel?style=flat-square)](https://github.com/eglador/eglador-ui-react-carousel/blob/main/LICENSE)
![tailwind v4](https://img.shields.io/badge/tailwindcss-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![react >= 18](https://img.shields.io/badge/react-%3E%3D18-61DAFB?style=flat-square&logo=react&logoColor=white)
![typescript](https://img.shields.io/badge/typescript-ready-3178C6?style=flat-square&logo=typescript&logoColor=white)

A lightweight, reusable Carousel component built with **Tailwind CSS v4** for React-based projects.

## Installation

```bash
npm install eglador-ui-react-carousel
```

**Peer dependencies:** `react >= 18` | `react-dom >= 18` | `tailwindcss ^4`

## Setup

Add the following to your global stylesheet (e.g. `app/globals.css`) so Tailwind can detect the component classes:

```css
@import "tailwindcss";
@source "../node_modules/eglador-ui-react-carousel/dist/**/*.{js,mjs}";
```

## Usage

```tsx
import { Carousel } from "eglador-ui-react-carousel";
```

## Components

| Category | Components |
|----------|-----------|
| **Media** | Carousel |

## Development

```bash
npm install              # install dependencies
npm run build            # production build to dist/
npm run dev              # watch mode with live rebuild
npm run typecheck        # run typescript type checking
```

## Publishing

Publishing is automated via GitHub Actions. When a GitHub Release is created, the package is automatically published to npm.

1. Update `version` in `package.json`
2. Commit and push
3. Create a GitHub Release with a matching tag (e.g. `v1.0.0`)

## Compatibility

Works with any React-based framework: **Next.js**, **Remix**, **Vite + React**, **Gatsby**, and others.

## Author

Kenan Gündoğan — [https://github.com/kenangundogan](https://github.com/kenangundogan)

Maintained under [Eglador](https://github.com/eglador)

## License

MIT
