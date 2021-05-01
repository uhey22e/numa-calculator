import React from "react";
import { Box, InputAdornment, TextField, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { PFCBalance } from "../libs/calc";
import { validationErrorMessage } from "../utils/messages";
import { ValidationFuncs, getValidationMessage } from "../utils/validation";

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

const validationFuncs: ValidationFuncs<PFCBalance> = [
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

export default function PFCBalanceInput({
  onChange,
  defaultValue = defaultPFCBalance,
}: Props) {
  const validation = getValidationMessage<PFCBalance>(validationFuncs);

  const [values, setValues] = React.useState<PFCBalance>(defaultValue);
  const [validationError, setValidationError] = React.useState<string>(
    validation(values) || ""
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
    const errMsg = validation(newValues);
    if (errMsg) {
      setValidationError(errMsg);
    } else {
      setValidationError("");
      if (onChange) {
        onChange(newValues);
      }
    }
  };

  const nutrientsInput = nutrients.map((nutrient) => {
    return (
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        key={nutrient.key}
      >
        <Box flexBasis={110} flexGrow={0}>
          <Typography variant="inherit">{nutrient.label}</Typography>
        </Box>
        <Box flexBasis={200} flexGrow={1}>
          <TextField
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
        </Box>
      </Box>
    );
  });

  const validationErrorAlert = () => {
    if (validationError === "") return;
    return <Alert severity="error">{validationError}</Alert>;
  };

  return (
    <>
      <div>{nutrientsInput}</div>
      {validationErrorAlert()}
    </>
  );
}
