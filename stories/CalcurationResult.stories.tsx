import React from "react";
import CalcurationResult from "../src/components/CalcurationResult";
import Ingredient from "../src/ingredient";

export default {
  title: "CalcurationResult",
  component: CalcurationResult,
};

const ingredients: Ingredient[] = [
  Ingredient.fromTargetCarbs("rice", "米", 187.5),
  Ingredient.fromTargetProtein("chicken", "皮無し鶏むね肉", 120),
  new Ingredient("proteinPowder", "プロテイン", 28),
  new Ingredient("egg", "鶏卵", 2, "個"),
  new Ingredient("milk", "牛乳", 200, "mL"),
];

export const basicUsage = () => <CalcurationResult ingredients={ingredients} />;
