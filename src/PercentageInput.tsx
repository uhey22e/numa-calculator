import React from "react";

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
      <span>{props.title}</span>
      <input type="number" value={props.value} onChange={handleChange} />
      <span>%</span>
    </div>
  );
};

export default PercentageInput;
