import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import NavBar from "./nav/navbar";

class LayOut extends Component {
  state = {};

  render() {
    return (
      <div className="container">
        <NavBar></NavBar>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <code id="cookies" />
        </Router>
      </div>
    );
  }
}

export default LayOut;
