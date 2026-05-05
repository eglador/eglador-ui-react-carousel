<img src=".github/eglador-logo.svg" alt="eglador-ui-react-carousel" width="200" />

# eglador-ui-react-carousel

[![npm version](https://img.shields.io/npm/v/eglador-ui-react-carousel?style=flat-square&color=blue)](https://www.npmjs.com/package/eglador-ui-react-carousel)
[![npm downloads](https://img.shields.io/npm/dm/eglador-ui-react-carousel?style=flat-square&color=green)](https://www.npmjs.com/package/eglador-ui-react-carousel)
[![license](https://img.shields.io/npm/l/eglador-ui-react-carousel?style=flat-square)](https://github.com/eglador/eglador-ui-react-carousel/blob/main/LICENSE)
![embla-carousel v8](https://img.shields.io/badge/embla--carousel-v8-8B5CF6?style=flat-square)
![tailwind v4](https://img.shields.io/badge/tailwindcss-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![react >= 18](https://img.shields.io/badge/react-%3E%3D18-61DAFB?style=flat-square&logo=react&logoColor=white)
![typescript](https://img.shields.io/badge/typescript-ready-3178C6?style=flat-square&logo=typescript&logoColor=white)

A modern, headless, compound-component carousel for React — built on top of [Embla Carousel](https://www.embla-carousel.com/) and styled with **Tailwind CSS v4**.

## Features

- **Compound API** — `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious/Next`, `CarouselPagination` (composition-first, shadcn/ui style)
- **TypeScript-first** — full type safety on Embla options and plugins
- **Position system** — 16 pagination positions, 16 navigation positions (overlay + outside variants)
- **Pagination types** — `dots`, `fraction`, `numbers`, `dynamic`, `scrollbar`
- **Autoplay progress** — circular SVG countdown indicator with remaining-seconds text
- **AutoHeight** — viewport height transitions to active slide
- **Parallax + Opacity** — Embla's official tween algorithm built-in (slideRegistry + slideLooper)
- **Plugin support** — pass any Embla plugin (`Autoplay`, `Fade`, `AutoScroll`, etc.)
- **`useCarousel` hook** — build fully custom controls
- **RTL & vertical** — first-class support
- **Keyboard navigation** — arrow keys, orientation-aware
- **`spaceBetween`** — built-in slide gap (Embla's recommended pattern)

## Installation

```bash
npm install eglador-ui-react-carousel
```

**Peer dependencies:** `react >= 18` · `react-dom >= 18` · `tailwindcss ^4`

## Setup

Add the following to your global stylesheet so Tailwind picks up the component classes:

```css
@import "tailwindcss";
@source "../node_modules/eglador-ui-react-carousel";
```

The `@source` path is relative to the CSS file location:

| Framework | CSS file location | Path |
|---|---|---|
| Next.js (App Router) | `app/globals.css` | `../node_modules/eglador-ui-react-carousel` |
| Next.js (`src/`) | `src/app/globals.css` | `../../node_modules/eglador-ui-react-carousel` |
| Vite | `src/index.css` | `../node_modules/eglador-ui-react-carousel` |

## Quick Start

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselPagination,
} from "eglador-ui-react-carousel";

export function MyCarousel() {
  return (
    <Carousel
      opts={{
        loop: true,
        slidesPerView: 1,
        breakpoints: {
          "(min-width: 768px)": { slidesPerView: 3 },
        },
      }}
      spaceBetween={16}
    >
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id}>
            <ProductCard product={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselPagination />
    </Carousel>
  );
}
```

## API

### Components

| Component | Purpose |
|---|---|
| `Carousel` | Root provider. Accepts Embla options via `opts`, plugins via `plugins`, plus effect props. |
| `CarouselContent` | Viewport (`overflow-hidden`) + flex container. Wrap `CarouselItem`s here. |
| `CarouselItem` | Individual slide. Sized automatically based on `slidesPerView`. |
| `CarouselPrevious` | Previous button. 16 positions via `position` prop. |
| `CarouselNext` | Next button. 16 positions via `position` prop. |
| `CarouselNavigation` | Group wrapper (Prev + Next together). 16 positions. |
| `CarouselPagination` | Pagination indicator. 5 types, 16 positions. |
| `CarouselAutoplayProgress` | Circular countdown for autoplay (8 overlay positions). |

### Hook

| Export | Returns |
|---|---|
| `useCarousel()` | `{ api, scrollPrev, scrollNext, scrollTo, selectedIndex, scrollSnaps, canScrollPrev, canScrollNext, orientation, ... }` |

### `Carousel` props

| Prop | Type | Description |
|---|---|---|
| `opts` | `CarouselOptions` | All Embla options + `slidesPerView` extension |
| `plugins` | `CarouselPlugin[]` | Embla plugins (Autoplay, Fade, AutoScroll, AutoHeight, ClassNames, WheelGestures) |
| `orientation` | `"horizontal" \| "vertical"` | Default `"horizontal"` |
| `setApi` | `(api: CarouselApi) => void` | Escape hatch for programmatic control |
| `parallax` | `boolean \| { factor?: number }` | Built-in parallax tween (use with `data-carousel-parallax` wrapper) |
| `opacity` | `boolean \| { factor?: number; min?: number }` | Active-slide opacity emphasis |
| `autoHeight` | `boolean` | Viewport height transition + watchImages (use with `AutoHeight()` plugin) |
| `watchImages` | `boolean` | Re-init carousel when images load |
| `spaceBetween` | `number` (px) | Gap between slides |

## Pagination Types

```tsx
<CarouselPagination type="dots" />        // default — clickable dots
<CarouselPagination type="fraction" />    // "1 / 8"
<CarouselPagination type="numbers" />     // 1 2 3 ... clickable numbers
<CarouselPagination type="dynamic" />     // 5-dot sliding window with size scaling
<CarouselPagination type="scrollbar" />   // real-time scroll progress bar
```

## Position System

### Pagination — 16 positions

```ts
type CarouselPaginationPosition =
  // Overlay (inside carousel)
  | "top" | "bottom" | "left" | "right"
  | "top-left" | "top-right" | "bottom-left" | "bottom-right"
  // Outside (pushed out of carousel bounds — wrap parent with padding)
  | "top-outside" | "bottom-outside" | "left-outside" | "right-outside"
  | "top-left-outside" | "top-right-outside"
  | "bottom-left-outside" | "bottom-right-outside";
```

### Navigation — 16 positions

```ts
type CarouselButtonPosition =
  | "top-left" | "top-center" | "top-right"
  | "center-left" | "center-right"
  | "bottom-left" | "bottom-center" | "bottom-right"
  | "top-outside" | "bottom-outside" | "left-outside" | "right-outside"
  | "top-left-outside" | "top-right-outside"
  | "bottom-left-outside" | "bottom-right-outside";
```

## Plugins (optional)

Embla plugins are user-managed. Install whichever you need:

```bash
npm install embla-carousel-autoplay embla-carousel-fade
```

```tsx
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

<Carousel plugins={[Autoplay({ delay: 4000 }), Fade()]}>
  ...
</Carousel>
```

Available Embla plugins:

| Package | Purpose |
|---|---|
| `embla-carousel-autoplay` | Auto-advance |
| `embla-carousel-fade` | Fade transitions instead of slide |
| `embla-carousel-auto-scroll` | Continuous scrolling (logo strips) |
| `embla-carousel-auto-height` | Adaptive viewport height |
| `embla-carousel-class-names` | Apply classes to slides based on state |
| `embla-carousel-wheel-gestures` | Mouse wheel navigation |

## Custom Controls

Use `useCarousel()` inside Carousel children to build custom UI:

```tsx
function SlideCounter() {
  const { selectedIndex, scrollSnaps } = useCarousel();
  return <p>{selectedIndex + 1} / {scrollSnaps.length}</p>;
}

<Carousel>
  <CarouselContent>...</CarouselContent>
  <SlideCounter />
</Carousel>
```

For programmatic control from outside, use `setApi`:

```tsx
const [api, setApi] = useState<CarouselApi>();

<Carousel setApi={setApi}>...</Carousel>
<button onClick={() => api?.scrollTo(2)}>Go to slide 3</button>
```

## Compatibility

Works with any React-based framework: **Next.js**, **Remix**, **Vite + React**, **Gatsby**, etc.

## Development

```bash
npm install
npm run dev               # tsup watch mode
npm run build             # production build to dist/
npm run typecheck         # tsc --noEmit
npm run storybook         # Storybook dev (http://localhost:6006)
npm run build-storybook   # static Storybook export
```

## Publishing

Publishing is automated via GitHub Actions. When a GitHub Release is created, the package is published to npm.

1. Update `version` in `package.json`
2. Commit and push
3. Create a GitHub Release with a matching tag (e.g. `v1.0.0`)

## Author

Kenan Gündoğan — [https://github.com/kenangundogan](https://github.com/kenangundogan)

Maintained under [Eglador](https://github.com/eglador)

## License

MIT
