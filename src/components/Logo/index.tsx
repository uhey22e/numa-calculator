import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import logo from "./numa.png";

type Props = {};

export default function Logo(props: Props) {
  return (
    <Typography component="h1" variant="h3">
      <Box display="flex" alignItems="flex-end">
        <div style={{ lineHeight: "1em" }}>かんたん</div>
        <img
          alt="沼"
          src={logo}
          style={{
            display: "block",
            height: "1.6em",
            margin: "0 0.1em",
          }}
        />
        <div style={{ lineHeight: "1em" }}>計算機</div>
      </Box>
    </Typography>
  );
}
