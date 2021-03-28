import React, { Component } from 'react'

import { Bar } from "react-chartjs-2";

import Spinner from "react-bootstrap/Spinner";

export default class VacciniFasciaEta extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             fasce_eta: [],
             tot_somministrazioni: [],
             isLoading: true
        }
    }

    componentDidMount() {
        fetch("https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/anagrafica-vaccini-summary-latest.json")
            .then((res) => res.json())
            .then((body) => {
                var fasce = [];
                var tot = [];
                var dati = body.data;
                dati.forEach((el) => {
                    fasce.push(el.fascia_anagrafica);
                    tot.push(el.totale);
                })

                this.setState((state) => { 
                    return { 
                        ...state,
                        fasce_eta: fasce,
                        tot_somministrazioni: tot,
                        isLoading: false
                    }
                })
            })

    }
    
    render() {
        return (
            <div>
                {!this.state.isLoading ? (
                    <Bar
                    height={480}
                    data={{
                      labels: this.state.fasce_eta,
                      datasets: [
                        {
                            barThickness: 25,
                            minBarThickness: 25,
                            maxBarThickness: 65,
                            minBarLength: 20,
                            label: "Vaccini per fascia d'età",
                            data: this.state.tot_somministrazioni,
                            backgroundColor: "#22CECE"
                        }
                      ],
                    }}
                    options={{
                      maintainAspectRatio: false,
                      responsive: true,
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
                ) : (
                    <Spinner animation="grow" />
                )}   
            </div>
        )
    }
}
