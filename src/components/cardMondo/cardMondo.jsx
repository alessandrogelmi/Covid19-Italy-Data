import React from "react";
import Card from "react-bootstrap/Card";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default class CardMondo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      casi: 0,
      decessi: 0,
      guariti: 0,
      casi_oggi: 0,
      decessi_oggi: 0,
      guariti_oggi: 0,
    };
  }

  componentDidMount() {
    fetch("https://corona.lmao.ninja/v2/all")
      .then((res) => res.json())
      .then((body) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            casi: body.cases,
            decessi: body.deaths,
            guariti: body.recovered,
            casi_oggi: body.todayCases,
            decessi_oggi: body.todayDeaths,
            guariti_oggi: body.todayRecovered,
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
          <h5>CASI MONDIALI</h5>
        </Card.Header>
        <Card.Body
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* TRIPLA CARD */}

          <Row style={{textAlign: "center"}}>
            {/* CARTA INFETTI */}
            <Col lg={4} md={12} style={{display: "flex",justifyContent: "center"}}>
              <Card
                style={{
                  width: "18rem",
                  borderBottom: "15px solid rgba(0,0,255,0.65)",
                  borderLeft: "none",
                  borderTop: "none",
                  borderRight: "none",
                }}
              >
                <Card.Body>
                  <Card.Title>Casi</Card.Title>
                  <Card.Subtitle className="mb-2">
                    <b>{this.formatNumber(this.state.casi)}*</b><br/>
                    <b>(+{this.formatNumber(this.state.casi_oggi)})</b>
                  </Card.Subtitle>
                  <Card.Text>Totale casi positivi nel mondo</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4} md={12} style={{display: "flex",justifyContent: "center"}}>
              <Card
                style={{
                  width: "18rem",
                  borderBottom: "15px solid rgba(0,255,0,0.65)",
                  borderLeft: "none",
                  borderTop: "none",
                  borderRight: "none",
                }}
              >
                <Card.Body>
                  <Card.Title>Guariti</Card.Title>
                  <Card.Subtitle className="mb-2">
                    <b>{this.formatNumber(this.state.guariti)}*</b><br/>
                    <b>(+{this.formatNumber(this.state.guariti_oggi)})</b>
                  </Card.Subtitle>
                  <Card.Text>Totale guariti nel mondo</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4} md={12} style={{display: "flex",justifyContent: "center"}}>
              <Card
                style={{
                  width: "18rem",
                  borderBottom: "15px solid rgba(255,0,0,0.65)",
                  borderLeft: "none",
                  borderTop: "none",
                  borderRight: "none",
                }}
              >
                <Card.Body>
                  <Card.Title>Decessi</Card.Title>
                  <Card.Subtitle className="mb-2">
                    <b>{this.formatNumber(this.state.decessi)}*</b><br/>
                    <b>(+{this.formatNumber(this.state.decessi_oggi)})</b>
                  </Card.Subtitle>
                  <Card.Text>Totale decessi nel mondo</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-muted" id="cardFoot">
          Dati aggiornati il: {this.props.data}
          <br />
          <b>* Dati da inizio pandemia</b>
        </Card.Footer>
      </Card>
    );
  }
}
