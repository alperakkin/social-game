import React, { Component } from "react";

import NavBar from "./nav/navbar";

class LayOut extends Component {
  state = {};

  render() {
    return (
      <div className="container">
        <div className="row">
          <NavBar />
        </div>
      </div>
    );
  }
}

export default LayOut;
