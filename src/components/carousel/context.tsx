"use client";

import * as React from "react";
import type { CarouselContextValue } from "./types";

export const CarouselContext = React.createContext<CarouselContextValue | null>(null);

export function useCarousel(): CarouselContextValue {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) {
    throw new Error("useCarousel must be used within a <Carousel /> component.");
  }
  return ctx;
}
