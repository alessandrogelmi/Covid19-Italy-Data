import React from 'react';
import './alert.scss';

import immagine from '../../images/alert.png'

import Alert from 'react-bootstrap/Alert';

const Allerta = () => {
    return (
        <Alert variant="danger" id="al">
            <img src={immagine} id="imgAlert" alt="Covid19"/><br/>
            <span><h5>EMERGENZA COVID-19</h5></span>
        </Alert>
    )

}

export default Allerta;



