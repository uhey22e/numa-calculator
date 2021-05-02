import React from "react";
import { IngredientsTable } from "../src/components/IngredientsTable";
import { Ingredient } from "../src/libs/calc";
import { rice, chicken, getExtraFood } from "../src/libs/foodsData";

export default {
  title: "IngredientsTable",
  component: IngredientsTable,
};

const ingredients: Ingredient[] = [
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
];

export const basicUsage = () => <IngredientsTable ingredients={ingredients} />;
