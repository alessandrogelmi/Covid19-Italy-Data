import React from "react";
import "./cardNazionale.scss";

import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Spinner from "react-bootstrap/Spinner";

export default class DatiNazionali extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataFormattata: "",
      datiItaliaOdierni: {
        nuovi_positivi: "",
        ricoverati_con_sintomi: "",
        terapia_intensiva: "",
        nuovi_ingressi_ti: "",
        totale_ospedalizzati: "",
        isolamento_domiciliare: "",
        totale_positivi: "",
      },
      datiTotali: {
        totale_casi: "",
        deceduti: "",
        guariti: ""
      },
      isLoading: true,
    };
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
            datiItaliaOdierni: {
              nuovi_positivi: dati.nuovi_positivi,
              ricoverati_con_sintomi: dati.ricoverati_con_sintomi,
              terapia_intensiva: dati.terapia_intensiva,
              nuovi_ingressi_ti: dati.ingressi_terapia_intensiva,
              totale_ospedalizzati: dati.totale_ospedalizzati,
              isolamento_domiciliare: dati.isolamento_domiciliare,
              totale_positivi: dati.totale_positivi,
            },
            datiTotali: {
              totale_casi: dati.totale_casi,
              deceduti: dati.deceduti,
              guariti: dati.dimessi_guariti,
            },
            isLoading: false,
          };
        });
      });
  }

  formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  render() {
    return (
      <Card id="c">
        <Card.Header id="cardHead">
          <h5>CASI NAZIONALI ITALIA</h5>
        </Card.Header>
        <Card.Body>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item className="prova">
                    <Nav.Link eventKey="first">Dati odierni</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Dati totali</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    {!this.state.isLoading ? (
                      <Card.Text>
                        <p>
                          Numero di contagiati odierni:{" "}
                          <b>
                            +
                            {this.formatNumber(
                              this.state.datiItaliaOdierni.nuovi_positivi
                            )}
                          </b>
                        </p>
                        <p>
                          Totale persone attualmente positive:{" "}
                          <b>
                            {this.formatNumber(
                              this.state.datiItaliaOdierni.totale_positivi
                            )}
                          </b>
                        </p>
                        <p>
                          Pazienti ricoverati con sintomi:{" "}
                          <b>
                            {this.formatNumber(
                              this.state.datiItaliaOdierni
                                .ricoverati_con_sintomi
                            )}
                          </b>
                        </p>
                        <p>
                          Pazienti ricoverati in terapia intensiva:{" "}
                          <b>
                            {this.formatNumber(
                              this.state.datiItaliaOdierni.terapia_intensiva
                            )}{" "}
                            (+
                            {this.formatNumber(
                              this.state.datiItaliaOdierni.nuovi_ingressi_ti
                            )}
                            )
                          </b>
                        </p>
                        <p>
                          Totale pazienti ospedalizzati:{" "}
                          <b>
                            {this.formatNumber(
                              this.state.datiItaliaOdierni.totale_ospedalizzati
                            )}
                          </b>
                        </p>
                        <p>
                          Persone in isolamento domiciliare:{" "}
                          <b>
                            {this.formatNumber(
                              this.state.datiItaliaOdierni
                                .isolamento_domiciliare
                            )}
                          </b>
                        </p>
                      </Card.Text>
                    ) : (
                      <div style={{ textAlign: "center" }}>
                        <Spinner animation="grow" />
                      </div>
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    {!this.state.isLoading ? (
                      <Card.Text>
                        <p>Dati da inizio pandemia: 24/02/2020</p>
                        <p>
                          Totale casi:{" "}
                          <b>
                            {this.formatNumber(
                              this.state.datiTotali.totale_casi
                            )}
                          </b>
                        </p>
                        <p>
                          Totale deceduti:{" "}
                          <b>
                            {this.formatNumber(this.state.datiTotali.deceduti)}
                          </b>
                        </p>
                        <p>
                          Totale persone dimesse guarite:{" "}
                          <b>
                            {this.formatNumber(this.state.datiTotali.guariti)}
                          </b>
                        </p>
                      </Card.Text>
                    ) : (
                      <div style={{ textAlign: "center" }}>
                        <Spinner animation="grow" />
                      </div>
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Card.Body>
        <Card.Footer className="text-muted" id="cardFoot">
          Dati aggiornati il: {this.props.data}
        </Card.Footer>
      </Card>
    );
  }
}
