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
        <SEO
          title="Photos"
          keywords={[`Rohit Gupta`, `Frontend Developer`, `Developer`, `Photo`]}
        />
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
                        fixed={item.fluid}
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
      photos {
        file {
          url
        }
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
  }
`;
