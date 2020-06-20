import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { validationErrorMessage } from "./messages";

type Props = {
  // Called when target calorie is updated to valid value
  onChange?: (value: number) => void;
  // Called when error is happened
  onError?: (errorMessage: string) => void;
};

const validationFuncs: ((calorie: number) => string | void)[] = [
  (calorie) => {
    if (!calorie) {
      return validationErrorMessage.INVALID_NUMBER;
    }
  },
  (calorie) => {
    if (calorie < 0) {
      return validationErrorMessage.INVALID_MINUS_VALUE;
    }
  },
];

export default function TargetCalorieInput(props: Props) {
  const [validationError, setValidationError] = React.useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.valueAsNumber;
    // Validate value
    for (let fn of validationFuncs) {
      const errMsg = fn(newValue);
      if (errMsg) {
        setValidationError(errMsg);
        if (props.onError) {
          props.onError(errMsg);
        }
        return;
      }
    }
    setValidationError("");

    if (!props.onChange) {
      return;
    }
    props.onChange(newValue);
  };

  return (
    <div>
      <TextField
        label="目標摂取カロリー"
        placeholder="1500"
        size="small"
        type="number"
        variant="outlined"
        onChange={handleChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">kcal</InputAdornment>,
        }}
        error={Boolean(validationError)}
      />
      <div>{validationError}</div>
    </div>
  );
}
