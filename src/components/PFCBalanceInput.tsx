import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { PFCBalance } from "../types";
import { validationErrorMessage } from "../messages";
import Alert from "@material-ui/lab/Alert";

type Props = {
  onChange?: (value: PFCBalance) => void;
  defaultValue?: PFCBalance;
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
    key: "carbsPct",
    label: "炭水化物",
  },
];

const defaultPFCBalance: PFCBalance = {
  proteinPct: 30,
  fatPct: 20,
  carbsPct: 50,
};

const validationFuncs: ((value: PFCBalance) => string | undefined)[] = [
  (value) => {
    for (let v of Object.values(value)) {
      if (!v) return validationErrorMessage.INVALID_NUMBER;
    }
  },
  (value) => {
    for (let v of Object.values(value)) {
      if (v < 0) return validationErrorMessage.INVALID_MINUS_VALUE;
    }
  },
  (value) => {
    const sum = Object.values(value).reduce<number>((acc, cur) => acc + cur, 0);
    if (sum !== 100) return validationErrorMessage.SUM_VALUE_IS_NOT_100;
  },
];

const getValidationMessage = (value: PFCBalance) => {
  for (let fn of validationFuncs) {
    const errMsg = fn(value);
    if (errMsg) {
      return errMsg;
    }
  }
  return "";
};

export default function PFCBalanceInput({
  onChange,
  defaultValue = defaultPFCBalance,
}: Props) {
  const [values, setValues] = React.useState<PFCBalance>(defaultValue);
  const [validationError, setValidationError] = React.useState<string>(
    getValidationMessage(values)
  );

  const handleChange = (prop: keyof PFCBalance) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValues = {
      ...values,
      [prop]: event.target.valueAsNumber,
    };
    setValues(newValues);

    // Validate value
    setValidationError(getValidationMessage(newValues));

    if (onChange) {
      onChange(newValues);
    }
  };

  const nutrientsInput = nutrients.map((nutrient) => {
    return (
      <TextField
        key={nutrient.key}
        label={nutrient.label}
        size="small"
        type="number"
        variant="outlined"
        defaultValue={defaultValue[nutrient.key]}
        onChange={handleChange(nutrient.key)}
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
        error={Boolean(validationError)}
        fullWidth
        margin="dense"
      />
    );
  });

  const validationErrorAlert = () => {
    if (validationError === "") return;
    return <Alert severity="error">{validationError}</Alert>;
  };

  return (
    <div>
      <div>{nutrientsInput}</div>
      {validationErrorAlert()}
    </div>
  );
}
