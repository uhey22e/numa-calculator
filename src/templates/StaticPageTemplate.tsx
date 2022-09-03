import React from "react";
import { graphql } from "gatsby";
import { Layout } from "../layouts/Layout";
import ShareButtons from "../components/ShareButtons";

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
    <Layout title={`${frontmatter.title} | かんたん沼計算機`}>
      <h1 className=" text-2xl my-6">{frontmatter.title}</h1>
      <section
        className="static-page-content mb-8"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <ShareButtons />
    </Layout>
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
