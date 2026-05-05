import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselNavigation,
  type CarouselButtonPosition,
} from "../components/carousel";
import { FOUR, NumberSlide, StoryFrame } from "./_shared";

const ALL_POSITIONS: CarouselButtonPosition[] = [
  // Overlay
  "top-left",
  "top-center",
  "top-right",
  "center-left",
  "center-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
  // Outside
  "top-outside",
  "bottom-outside",
  "left-outside",
  "right-outside",
  "top-left-outside",
  "top-right-outside",
  "bottom-left-outside",
  "bottom-right-outside",
];

type StoryArgs = {
  showGroup: boolean;
  groupPosition: CarouselButtonPosition;
  prevPosition: CarouselButtonPosition;
  nextPosition: CarouselButtonPosition;
  outsidePadding: boolean;
  loop: boolean;
};

const meta: Meta<StoryArgs> = {
  title: "Carousel/Navigation Positions",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Prev/Next butonları için 8 pozisyon. İki kullanım: bireysel (`<CarouselPrevious position=...>` + `<CarouselNext position=...>`) veya grup (`<CarouselNavigation position=...>` Prev+Next bir arada). `showGroup` toggle'ı ile aralarında geç.",
      },
    },
  },
  args: {
    showGroup: true,
    groupPosition: "bottom-right",
    prevPosition: "center-left",
    nextPosition: "center-right",
    outsidePadding: false,
    loop: true,
  },
  argTypes: {
    showGroup: {
      control: "boolean",
      description: "CarouselNavigation grup wrapper'ı (true) vs bireysel (false)",
    },
    groupPosition: {
      control: "select",
      options: ALL_POSITIONS,
      description: "Grup pozisyonu (showGroup=true)",
      if: { arg: "showGroup", truthy: true },
    },
    prevPosition: {
      control: "select",
      options: ALL_POSITIONS,
      description: "Bireysel Prev pozisyonu (showGroup=false)",
      if: { arg: "showGroup", truthy: false },
    },
    nextPosition: {
      control: "select",
      options: ALL_POSITIONS,
      description: "Bireysel Next pozisyonu (showGroup=false)",
      if: { arg: "showGroup", truthy: false },
    },
    outsidePadding: {
      control: "boolean",
      description:
        "Outside pozisyonların görünmesi için dış container'a padding ekle",
    },
    loop: { control: "boolean" },
  },
  render: (args) => {
    const carousel = (
      <Carousel opts={{ loop: args.loop, slidesPerView: 3 }}>
        <CarouselContent>
          {FOUR.map((n) => (
            <CarouselItem key={n} className="px-2">
              <NumberSlide num={n} height="h-56" />
            </CarouselItem>
          ))}
        </CarouselContent>
        {args.showGroup ? (
          <CarouselNavigation position={args.groupPosition} />
        ) : (
          <>
            <CarouselPrevious position={args.prevPosition} />
            <CarouselNext position={args.nextPosition} />
          </>
        )}
      </Carousel>
    );
    return (
      <StoryFrame>
        {args.outsidePadding ? (
          <div className="px-14 py-14 border border-dashed border-zinc-200 rounded-lg">
            {carousel}
          </div>
        ) : (
          carousel
        )}
      </StoryFrame>
    );
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {};
