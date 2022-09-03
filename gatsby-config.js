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
    "gatsby-plugin-postcss",
    // React Helmet
    "gatsby-plugin-react-helmet",
    // Set favicon and manifest
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `かんたん沼計算機`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#d20000`,
        display: `standalone`,
        icon: `src/assets/numa_favicon.png`,
      },
    },
    // Google analytics
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          process.env.GOOGLE_ANALYTICS_TRACKING_ID, // Google Analytics / GA
        ],
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
        },
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
    // Load twitter script
    "gatsby-plugin-twitter",
  ],
};
