import React from "react";
import { NutrientsDetail } from "../src/components/NutrientsDetail";
import { Ingredient } from "../src/libs/calculator/calc";
import { rice, chicken, getExtraFood } from "../src/libs/calculator/foodsData";

export default {
  title: "NutrientsDetail",
  component: NutrientsDetail,
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

export const basicUsage = () => <NutrientsDetail ingredients={ingredients} />;
