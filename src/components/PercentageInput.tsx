import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

type Props = {
  title: string;
  value: number;
  onChange: (value: number) => void;
};

const PercentageInput = (props: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.valueAsNumber);
  };
  return (
    <div>
      <TextField
        label={props.title}
        size="small"
        type="number"
        variant="outlined"
        value={props.value}
        onChange={handleChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
      />
    </div>
  );
};

export default PercentageInput;
