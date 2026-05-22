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
  title: "Carousel/Navigation",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "8 positions for the Prev/Next buttons. Two usage modes: individual (`<CarouselPrevious position=...>` + `<CarouselNext position=...>`) or grouped (`<CarouselNavigation position=...>` with Prev+Next together). Toggle between them via `showGroup`.",
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
      description: "Grouped CarouselNavigation wrapper (true) vs individual buttons (false)",
    },
    groupPosition: {
      control: "select",
      options: ALL_POSITIONS,
      description: "Group position (when showGroup=true)",
      if: { arg: "showGroup", truthy: true },
    },
    prevPosition: {
      control: "select",
      options: ALL_POSITIONS,
      description: "Individual Prev position (when showGroup=false)",
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
        "Add padding to the outer container so outside positions are visible",
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
