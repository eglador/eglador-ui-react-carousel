import * as React from "react";

// ── Shared Icon Props ───────────────────────

export interface IconProps {
  className?: string;
  strokeWidth?: number;
}

// ── Helper ──────────────────────────────────

function icon(
  displayName: string,
  defaultStrokeWidth: number,
  children: React.ReactNode,
  fill: string = "none",
) {
  const Icon = React.memo(({ className, strokeWidth = defaultStrokeWidth }: IconProps) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  ));
  Icon.displayName = displayName;
  return Icon;
}

// ── Chevrons ────────────────────────────────

export const ChevronDownIcon = icon("ChevronDownIcon", 2, <path d="m6 9 6 6 6-6" />);
export const ChevronUpIcon = icon("ChevronUpIcon", 2, <path d="m18 15-6-6-6 6" />);
export const ChevronLeftIcon = icon("ChevronLeftIcon", 2, <path d="m15 18-6-6 6-6" />);
export const ChevronRightIcon = icon("ChevronRightIcon", 2, <path d="m9 18 6-6-6-6" />);
export const ChevronsLeftIcon = icon("ChevronsLeftIcon", 2, <><path d="m11 17-5-5 5-5" /><path d="m18 17-5-5 5-5" /></>);
export const ChevronsRightIcon = icon("ChevronsRightIcon", 2, <><path d="m6 17 5-5-5-5" /><path d="m13 17 5-5-5-5" /></>);
export const ChevronsUpDownIcon = icon("ChevronsUpDownIcon", 2, <><path d="m7 15 5 5 5-5" /><path d="m7 9 5-5 5 5" /></>);