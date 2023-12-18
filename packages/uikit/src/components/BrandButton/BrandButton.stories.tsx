import type { Meta, StoryObj } from "@storybook/react";

import { BrandButton } from "./BrandButton";

const meta: Meta<typeof BrandButton> = {
  title: "Brand",
  component: BrandButton,
  id: "Brand",
};

export default meta;

type Story = StoryObj<typeof BrandButton>;

export const FirstStory: Story = {
  args: { children: "Hello", color: "red" },
};
