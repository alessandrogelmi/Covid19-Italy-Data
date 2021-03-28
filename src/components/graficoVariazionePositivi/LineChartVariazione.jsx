import React from "react";

import NumericInput from "react-numeric-input";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import { Line } from "react-chartjs-2";

export default class LineChartVariazione extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      positivi: [],
      dateReport: [],
      isLoading: true,
      last30: true,
      numeriDaVisualizzare: 30,
    };
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json"
    )
      .then((res) => res.json())
      .then((body) => {
        var arr = [];
        var date = [];
        body.forEach((el) => {
          arr.push(el.nuovi_positivi);
          var d = new Date(el.data).toLocaleDateString("it-IT");
          date.push(d);
        });

        this.setState((prevState) => {
          return {
            ...prevState,
            positivi: arr,
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
        <Line
        height={400}
          data={{
            labels: this.state.dateReport.slice(1).slice(-daVisua),
            datasets: [
              {
                data: this.state.positivi.slice(1).slice(-daVisua),
                label: "Nuovi casi segnalati dal giorno precedente",
                borderColor: "rgb(149, 42, 40)",
                pointBorderWidth: 3,
                fill: true,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            //responsive: true,
            title: {
              display: true,
              text: "Variazione giornaliera positivi negli ultimi 30 giorni",
            },
            tooltips: {
              callbacks: {
                label: function (tooltipItems, data) {
                  return data.datasets[0].data[
                    tooltipItems.index
                  ].toLocaleString();
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
        <Line
        height={400}
          data={{
            labels: this.state.dateReport,
            datasets: [
              {
                data: this.state.positivi,
                label: "Nuovi casi segnalati dal giorno precedente",
                borderColor: "rgb(149, 42, 40)",
                fill: true,
                pointBorderWidth: 0.5,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            //responsive: true,
            title: {
              display: true,
              text:
                "Variazione giornaliera positivi da inizio pandemia (24/02/2020) ad oggi",
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
