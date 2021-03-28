import React, { Component } from "react";
import "./footer.scss";

import {
  TiSocialLinkedinCircular,
  TiSocialGithubCircular,
} from "react-icons/ti";

export class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <p>
          Covid19-Italy Data - Made by Alessandro Gelmi
        </p>
        <div>
          <a
            className="iconLink"
            target="_blank"
            href="https://github.com/alessandrogelmi"
            rel="noreferrer"
          >
            <TiSocialGithubCircular size={50} />
          </a>

          <a
            className="iconLink"  
            target="_blank"
            href="https://www.linkedin.com/in/alessandro-gelmi-a9b2341b2"
            rel="noreferrer"
          >
            <TiSocialLinkedinCircular size={50}/>
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
