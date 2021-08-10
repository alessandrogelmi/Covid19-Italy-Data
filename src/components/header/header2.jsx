import React, {useState} from "react";

import "./header2.scss";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ScrollToTop from '../functionScrollto0'

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Favicon from "../../images/favicon.png";
import Homepage from "../../pages/homepage";
import VacciniReport from "../../pages/vacciniReport";
import NotFound from "../../pages/notfound";

export default function Header2(props) {

  const [navExpanded, setNavExpanded] = useState(false);

  function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  function setNavExpand(expanded) {
    return setNavExpanded(expanded);
  }

  function closeNav() {
    return setNavExpanded(false);
  }

  return (
    <React.Fragment>
      <Router>
        <ScrollToTop />
        <CssBaseline />
        <HideOnScroll {...props}>
          <AppBar style={{ background: "#343A40" }}>
            <Toolbar>
              <Navbar onToggle={setNavExpand}
                expanded= {navExpanded} bg="dark" variant="dark" expand="md">
                <Navbar.Brand>
                  <Link to="/">
                    <img src={Favicon} alt="logo" style={{ maxWidth: 40 }} />
                    <span className="textBrand">
                      <Navbar.Brand>&nbsp;{" "}Covid19-Italy Data</Navbar.Brand>
                    </span>
                  </Link>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse
                  id="basic-navbar-nav"
                  style={{ textAlign: "center" }}
                >
                  <Nav className="ml-auto">
                    <Nav.Link onClick={closeNav}>
                      <Link to="/" className="scrollMapp">
                        Homepage
                      </Link>
                    </Nav.Link>

                    <Nav.Link onClick={closeNav}>
                      <Link to="/report-vaccini" className="scrollMapp">
                        Report Vaccini
                      </Link>
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/report-vaccini" component={VacciniReport} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}