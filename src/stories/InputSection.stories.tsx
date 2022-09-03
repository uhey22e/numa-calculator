import { ComponentStory, ComponentMeta } from "@storybook/react";
import { InputSection } from "../components/InputSection";

export default {
  title: "InputSection",
  component: InputSection,
} as ComponentMeta<typeof InputSection>;

export const Default: ComponentStory<typeof InputSection> = (args) => (
  <InputSection title="1日の目標摂取カロリーを入力" />
);
