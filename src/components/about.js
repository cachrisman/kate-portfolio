import React from "react";
import Img from "gatsby-image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const About = ({ data }) => (
  <div className="about section" id={data.name}>
    <div className="container">
      <div className="about-main row">
        <div className="left col-md-5 col-lg-4 mb-3">
          <Img
            fluid={data.photo.fluid}
            objectFit="cover"
            objectPosition="top center"
          />
        </div>
        <div className="left col-md-7 col-lg-8">
          <div className="about-details">
            <div className="content">{documentToReactComponents(data.content.json)}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;
