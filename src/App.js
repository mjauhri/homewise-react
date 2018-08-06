import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem} from "react-bootstrap";
import Routes from "./Routes";
import "./App.css";

class App extends Component {
  render() {
  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
          <Navbar.Brand>
          <Link to="/">HomeWise</Link>
          </Navbar.Brand>
        <Navbar.Collapse>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}
}

export default App;