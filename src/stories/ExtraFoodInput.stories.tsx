import React from "react";
import { action } from "@storybook/addon-actions";
import { ExtraFoodInput } from "../components/ExtraFoodInput";

export default {
  title: "ExtraFoodInput",
  component: ExtraFoodInput,
};

export const basicUsage = () => (
  <ExtraFoodInput
    ingredient={{
      quantity: 10,
      food: {
        id: "oil",
        shortName: "油",
        detailName: "油",
        unitGram: 1,
        protein: 0,
        fat: 1,
        carbs: 0,
        availableUnits: [],
      },
    }}
    onChange={action("onChange")}
  />
);
