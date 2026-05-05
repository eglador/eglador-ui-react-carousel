"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { useCarousel } from "./context";
import type { CarouselPaginationPosition } from "./types";

const PAGINATION_POSITION: Record<CarouselPaginationPosition, string> = {
  // Center overlay
  top: "absolute top-3 left-1/2 -translate-x-1/2 z-10 flex flex-row gap-2",
  bottom: "absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex flex-row gap-2",
  left: "absolute left-3 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2",
  right: "absolute right-3 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2",

  // Corner overlay
  "top-left": "absolute top-3 left-3 z-10 flex flex-row gap-2",
  "top-right": "absolute top-3 right-3 z-10 flex flex-row gap-2",
  "bottom-left": "absolute bottom-3 left-3 z-10 flex flex-row gap-2",
  "bottom-right": "absolute bottom-3 right-3 z-10 flex flex-row gap-2",

  // Center outside
  "top-outside":
    "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-10 flex flex-row gap-2",
  "bottom-outside":
    "absolute top-full left-1/2 -translate-x-1/2 mt-3 z-10 flex flex-row gap-2",
  "left-outside":
    "absolute right-full top-1/2 -translate-y-1/2 mr-3 z-10 flex flex-col gap-2",
  "right-outside":
    "absolute left-full top-1/2 -translate-y-1/2 ml-3 z-10 flex flex-col gap-2",

  // Corner outside
  "top-left-outside":
    "absolute bottom-full left-0 mb-3 z-10 flex flex-row gap-2",
  "top-right-outside":
    "absolute bottom-full right-0 mb-3 z-10 flex flex-row gap-2",
  "bottom-left-outside":
    "absolute top-full left-0 mt-3 z-10 flex flex-row gap-2",
  "bottom-right-outside":
    "absolute top-full right-0 mt-3 z-10 flex flex-row gap-2",
};

const DOT_BASE =
  "size-2.5 rounded-full transition-all duration-300 cursor-pointer touch-manipulation";

export interface CarouselPaginationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  position?: CarouselPaginationPosition;
  dotClassName?: string;
}

export const CarouselPagination = React.forwardRef<
  HTMLDivElement,
  CarouselPaginationProps
>(function CarouselPagination(
  { className, position, dotClassName, ...props },
  ref,
) {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarousel();

  return (
    <div
      ref={ref}
      className={cn(
        position
          ? PAGINATION_POSITION[position]
          : "flex flex-row justify-center gap-2 mt-4",
        className,
      )}
      {...props}
    >
      {scrollSnaps.map((_, i) => {
        const isSelected = i === selectedIndex;
        return (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={isSelected || undefined}
            onClick={() => scrollTo(i)}
            className={cn(
              DOT_BASE,
              isSelected
                ? "bg-zinc-800 scale-110"
                : "bg-zinc-300 hover:bg-zinc-400",
              dotClassName,
            )}
          />
        );
      })}
    </div>
  );
});

CarouselPagination.displayName = "CarouselPagination";
