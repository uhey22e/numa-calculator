import { ComponentMeta } from "@storybook/react";
import React from "react";
import { Logo } from "../components/Logo";

export default {
  title: "Logo",
  component: Logo,
} as ComponentMeta<typeof Logo>;

export function Default() {
  return <Logo />
}
