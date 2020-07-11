import React from "react";
import { graphql } from "gatsby";
import rehypeReact from "rehype-react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Link as MuiLink, Typography } from "@material-ui/core";
import Link from "../components/Link";

type StaticPageTemplate = {
  data: {
    markdownRemark: {
      htmlAst: any;
      frontmatter: {
        slug: string;
        title: string;
      };
    };
  };
};

const useStyles = makeStyles({
  h1: {
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  h2: {
    marginTop: "2rem",
    marginBottom: "1rem",
  },
  p: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
});

export default function StaticPageTemplate({ data }: StaticPageTemplate) {
  const classes = useStyles();

  const { markdownRemark } = data;
  const { frontmatter, htmlAst } = markdownRemark;

  const components = {
    h2: (props: any[]) => {
      return (
        <Typography
          variant="h5"
          component="h1"
          className={classes.h2}
          {...props}
        ></Typography>
      );
    },
    p: (props: any[]) => {
      return (
        <Typography
          variant="body1"
          className={classes.p}
          {...props}
        ></Typography>
      );
    },
    a: MuiLink,
    "internal-link": (props: any[]) => {
      return <Link to={props.to}>{props.children}</Link>;
    },
  };

  // Markdownから生成された<h1>などのタグを好きなコンポーネントにマッピングする
  // See https://using-remark.gatsbyjs.org/custom-components/
  // @ts-ignore
  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: components,
  }).Compiler;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" className={classes.h1}>
        {frontmatter.title}
      </Typography>
      {renderAst(htmlAst)}
    </Container>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        slug
        title
      }
    }
  }
`;
