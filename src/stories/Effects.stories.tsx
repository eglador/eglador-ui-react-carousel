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
          "Embla'nın resmi parallax/opacity tween pattern'leri ile aynı algoritmayı kullanan görsel efektler. `slideRegistry`, `slideLooper.loopPoints`, `slidesInView` ile slidesPerView>1 ve loop durumlarında doğru çalışır.",
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
          "Parallax efekti slide içindeki bir wrapper'a uygulanır. CarouselItem'ı `overflow-hidden` ile sarmala, içine `data-carousel-parallax` attribute'lu bir div koy ve gerçek içeriği orada render et — slide kayarken iç katman farklı hızda kayar.",
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
            {/* data-carousel-parallax: bu element parallax target olur */}
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
          "`parallax={{ factor }}` ile efektin gücü ayarlanabilir. Default 0.2 (Embla TWEEN_FACTOR_BASE). Burada 0.5 ile daha belirgin parallax.",
      },
      source: {
        code: `<Carousel opts={{ loop: true }} parallax={{ factor: 0.5 }}>
  <CarouselContent>
    {slides.map((s) => (
      <CarouselItem key={s.num} className="overflow-hidden rounded-3xl">
        <div data-carousel-parallax>
          {/* slide içeriği */}
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
          "Opacity tween aktif slide'ı %100, mesafeye göre uzakta olanları soldurur. En iyi sonuç slidesPerView 3+ ile alınır. Burada 6 renkli slide, ortadaki tam opaklıkta, yan slide'lar %15'e kadar fade olur (`min: 0.15`).",
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
          "`embla-carousel-fade` plugin'i slide'lar arası geçişte translate yerine opacity kullanır. Hero/banner alanları için ideal. `slidesPerView=1` ve `loop=true` önerilir.",
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
