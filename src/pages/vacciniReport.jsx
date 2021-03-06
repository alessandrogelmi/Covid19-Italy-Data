import React, { Component } from "react";
import "./vacciniReport.scss";

import Moment from "moment";

import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import FioreVaccino from "../images/coccarda.svg";

import Particles from "react-tsparticles";
import VacciniFasciaEta from "../components/vacciniFasciaEta/vacciniFasciaEta";
import VacciniSesso from "../components/vacciniPerSesso/vacciniSesso";
import TabellaRegioni from "../components/tabellaRegioni/tabellaRegioni";

export default class VacciniReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prima_dose_totale: 0,
      seconda_dose_totale: 0,
      totale_somministrazioni: 0,
      dataFormattata: "",
      popolazione: 54009327,
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
          id="tsparticles" 
          options={{
            fps_limit: 100,
            interactivity:{
              detectsOn: "canvas",
              events:{
                onHover:{
                  enable: true,
                  mode: "grab"
                },
                resize: false,
              },
              modes:{
                grab: {
                  distance: 200,
                  duration: 0.4
                }
              }
            },
            particles:{
              color:{
                value: "#ffffff"
              },
              links:{
                color:"#ffffff",
                distance: 200,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move:{
                bounce: false,
                direction: "none",
                enable: true,
                outMode: "out",
                random: false,
                speed: 2,
                straight: false
              },
              number:{
                density:{
                  enable: true,
                  area: 800
                },
                value: 80
              },
              opacity:{
                value: 0.5
              },
              shape:{
                type: "circle"
              },
              size:{
                random: true,
                value:5
              }
            },
            detectRetina: true
          }} />
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
                    <p>
                      Il <b>{((this.state.seconda_dose_totale/this.state.popolazione)*100).toFixed(2)}%</b> della popolazione (over 12) ha completato il ciclo vaccinale
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
            <h3>Vaccinati per fasce d'et??</h3>
            <VacciniFasciaEta />
            <br />
            <hr />
            <br />
            <h3>Vaccinati per sesso</h3>
            <VacciniSesso />
            <br />
            <hr />
            <br />
            {/* <h3>Vaccinazioni per categoria</h3>
            <br />
            <CiambellaCategorie />
            <br />
            <hr />
            <br /> */}
            <h3>Numeri vaccini per regione</h3>
            <TabellaRegioni />
          </div>
        </Container>
      </div>
    );
  }
}
