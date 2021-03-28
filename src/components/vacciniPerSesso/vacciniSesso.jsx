import React, { Component } from "react";

import { HorizontalBar } from "react-chartjs-2";

import Spinner from "react-bootstrap/Spinner";

export default class VacciniSesso extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fasce_eta: [],
      maschi: [],
      femmine: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/anagrafica-vaccini-summary-latest.json"
    )
      .then((res) => res.json())
      .then((body) => {
        var dati = body.data;
        var m = [];
        var f = [];
        var fasce = [];

        dati.forEach((el) => {
          fasce.push(el.fascia_anagrafica);
          m.push(el.sesso_maschile);
          f.push(el.sesso_femminile);
        });

        this.setState((state) => {
          return {
            ...state,
            fasce_eta: fasce,
            maschi: m,
            femmine: f,
            isLoading: false,
          };
        });
      });
  }

  render() {
    return (
        <div>
            {!this.state.isLoading ? (
                <HorizontalBar
                height={480}
                data={{
                  labels: this.state.fasce_eta,
                  datasets: [
                    {
                        barThickness: 12,
                        maxBarThickness: 16,
                        minBarLength: 15,
                        label: "Uomini",
                        data: this.state.maschi,
                        backgroundColor: "#286CAB"
                    },
                    {
                        barThickness: 12,
                        maxBarThickness: 16,
                        minBarLength: 15,
                        label: "Donne",
                        data: this.state.femmine,
                        backgroundColor: "#EA458A",
                    }
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  //responsive: true,
                  tooltips: {
                    mode: "label",
                    callbacks: {
                      label: function (t, d) {
                        var dstLabel = d.datasets[t.datasetIndex].label;
                        var xLabel = t.xLabel;
                        return dstLabel + ": " + xLabel.toLocaleString();
                      },
                    },
                  },
                  scales: {
                    xAxes: [
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
            ) : (
                <Spinner animation="grow" />
            )}   
        </div>
    )
}
}
