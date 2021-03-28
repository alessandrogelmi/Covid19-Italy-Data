import React, { Component } from "react";

import { Doughnut } from "react-chartjs-2";

export default class CiambellaCategorie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categorie: [
        "Operatori Sanitari e Sociosantari",
        "Personale non sanitario",
        "Ospiti Struttre Residenziali",
        "Over 80",
        "Forze Armate",
        "Personale Scolastico",
        "Altro",
      ],
      dati_categorie: [],
    };
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/anagrafica-vaccini-summary-latest.json"
    )
      .then((res) => res.json())
      .then((body) => {
        var dati = body.data;
        var op_sanitari = 0;
        var op_non_sanitari = 0;
        var altro = 0;
        var rsa = 0;
        var over80 = 0;
        var forze_armate = 0;
        var scolastico = 0;
        var arr = [];
        dati.forEach((el) => {
          op_sanitari += el.categoria_operatori_sanitari_sociosanitari;
          op_non_sanitari += el.categoria_personale_non_sanitario;
          altro += el.categoria_altro;
          rsa += el.categoria_ospiti_rsa;
          over80 += el.categoria_over80;
          forze_armate += el.categoria_forze_armate;
          scolastico += el.categoria_personale_scolastico;
        });
        arr.push(
          op_sanitari,
          op_non_sanitari,
          rsa,
          over80,
          forze_armate,
          scolastico,
          altro
        );

        this.setState((state) => {
          return {
            ...state,
            dati_categorie: arr,
          };
        });
      });
  }

  render() {
    return (
      <div>
        <Doughnut
        height={480}
          data={{
            labels: this.state.categorie,
            datasets: [
              {
                data: this.state.dati_categorie,
                label: "Categoria",
                backgroundColor: [
                  "#f94144",
                  "#f3722c",
                  "#f8961e",
                  "#f9844a",
                  "#277da1",
                  "#90be6d",
                  "#4d908e",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            maintainAspectRatio : false,
            responsive: true,
            tooltips: {
              callbacks: {
                label: function (tooltipItems, data) {
                  return data.labels[tooltipItems.index] +": "+data.datasets[0].data[
                    tooltipItems.index
                  ].toLocaleString();
                },
              },
            }
          }}
          legend = {{
              position: "top",
              labels: {
                  fontSize: 15,
                  padding: 20
              }
          }}
        />
      </div>
    );
  }
}
