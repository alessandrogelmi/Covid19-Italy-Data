import React from "react";
import "./notfound.scss";

import { NavLink } from "react-router-dom";

import { IconContext } from "react-icons";
import { HiOutlineEmojiSad } from "react-icons/hi";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function NotFound() {
  return (
    <Container id="c">
        <div className="notfound">
          <IconContext.Provider value={{ className: "icons" }}>
            <div>
              <HiOutlineEmojiSad size={180} />
            </div>
          </IconContext.Provider>
          <h2>Oops Error 404 - Pagina non trovata</h2>
          <br />
          <h5>La pagina che stai cercando non esiste o è stata spostata</h5>
          <br />
          <NavLink to="/">
            <Button variant="primary">Torna alla Homepage</Button>
          </NavLink>
        </div>
    </Container>
  );
}
