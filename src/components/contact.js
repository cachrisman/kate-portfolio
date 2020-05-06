import React, { Component } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import axios from "axios"
import * as qs from "query-string"

export default class Contact extends Component {
  constructor(props) {
    super(props)
    this.domRef = React.createRef()
    this.state = { feedbackMsg: null }
  }

  handleSubmit(event) {
    // Do not submit form via HTTP, since we're doing that via XHR request.
    event.preventDefault()
    // Loop through this component's refs (the fields) and add them to the
    // formData object. What we're left with is an object of key-value pairs
    // that represent the form data we want to send to Netlify.
    const formData = {}
    Object.keys(this.refs).map(key => (formData[key] = this.refs[key].value))

    // Set options for axios. The URL we're submitting to
    // (this.props.location.pathname) is the current page.
    const axiosOptions = {
      url: window.location.pathname,
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify(formData),
    }

    // Submit to Netlify. Upon success, set the feedback message and clear all
    // the fields within the form. Upon failure, keep the fields as they are,
    // but set the feedback message to show the error state.
    axios(axiosOptions)
      .then(response => {
        console.log(response)
        this.setState({
          feedbackMsg: "Thank you! I'll review your message and get back to you soon!",
        })
        this.domRef.current.reset()
      })
      .catch(err => {
        console.log(err)
        this.setState({
          feedbackMsg: "Form could not be submitted. Refresh the page to try again.",
        })
      })
  }

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
              {this.state.feedbackMsg && <p>{this.state.feedbackMsg}</p>}
              {!this.state.feedbackMsg &&
                <form ref={this.domRef} name="Contact Form" method="POST" data-netlify="true" onSubmit={event => this.handleSubmit(event)}>
                  <input ref="form-name" type="hidden" name="form-name" value="Contact Form" />
                  <div>
                    <label>
                      Your Name: <input ref="name" type="text" name="name" required />
                    </label>
                  </div>
                  <div>
                    <label>
                      Your Email: <input ref="email" type="email" name="email" required />
                    </label>
                  </div>
                  <div>
                    <label>
                      Message: <textarea ref="message" name="message" required></textarea>
                    </label>
                  </div>
                  <div>
                    <button type="submit">Send</button>
                  </div>
                </form>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
