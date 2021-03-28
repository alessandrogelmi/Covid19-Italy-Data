import React from "react";
import "./cardRegioni.scss";
import Select from "react-select";

import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Spinner from "react-bootstrap/Spinner";

export default class RegioniCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elencoRegioni: [],
      dataFormattata: "",
      datiRegioneSelezionata: [],
      idRegioneSelezionata: null,
      optionsSelect: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json"
    )
      .then((res) => res.json())
      .then((body) => {
        const options = body.map((regione) => ({
          value: regione.codice_regione,
          label: regione.denominazione_regione,
        }));

        this.setState((prevState) => {
          return {
            ...prevState,
            elencoRegioni: body,
            optionsSelect: options,
          };
        });

        this.getDatiOdierni(13);
      });
  }

  onChange = (event) => {
    const regioneId = event.value;
    this.getDatiOdierni(regioneId);
  };

  getDatiOdierni(id) {
    let indiceRegione = 0;
    //Scorro array. Salvo in una variabile la posizione dell'array di quella regione e poi leggo i dati
    for (let i = 0; i < this.state.elencoRegioni.length; i++) {
      if (this.state.elencoRegioni[i].codice_regione === parseInt(id))
        indiceRegione = i;
    }

    var dati = this.state.elencoRegioni[indiceRegione];

    this.setState((state) => {
      return {
        ...state,
        datiRegioneSelezionata: dati,
        idRegioneSelezionata: id,
        isLoading: false,
      };
    });
  }

  formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  render() {
    return (
      <Card id="c">
        <Card.Header id="cardHead">
          <h5>CASI REGIONALI ITALIA</h5>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {!this.state.isLoading ? (
              <Select
                className="basic-single"
                classNamePrefix="select"
                onChange={this.onChange}
                defaultValue={this.state.optionsSelect[0]}
                options={this.state.optionsSelect}
              />
            ) : (
              <div style={{ textAlign: "center" }}>
                <Spinner animation="grow" />
              </div>
            )}
          </Card.Text>

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
                    <Card.Text>
                      {!this.state.isLoading ? (
                        <div>
                          <p>
                            Nuovi Positivi:
                            <b>
                              {" "}
                              +
                              {this.formatNumber(
                                this.state.datiRegioneSelezionata.nuovi_positivi
                              )}
                            </b>
                          </p>

                          <p>
                            Totale persone attualmente positive:{" "}
                            <b>
                              {this.formatNumber(
                                this.state.datiRegioneSelezionata
                                  .totale_positivi
                              )}
                            </b>
                          </p>

                          <p>
                            Pazienti ricoverati con sintomi:{" "}
                            <b>
                              {this.formatNumber(
                                this.state.datiRegioneSelezionata
                                  .ricoverati_con_sintomi
                              )}
                            </b>
                          </p>

                          <p>
                            Pazienti ricoverati in terapia intensiva:{" "}
                            <b>
                              {this.formatNumber(
                                this.state.datiRegioneSelezionata
                                  .terapia_intensiva
                              )} {" "}
                              (+
                              {this.formatNumber(
                                this.state.datiRegioneSelezionata.ingressi_terapia_intensiva
                              )})
                            </b>
                          </p>

                          <p>
                            Totale pazienti ospedalizzati:{" "}
                            <b>
                              {this.formatNumber(
                                this.state.datiRegioneSelezionata
                                  .totale_ospedalizzati
                              )}
                            </b>
                          </p>

                          <p>
                            Persone in isolamento domiciliare:{" "}
                            <b>
                              {this.formatNumber(
                                this.state.datiRegioneSelezionata
                                  .isolamento_domiciliare
                              )}
                            </b>
                          </p>
                        </div>
                      ) : (
                        <div style={{ textAlign: "center" }}>
                          <Spinner animation="grow" />
                        </div>
                      )}
                    </Card.Text>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                  {!this.state.isLoading ? (
                      <Card.Text>
                        <p>Dati da inizio pandemia: 24/02/2020</p>
                        <p>
                          Totale casi:{" "}
                          <b>
                            {this.formatNumber(
                              this.state.datiRegioneSelezionata.totale_casi
                            )}
                          </b>
                        </p>
                        <p>
                          Totale deceduti:{" "}
                          <b>
                            {this.formatNumber(this.state.datiRegioneSelezionata.deceduti)}
                          </b>
                        </p>
                        <p>
                          Totale persone dimesse guarite:{" "}
                          <b>
                            {this.formatNumber(this.state.datiRegioneSelezionata.dimessi_guariti)}
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
