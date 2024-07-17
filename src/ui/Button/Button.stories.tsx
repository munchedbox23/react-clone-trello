import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import "../../index.css";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      type: "string",
      description: "Текст кнопки",
    },
    type: {
      type: "string",
      description: "Назначение кнопки",
      defaultValue: "button",
      options: ["button", "submit", "reset"],
    },
    variant: {
      type: "string",
      description: "Вариант оформления обрамления кнопки",
      defaultValue: "solid",
      options: ["solid", "ghost", "outline"],
      control: {
        type: "inline-radio",
      },
    },
    size: {
      type: "string",
      description: "Варианты размера кнопки",
      defaultValue: "md",
      options: ["sm", "md", "lg"],
      control: {
        type: "radio",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: "button",
    label: "Click me",
    variant: "solid",
  },
};

export const Secondary: Story = {
  args: {
    type: "button",
    label: "Click me",
    variant: "outline",
    colorscheme: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    type: "button",
    label: "Click me",
    variant: "ghost",
    colorscheme: "secondary",
  },
};
