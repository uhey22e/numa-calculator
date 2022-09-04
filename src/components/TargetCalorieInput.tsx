import React from "react";
import validationErrorMessage from "../utils/messages";
import { ValidationFuncs, getValidationMessage } from "../utils/validation";
import { Alert } from "./Alert";
import { Input } from "./Input";

const validationFuncs: ValidationFuncs<number> = [
  (calorie) => {
    if (!calorie) {
      return validationErrorMessage.INVALID_NUMBER;
    }
    return undefined;
  },
  (calorie) => {
    if (calorie < 0) {
      return validationErrorMessage.INVALID_MINUS_VALUE;
    }
    return undefined;
  },
];

export type TargetCalorieInputProps = {
  // Called when target calorie is updated to valid value
  onChange?: (value: number) => void;
};

export function TargetCalorieInput({ onChange }: TargetCalorieInputProps) {
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
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  return (
    <div>
      <Input
        type="number"
        placeholder="1500"
        onChange={handleChange}
        unitName="kcal"
      />
      {validationError !== "" && (
        <Alert severity="error">{validationError}</Alert>
      )}
    </div>
  );
}
