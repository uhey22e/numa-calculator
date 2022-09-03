import React from "react";
import logo from "./numa_logo.png";
import logo2x from "./numa_logo@2x.png";

export const Logo: React.FC = () => {
  return (
    <h1 className="flex flex-row items-end text-3xl">
      <span>かんたん</span>
      <img
        alt="沼"
        src={logo}
        srcSet={`${logo} 1x, ${logo2x} 2x`}
        width={48}
        height={48}
        className="mx-1"
      />
      <span>計算機</span>
    </h1>
  );
};
