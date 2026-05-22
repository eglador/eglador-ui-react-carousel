import type { Meta, StoryObj } from "@storybook/react-vite";
import Fade from "embla-carousel-fade";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselPagination,
} from "../components/carousel";
import { HERO, HeroSlide, StoryFrame } from "./_shared";

const EFFECT_SLIDES = [
  { num: 1, gradient: "bg-gradient-to-br from-rose-500 to-orange-500" },
  { num: 2, gradient: "bg-gradient-to-br from-sky-500 to-indigo-600" },
  { num: 3, gradient: "bg-gradient-to-br from-emerald-500 to-teal-600" },
  { num: 4, gradient: "bg-gradient-to-br from-fuchsia-500 to-purple-600" },
  { num: 5, gradient: "bg-gradient-to-br from-amber-500 to-pink-600" },
  { num: 6, gradient: "bg-gradient-to-br from-cyan-500 to-blue-600" },
];

const meta: Meta = {
  title: "Carousel/Effects",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Visual effects using the same algorithm as Embla's official parallax/opacity tween patterns. Works correctly with `slidesPerView>1` and `loop` thanks to `slideRegistry`, `slideLooper.loopPoints`, and `slidesInView`.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ── Parallax ─────────────────────────────────

export const Parallax: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The parallax effect applies to a wrapper inside the slide. Wrap the CarouselItem with `overflow-hidden`, place a `data-carousel-parallax` div inside, and render the real content there — the inner layer pans at a different speed as the slide scrolls.",
      },
      source: {
        code: `import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "eglador-ui-react-carousel";

const slides = [
  { num: 1, gradient: "bg-gradient-to-br from-rose-500 to-orange-500" },
  { num: 2, gradient: "bg-gradient-to-br from-sky-500 to-indigo-600" },
  { num: 3, gradient: "bg-gradient-to-br from-emerald-500 to-teal-600" },
  { num: 4, gradient: "bg-gradient-to-br from-fuchsia-500 to-purple-600" },
];

export function MyCarousel() {
  return (
    <Carousel opts={{ loop: true }} parallax>
      <CarouselContent>
        {slides.map((s) => (
          <CarouselItem key={s.num} className="overflow-hidden rounded-3xl">
            {/* data-carousel-parallax: this element becomes the parallax target */}
            <div data-carousel-parallax>
              <div className={\`h-[420px] \${s.gradient} flex items-center justify-center\`}>
                <p className="text-white text-8xl font-bold">{s.num}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious position="center-left" />
      <CarouselNext position="center-right" />
    </Carousel>
  );
}`,
      },
    },
  },
  render: () => (
    <StoryFrame>
      <Carousel opts={{ loop: true }} parallax>
        <CarouselContent>
          {HERO.map((s) => (
            <CarouselItem
              key={s.num}
              className="overflow-hidden rounded-3xl"
            >
              <div data-carousel-parallax>
                <HeroSlide num={s.num} gradient={s.gradient} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious position="center-left" />
        <CarouselNext position="center-right" />
      </Carousel>
    </StoryFrame>
  ),
};

// ── Parallax — Custom Factor ─────────────────

export const ParallaxStrong: Story = {
  name: "Parallax — Strong",
  parameters: {
    docs: {
      description: {
        story:
          "Adjust the effect strength via `parallax={{ factor }}`. Default is 0.2 (Embla TWEEN_FACTOR_BASE). Here 0.5 produces a more pronounced parallax.",
      },
      source: {
        code: `<Carousel opts={{ loop: true }} parallax={{ factor: 0.5 }}>
  <CarouselContent>
    {slides.map((s) => (
      <CarouselItem key={s.num} className="overflow-hidden rounded-3xl">
        <div data-carousel-parallax>
          {/* slide content */}
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious position="center-left" />
  <CarouselNext position="center-right" />
</Carousel>`,
      },
    },
  },
  render: () => (
    <StoryFrame>
      <Carousel opts={{ loop: true }} parallax={{ factor: 0.5 }}>
        <CarouselContent>
          {HERO.map((s) => (
            <CarouselItem
              key={s.num}
              className="overflow-hidden rounded-3xl"
            >
              <div data-carousel-parallax>
                <HeroSlide num={s.num} gradient={s.gradient} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious position="center-left" />
        <CarouselNext position="center-right" />
      </Carousel>
    </StoryFrame>
  ),
};

// ── Opacity ──────────────────────────────────

export const Opacity: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Opacity tween keeps the active slide at 100% and fades others by distance. Best results with `slidesPerView` 3+. Here 6 colored slides — the middle one is fully opaque while side slides fade down to 15% (`min: 0.15`).",
      },
      source: {
        code: `import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "eglador-ui-react-carousel";

const slides = [
  { num: 1, gradient: "bg-gradient-to-br from-rose-500 to-orange-500" },
  { num: 2, gradient: "bg-gradient-to-br from-sky-500 to-indigo-600" },
  { num: 3, gradient: "bg-gradient-to-br from-emerald-500 to-teal-600" },
  { num: 4, gradient: "bg-gradient-to-br from-fuchsia-500 to-purple-600" },
  { num: 5, gradient: "bg-gradient-to-br from-amber-500 to-pink-600" },
  { num: 6, gradient: "bg-gradient-to-br from-cyan-500 to-blue-600" },
];

export function MyCarousel() {
  return (
    <Carousel
      opts={{ loop: true, slidesPerView: 3, align: "center" }}
      opacity={{ factor: 0.4, min: 0.15 }}
      spaceBetween={16}
    >
      <CarouselContent>
        {slides.map((s) => (
          <CarouselItem key={s.num}>
            <div className={\`h-72 rounded-3xl \${s.gradient} flex items-center justify-center\`}>
              <p className="text-white text-7xl font-bold">{s.num}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}`,
      },
    },
  },
  render: () => (
    <StoryFrame>
      <Carousel
        opts={{ loop: true, slidesPerView: 3, align: "center" }}
        opacity={{ factor: 0.4, min: 0.15 }}
        spaceBetween={16}
      >
        <CarouselContent>
          {EFFECT_SLIDES.map((s) => (
            <CarouselItem key={s.num}>
              <div
                className={`h-72 rounded-3xl ${s.gradient} flex items-center justify-center`}
              >
                <p className="text-white text-7xl font-bold">{s.num}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </StoryFrame>
  ),
};

// ── Fade ─────────────────────────────────────

export const FadeTransition: Story = {
  name: "Fade",
  parameters: {
    docs: {
      description: {
        story:
          "The `embla-carousel-fade` plugin uses opacity instead of translate for slide transitions. Ideal for hero/banner sections. `slidesPerView=1` and `loop=true` are recommended.",
      },
      source: {
        code: `import Fade from "embla-carousel-fade";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselPagination,
} from "eglador-ui-react-carousel";

const slides = [
  { num: 1, gradient: "bg-gradient-to-br from-rose-500 to-orange-500" },
  { num: 2, gradient: "bg-gradient-to-br from-sky-500 to-indigo-600" },
  { num: 3, gradient: "bg-gradient-to-br from-emerald-500 to-teal-600" },
  { num: 4, gradient: "bg-gradient-to-br from-fuchsia-500 to-purple-600" },
];

export function MyCarousel() {
  return (
    <Carousel opts={{ loop: true }} plugins={[Fade()]}>
      <CarouselContent>
        {slides.map((s) => (
          <CarouselItem key={s.num}>
            <div className={\`h-[420px] rounded-3xl \${s.gradient} flex items-center justify-center\`}>
              <p className="text-white text-8xl font-bold">{s.num}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious position="center-left" className="bg-white/90 size-12" />
      <CarouselNext position="center-right" className="bg-white/90 size-12" />
      <CarouselPagination
        position="bottom"
        dotClassName="bg-white/60 [&[aria-current=true]]:bg-white"
      />
    </Carousel>
  );
}`,
      },
    },
  },
  render: () => (
    <StoryFrame>
      <Carousel opts={{ loop: true }} plugins={[Fade()]}>
        <CarouselContent>
          {HERO.map((s) => (
            <CarouselItem key={s.num}>
              <HeroSlide num={s.num} gradient={s.gradient} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          position="center-left"
          className="bg-white/90 size-12"
        />
        <CarouselNext
          position="center-right"
          className="bg-white/90 size-12"
        />
        <CarouselPagination
          position="bottom"
          dotClassName="bg-white/60 [&[aria-current=true]]:bg-white"
        />
      </Carousel>
    </StoryFrame>
  ),
};
