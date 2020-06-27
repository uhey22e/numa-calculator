import React from "react";
import { action } from "@storybook/addon-actions";
import TargetCalorieInput from "../src/components/TargetCalorieInput";

export default {
  title: "TargetCalorieInput",
  component: TargetCalorieInput,
};

export const basicUsage = () => (
  <TargetCalorieInput
    onChange={action("onChange")}
    onError={action("onError")}
  />
);
