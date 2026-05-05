"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { useCarousel } from "./context";

export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CarouselContent({ className, ...props }, ref) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal"
            ? "touch-pan-y touch-pinch-zoom"
            : "flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
});

CarouselContent.displayName = "CarouselContent";
