import React from "react";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
// @ts-ignore
import * as logo from "./numa.svg";

type Props = {};

const useStyles = makeStyles({
  root: {
    fontSize: 32,
    margin: 0,
    "@media (min-width: 600px)": {
      fontSize: 36,
    },
  },
  logoImg: {
    display: "block",
    height: "1.33em",
    margin: "0 0.1em",
    "@media (min-width: 600px)": {
      height: "1.67em",
    },
  },
});

export default function Logo(props: Props) {
  const classes = useStyles();
  return (
    <h1 className={classes.root}>
      <Box display="flex" alignItems="flex-end">
        <div>かんたん</div>
        <img alt="沼" src={logo} className={classes.logoImg} />
        <div>計算機</div>
      </Box>
    </h1>
  );
}
