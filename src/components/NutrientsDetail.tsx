import React from "react";
import { sumUpNutrients, Ingredient } from "../libs/calculator/calc";

interface RowProps {
  name: string;
  gram: number;
  kcal: number;
}

function Row({ name, gram, kcal }: RowProps) {
  return (
    <tr className="border-b">
      <td className="px-4 py-2 text-left">{name}</td>
      <td className="px-4 py-2 text-right">{gram.toFixed(1)} g</td>
      <td className="px-4 py-2 text-right">{kcal.toFixed(1)} kcal</td>
    </tr>
  );
}

export type NutrientsDetailProps = {
  ingredients: Ingredient[];
};

export function NutrientsDetail({ ingredients }: NutrientsDetailProps) {
  const { protein, fat, carbs } = sumUpNutrients(ingredients);

  return (
    <table className="w-full text-sm">
      <tbody>
        <Row name="たんぱく質" gram={protein} kcal={4 * protein} />
        <Row name="脂質" gram={fat} kcal={9 * fat} />
        <Row name="炭水化物" gram={carbs} kcal={4 * carbs} />
      </tbody>
    </table>
  );
}
