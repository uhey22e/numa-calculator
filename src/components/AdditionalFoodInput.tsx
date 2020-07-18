import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Box from "@material-ui/core/Box";
import Ingredient from "../ingredient";
import { validationErrorMessage } from "../messages";
import { ValidationFuncs, getValidationMessage } from "../utils/validation";

type Props = {
  title: string;
  foodName: string;
  foodKey: string;
  unitName: string;
  // Food is undefined when field is cleared
  onChange: (food: Ingredient | undefined) => void;
};

const validationFuncs: ValidationFuncs<number> = [
  (gram) => {
    if (isNaN(gram)) {
      return validationErrorMessage.INVALID_NUMBER;
    }
  },
  (gram) => {
    if (gram < 0) {
      return validationErrorMessage.INVALID_MINUS_VALUE;
    }
  },
];

export default function AdditionalFoodInput(props: Props) {
  const validation = getValidationMessage(validationFuncs);

  const [isError, setIsError] = React.useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      // empty input
      props.onChange(undefined);
      return;
    }

    // Validate value
    const errMsg = validation(event.target.valueAsNumber);
    if (errMsg) {
      setIsError(true);
      props.onChange(undefined);
      return;
    }
    setIsError(false);

    const newFood = new Ingredient(
      props.foodKey,
      props.foodName,
      event.target.valueAsNumber,
      props.unitName
    );
    props.onChange(newFood);
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Box flexBasis={110} flexGrow={0}>
        <Typography variant="inherit">{props.title}</Typography>
      </Box>
      <Box flexBasis={200} flexGrow={1}>
        <TextField
          error={isError}
          size="small"
          type="number"
          variant="outlined"
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{props.unitName}</InputAdornment>
            ),
          }}
          fullWidth
          margin="dense"
        />
      </Box>
    </Box>
  );
}
