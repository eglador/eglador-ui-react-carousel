import type { Meta, StoryObj } from "@storybook/react-vite";
import Autoplay from "embla-carousel-autoplay";
import AutoHeight from "embla-carousel-auto-height";
import Fade from "embla-carousel-fade";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
  CarouselPagination,
  CarouselAutoplayProgress,
  type CarouselButtonPosition,
  type CarouselOrientation,
  type CarouselOverlayPosition,
  type CarouselPaginationPosition,
  type CarouselPaginationType,
} from "../components/carousel";
import { NUMBERS, FOUR, NumberSlide, StoryFrame } from "./_shared";

const NAVIGATION_POSITIONS: Array<CarouselButtonPosition | "default"> = [
  "default",
  // Overlay
  "top-left",
  "top-center",
  "top-right",
  "center-left",
  "center-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
  // Outside
  "top-outside",
  "bottom-outside",
  "left-outside",
  "right-outside",
  "top-left-outside",
  "top-right-outside",
  "bottom-left-outside",
  "bottom-right-outside",
];

// Vary slide heights so the effect is visible when AutoHeight is enabled.
// (Tailwind class strings must appear in source so they are generated.)
const VARIABLE_HEIGHTS = [
  "h-40",
  "h-72",
  "h-56",
  "h-80",
  "h-48",
  "h-64",
  "h-52",
  "h-60",
];

