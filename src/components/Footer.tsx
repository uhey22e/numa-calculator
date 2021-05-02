import React from "react";
import { Box, Link as MuiLink, BoxProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitterSquare,
  faGithubSquare,
} from "@fortawesome/free-brands-svg-icons";

type Props = {};

const useStyles = makeStyles({
  root: {
    color: "#777",
    backgroundColor: "#efefef",
    width: "100%",
    margin: 0,
    fontSize: "0.9rem",
    textAlign: "center",
  },
  menu: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  menuItem: {
    margin: 0,
    "&:not(:last-child)": {
      marginBottom: "0.33em",
    },
  },
  link: {
    color: "#777",
    textDecoration: "underline",
  },
  license: {
    fontSize: "0.85rem",
  },
});

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

export default function Footer(props: Props) {
  const classes = useStyles();

  const menuItemElms = menuItems.map((v) => {
    return (
      <li className={classes.menuItem} key={`pagelink_${v.href}`}>
        <Link to={v.href} className={classes.link}>
          {v.label}
        </Link>
      </li>
    );
  });

  const snsLinks = [
    {
      icon: faTwitterSquare,
      href: "//twitter.com/uhey22e",
    },
    {
      icon: faGithubSquare,
      href: "//github.com/uhey22e/numa-calcurator",
    },
  ];

  const snsLinkElms = snsLinks.map((v) => {
    return (
      <Box ml={1} mr={1} key={`snslink_${v.href}`}>
        <MuiLink href={v.href}>
          <FontAwesomeIcon icon={v.icon} color="#505050" size="3x" />
        </MuiLink>
      </Box>
    );
  });

  const FooterSection = (props: BoxProps) => {
    return <Box mt={1} mb={1} component="section" {...props} />;
  };

  return (
    <Box
      pt={1}
      pb={1}
      className={classes.root}
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <FooterSection>
        <ul className={classes.menu}>{menuItemElms}</ul>
      </FooterSection>
      <FooterSection display="flex" flexDirection="row" justifyContent="center">
        {snsLinkElms}
      </FooterSection>
      <FooterSection className={classes.license}>
        <div>
          <MuiLink rel="license" href="//creativecommons.org/licenses/by/4.0/">
            <img
              alt="Creative Commons License"
              style={{
                borderWidth: 0,
                margin: 0,
              }}
              src="//i.creativecommons.org/l/by/4.0/88x31.png"
            />
          </MuiLink>
        </div>
        <div>
          <span>This work is licensed under a </span>
          <MuiLink
            rel="license"
            href="//creativecommons.org/licenses/by/4.0/"
            className={classes.link}
          >
            Creative Commons Attribution 4.0 International License
          </MuiLink>
        </div>
      </FooterSection>
      <FooterSection>
        <span>Copyright &copy; {new Date().getFullYear()} </span>
        <MuiLink href="//twitter.com/uhey22e" className={classes.link}>
          uhey22e
        </MuiLink>
      </FooterSection>
    </Box>
  );
}
