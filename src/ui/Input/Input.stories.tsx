import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    type: "text",
    placeholder: "Insert text here",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Password",
  },
};
