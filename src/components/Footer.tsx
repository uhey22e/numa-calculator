import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "gatsby";

type Props = {};

const useStyles = makeStyles({
  root: {
    color: "#777",
    backgroundColor: "#efefef",
    width: "100%",
    margin: 0,
    fontSize: "0.9rem",
    textAlign: "center",
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
  },
  menu: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  menuItem: {
    margin: 0,
    marginTop: "0.33em",
    marginBottom: "0.33em",
  },
  link: {
    color: "#777",
    textDecoration: "underline",
  },
  license: {
    fontSize: "0.85rem",
  },
});

export default function Footer(props: Props) {
  const classes = useStyles();

  const menuItems = [
    {
      label: "トップページ",
      href: "/",
    },
    {
      label: "このアプリについて",
      href: "/about",
    },
    {
      label: "レシピの計算方法について",
      href: "/calc-procedure",
    },
  ];

  const menuItemElms = menuItems.map((v) => {
    return (
      <li className={classes.menuItem}>
        <Link to={v.href} className={classes.link}>
          {v.label}
        </Link>
      </li>
    );
  });

  return (
    <Box
      className={classes.root}
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <ul className={classes.menu}>{menuItemElms}</ul>
      <Box mt={2} className={classes.license}>
        <div>
          <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
            <img
              alt="Creative Commons License"
              style={{
                borderWidth: 0,
                margin: 0,
              }}
              src="https://i.creativecommons.org/l/by/4.0/88x31.png"
            />
          </a>
        </div>
        <div>
          <span>This work is licensed under a </span>
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by/4.0/"
            className={classes.link}
          >
            Creative Commons Attribution 4.0 International License
          </a>
        </div>
      </Box>
      <Box mt={2}>
        Copyright &copy; {new Date().getFullYear()}{" "}
        <a href="//twitter.com/uhey22e" className={classes.link}>
          uhey22e
        </a>
      </Box>
    </Box>
  );
}
