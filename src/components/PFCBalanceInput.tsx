import React from "react";
import { PFCBalance } from "../libs/calculator/calc";
import validationErrorMessage from "../utils/messages";
import { ValidationFuncs, getValidationMessage } from "../utils/validation";
import { Alert } from "./Alert";
import { Input } from "./Input";

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
    // eslint-disable-next-line no-restricted-syntax
    for (const v of Object.values(value)) {
      if (!v) return validationErrorMessage.INVALID_NUMBER;
    }
    return undefined;
  },
  (value) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const v of Object.values(value)) {
      if (v < 0) return validationErrorMessage.INVALID_MINUS_VALUE;
    }
    return undefined;
  },
  (value) => {
    const sum = Object.values(value).reduce<number>((acc, cur) => acc + cur, 0);
    if (sum !== 100) return validationErrorMessage.SUM_VALUE_IS_NOT_100;
    return undefined;
  },
];

export type PFCBalanceInputProps = {
  onChange?: (value: PFCBalance) => void;
  defaultValue?: PFCBalance;
};

export function PFCBalanceInput({
  onChange,
  defaultValue = defaultPFCBalance,
}: PFCBalanceInputProps) {
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

  return (
    <div>
      {nutrients.map((nutrient) => (
        <div key={nutrient.key} className="flex flex-row items-center mb-2">
          <div className="basis-32">
            <div>{nutrient.label}</div>
          </div>
          <div className="flex-grow">
            <Input
              type="number"
              value={values[nutrient.key]}
              onChange={handleChange(nutrient.key)}
              unitName="%"
            />
          </div>
        </div>
      ))}
      {validationError !== "" && (
        <Alert severity="error">{validationError}</Alert>
      )}
    </div>
  );
}
