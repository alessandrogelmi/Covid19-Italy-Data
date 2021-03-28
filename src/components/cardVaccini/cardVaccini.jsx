import React from "react";
import './cardVaccini.scss'

import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom";

import LogoVaccini from '../../images/vacc.png'

export default function CardVaccini() {
  return (
    <div>
      <Card id="cardVacc">
        <div className="imageCard">
            <Card.Img variant="top" style={{maxWidth: "120px",}} src={LogoVaccini} />
        </div>
        <Card.Body>
          <Card.Title><Link to="/report-vaccini">Visualizza report vaccinazioni</Link></Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}
