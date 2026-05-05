"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "../../lib/icons";
import { useCarousel } from "./context";
import type { CarouselButtonPosition } from "./types";

const BUTTON_POSITION: Record<CarouselButtonPosition, string> = {
  "top-left": "absolute top-2 left-2 z-10",
  "top-center": "absolute top-2 left-1/2 -translate-x-1/2 z-10",
  "top-right": "absolute top-2 right-2 z-10",
  "center-left": "absolute top-1/2 left-2 -translate-y-1/2 z-10",
  "center-right": "absolute top-1/2 right-2 -translate-y-1/2 z-10",
  "bottom-left": "absolute bottom-2 left-2 z-10",
  "bottom-center": "absolute bottom-2 left-1/2 -translate-x-1/2 z-10",
  "bottom-right": "absolute bottom-2 right-2 z-10",
};

const GROUP_POSITION: Record<CarouselButtonPosition, string> = {
  "top-left": "absolute top-2 left-2 z-10 flex flex-row gap-2",
  "top-center": "absolute top-2 left-1/2 -translate-x-1/2 z-10 flex flex-row gap-2",
  "top-right": "absolute top-2 right-2 z-10 flex flex-row gap-2",
  "center-left": "absolute top-1/2 left-2 -translate-y-1/2 z-10 flex flex-col gap-2",
  "center-right": "absolute top-1/2 right-2 -translate-y-1/2 z-10 flex flex-col gap-2",
  "bottom-left": "absolute bottom-2 left-2 z-10 flex flex-row gap-2",
  "bottom-center": "absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex flex-row gap-2",
  "bottom-right": "absolute bottom-2 right-2 z-10 flex flex-row gap-2",
};

const BUTTON_BASE =
  "inline-flex items-center justify-center size-9 rounded-full border bg-white/90 border-zinc-200 hover:bg-white hover:border-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer";

export interface CarouselNavigationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  position?: CarouselButtonPosition;
}

export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  CarouselNavigationButtonProps
>(function CarouselPrevious(
  { className, position, children, ...props },
  ref,
) {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Previous slide"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      className={cn(
        BUTTON_BASE,
        position && BUTTON_POSITION[position],
        className,
      )}
      {...props}
    >
      {children ?? <ChevronLeftIcon className="size-4" strokeWidth={2.5} />}
    </button>
  );
});

CarouselPrevious.displayName = "CarouselPrevious";

export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  CarouselNavigationButtonProps
>(function CarouselNext(
  { className, position, children, ...props },
  ref,
) {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Next slide"
      disabled={!canScrollNext}
      onClick={scrollNext}
      className={cn(
        BUTTON_BASE,
        position && BUTTON_POSITION[position],
        className,
      )}
      {...props}
    >
      {children ?? <ChevronRightIcon className="size-4" strokeWidth={2.5} />}
    </button>
  );
});

CarouselNext.displayName = "CarouselNext";

export interface CarouselNavigationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  position?: CarouselButtonPosition;
}

export const CarouselNavigation = React.forwardRef<
  HTMLDivElement,
  CarouselNavigationProps
>(function CarouselNavigation(
  { className, position, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        position
          ? GROUP_POSITION[position]
          : "flex justify-center gap-2 mt-4",
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </div>
  );
});

CarouselNavigation.displayName = "CarouselNavigation";
