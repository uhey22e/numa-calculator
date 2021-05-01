import React from "react";
import { graphql } from "gatsby";
import { Layout } from "../layouts/Layout";
import ShareButtons from "../components/ShareButtons";
import "../styles/global.scss";
import { Helmet } from "react-helmet";

type StaticPageTemplateProps = {
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

const StaticPageTemplate = ({ data }: StaticPageTemplateProps) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <>
      <Helmet>
        <title>{`${frontmatter.title} | かんたん沼計算機`}</title>
      </Helmet>
      <Layout>
        <h1>{frontmatter.title}</h1>
        <section
          className="static-page-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <ShareButtons />
      </Layout>
    </>
  );
};
export default StaticPageTemplate;

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
