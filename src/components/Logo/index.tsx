import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex",
    alignItems: "flex-end",
    fontSize: 32,
    margin: 0,
    [theme.breakpoints.up("md")]: {
      fontSize: 36,
    },
  },
  logoImg: {
    display: "block",
    width: 48,
    height: 48,
    margin: "0 0.1em",
    [theme.breakpoints.up("md")]: {
      width: 60,
      height: 60,
    },
  },
}));

const logo = "/numa_logo.png";
const logo2x = "/numa_logo@2x.png";

export const Logo: React.FC = () => {
  const classes = useStyles();
  return (
    <h1 className={classes.root}>
      <span>かんたん</span>
      <img
        alt="沼"
        src={logo}
        srcSet={`${logo} 1x, ${logo2x} 2x`}
        className={classes.logoImg}
      />
      <span>計算機</span>
    </h1>
  );
};
