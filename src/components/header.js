import { Link } from "gatsby";
import React, { Component } from "react";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false
    };
  }

  render() {
    const { data, header } = this.props;
    const { menu } = this.state;
    return (
      <header className={`site-header ${menu ? "active" : ""}`}>
        <div className="container">
          <div className="header-main">
            <div className="logo">
              <Link to="/">
                <img className="logo-img" src={`${data.logo.file.url}?w=24&fm=png`} alt="logo" /><span>{data.title}</span>
              </Link>
            </div>
            <div
              className="responsive-menu"
              onClick={() => {
                this.setState({
                  menu: !menu
                });
              }}
            >
              <span></span>
            </div>
              <div className="menu">
                <ul
                  onClick={() => {
                    this.setState({
                      menu: false
                    });
                  }}
                >
                  {data.sections.map((section, index) => {
                    return (
                      <li key={index}><Link to={`/#${section.name}`}>{section.name}</Link></li>
                    )
                  })}
                </ul>
              </div>
          </div>
        </div>
      </header>
    );
  }
}
