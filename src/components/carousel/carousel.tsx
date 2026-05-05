"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { cn } from "../../lib/utils";
import { CarouselContext } from "./context";
import type {
  CarouselApi,
  CarouselContextValue,
  CarouselOptions,
  CarouselOrientation,
  CarouselPlugin,
} from "./types";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin[];
  orientation?: CarouselOrientation;
  setApi?: (api: CarouselApi) => void;
  parallax?: boolean | { factor?: number };
  opacity?: boolean | { factor?: number; min?: number };
  watchImages?: boolean;
  autoHeight?: boolean;
  spaceBetween?: number;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  function Carousel(
    {
      opts,
      plugins,
      orientation = "horizontal",
      setApi,
      parallax,
      opacity,
      watchImages,
      autoHeight = false,
      spaceBetween = 0,
      className,
      children,
      onKeyDown,
      ...props
    },
    ref,
  ) {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      } as EmblaOptionsType,
      plugins,
    );

    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
    const [resolvedSlidesPerView, setResolvedSlidesPerView] = React.useState<
      number | "auto" | undefined
    >(opts?.slidesPerView);

    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);
    const scrollTo = React.useCallback((i: number) => api?.scrollTo(i), [api]);

    React.useEffect(() => {
      if (!api) return;

      const onSelect = (a: CarouselApi) => {
        setCanScrollPrev(a.canScrollPrev());
        setCanScrollNext(a.canScrollNext());
        setSelectedIndex(a.selectedScrollSnap());
      };

      const onInit = (a: CarouselApi) => {
        setScrollSnaps(a.scrollSnapList());
      };

      const onReInit = (a: CarouselApi) => {
        setScrollSnaps(a.scrollSnapList());
        const engineOpts = a.internalEngine().options as CarouselOptions;
        setResolvedSlidesPerView(
          engineOpts.slidesPerView ?? opts?.slidesPerView,
        );
      };

      onInit(api);
      onSelect(api);
      onReInit(api);

      api.on("init", onInit);
      api.on("select", onSelect);
      api.on("reInit", onReInit);
      api.on("reInit", onSelect);

      return () => {
        api.off("init", onInit);
        api.off("select", onSelect);
        api.off("reInit", onReInit);
        api.off("reInit", onSelect);
      };
    }, [api, opts?.slidesPerView]);

    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api || (!parallax && !opacity)) return;

      const parallaxFactor =
        parallax && typeof parallax === "object" && parallax.factor !== undefined
          ? parallax.factor
          : 15;
      const opacityFactor =
        opacity && typeof opacity === "object" && opacity.factor !== undefined
          ? opacity.factor
          : 2.5;
      const opacityMin =
        opacity && typeof opacity === "object" && opacity.min !== undefined
          ? opacity.min
          : 0.3;

      const tween = () => {
        const engine = api.internalEngine();
        const scrollProgress = api.scrollProgress();
        const slideNodes = api.slideNodes();
        const locations = api.scrollSnapList();

        slideNodes.forEach((slide, index) => {
          const target =
            (slide.querySelector("[data-carousel-parallax]") as HTMLElement | null) ??
            slide;
          let distance = locations[index] - scrollProgress;

          if (engine.options.loop) {
            if (distance < -0.5) distance += 1;
            if (distance > 0.5) distance -= 1;
          }

          if (parallax) {
            const x = distance * parallaxFactor * 100;
            target.style.transform =
              orientation === "vertical"
                ? `translate3d(0, ${x}%, 0)`
                : `translate3d(${x}%, 0, 0)`;
          }

          if (opacity) {
            const value = Math.max(0, 1 - Math.abs(distance * opacityFactor));
            slide.style.opacity = (
              opacityMin +
              value * (1 - opacityMin)
            ).toString();
          }
        });
      };

      tween();
      api.on("scroll", tween);
      api.on("reInit", tween);
      api.on("resize", tween);

      return () => {
        api.off("scroll", tween);
        api.off("reInit", tween);
        api.off("resize", tween);
      };
    }, [api, parallax, opacity, orientation]);

    const shouldWatchImages = watchImages || autoHeight;

    React.useEffect(() => {
      if (!api || !shouldWatchImages) return;

      const handleLoad = () => api.reInit();
      const cleanups: (() => void)[] = [];

      api.slideNodes().forEach((slide) => {
        slide.querySelectorAll("img").forEach((img) => {
          if (img.complete) return;
          img.addEventListener("load", handleLoad, { once: true });
          img.addEventListener("error", handleLoad, { once: true });
          cleanups.push(() => {
            img.removeEventListener("load", handleLoad);
            img.removeEventListener("error", handleLoad);
          });
        });
      });

      return () => cleanups.forEach((fn) => fn());
    }, [api, shouldWatchImages]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        const isHorizontal = orientation === "horizontal";

        if (event.key === "ArrowLeft" && isHorizontal) {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight" && isHorizontal) {
          event.preventDefault();
          scrollNext();
        } else if (event.key === "ArrowUp" && !isHorizontal) {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowDown" && !isHorizontal) {
          event.preventDefault();
          scrollNext();
        }

        onKeyDown?.(event);
      },
      [scrollPrev, scrollNext, orientation, onKeyDown],
    );

    const value = React.useMemo<CarouselContextValue>(
      () => ({
        carouselRef,
        api,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        scrollSnaps,
        scrollTo,
        resolvedSlidesPerView,
        spaceBetween,
        autoHeight,
      }),
      [
        carouselRef,
        api,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        scrollSnaps,
        scrollTo,
        resolvedSlidesPerView,
        spaceBetween,
        autoHeight,
      ],
    );

    return (
      <CarouselContext.Provider value={value}>
        <div
          ref={ref}
          role="region"
          aria-roledescription="carousel"
          dir={opts?.direction}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className={cn("relative", className)}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);

Carousel.displayName = "Carousel";
