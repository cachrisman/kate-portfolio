import React, { Component } from "react";

export default class FeaturedArticles extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="section featured-articles" id={data.name}>
        <div className="container">
          <div className="section-head">
            <h2>{data.name}</h2>
          </div>
          <div className="row">
            {data.featuredArticles.map((article, index) => {
              return (
                <div key={index} className="col-md-4 mb-3">
                  <div className="service-main">
                    <a href={article.url}><h3>{article.title}</h3></a>
                    <div className="article-description" 
                      dangerouslySetInnerHTML={{
                        __html: article.description.childMarkdownRemark.html
                      }}
                    />
                    <div className="article-backstory"
                      dangerouslySetInnerHTML={{
                        __html: article.backstory.childMarkdownRemark.html
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
