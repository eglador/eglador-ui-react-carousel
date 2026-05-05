"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { useCarousel } from "./context";

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CarouselItem({ className, style, ...props }, ref) {
  const { resolvedSlidesPerView } = useCarousel();

  const itemStyle = React.useMemo<React.CSSProperties | undefined>(() => {
    if (typeof resolvedSlidesPerView === "number") {
      return {
        flex: `0 0 ${100 / resolvedSlidesPerView}%`,
        minWidth: 0,
        ...style,
      };
    }
    return style;
  }, [resolvedSlidesPerView, style]);

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
