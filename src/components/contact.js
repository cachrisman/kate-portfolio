import React, { Component } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export default class Contact extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="contact section" id={data.name}>
        <div className="container">
          <div className="section-head">
            <h2 className="text-center">{data.name}</h2>
          </div>
          <div className="contact-main row">
            <div className="left col-md-6 col-lg-6 mb-3">
              <div className="content">{documentToReactComponents(data.content.json)}</div>
            </div>
            <div className="left col-md-6 col-lg-6">
              <div className="contact-form">
                <form
                  action={`https://formspree.io/${this.props.data}`}
                  name="contact"
                  method="POST"
                  data-netlify="true"
                >
                  <div>
                    <label>
                      Your Name: <input type="text" name="name" required />
                    </label>
                  </div>
                  <div>
                    <label>
                      Your Email: <input type="email" name="email" required />
                    </label>
                  </div>
                  <div>
                    <label>
                      Message: <textarea name="message" required></textarea>
                    </label>
                  </div>
                  <div>
                    <button type="submit">Send</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
