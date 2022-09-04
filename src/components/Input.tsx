import classNames from "classnames";
import React from "react";

export type InputProps = JSX.IntrinsicElements["input"] & {
  unitName?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ unitName, ...inputProps }, ref) => (
    <div className="relative">
      <input
        ref={ref}
        className={classNames(
          "block w-full px-3 py-2",
          "rounded-md border border-gray-300",
          "focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500",
          {
            "pr-10": unitName != null,
          }
        )}
        {...inputProps}
      />
      {unitName && (
        <div className="flex items-center absolute inset-y-0 right-3 pointer-events-none text-gray-500">
          {unitName}
        </div>
      )}
    </div>
  )
);
