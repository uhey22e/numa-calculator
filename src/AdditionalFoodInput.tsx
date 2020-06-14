import React from "react";

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
      <div>
        <span>{props.foodName}</span>
        <input type="number" value={props.value} onChange={handleChangeQty} />
        <span>{props.unitName}</span>
      </div>
    </div>
  );
}
