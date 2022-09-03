import React from "react";
import { IngredientsTable } from "../components/IngredientsTable";
import { Ingredient } from "../libs/calculator/calc";
import { rice, chicken, getExtraFood } from "../libs/calculator/foodsData";

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
