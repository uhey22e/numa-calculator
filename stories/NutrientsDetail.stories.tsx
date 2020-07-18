import React from "react";
import NutrientsDetail from "../src/components/NutrientsDetail";
import Ingredient from "../src/libs/ingredient";

export default {
  title: "NutrientsDetail",
  component: NutrientsDetail,
};

const ingredients: Ingredient[] = [
  Ingredient.fromTargetCarbsGram("rice", "米", 187.5),
  Ingredient.fromTargetProteinGram("chicken", "皮無し鶏むね肉", 120),
  new Ingredient("proteinPowder", "プロテイン", 28),
  new Ingredient("egg", "鶏卵", 2, "個"),
  new Ingredient("milk", "牛乳", 200, "mL"),
];

export const basicUsage = () => <NutrientsDetail ingredients={ingredients} />;
