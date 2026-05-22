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
          "Build your own UI instead of the default controls. `useCarousel()` reads carousel state from inside the children; `setApi` callback exposes the Embla API to outer state for programmatic control.",
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
          "`useCarousel()` reads state from inside the Carousel children. Here a counter that shows the active slide index and total slide count.",
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
          "The `setApi` prop forwards the Embla API to outer state when the Carousel mounts. You can then control the carousel from anywhere via methods like `api.scrollTo(index)`.",
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
        <button onClick={() => api?.scrollTo(0)}>First</button>
        <button onClick={() => api?.scrollPrev()}>Previous</button>
        <button onClick={() => api?.scrollNext()}>Next</button>
        <button onClick={() => api?.scrollTo(2)}>Last</button>
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
            First
          </button>
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg font-medium transition cursor-pointer"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg font-medium transition cursor-pointer"
          >
            Next
          </button>
          <button
            type="button"
            onClick={() => api?.scrollTo(3)}
            className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg font-medium transition cursor-pointer"
          >
            Last
          </button>
        </div>
      </StoryFrame>
    );
  },
};
