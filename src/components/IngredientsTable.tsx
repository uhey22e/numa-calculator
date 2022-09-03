import React from "react";
import { calcNetGrams, Ingredient } from "../libs/calculator/calc";

interface IngredientsTableProps {
  ingredients: Ingredient[];
}

export const IngredientsTable: React.FunctionComponent<IngredientsTableProps> = ({
  ingredients,
}) => {
  return (
    <table className="w-full text-sm">
      <tbody>
        {ingredients.map((ingredient) => (
          <IngredientRow key={ingredient.food.id} ingredient={ingredient} />
        ))}
      </tbody>
    </table>
  );
};

interface RowProps {
  ingredient: Ingredient;
}

function IngredientRow({ ingredient }: RowProps) {
  return (
    <tr className="border-b">
      <td align="left" className="py-2 px-4">
        {ingredient.food.shortName}
      </td>
      <td align="right" className="py-2 px-4">
        {printQuantity(ingredient)}
      </td>
    </tr>
  );
}

const printQuantity = (ingredient: Ingredient) => {
  const netGrams = calcNetGrams(ingredient);
  const { unitName, quantity } = ingredient;
  if (!!unitName && unitName !== "g") {
    return `${quantity} ${unitName} (${netGrams.toFixed(1)} g)`;
  }
  return `${netGrams.toFixed(1)} g`;
};
