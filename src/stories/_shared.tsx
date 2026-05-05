import * as React from "react";

export const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];
export const FOUR = [1, 2, 3, 4];
export const FIVE = [1, 2, 3, 4, 5];

export const HERO = [
  { num: 1, gradient: "bg-gradient-to-br from-rose-500 to-orange-500" },
  { num: 2, gradient: "bg-gradient-to-br from-sky-500 to-indigo-600" },
  { num: 3, gradient: "bg-gradient-to-br from-emerald-500 to-teal-600" },
  { num: 4, gradient: "bg-gradient-to-br from-fuchsia-500 to-purple-600" },
];

export const LOGOS = [
  "NIKE",
  "ADIDAS",
  "PUMA",
  "REEBOK",
  "ASICS",
  "FILA",
  "DIADORA",
  "KAPPA",
];

export const TESTIMONIALS = [
  {
    author: "Ayşe K.",
    text: "Çok hızlı ve sezgisel bir kullanım deneyimi sundu.",
  },
  {
    author: "Mehmet Y.",
    text: "Tasarım sade, performans mükemmel.",
  },
  {
    author: "Zeynep A.",
    text: "Tam aradığım çözüm. Kurulum dakikalar içinde tamamlandı.",
  },
  {
    author: "Can D.",
    text: "Müşteri desteği çok ilgili, ürün kalitesi beklentinin üstünde.",
  },
];

export function NumberSlide({
  num,
  height = "h-72",
  className = "",
}: {
  num: number;
  height?: string;
  className?: string;
}) {
  return (
    <div
      className={`${height} flex items-center justify-center rounded-3xl text-7xl font-semibold text-zinc-700 bg-zinc-100 ${className}`}
    >
      {num}
    </div>
  );
}

export function HeroSlide({
  num,
  gradient,
}: {
  num: number;
  gradient: string;
}) {
  return (
    <div
      className={`h-[420px] rounded-3xl ${gradient} flex items-center justify-center`}
    >
      <p className="text-white text-8xl font-bold">{num}</p>
    </div>
  );
}

export function StoryFrame({ children }: { children: React.ReactNode }) {
  return <div className="max-w-4xl mx-auto">{children}</div>;
}
