import React from "react";
import { validationErrorMessage } from "../utils/messages";
import { ValidationFuncs, getValidationMessage } from "../utils/validation";
import { Alert } from "./Alert";
import { Input } from "./Input";

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
      <Input
        type="number"
        placeholder="1500"
        onChange={handleChange}
        unitName="kcal"
      />
      {validationErrorAlert()}
    </div>
  );
}
