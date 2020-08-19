import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Hero from "../components/hero";
import About from "../components/about";
import FeaturedArticles from "../components/featuredArticles";
import ArticleList from "../components/articleList";
import Photos from "../components/photos";
import Contact from "../components/contact";

const components = {
  ContentfulSectionHeroImage: Hero,
  ContentfulSectionAboutMe:   About,
  ContentfulSectionFeaturedArticles: FeaturedArticles,
  ContentfulSectionArticleList: ArticleList,
  ContentfulSectionPhotos: Photos,
  ContentfulSectionContactMe: Contact
}

const IndexPage = ({ data }) => (
  <Layout header="home">
    <SEO
      title={data.contentfulPage.title}
      description={data.contentfulPage.seoDescription}
    />
    {data.contentfulPage.sections.map((section, index) => {
      const Component = components[section.__typename]
      return <Component key={index} data={section}/>
    })}
  </Layout>
);

export default IndexPage;

export const pageQuery = graphql`
  query HomePageQuery {
    contentfulPage(slug: {eq: "/"}) {
      title
      seoDescription
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
