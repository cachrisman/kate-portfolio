import React, { Component } from "react";
import Img from "gatsby-image";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

export default class PhotosPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePopup: false,
      selectedItem: 0
    };
  }

  render() {
    const { data } = this.props;
    const { activePopup, selectedItem } = this.state;

    return (
      <Layout>
        <SEO title={data.contentfulPhotos.title} />
        <div className="site-container blogs-page" id="Blogs">
          <div className="container">
            <div className="section-head">
              <h1 className="line-heading h2">Photos</h1>
            </div>
            <ul className="photos-page-list">
              {data.contentfulPhotos.photos.map((item, index) => {
                return (
                  <li key={index} className="item">
                    <div
                      className="inner"
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        this.setState({
                          activePopup: true,
                          selectedItem: index
                        });
                      }}
                      onKeyPress={() => {
                        this.setState({
                          activePopup: true,
                          selectedItem: index
                        });
                      }}
                    >
                      <Img
                        fluid={item.fluid}
                        objectFit="cover"
                        objectPosition="50% 50%"
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
            {activePopup ? (
              <div className="rg-popup">
                <span
                  className="popup-layer"
                  role="button"
                  tabIndex={0}
                  title="Close"
                  onClick={() => {
                    this.setState({
                      activePopup: false
                    });
                  }}
                  onKeyPress={() => {
                    this.setState({
                      activePopup: false
                    });
                  }}
                ><span className="sr-only">close</span>
                </span>
                <div className="popup-inner">
                  <i
                    className="fas fa-times"
                    role="button"
                    tabIndex={0}
                    title="close"
                    onClick={() => {
                      this.setState({
                        activePopup: false
                      });
                    }}
                    onKeyPress={() => {
                      this.setState({
                        activePopup: false
                      });
                    }}
                  ><span className="sr-only">close</span></i>
                  <Img
                    fluid={data.contentfulPhotos.photos[selectedItem].fluid}
                    key={data.contentfulPhotos.photos[selectedItem].fluid.src}
                    alt={data.contentfulPhotos.photos[selectedItem].title}
                    imgStyle={{ objectFit: "contain" }}
                    style={{ height: "100%" }}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </Layout>
    );
  }
}
export const pageQuery = graphql`
  query PhotosPageQuery {
    contentfulPhotos {
      title
      photos {
        title
        fluid {
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
  }
`;
