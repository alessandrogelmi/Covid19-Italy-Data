import React from "react";
import "./daticovid.scss";

import Header2 from "../components/header/header2";
import Footer from "../components/footer/footer";

export default class CovidData extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div id="appCovid">
        <Header2 />

        <Footer />
      </div>
    );
  }
}
