import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Ingredient from "../ingredient";

type Props = {
  ingredients: Ingredient[];
};

export default function NutrientsDetail(props: Props) {
  const row = (name: string, gram: number, kcal: number) => {
    return (
      <TableRow>
        <TableCell align="left">{name}</TableCell>
        <TableCell align="right">{gram.toFixed(1)} g</TableCell>
        <TableCell align="right">{kcal.toFixed(1)} kcal</TableCell>
      </TableRow>
    );
  };
  const proteinRow = row(
    "たんぱく質",
    Ingredient.totalProteinGram(props.ingredients),
    Ingredient.totalProteinKcal(props.ingredients)
  );
  const fatRow = row(
    "脂質",
    Ingredient.totalFatGram(props.ingredients),
    Ingredient.totalFatKcal(props.ingredients)
  );
  const carbsRow = row(
    "炭水化物",
    Ingredient.totalCarbsGram(props.ingredients),
    Ingredient.totalCarbsKcal(props.ingredients)
  );

  return (
    <Table size="small">
      <TableBody>
        {proteinRow}
        {fatRow}
        {carbsRow}
      </TableBody>
    </Table>
  );
}
