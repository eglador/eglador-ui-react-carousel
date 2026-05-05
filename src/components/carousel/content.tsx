"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { useCarousel } from "./context";

export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CarouselContent({ className, style, ...props }, ref) {
  const { carouselRef, orientation, spaceBetween, autoHeight } = useCarousel();

  const containerStyle = React.useMemo<React.CSSProperties | undefined>(() => {
    if (spaceBetween <= 0) return style;
    return orientation === "horizontal"
      ? { marginLeft: `-${spaceBetween}px`, ...style }
      : { marginTop: `-${spaceBetween}px`, ...style };
  }, [spaceBetween, orientation, style]);

  return (
    <div
      ref={carouselRef}
      className={cn(
        "overflow-hidden",
        autoHeight && "transition-[height] duration-200",
      )}
    >
      <div
        ref={ref}
        style={containerStyle}
        className={cn(
          "flex",
          orientation === "horizontal"
            ? "touch-pan-y touch-pinch-zoom"
            : "flex-col",
          autoHeight && "items-start",
          className,
        )}
        {...props}
      />
    </div>
  );
});

CarouselContent.displayName = "CarouselContent";
