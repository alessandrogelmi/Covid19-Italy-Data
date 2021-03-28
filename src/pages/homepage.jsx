import React, { Component } from "react";
import "./homepage.scss";

import Allerta from "../components/alert/alert";
import DatiNazionali from "../components/cardNazionale/cardNazionale";
import IntroCard from "../components/infoCard/infoCard";
import RegioniCard from "../components/cardRegioni/cardRegioni";
import CardMondo from "../components/cardMondo/cardMondo";
import BarChartPositivi from "../components/graficoPositivi/LineChartPositivi";
import StackedGroup from "../components/graficoOspedali/StackedGroupOspedali";
import LineChartVariazione from "../components/graficoVariazionePositivi/LineChartVariazione";

import Moment from "moment";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      dataFormattata: "",
      isLoaded: false,
    };
  }

  formattaData(data) {
    Moment.locale("it");
    var dtf = Moment(data).format("DD/MM/YYYY");
    this.setState((prevState) => {
      return {
        ...prevState,
        dataFormattata: dtf,
      };
    });
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale-latest.json"
    )
      .then((res) => res.json())
      .then((body) => {
        var dati = body[0];
        this.setState((prevState) => {
          return {
            ...prevState,
            dataFormattat: this.formattaData(dati.data),
            isLoaded: true,
          };
        });
      });
  }

  render() {
    return (
      <div id="appCovid">
        <Container id="cont">
          <Allerta />
          <IntroCard />

          <div id="datiCovidScroll">
            <CardMondo data={this.state.dataFormattata} />

            <div style={{ marginTop: "15px" }}>
              <DatiNazionali data={this.state.dataFormattata} />
            </div>

            <Row style={{ marginTop: "15px" }}>
              <Col lg={12}>
                <RegioniCard data={this.state.dataFormattata} />
              </Col>
            </Row>
          </div>
        </Container>

        <Container id="scrollGrafici">
          <BarChartPositivi />
          <br />
          <hr />
          <br />
          <StackedGroup />
          <br />
          <hr />
          <br />
          <LineChartVariazione />
          <br />
          <hr />
          <br />
        </Container>

        <div id="mappaCovid">
          <iframe
            title="Mappa"
            width="100%"
            height="550px"
            src="https://app.developer.here.com/coronavirus/"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    );
  }
}
