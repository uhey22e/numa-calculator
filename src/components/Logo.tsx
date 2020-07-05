import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import logo from "../assets/logo_numa.png";

type Props = {};

export default function Logo(props: Props) {
  return (
    <Typography component="h1" variant="h3">
      <Box display="flex" alignItems="flex-end">
        <div>かんたん</div>
        <img
          alt="沼"
          src={logo}
          style={{
            display: "block",
            height: "1.5em",
            margin: "0.1em",
          }}
        />
        <div>計算機</div>
      </Box>
    </Typography>
  );
}
