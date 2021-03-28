import React, { Component } from "react";

import NumericInput from "react-numeric-input";

import { Bar } from "react-chartjs-2";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export default class StackedGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ricoverati_con_sintomi: [],
      terapia_intensiva: [],
      totale_ospedalizzati: [],
      dateReport: [],
      isLoading: true,
      last30: true,
      numeriDaVisualizzare: 30,
    };
  }

  formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json"
    )
      .then((res) => res.json())
      .then((body) => {
        var ric = [];
        var ter = [];
        var tot = [];
        var date = [];
        body.forEach((el) => {
          ric.push(el.ricoverati_con_sintomi);
          ter.push(el.terapia_intensiva);
          tot.push(el.totale_ospedalizzati);

          var d = new Date(el.data).toLocaleDateString("it-IT");
          date.push(d);
        });

        this.setState((prevState) => {
          return {
            ...prevState,
            ricoverati_con_sintomi: ric,
            terapia_intensiva: ter,
            totale_ospedalizzati: tot,
            dateReport: date,
            isLoading: false,
            last30: true,
            numeriDaVisualizzare: 30,
          };
        });
      });
  }

  handleClick() {
    this.setState((prevState) => {
      return {
        ...prevState,
        last30: !prevState.last30,
        numeriDaVisualizzare: 30,
      };
    });
  }

  onChange = (e) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        numeriDaVisualizzare: e,
      };
    });
  };

  renderContent(daVisua) {
    if (this.state.last30) {
      return (
        <Bar
        
        height={400}
          data={{
            labels: this.state.dateReport.slice(1).slice(-daVisua),
            datasets: [
              {
                label: "Ricoverati con sintomi",
                data: this.state.ricoverati_con_sintomi
                  .slice(1)
                  .slice(-daVisua),
                backgroundColor: "rgb(31, 119, 180)",
                stack: 2,
              },
              {
                label: "Terapia intensiva",
                data: this.state.terapia_intensiva.slice(1).slice(-daVisua),
                backgroundColor: "rgb(217, 109, 43)",
                stack: 2,
              },
              {
                label: "Totale ospedalizzati",
                data: this.state.totale_ospedalizzati.slice(1).slice(-daVisua),
                backgroundColor: "rgb(71, 125, 71)",
                stack: 1,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            //responsive: true,
            title: {
              display: true,
              text: `Situazione ospedali negli ultimi ${this.state.numeriDaVisualizzare} giorni`,
            },
            tooltips: {
              mode: "label",
              callbacks: {
                label: function (t, d) {
                  var dstLabel = d.datasets[t.datasetIndex].label;
                  var yLabel = t.yLabel;
                  return dstLabel + ": " + yLabel.toLocaleString();
                },
              },
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: false,
                    callback: function (value, index, values) {
                      return value.toLocaleString();
                    },
                  },
                },
              ],
            },
          }}
        />
      );
    } else {
      return (
        <Bar
        height={400}
          data={{
            labels: this.state.dateReport,
            datasets: [
              {
                label: "Ricoverati con sintomi",
                data: this.state.ricoverati_con_sintomi,
                backgroundColor: "rgb(31, 119, 180)",
                stack: 2,
              },
              {
                label: "Terapia intensiva",
                data: this.state.terapia_intensiva,
                backgroundColor: "rgb(217, 109, 43)",
                stack: 2,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            //responsive: true,
            title: {
              display: true,
              text:
                "Situazione ospedali da inizio pandemia (24/02/2020) ad oggi",
            },
          }}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <div style={{ float: "right" }}>
          {this.state.last30 ? (
            <Button
              variant="outline-primary"
              onClick={() => this.handleClick()}
            >
              Mostra l'intera linea temporale
            </Button>
          ) : (
            <Button
              variant="outline-primary"
              onClick={() => this.handleClick()}
            >
              Mostra ultimi 30 giorni
            </Button>
          )}
        </div>
        {!this.state.isLoading ? (
          <div>
            {this.renderContent(this.state.numeriDaVisualizzare)}
            {this.state.last30 ? (
              <div style={{ float: "right" }}>
                <b>
                  Numero di giorni da visualizzare:{" "}
                  <NumericInput
                    min={1}
                    max={this.state.dateReport.length}
                    value={this.state.numeriDaVisualizzare}
                    name="numeriDaVisualizzare"
                    onChange={this.onChange}
                    size={5}
                  />{" "}
                </b>
              </div>
            ) : null}
          </div>
        ) : (
          <Spinner animation="grow" />
        )}
      </div>
    );
  }
}
