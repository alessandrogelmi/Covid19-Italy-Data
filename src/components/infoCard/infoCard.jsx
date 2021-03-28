import React from "react";
import "./infoCard.scss";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import imgCovid from "../../images/introCovid.png";

export default class IntroCard extends React.Component {
  render() {
    return (
      <Card className="cardIntro">
        <Card.Body>
          <Row>
            <Col lg={3} md={3} sm={3}>
              <img src={imgCovid} id="imgCov" alt="Covid19" />
            </Col>

            <Col lg={9} md={9} sm={9}>
              <p>
                <b>
                  <h5>LINK UTILI:</h5>
                </b>
              </p>
              <ul>
                <li>
                  <a
                    href="https://www.governo.it/it/cscovid19/report-vaccini/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Report Vaccini Anti COVID-19
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.protezionecivile.gov.it/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Dipartimento della Protezione Civile
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.salute.gov.it/nuovocoronavirus"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ministero della Salute – Portale Nuovo Coronavirus{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.viaggiaresicuri.it/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ministero degli Affari Esteri e della Cooperazione
                    Internazionale – Viaggiare sicuri{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.epicentro.iss.it/coronavirus/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Istituto Superiore di Sanità – Portale epidemiologia per la
                    sanità pubblica
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.who.int/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    World Health Organization – OMS
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.protezionecivile.gov.it/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Dipartimento della Protezione Civile
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}
