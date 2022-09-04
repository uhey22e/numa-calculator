import React, { useCallback } from "react";
import { Ingredient } from "../libs/calculator/calc";

export interface ExtraFoodInputProps {
  ingredient: Ingredient;
  onChange: (ingredient: Ingredient) => void;
}

export function ExtraFoodInput({ ingredient, onChange }: ExtraFoodInputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      if (v && Number(v) > 0) {
        onChange({
          ...ingredient,
          quantity: Number(v),
        });
      } else {
        onChange({
          ...ingredient,
          quantity: 0,
        });
      }
    },
    [ingredient, onChange]
  );

  return (
    <div className="flex flex-row items-center mb-2">
      <div className="basis-32">
        <div>{ingredient.food.shortName}</div>
      </div>
      <div className="flex-grow">
        <div className="relative">
          <input
            type="number"
            className="block p-2 pr-10 w-full rounded-md border border-gray-300 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            onChange={handleChange}
          />
          <div className="flex items-center absolute inset-y-0 right-4 pointer-events-none text-gray-500">
            {ingredient.unitName ?? "g"}
          </div>
        </div>
      </div>
    </div>
  );
}