const AUTOPLAY_PROGRESS_POSITIONS: Array<CarouselOverlayPosition | "default"> = [
  "default",
  "top",
  "bottom",
  "left",
  "right",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

const PAGINATION_POSITIONS: Array<CarouselPaginationPosition | "default"> = [
  "default",
  "top",
  "bottom",
  "left",
  "right",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
  "top-outside",
  "bottom-outside",
  "left-outside",
  "right-outside",
  "top-left-outside",
  "top-right-outside",
  "bottom-left-outside",
  "bottom-right-outside",
];

type StoryArgs = {
  // Layout
  orientation: CarouselOrientation;
  direction: "ltr" | "rtl";
  // Behavior
  loop: boolean;
  dragFree: boolean;
  slidesPerView: number | "auto";
  align: "start" | "center" | "end";
  spaceBetween: number;
  // Effects
  parallax: boolean;
  opacity: boolean;
  // Navigation
  showNavigation: boolean;
  navigationPosition: CarouselButtonPosition | "default";
  // Pagination
  showPagination: boolean;
  paginationType: CarouselPaginationType;
  paginationPosition: CarouselPaginationPosition | "default";
  paginationDark: boolean;
  // Plugins
  enableAutoplay: boolean;
  autoplayDelay: number;
  showAutoplayProgress: boolean;
  autoplayProgressPosition: CarouselOverlayPosition | "default";
  enableFade: boolean;
  enableAutoHeight: boolean;
};

const meta: Meta<StoryArgs> = {
  title: "Carousel/Basic",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Master playground for testing every option in one place. Use the Controls panel to switch orientation, slidesPerView, breakpoints, plugins (Autoplay, Fade), and navigation/pagination positions live. AutoScroll lives in a separate story because it needs a different layout.",
      },
    },
  },
  args: {
    orientation: "horizontal",
    direction: "ltr",
    loop: true,
    dragFree: false,
    slidesPerView: 1,
    align: "start",
    spaceBetween: 16,
    parallax: false,
    opacity: false,
    showNavigation: true,
    navigationPosition: "bottom-right",
    showPagination: true,
    paginationType: "dots",
    paginationPosition: "bottom-left",
    paginationDark: false,
    enableAutoplay: false,
    autoplayDelay: 4000,
    showAutoplayProgress: false,
    autoplayProgressPosition: "top-right",
    enableFade: false,
    enableAutoHeight: false,
  },
  argTypes: {
    // ── Layout ─────────────────────────────
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      table: { category: "Layout" },
    },
    direction: {
      control: "radio",
      options: ["ltr", "rtl"],
      table: { category: "Layout" },
    },
    // ── Behavior ───────────────────────────
    loop: { control: "boolean", table: { category: "Behavior" } },
    dragFree: { control: "boolean", table: { category: "Behavior" } },
    slidesPerView: {
      control: "select",
      options: [1, 2, 3, 4, "auto"],
      table: { category: "Behavior" },
    },
    align: {
      control: "radio",
      options: ["start", "center", "end"],
      table: { category: "Behavior" },
    },
    spaceBetween: {
      control: { type: "number", min: 0, max: 64, step: 2 },
      table: { category: "Behavior" },
      description: "Gap between slides (in pixels)",
    },
    // ── Effects ────────────────────────────
    parallax: { control: "boolean", table: { category: "Effects" } },
    opacity: { control: "boolean", table: { category: "Effects" } },
    // ── Navigation ─────────────────────────
    showNavigation: { control: "boolean", table: { category: "Navigation" } },
    navigationPosition: {
      control: "select",
      options: NAVIGATION_POSITIONS,
      table: { category: "Navigation" },
      description: '"default" = static, alt-merkezli',
    },
    // ── Pagination ─────────────────────────
    showPagination: { control: "boolean", table: { category: "Pagination" } },
    paginationType: {
      control: "select",
      options: ["dots", "fraction", "numbers", "dynamic", "scrollbar"],
      table: { category: "Pagination" },
      description: "Pagination type",
    },
    paginationPosition: {
      control: "select",
      options: PAGINATION_POSITIONS,
      table: { category: "Pagination" },
      description: '"default" = static, bottom-centered',
    },
    paginationDark: {
      control: "boolean",
      table: { category: "Pagination" },
      description: "Switch dot/text color to white for overlay backgrounds (dots/numbers/fraction)",
    },
    // ── Plugins ────────────────────────────
    enableAutoplay: { control: "boolean", table: { category: "Plugins" } },
    autoplayDelay: {
      control: { type: "number", min: 1000, max: 10000, step: 500 },
      table: { category: "Plugins" },
    },
    showAutoplayProgress: {
      control: "boolean",
      table: { category: "Plugins" },
      description: "Autoplay countdown circle (only visible while autoplay is active)",
      if: { arg: "enableAutoplay", truthy: true },
    },
    autoplayProgressPosition: {
      control: "select",
      options: AUTOPLAY_PROGRESS_POSITIONS,
      table: { category: "Plugins" },
      description: "Autoplay progress circle position (8 overlay slots)",
      if: { arg: "showAutoplayProgress", truthy: true },
    },
    enableFade: { control: "boolean", table: { category: "Plugins" } },
    enableAutoHeight: {
      control: "boolean",
      table: { category: "Plugins" },
      description:
        "AutoHeight plugin + viewport CSS transition + watchImages. Slide heights vary (just to make the effect visible).",
    },
  },
  render: (args) => {
    const plugins = [];
    if (args.enableAutoplay) {
      plugins.push(Autoplay({ delay: args.autoplayDelay, stopOnInteraction: false }));
    }
    if (args.enableFade) {
      plugins.push(Fade());
    }
    if (args.enableAutoHeight) {
      plugins.push(AutoHeight());
    }

    const isVertical = args.orientation === "vertical";
    const items = isVertical ? FOUR : NUMBERS;

    const navIsOutside =
      args.showNavigation &&
      args.navigationPosition !== "default" &&
      args.navigationPosition.includes("outside");
    const paginationIsOutside =
      args.showPagination &&
      args.paginationPosition !== "default" &&
      args.paginationPosition.includes("outside");
    const needsPadding = navIsOutside || paginationIsOutside;

    const carousel = (
      <Carousel
        orientation={args.orientation}
        opts={{
          loop: args.loop,
          dragFree: args.dragFree,
          slidesPerView: args.slidesPerView,
          align: args.align,
          direction: args.direction,
        }}
        plugins={plugins}
        parallax={args.parallax}
        opacity={args.opacity}
        autoHeight={args.enableAutoHeight}
        spaceBetween={args.spaceBetween}
      >
        <CarouselContent
          className={
            isVertical && !args.enableAutoHeight ? "h-[400px]" : ""
          }
        >
          {items.map((n) => {
            const slideHeight = args.enableAutoHeight
              ? VARIABLE_HEIGHTS[(n - 1) % VARIABLE_HEIGHTS.length]
              : isVertical
                ? "h-[380px]"
                : "h-56";
            return (
              <CarouselItem key={n}>
                <NumberSlide num={n} height={slideHeight} />
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {args.showNavigation && (
          <CarouselNavigation
            position={
              args.navigationPosition === "default"
                ? undefined
                : args.navigationPosition
            }
          />
        )}

        {args.showPagination && (
          <CarouselPagination
            type={args.paginationType}
            position={
              args.paginationPosition === "default"
                ? undefined
                : args.paginationPosition
            }
            dotClassName={
              args.paginationDark
                ? "bg-white/60 [&[aria-current=true]]:bg-white"
                : ""
            }
          />
        )}

        {args.enableAutoplay && args.showAutoplayProgress && (
          <CarouselAutoplayProgress
            position={
              args.autoplayProgressPosition === "default"
                ? undefined
                : args.autoplayProgressPosition
            }
          />
        )}
      </Carousel>
    );

    return (
      <StoryFrame>
        {needsPadding ? (
          <div className="px-14 py-14">{carousel}</div>
        ) : (
          carousel
        )}
      </StoryFrame>
    );
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {};
