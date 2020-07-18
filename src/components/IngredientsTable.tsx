import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Ingredient from "../libs/ingredient";

type Props = {
  ingredients: Ingredient[];
};

export default function IngredientsTable(props: Props) {
  const [isDetailView, setIsDetailView] = React.useState<boolean>(false);

  const basicCols = (row: Ingredient) => {
    return (
      <>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="right">{printQuantity(row)}</TableCell>
      </>
    );
  };

  const detailCols = (row: Ingredient) => {
    if (isDetailView) {
      return (
        <>
          <TableCell align="right">{row.netKcal.toFixed(1)} kcal</TableCell>
          <TableCell align="right">{row.proteinGram.toFixed(1)} g</TableCell>
          <TableCell align="right">{row.fatGram.toFixed(1)} g</TableCell>
          <TableCell align="right">{row.carbsGram.toFixed(1)} g</TableCell>
        </>
      );
    }
  };

  const printQuantity = (food: Ingredient) => {
    if (food.unitName !== "g") {
      return `${food.quantity} ${food.unitName} (${food.netGram.toFixed(1)} g)`;
    }
    return `${food.netGram.toFixed(1)} g`;
  };

  return (
    <>
      <Table size="small">
        <TableBody>
          {props.ingredients.map((row) => (
            <TableRow key={row.name}>
              {basicCols(row)}
              {detailCols(row)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
