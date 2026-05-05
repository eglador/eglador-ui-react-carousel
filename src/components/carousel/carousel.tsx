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

    // Parallax + Opacity tween — Embla resmi örneği ile birebir uyumlu
    // (slideRegistry, slideLooper.loopPoints, slidesInView kullanır)
    React.useEffect(() => {
      if (!api || (!parallax && !opacity)) return;

      const TWEEN_FACTOR_BASE = 0.2;

      const userParallaxFactor =
        parallax && typeof parallax === "object" && parallax.factor !== undefined
          ? parallax.factor
          : TWEEN_FACTOR_BASE;
      const userOpacityFactor =
        opacity && typeof opacity === "object" && opacity.factor !== undefined
          ? opacity.factor
          : TWEEN_FACTOR_BASE;
      const opacityMin =
        opacity && typeof opacity === "object" && opacity.min !== undefined
          ? opacity.min
          : 0.3;

      let parallaxFactor = userParallaxFactor;
      let opacityFactor = userOpacityFactor;

      const setTweenFactors = () => {
        const snapCount = api.scrollSnapList().length;
        parallaxFactor = userParallaxFactor * snapCount;
        opacityFactor = userOpacityFactor * snapCount;
      };

      const tween = (eventName?: string) => {
        const engine = api.internalEngine();
        const scrollProgress = api.scrollProgress();
        const slidesInView = api.slidesInView();
        const slideNodes = api.slideNodes();
        const isScrollEvent = eventName === "scroll";

        api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
          let diffToTarget = scrollSnap - scrollProgress;
          const slidesInSnap = engine.slideRegistry[snapIndex];

          slidesInSnap.forEach((slideIndex) => {
            if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

            if (engine.options.loop) {
              engine.slideLooper.loopPoints.forEach((loopItem) => {
                const target = loopItem.target();
                if (slideIndex === loopItem.index && target !== 0) {
                  const sign = Math.sign(target);
                  if (sign === -1) {
                    diffToTarget = scrollSnap - (1 + scrollProgress);
                  }
                  if (sign === 1) {
                    diffToTarget = scrollSnap + (1 - scrollProgress);
                  }
                }
              });
            }

            const slide = slideNodes[slideIndex];
            if (!slide) return;

            if (parallax) {
              const tweenNode =
                (slide.querySelector(
                  "[data-carousel-parallax]",
                ) as HTMLElement | null) ?? slide;
              const translate = diffToTarget * -parallaxFactor * 100;
              tweenNode.style.transform =
                orientation === "vertical"
                  ? `translate3d(0, ${translate}%, 0)`
                  : `translate3d(${translate}%, 0, 0)`;
            }

            if (opacity) {
              const value = Math.max(
                0,
                1 - Math.abs(diffToTarget * opacityFactor),
              );
              slide.style.opacity = (
                opacityMin +
                value * (1 - opacityMin)
              ).toString();
            }
          });
        });
      };

      const onReInit = () => {
        setTweenFactors();
        tween("reInit");
      };
      const onResize = () => {
        setTweenFactors();
        tween("resize");
      };
      const onScroll = () => tween("scroll");
      const onSlideFocus = () => tween("slideFocus");

      setTweenFactors();
      tween();

      api.on("reInit", onReInit);
      api.on("resize", onResize);
      api.on("scroll", onScroll);
      api.on("slideFocus", onSlideFocus);

      return () => {
        api.off("reInit", onReInit);
        api.off("resize", onResize);
        api.off("scroll", onScroll);
        api.off("slideFocus", onSlideFocus);
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
