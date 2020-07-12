import React from "react";
import { graphql } from "gatsby";
import Layout from "../layout/Layout";
import "../styles/global.scss";

type StaticPageTemplate = {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        slug: string;
        title: string;
      };
    };
  };
};

export default function StaticPageTemplate({ data }: StaticPageTemplate) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout>
      <h1>{frontmatter.title}</h1>
      <section
        className="static-page-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
      }
    }
  }
`;
