import React from "react";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import logo from "./numa.png";

type Props = {};

const useStyles = makeStyles({
  root: {
    fontSize: 32,
    margin: 0,
  },
  logoImg: {
    display: "block",
    height: "1.67em",
    margin: "0 0.1em",
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
