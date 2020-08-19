import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby";

const SEO = ({ title, description, image }) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          defaultTitle: title
          defaultDescription: description
          siteUrl: url
          defaultImage: image
          twitterUsername
        }
      }
    }
  `)

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${image || defaultImage}`,
    url: `${siteUrl}${pathname}`
  }

  return (
    <Helmet title={seo.title}>
      <link rel="canonical"             href={seo.url} />
      <meta name="description"          content={seo.description} />
      <meta name="image"                content={seo.image} />

      <meta property="og:url"           content={seo.url} />
      <meta property="og:type"          content="website" />
      <meta property="og:title"         content={seo.title} />
      <meta property="og:description"   content={seo.description} />
      <meta property="og:image"         content={seo.image} />

      <meta name="twitter:card"         content="summary_large_image" />
      <meta name="twitter:creator"      content={twitterUsername} />
      <meta name="twitter:title"        content={seo.title} />
      <meta name="twitter:description"  content={seo.description} />
      <meta name="twitter:image"        content={seo.image} />
    </Helmet>
  )
}

export default SEO;

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null
};
