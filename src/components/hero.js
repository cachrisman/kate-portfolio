import React, { Component } from "react";
import Img from "gatsby-image";

const TagsListItem = (props) => <li>{props.tag}</li>
const SocialMediaListItem = (props) => (
  <li><a
    className={`fab fa-${props.type.toLowerCase()}`}
    href={props.profileUrl}
    target="_blank"
    rel="noopener noreferrer"
    ></a>
  </li>
) 
export default class Hero extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="banner" id="Home">
        <Img
          fluid={data.heroImage.fluid}
          objectFit="cover"
          objectPosition="50% 50%"
        />
        <div className="container">
          <div className="banner-details">
            <h1>{data.headline}</h1>
            <ul className="sub-data">
              {data.tags.map((tag, index) => 
                <TagsListItem key={index} tag={tag} />
              )}
            </ul>
            <ul className="social">
              {data.socialMediaLinks.map((link, index) => 
                <SocialMediaListItem key={index} type={link.type} url={link.profileUrl} />
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
