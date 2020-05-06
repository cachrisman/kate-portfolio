const dotenv = require("dotenv");

if (process.env.ENVIRONMENT !== "production") {
  dotenv.config();
}

module.exports = {
  siteMetadata: {
    title: `Kate Chrisman`,
    description: `Personal Site`,
    author: `@katerchrisman`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
        environment: process.env.CONTENTFUL_ENV,
        useNameForId: false,
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Kate Chrisman`,
        short_name: `Kate Chrisman`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#333`,
        icon: `src/images/fev_icon.png` // This path is relative to the root of the site.
      }
    }
  ]
};
