import React, { Component } from "react";
import "./vacciniReport.scss";

import Moment from "moment";

import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import FioreVaccino from "../images/fiorevacc.png";

import Particles from "react-particles-js";
import VacciniFasciaEta from "../components/vacciniFasciaEta/vacciniFasciaEta";
import VacciniSesso from "../components/vacciniPerSesso/vacciniSesso";
import TabellaRegioni from "../components/tabellaRegioni/tabellaRegioni";
import CiambellaCategorie from "../components/graficoCiambellaCategorie/ciambellaCategorie";

export default class VacciniReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prima_dose_totale: 0,
      seconda_dose_totale: 0,
      totale_somministrazioni: 0,
      dataFormattata: "",
    };
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/anagrafica-vaccini-summary-latest.json"
    )
      .then((res) => res.json())
      .then((body) => {
        var dati = body.data;
        var totalePrimaDose = 0;
        var totaleSecondaDose = 0;
        var totaleSomministrazioni;
        dati.forEach((el) => {
          totalePrimaDose += el.prima_dose;
          totaleSecondaDose += el.seconda_dose;
          totaleSomministrazioni = totalePrimaDose + totaleSecondaDose;
        });

        console.log(totalePrimaDose);
        console.log(totaleSecondaDose);

        this.setState((prevState) => {
          return {
            ...prevState,
            prima_dose_totale: totalePrimaDose,
            seconda_dose_totale: totaleSecondaDose,
            totale_somministrazioni: totaleSomministrazioni,
            dataFormattata: this.formattaData(dati[0].ultimo_aggiornamento),
          };
        });
      });
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

  formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  render() {
    return (
      <div style={{ paddingBottom: "25px" }}>
        <div className="headerVaccini">
          <h1 className="title">Report Vaccini Anti COVID-19</h1>
          <Particles
            params={{
              particles: {
                number: {
                  value: 50,
                },
                size: {
                  value: 6,
                },
              },
              interactivity: {
                events: {
                  onhover: {
                    enable: true,
                    mode: "grab",
                  },
                  onClick: {
                    enable: true,
                    mode: 'bubble',
                  },
                },
                modes: {
                  grab: {
                      distance: 400,
                      line_linked: {
                        opacity: 1
                      }
                  },
                  bubble: {
                      distance: 400,
                      size: 20,
                      duration: 0.2,
                      opacity: 0.8,
                      speed: 10
                  }
              },
            }
            }}
            height={250}
          />
        </div>

        <Container>
          <div
            style={{
              paddingTop: "25px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card>
              <Card.Header id="cardHead">RIEPILOGO VACCINAZIONI</Card.Header>
              <Card.Body>
                <Row>
                  <Col lg={2} md={2}>
                    <img
                      src={FioreVaccino}
                      id="fioreVacc"
                      alt="Fiore Vaccinazioni"
                    ></img>
                  </Col>

                  <Col lg={9} md={9}>
                    <p>
                      Totale somministrazioni:{" "}
                      <b>
                        {this.formatNumber(this.state.totale_somministrazioni)}
                      </b>
                    </p>
                    <p>
                      Totale prime dosi somministrate:{" "}
                      <b>{this.formatNumber(this.state.prima_dose_totale)}</b>
                    </p>
                    <p>
                      Totale vaccinati (prima e seconda dose):{" "}
                      <b>{this.formatNumber(this.state.seconda_dose_totale)}</b>
                    </p>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer id="cardFoot">
                Dati aggiornati il: {this.state.dataFormattata}
              </Card.Footer>
            </Card>
          </div>

          <div style={{ width: "100%", textAlign: "center" }}>
            <br />
            <h3>Vaccinati per fasce d'età</h3>
            <VacciniFasciaEta />
            <br />
            <hr />
            <br />
            <h3>Vaccinati per sesso</h3>
            <VacciniSesso />
            <br />
            <hr />
            <br />
            <h3>Vaccinazioni per categoria</h3>
            <br />
            <CiambellaCategorie />
            <br />
            <hr />
            <br />
            <h3>Numeri vaccini per regione</h3>
            <TabellaRegioni />
          </div>
        </Container>
      </div>
    );
  }
}
