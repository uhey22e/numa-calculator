import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

type Props = {
  title: string;
  foodName: string;
  foodKey: string;
  unitName: string;
  value: number;
  onChange: (value: number) => void;
};

export default function AdditionalFoodInput(props: Props) {
  const handleChangeQty = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.valueAsNumber);
  };
  return (
    <div>
      <div>{props.title}</div>
      <TextField
        label={props.foodName}
        size="small"
        type="number"
        variant="outlined"
        value={props.value}
        onChange={handleChangeQty}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{props.unitName}</InputAdornment>
          ),
        }}
      />
    </div>
  );
}
