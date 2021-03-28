import React, { Component } from "react";

import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

export default class TabellaRegioni extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dati: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/vaccini-summary-latest.json"
    )
      .then((res) => res.json())
      .then((body) => {
        var dati = body.data;
        var result = [];

        dati.forEach((el) => {
          result.push({
            regione: el.nome_area,
            dosi_somministrate: el.dosi_somministrate,
            dosi_consegnate: el.dosi_consegnate,
            percentuale: el.percentuale_somministrazione,
          });
        });

        this.setState((prevState) => {
          return {
            ...prevState,
            dati: result,
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
      <div>
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th key={1}>Regione</th>
              <th>Dosi Somministrate</th>
              <th>Dosi Consegnate</th>
              <th>Percentuale Somministrazione</th>
            </tr>
          </thead>
          <tbody>
            {!this.state.isLoading ? (
              this.state.dati.map((el) => {
                return (
                  <tr>
                    <td>{el.regione}</td>
                    <td>{this.formatNumber(el.dosi_somministrate)}</td>
                    <td>{this.formatNumber(el.dosi_consegnate)}</td>
                    <td>{el.percentuale} %</td>
                  </tr>
                );
              })
            ) : (
              <div style={{ textAlign: "center" }}>
                <Spinner animation="grow" />
              </div>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}
