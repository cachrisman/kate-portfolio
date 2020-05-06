import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
// import SEO from "../components/seo";

import Hero from "../components/hero";
import About from "../components/about";
import FeaturedArticles from "../components/featuredArticles";
import ArticleList from "../components/articleList";
import Photos from "../components/photos";
import Contact from "../components/contact";

const IndexPage = ({ data }) => (
  <Layout header="home">
    {/* <SEO
      title={data.contentfulPage.title}
      keywords={data.contentfulPage.tags}
    /> */}
    <Hero data={data.contentfulPage.sections[0]}></Hero>
    <About data={data.contentfulPage.sections[1]}></About>
    <FeaturedArticles data={data.contentfulPage.sections[2]}></FeaturedArticles>
    <ArticleList data={data.contentfulPage.sections[3]}></ArticleList>
    <Photos data={data.contentfulPage.sections[4]}></Photos>
    <Contact data={data.contentfulPage.sections[5]}></Contact>
  </Layout>
);

export default IndexPage;

export const pageQuery = graphql`
  query HomePageQuery {
    contentfulPage(slug: {eq: "/"}) {
      title
      sections {
        __typename
        ... on ContentfulSectionHeroImage {
          name
          heroImage {
            fluid {
              ...GatsbyContentfulFluid_withWebp
            }
            file {
              url
            }
          }
          headline
          tags
          socialMediaLinks {
            name
            type
            profileUrl
          }
        }
        ... on ContentfulSectionAboutMe {
          name
          photo {
            fluid {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          content {
            json
          }
        }
        ... on ContentfulSectionFeaturedArticles {
          name
          featuredArticles {
            ...articleQuery
          }
        }
        ... on ContentfulSectionArticleList {
          name
          articles {
            ...articleQuery
          }
        }
        ... on ContentfulSectionPhotos {
          name
          photos {
            fluid(maxWidth: 600) {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
        ... on ContentfulSectionContactMe {
          name
          content {
            json
          }
        }
      }
    }
  }
  fragment articleQuery on ContentfulArticle {
    title
    url
    category {
      name
    }
    image {
      file {
        url
      }
    }
    description {
      childMarkdownRemark {
        html
      }
      description
    }
    backstory {
      childMarkdownRemark {
        html
      }
      backstory
    }
  }
`;
