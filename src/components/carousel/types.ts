import type {
  EmblaOptionsType,
  EmblaCarouselType,
  EmblaPluginType,
} from "embla-carousel";

export type CarouselApi = EmblaCarouselType;
export type CarouselPlugin = EmblaPluginType;

type SlidesPerViewExtension = { slidesPerView?: number | "auto" };

export type CarouselOptions = Omit<EmblaOptionsType, "breakpoints"> &
  SlidesPerViewExtension & {
    breakpoints?: Record<string, EmblaOptionsType & SlidesPerViewExtension>;
  };

export type CarouselOrientation = "horizontal" | "vertical";

export type CarouselButtonPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type CarouselPaginationPosition =
  // Center overlay
  | "top"
  | "bottom"
  | "left"
  | "right"
  // Corner overlay
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  // Center outside
  | "top-outside"
  | "bottom-outside"
  | "left-outside"
  | "right-outside"
  // Corner outside
  | "top-left-outside"
  | "top-right-outside"
  | "bottom-left-outside"
  | "bottom-right-outside";

export interface CarouselContextValue {
  carouselRef: (instance: HTMLElement | null) => void;
  api: CarouselApi | undefined;
  orientation: CarouselOrientation;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  scrollSnaps: number[];
  scrollTo: (index: number) => void;
  resolvedSlidesPerView: number | "auto" | undefined;
}
