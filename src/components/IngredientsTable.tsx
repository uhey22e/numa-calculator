import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {
  calcKcalsFromGrams,
  calcNetGrams,
  calcNetNutrients,
  Ingredient,
} from "../libs/calc";

interface IngredientsTableProps {
  ingredients: Ingredient[];
}

export const IngredientsTable: React.FunctionComponent<IngredientsTableProps> = ({
  ingredients,
}) => {
  const [isDetailView] = React.useState<boolean>(false);

  return (
    <Table size="small">
      <TableBody>
        {ingredients.map((ingredient) => (
          <IngredientRow
            key={ingredient.food.id}
            ingredient={ingredient}
            detailView={isDetailView}
          />
        ))}
        <TableRow key="omomuro">
          <TableCell align="left">その他</TableCell>
          <TableCell align="right">おもむろ</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

interface RowProps {
  ingredient: Ingredient;
  detailView?: boolean;
}
const IngredientRow = ({ ingredient, detailView = false }: RowProps) => {
  const n = calcNetNutrients(ingredient);
  const kcals = calcKcalsFromGrams(n);
  return (
    <TableRow>
      <TableCell align="left">{ingredient.food.shortName}</TableCell>
      <TableCell align="right">{printQuantity(ingredient)}</TableCell>
      {detailView && (
        <>
          <TableCell align="right">{kcals.toFixed(1)} kcal</TableCell>
          <TableCell align="right">{n.protein.toFixed(1)} g</TableCell>
          <TableCell align="right">{n.fat.toFixed(1)} g</TableCell>
          <TableCell align="right">{n.carbs.toFixed(1)} g</TableCell>
        </>
      )}
    </TableRow>
  );
};

const printQuantity = (ingredient: Ingredient) => {
  const netGrams = calcNetGrams(ingredient);
  const { unitName, quantity } = ingredient;
  if (!!unitName && unitName !== "g") {
    return `${quantity} ${unitName} (${netGrams.toFixed(1)} g)`;
  }
  return `${netGrams.toFixed(1)} g`;
};
