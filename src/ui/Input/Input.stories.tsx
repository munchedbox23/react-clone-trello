import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import "../../index.css";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      type: "string" || "number",
      description: "Тип input",
      defaultValue: "text",
      options: ["text", "password", "email"],
    },
    variant: {
      type: "string",
      description: "Вариант внешнего вида input",
      defaultValue: "rectangular",
      options: ["rounded", "rectangular"],
      control: {
        type: "radio",
      },
    },
  },
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

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Number",
    variant: "rounded",
  },
};

export const Date: Story = {
  args: {
    type: "date",
    placeholder: "Date",
    variant: "rounded",
  },
};
