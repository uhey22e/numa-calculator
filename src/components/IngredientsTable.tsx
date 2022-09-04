import React from "react";
import { calcNetGrams, Ingredient } from "../libs/calculator/calc";

const printQuantity = (ingredient: Ingredient) => {
  const netGrams = calcNetGrams(ingredient);
  const { unitName, quantity } = ingredient;
  if (!!unitName && unitName !== "g") {
    return `${quantity} ${unitName} (${netGrams.toFixed(1)} g)`;
  }
  return `${netGrams.toFixed(1)} g`;
};

interface RowProps {
  ingredient: Ingredient;
}

function IngredientRow({ ingredient }: RowProps) {
  return (
    <tr className="border-b">
      <td className="py-2 px-4 text-left">{ingredient.food.shortName}</td>
      <td className="py-2 px-4 text-right">{printQuantity(ingredient)}</td>
    </tr>
  );
}

export interface IngredientsTableProps {
  ingredients: Ingredient[];
}

export function IngredientsTable({ ingredients }: IngredientsTableProps) {
  return (
    <table className="w-full text-sm">
      <tbody>
        {ingredients.map((ingredient) => (
          <IngredientRow key={ingredient.food.id} ingredient={ingredient} />
        ))}
      </tbody>
    </table>
  );
}
