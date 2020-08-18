import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Hero from "../components/hero";
import About from "../components/about";
import FeaturedArticles from "../components/featuredArticles";
import ArticleList from "../components/articleList";
import Photos from "../components/photos";
import Contact from "../components/contact";

const IndexPage = ({ data }) => (
  <Layout header="home">
    {data.contentfulPage.sections.map((section, index) => {
      if (section.__typename === "ContentfulSectionHeroImage")
        return <Hero key={index} data={section} />
      else if (section.__typename === "ContentfulSectionAboutMe")
        return <About key={index} data={section} />
      else if (section.__typename === "ContentfulSectionFeaturedArticles")
        return <FeaturedArticles key={index} data={section} />
      else if (section.__typename === "ContentfulSectionArticleList")
        return <ArticleList key={index} data={section} />
      else if (section.__typename === "ContentfulSectionPhotos")
        return <Photos key={index} data={section} />
      else if (section.__typename === "ContentfulSectionContactMe")
        return <Contact key={index} data={section} />
      else
        return ''
    })}
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
