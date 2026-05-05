"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { useCarousel } from "./context";
import type { CarouselOverlayPosition } from "./types";

const POSITION_CLASSES: Record<CarouselOverlayPosition, string> = {
  top: "absolute top-3 left-1/2 -translate-x-1/2 z-10",
  bottom: "absolute bottom-3 left-1/2 -translate-x-1/2 z-10",
  left: "absolute left-3 top-1/2 -translate-y-1/2 z-10",
  right: "absolute right-3 top-1/2 -translate-y-1/2 z-10",
  "top-left": "absolute top-3 left-3 z-10",
  "top-right": "absolute top-3 right-3 z-10",
  "bottom-left": "absolute bottom-3 left-3 z-10",
  "bottom-right": "absolute bottom-3 right-3 z-10",
};

type AutoplayPluginShape = {
  timeUntilNext: () => number | null;
  options: { delay?: number };
};

export interface CarouselAutoplayProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  position?: CarouselOverlayPosition;
  size?: number;
  strokeWidth?: number;
  showCountdown?: boolean;
}

export const CarouselAutoplayProgress = React.forwardRef<
  HTMLDivElement,
  CarouselAutoplayProgressProps
>(function CarouselAutoplayProgress(
  {
    className,
    position,
    size = 48,
    strokeWidth = 3,
    showCountdown = true,
    style,
    ...props
  },
  ref,
) {
  const { api } = useCarousel();
  const [progress, setProgress] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;
    const plugins = api.plugins() as unknown as Record<
      string,
      AutoplayPluginShape | undefined
    >;
    const autoplay = plugins.autoplay;
    if (!autoplay) return;

    let rafId = 0;
    const tick = () => {
      const remaining = autoplay.timeUntilNext();
      const delay = autoplay.options?.delay;
      if (remaining !== null && remaining !== undefined && delay) {
        const elapsed = delay - remaining;
        setProgress(Math.max(0, Math.min(1, elapsed / delay)));
        setSeconds(Math.ceil(remaining / 1000));
        setActive(true);
      } else {
        setActive(false);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [api]);

  if (!active) return null;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  const offset = circumference * (1 - progress);

  return (
    <div
      ref={ref}
      className={cn(
        position
          ? POSITION_CLASSES[position]
          : "relative mt-4 mx-auto",
        "text-zinc-800",
        className,
      )}
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      {showCountdown && (
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold tabular-nums">
          {seconds}
        </span>
      )}
    </div>
  );
});

CarouselAutoplayProgress.displayName = "CarouselAutoplayProgress";
