import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
  type CarouselApi,
} from "../components/carousel";
import { NUMBERS, NumberSlide, StoryFrame } from "./_shared";

const meta: Meta = {
  title: "Carousel/Hooks",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Default kontrol component'leri yerine kendi UI'ınızı kurun. `useCarousel()` children içinden carousel state'ini okur. `setApi` callback'i ile dış state'e Embla API'sini sızdırır (programatik kontrol için).",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ── useCarousel — Counter ────────────────────

function SlideCounter() {
  const { selectedIndex, scrollSnaps } = useCarousel();
  return (
    <p className="mt-4 text-center text-sm font-mono text-zinc-600">
      Slide <span className="font-bold text-zinc-900">{selectedIndex + 1}</span>{" "}
      / {scrollSnaps.length}
    </p>
  );
}

export const UseCarouselHook: Story = {
  name: "useCarousel — Read State",
  parameters: {
    docs: {
      description: {
        story:
          "`useCarousel()` hook'u Carousel children'ı içinde state okur. Burada aktif slide indeksini ve toplam slide sayısını gösteren bir sayaç.",
      },
      source: {
        code: `import { Carousel, CarouselContent, CarouselItem, useCarousel } from "eglador-ui-react-carousel";

function SlideCounter() {
  const { selectedIndex, scrollSnaps } = useCarousel();
  return (
    <p>
      Slide {selectedIndex + 1} / {scrollSnaps.length}
    </p>
  );
}

export function MyCarousel() {
  return (
    <Carousel opts={{ loop: true }}>
      <CarouselContent>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
        <CarouselItem>Slide 3</CarouselItem>
      </CarouselContent>
      <SlideCounter />
    </Carousel>
  );
}`,
      },
    },
  },
  render: () => (
    <StoryFrame>
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {NUMBERS.slice(0, 4).map((n) => (
            <CarouselItem key={n}>
              <NumberSlide num={n} height="h-56" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <SlideCounter />
      </Carousel>
    </StoryFrame>
  ),
};

// ── setApi — Programmatic Control ────────────

export const SetApi: Story = {
  name: "setApi — Programmatic Control",
  parameters: {
    docs: {
      description: {
        story:
          "`setApi` prop'u Carousel oluşturulduğunda Embla API'sini dış state'e iletir. Sonrasında `api.scrollTo(index)` gibi metotlarla istediğiniz yerden carousel'ı kontrol edebilirsiniz.",
      },
      source: {
        code: `import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "eglador-ui-react-carousel";

export function MyCarousel() {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <>
      <Carousel opts={{ loop: true }} setApi={setApi}>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
      </Carousel>

      <div>
        <button onClick={() => api?.scrollTo(0)}>İlk</button>
        <button onClick={() => api?.scrollPrev()}>Önceki</button>
        <button onClick={() => api?.scrollNext()}>Sonraki</button>
        <button onClick={() => api?.scrollTo(2)}>Son</button>
      </div>
    </>
  );
}`,
      },
    },
  },
  render: () => {
    const [api, setApi] = React.useState<CarouselApi>();

    return (
      <StoryFrame>
        <Carousel opts={{ loop: true }} setApi={setApi}>
          <CarouselContent>
            {NUMBERS.slice(0, 4).map((n) => (
              <CarouselItem key={n}>
                <NumberSlide num={n} height="h-56" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <button
            type="button"
            onClick={() => api?.scrollTo(0)}
            className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg font-medium transition cursor-pointer"
          >
            İlk
          </button>
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg font-medium transition cursor-pointer"
          >
            Önceki
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg font-medium transition cursor-pointer"
          >
            Sonraki
          </button>
          <button
            type="button"
            onClick={() => api?.scrollTo(3)}
            className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg font-medium transition cursor-pointer"
          >
            Son
          </button>
        </div>
      </StoryFrame>
    );
  },
};
