import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import "bootstrap/dist/css/bootstrap.css";

import Header from "./header";
import Footer from "./footer";

import "../css/style.css";
import "../css/font-awesome.css";

if (typeof window !== "undefined") {
  require("smooth-scroll")('a[href*="#"]');
}

const Layout = ({ children, header }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        contentfulPage(slug: {eq: "/"}) {
          title
          logo {
            file {
              url
            }
          }
          sections {
            ... on ContentfulSectionHeroImage {
              name
            }
            ... on ContentfulSectionAboutMe {
              name
            }
            ... on ContentfulSectionFeaturedArticles {
              name
            }
            ... on ContentfulSectionArticleList { 
              name
            }
            ... on ContentfulSectionPhotos {
              name
            }
            ... on ContentfulSectionContactMe {
              name
            }
          }
        }
      }
    `}
    
    render={data => (
      <div>
        <Header
          data={data.contentfulPage}
          siteTitle={data.contentfulPage.title}
          header={header}
        />
        <div>
          <main>{children}</main>
        </div>
        <Footer siteName={data.contentfulPage.title} />
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;