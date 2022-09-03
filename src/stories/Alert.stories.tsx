import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Alert } from "../components/Alert";

export default {
  title: "Alert",
  component: Alert,
} as ComponentMeta<typeof Alert>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Warning = Template.bind({});
Warning.args = {
  severity: "warning",
  children: "適当なメッセージ",
};

export const Error = Template.bind({});
Error.args = {
  severity: "error",
  children: "適当なメッセージ",
};
