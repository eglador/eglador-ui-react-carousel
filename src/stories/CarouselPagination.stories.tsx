import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPagination,
  type CarouselPaginationPosition,
  type CarouselPaginationType,
} from "../components/carousel";
import { FOUR, NumberSlide } from "./_shared";

const ALL_POSITIONS: CarouselPaginationPosition[] = [
  "top",
  "bottom",
  "left",
  "right",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
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
  type: CarouselPaginationType;
  position: CarouselPaginationPosition;
  outsidePadding: boolean;
  isDark: boolean;
  loop: boolean;
};

function PaginationDemo({
  type,
  position,
  outsidePadding,
  isDark,
  loop,
}: StoryArgs) {
  const carousel = (
    <Carousel opts={{ loop }}>
      <CarouselContent>
        {FOUR.map((n) => (
          <CarouselItem key={n}>
            <NumberSlide num={n} height="h-56" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPagination
        type={type}
        position={position}
        dotClassName={
          isDark ? "bg-white/60 [&[aria-current=true]]:bg-white" : ""
        }
      />
    </Carousel>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-xs font-mono text-zinc-500 mb-3">
        position=&quot;{position}&quot;
      </p>
      {outsidePadding ? (
        <div className="px-12 py-12 border border-dashed border-zinc-200 rounded-lg">
          {carousel}
        </div>
      ) : (
        carousel
      )}
    </div>
  );
}

const meta: Meta<StoryArgs> = {
  title: "Carousel/Pagination",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "16 positions: 4 center overlay + 4 corner overlay + 4 center outside + 4 corner outside. Outside positions sit beyond the Carousel itself; the outer container needs horizontal padding to keep them from being clipped (toggle `outsidePadding`).",
      },
    },
  },
  args: {
    type: "dots",
    position: "bottom",
    outsidePadding: false,
    isDark: false,
    loop: true,
  },
  argTypes: {
    type: {
      control: "select",
      options: ["dots", "fraction", "numbers", "dynamic", "scrollbar"],
      description: "Pagination type (dots, fraction, numbers, dynamic, scrollbar)",
    },
    position: {
      control: "select",
      options: ALL_POSITIONS,
      description: "One of 16 positions",
    },
    outsidePadding: {
      control: "boolean",
      description: "Add horizontal padding to the outer container (px-12 py-12)",
    },
    isDark: {
      control: "boolean",
      description: "Switch the dot color to white for overlay backgrounds",
    },
    loop: { control: "boolean" },
  },
  render: (args) => <PaginationDemo {...args} />,
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {};
