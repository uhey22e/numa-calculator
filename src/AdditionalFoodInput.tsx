import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Ingredient from "./ingredient";
import { validationErrorMessage } from "./messages";

type Props = {
  title: string;
  foodName: string;
  foodKey: string;
  unitName: string;
  onChange: (food: Ingredient | void) => void;
};

type ValidationFunc<T> = (value: T) => string | void;

const validationFuncs: ValidationFunc<number>[] = [
  (calorie) => {
    if (isNaN(calorie)) {
      return validationErrorMessage.INVALID_NUMBER;
    }
  },
  (calorie) => {
    if (calorie < 0) {
      return validationErrorMessage.INVALID_MINUS_VALUE;
    }
  },
];

export default function AdditionalFoodInput(props: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      // empty input
      props.onChange();
      return;
    }

    // Validate value
    for (let fn of validationFuncs) {
      const errMsg = fn(event.target.valueAsNumber);
      if (errMsg) {
        return;
      }
    }

    const newFood = new Ingredient(
      props.foodKey,
      props.foodName,
      event.target.valueAsNumber,
      props.unitName
    );
    props.onChange(newFood);
  };
  return (
    <div>
      <div>{props.title}</div>
      <TextField
        // label={props.foodName}
        size="small"
        type="number"
        variant="outlined"
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{props.unitName}</InputAdornment>
          ),
        }}
      />
    </div>
  );
}
