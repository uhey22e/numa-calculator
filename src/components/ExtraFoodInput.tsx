import React, { useCallback } from "react";
import Typography from "@material-ui/core/Typography";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Box from "@material-ui/core/Box";
import { Ingredient } from "../libs/calculator/calc";

export interface ExtraFoodInputProps {
  ingredient: Ingredient;
  onChange: (ingredient: Ingredient) => void;
}

export const ExtraFoodInput: React.FunctionComponent<ExtraFoodInputProps> = ({
  ingredient,
  onChange,
}) => {
  const handleChange = useCallback<NonNullable<TextFieldProps["onChange"]>>(
    (e) => {
      const v = e.target.value;
      if (v && Number(v) > 0) {
        onChange({
          ...ingredient,
          quantity: Number(v),
        });
      } else {
        onChange({
          ...ingredient,
          quantity: 0,
        });
      }
    },
    [ingredient, onChange]
  );

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Box flexBasis={110} flexGrow={0}>
        <Typography variant="inherit">{ingredient.food.shortName}</Typography>
      </Box>
      <Box flexBasis={200} flexGrow={1}>
        <TextField
          //   error={isError}
          size="small"
          type="number"
          variant="outlined"
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {ingredient.unitName || "g"}
              </InputAdornment>
            ),
          }}
          fullWidth
          margin="dense"
        />
      </Box>
    </Box>
  );
};
