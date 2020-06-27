import React from "react";
import { action } from "@storybook/addon-actions";
import PFCBalanceInput from "../src/components/PFCBalanceInput";

export default {
  title: "PFCBalanceInput",
  component: PFCBalanceInput,
};

export const basicUsage = () => (
  <PFCBalanceInput onChange={action("onChange")} />
);
