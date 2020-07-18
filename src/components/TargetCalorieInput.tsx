import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Alert from "@material-ui/lab/Alert";
import { validationErrorMessage } from "../utils/messages";
import { ValidationFuncs, getValidationMessage } from "../utils/validation";

type Props = {
  // Called when target calorie is updated to valid value
  onChange?: (value: number) => void;
  // Called when error is happened
  onError?: (errorMessage: string) => void;
};

const validationFuncs: ValidationFuncs<number> = [
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
  const validation = getValidationMessage<number>(validationFuncs);

  const [validationError, setValidationError] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.valueAsNumber;

    // Validate value
    const errMsg = validation(newValue);
    if (errMsg) {
      setValidationError(errMsg);
    } else {
      setValidationError("");
      if (props.onChange) {
        props.onChange(newValue);
      }
    }
  };

  const validationErrorAlert = () => {
    if (validationError === "") return;
    return <Alert severity="error">{validationError}</Alert>;
  };

  return (
    <div>
      <TextField
        placeholder="1500"
        size="small"
        type="number"
        variant="outlined"
        onChange={handleChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">kcal</InputAdornment>,
        }}
        error={Boolean(validationError)}
        fullWidth
        margin="dense"
      />
      {validationErrorAlert()}
    </div>
  );
}
