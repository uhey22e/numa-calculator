/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `かんたん沼計算機`,
    siteUrl: `https://numa-calculator.uhey22e.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `かんたん沼計算機`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#d20000`,
        display: `standalone`,
        icon: `src/assets/numa.png`,
      },
    },
    "gatsby-plugin-react-helmet",
    // Enable SASS
    "gatsby-plugin-sass",
    // Enable Typography.js
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // Allow to use markdown pages
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [`gatsby-remark-responsive-iframe`],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown-pages",
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    // Markdown中のリンクをgatsby-linkに置き換え
    "gatsby-plugin-catch-links",
    // Allow to use material-ui
    "gatsby-plugin-material-ui",
    // Load twitter script
    "gatsby-plugin-twitter",
  ],
};
