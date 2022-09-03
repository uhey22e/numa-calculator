import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { IngredientsTable } from "../components/IngredientsTable";
import { rice, chicken, getExtraFood } from "../libs/calculator/foodsData";

export default {
  title: "IngredientsTable",
  component: IngredientsTable,
} as ComponentMeta<typeof IngredientsTable>;

const Template: ComponentStory<typeof IngredientsTable> = (args) => (
  <IngredientsTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ingredients: [
    {
      food: { ...rice },
      quantity: 100,
    },
    {
      food: { ...chicken },
      quantity: 200,
    },
    {
      food: getExtraFood("milk"),
      quantity: 200,
    },
  ],
};
