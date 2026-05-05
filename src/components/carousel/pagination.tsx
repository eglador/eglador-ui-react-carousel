"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { useCarousel } from "./context";
import type {
  CarouselPaginationPosition,
  CarouselPaginationType,
} from "./types";

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

const SCROLLBAR_POSITION = {
  top: "absolute top-3 left-3 right-3 h-1.5 z-10",
  bottom: "absolute bottom-3 left-3 right-3 h-1.5 z-10",
  left: "absolute left-3 top-3 bottom-3 w-1.5 z-10",
  right: "absolute right-3 top-3 bottom-3 w-1.5 z-10",
  "top-outside": "absolute bottom-full left-3 right-3 mb-3 h-1.5 z-10",
  "bottom-outside": "absolute top-full left-3 right-3 mt-3 h-1.5 z-10",
  "left-outside": "absolute right-full top-3 bottom-3 mr-3 w-1.5 z-10",
  "right-outside": "absolute left-full top-3 bottom-3 ml-3 w-1.5 z-10",
} as const;

type ScrollbarPositionKey = keyof typeof SCROLLBAR_POSITION;

function resolveScrollbarPosition(
  pos: CarouselPaginationPosition | undefined,
): ScrollbarPositionKey {
  if (!pos) return "bottom";
  // Corner positions fall back to nearest cardinal
  if (pos === "top-left" || pos === "top-right" || pos === "top") return "top";
  if (pos === "bottom-left" || pos === "bottom-right" || pos === "bottom")
    return "bottom";
  if (pos === "top-left-outside" || pos === "top-right-outside")
    return "top-outside";
  if (pos === "bottom-left-outside" || pos === "bottom-right-outside")
    return "bottom-outside";
  return pos as ScrollbarPositionKey;
}

const DOT_BASE =
  "size-2.5 rounded-full transition-all duration-300 cursor-pointer touch-manipulation";

export interface CarouselPaginationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  type?: CarouselPaginationType;
  position?: CarouselPaginationPosition;
  dotClassName?: string;
}

export const CarouselPagination = React.forwardRef<
  HTMLDivElement,
  CarouselPaginationProps
>(function CarouselPagination(
  { type = "dots", className, position, dotClassName, ...props },
  ref,
) {
  if (type === "scrollbar") {
    return (
      <ScrollbarPagination
        ref={ref}
        className={className}
        position={position}
        {...props}
      />
    );
  }

  const positionClass = position
    ? PAGINATION_POSITION[position]
    : "flex flex-row justify-center gap-2 mt-4";

  return (
    <div ref={ref} className={cn(positionClass, className)} {...props}>
      {type === "dots" && <DotsContent dotClassName={dotClassName} />}
      {type === "fraction" && <FractionContent />}
      {type === "numbers" && <NumbersContent dotClassName={dotClassName} />}
      {type === "dynamic" && <DynamicContent dotClassName={dotClassName} />}
    </div>
  );
});

CarouselPagination.displayName = "CarouselPagination";

// ─── Type-specific content ────────────────────

function DotsContent({ dotClassName }: { dotClassName?: string }) {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarousel();
  return (
    <>
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
    </>
  );
}

function FractionContent() {
  const { scrollSnaps, selectedIndex } = useCarousel();
  return (
    <span className="text-sm font-mono tabular-nums text-zinc-700">
      {selectedIndex + 1} / {scrollSnaps.length}
    </span>
  );
}

function NumbersContent({ dotClassName }: { dotClassName?: string }) {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarousel();
  return (
    <>
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
              "size-7 rounded-full text-xs font-semibold transition cursor-pointer touch-manipulation flex items-center justify-center",
              isSelected
                ? "bg-zinc-800 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200",
              dotClassName,
            )}
          >
            {i + 1}
          </button>
        );
      })}
    </>
  );
}

function DynamicContent({ dotClassName }: { dotClassName?: string }) {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarousel();
  const total = scrollSnaps.length;
  const windowSize = 5;

  const halfWindow = Math.floor(windowSize / 2);
  let start = selectedIndex - halfWindow;
  let end = selectedIndex + halfWindow;
  if (start < 0) {
    end -= start;
    start = 0;
  }
  if (end >= total) {
    start -= end - total + 1;
    end = total - 1;
  }
  start = Math.max(0, start);
  end = Math.min(total - 1, end);

  const visible: number[] = [];
  for (let i = start; i <= end; i++) visible.push(i);

  return (
    <>
      {visible.map((index) => {
        const distance = Math.abs(index - selectedIndex);
        const sizeRem =
          distance === 0 ? 0.625 : distance === 1 ? 0.5 : 0.375;
        const isSelected = index === selectedIndex;
        return (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={isSelected || undefined}
            onClick={() => scrollTo(index)}
            className={cn(
              "rounded-full transition-all duration-300 cursor-pointer touch-manipulation",
              isSelected ? "bg-zinc-800" : "bg-zinc-400",
              dotClassName,
            )}
            style={{ width: `${sizeRem}rem`, height: `${sizeRem}rem` }}
          />
        );
      })}
    </>
  );
}

// ─── Scrollbar (different render path) ────────

const ScrollbarPagination = React.forwardRef<
  HTMLDivElement,
  Omit<CarouselPaginationProps, "type" | "dotClassName">
>(function ScrollbarPagination({ className, position, ...props }, ref) {
  const { api } = useCarousel();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const update = () => {
      setProgress(Math.max(0, Math.min(1, api.scrollProgress())));
    };
    update();
    api.on("scroll", update);
    api.on("reInit", update);
    return () => {
      api.off("scroll", update);
      api.off("reInit", update);
    };
  }, [api]);

  const resolvedPos = resolveScrollbarPosition(position);
  const isVertical =
    resolvedPos === "left" ||
    resolvedPos === "right" ||
    resolvedPos === "left-outside" ||
    resolvedPos === "right-outside";

  return (
    <div
      ref={ref}
      className={cn(
        SCROLLBAR_POSITION[resolvedPos],
        "bg-zinc-200/60 rounded-full overflow-hidden",
        className,
      )}
      {...props}
    >
      <div
        className="bg-zinc-800"
        style={
          isVertical
            ? { height: `${progress * 100}%`, width: "100%" }
            : { width: `${progress * 100}%`, height: "100%" }
        }
      />
    </div>
  );
});

ScrollbarPagination.displayName = "ScrollbarPagination";
