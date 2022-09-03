import React from "react";
import { action } from "@storybook/addon-actions";
import PFCBalanceInput from "../components/PFCBalanceInput";

export default {
  title: "PFCBalanceInput",
  component: PFCBalanceInput,
};

export const basicUsage = () => (
  <PFCBalanceInput onChange={action("onChange")} />
);

export const withError = () => (
  <PFCBalanceInput
    defaultValue={{
      proteinPct: 20,
      fatPct: 5,
      carbsPct: 70,
    }}
  />
);
