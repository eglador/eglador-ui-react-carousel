"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { useCarousel } from "./context";

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CarouselItem({ className, style, ...props }, ref) {
  const { resolvedSlidesPerView, orientation, spaceBetween } = useCarousel();

  const itemStyle = React.useMemo<React.CSSProperties | undefined>(() => {
    const spacing =
      spaceBetween > 0
        ? orientation === "horizontal"
          ? { paddingLeft: `${spaceBetween}px` }
          : { paddingTop: `${spaceBetween}px` }
        : undefined;

    if (typeof resolvedSlidesPerView === "number") {
      return {
        flex: `0 0 ${100 / resolvedSlidesPerView}%`,
        minWidth: 0,
        ...spacing,
        ...style,
      };
    }
    return { ...spacing, ...style };
  }, [resolvedSlidesPerView, orientation, spaceBetween, style]);

  const sizingClass =
    typeof resolvedSlidesPerView === "number" || resolvedSlidesPerView === "auto"
      ? ""
      : "basis-full";

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      style={itemStyle}
      className={cn("min-w-0 shrink-0 grow-0 relative", sizingClass, className)}
      {...props}
    />
  );
});

CarouselItem.displayName = "CarouselItem";
