import React from "react";
import { action } from "@storybook/addon-actions";
import AdditionalFoodInput from "../AdditionalFoodInput";

export default {
  title: "AdditionalFoodInput",
  component: AdditionalFoodInput,
};

export const basicUsage = () => (
  <AdditionalFoodInput
    title="卵を食べる"
    foodName="卵"
    foodKey="egg"
    unitName="個"
    onChange={action("onChange")}
  />
);

export const multiple = () => (
  <>
    <AdditionalFoodInput
      title="卵を食べる"
      foodName="卵"
      foodKey="egg"
      unitName="個"
      onChange={action("onChangeEgg")}
    />
    <AdditionalFoodInput
      title="牛乳を飲む"
      foodName="牛乳"
      foodKey="milk"
      unitName="mL"
      onChange={action("onChangeMilk")}
    />
  </>
);
