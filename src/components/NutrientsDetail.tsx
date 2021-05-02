import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { sumUpNutrients, Ingredient } from "../libs/calculator/calc";

type NutrientsDetailProps = {
  ingredients: Ingredient[];
};

export const NutrientsDetail = ({ ingredients }: NutrientsDetailProps) => {
  const { protein, fat, carbs } = sumUpNutrients(ingredients);

  return (
    <Table size="small">
      <TableBody>
        <Row name="たんぱく質" gram={protein} kcal={4 * protein} />
        <Row name="脂質" gram={fat} kcal={9 * fat} />
        <Row name="炭水化物" gram={carbs} kcal={4 * carbs} />
      </TableBody>
    </Table>
  );
};

interface RowProps {
  name: string;
  gram: number;
  kcal: number;
}
const Row = ({ name, gram, kcal }: RowProps) => {
  return (
    <TableRow>
      <TableCell align="left">{name}</TableCell>
      <TableCell align="right">{gram.toFixed(1)} g</TableCell>
      <TableCell align="right">{kcal.toFixed(1)} kcal</TableCell>
    </TableRow>
  );
};
