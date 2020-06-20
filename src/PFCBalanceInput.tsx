import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { PFCBalance } from "./types";
import { validationErrorMessage } from "./messages";

type Props = {
  onChange?: (value: PFCBalance) => void;
};

const nutrients: {
  key: keyof PFCBalance;
  label: string;
}[] = [
  {
    key: "proteinPct",
    label: "たんぱく質",
  },
  {
    key: "fatPct",
    label: "脂質",
  },
  {
    key: "carboPct",
    label: "炭水化物",
  },
];

const defaultPFCBalance: PFCBalance = {
  proteinPct: 30,
  fatPct: 20,
  carboPct: 50,
};

const validationFuncs: ((values: PFCBalance) => string | undefined)[] = [
  (values) => {
    for (let v of Object.values(values)) {
      if (!v) return validationErrorMessage.INVALID_NUMBER;
    }
  },
  (values) => {
    for (let v of Object.values(values)) {
      if (v < 0) return validationErrorMessage.INVALID_MINUS_VALUE;
    }
  },
  (values) => {
    const sum = Object.values(values).reduce<number>(
      (acc, cur) => acc + cur,
      0
    );
    if (sum !== 100) return validationErrorMessage.SUM_VALUE_IS_NOT_100;
  },
];

export default function PFCBalanceInput(props: Props) {
  const [values, setValues] = React.useState<PFCBalance>(defaultPFCBalance);
  const [validationError, setValidationError] = React.useState<string>("");

  const handleChange = (prop: keyof PFCBalance) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValues = {
      ...values,
      [prop]: event.target.valueAsNumber,
    };
    setValues(newValues);

    // Validate value
    for (let fn of validationFuncs) {
      const errMsg = fn(newValues);
      if (errMsg) {
        setValidationError(errMsg);
        return;
      }
    }
    setValidationError("");

    if (props.onChange) {
      props.onChange(newValues);
    }
  };

  const nutrientsInput = nutrients.map((nutrient) => {
    return (
      <TextField
        label={nutrient.label}
        size="small"
        type="number"
        variant="outlined"
        defaultValue={defaultPFCBalance[nutrient.key]}
        onChange={handleChange(nutrient.key)}
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
        error={Boolean(validationError)}
      />
    );
  });

  return (
    <div>
      <div>{nutrientsInput}</div>
      <div>{validationError}</div>
    </div>
  );
}
