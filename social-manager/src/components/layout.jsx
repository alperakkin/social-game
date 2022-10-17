import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import LeftMenu from "./nav/leftmenu";
import NavBar from "./nav/navbar";
import Posts from "./posts/main";

class LayOut extends Component {
  state = {};
  postStyle = {
    marginTop: "100px",
  };

  lefMenustyle = {
    marginTop: "2%",
    height: "400px",
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <NavBar />
        </div>
        <div className="row d-flex" style={this.postStyle}>
          <div
            className="col-md-3 d-flex justify-content-start"
            style={this.lefMenustyle}
          >
            <LeftMenu />
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-6 d-flex justify-content-center">
            <Posts />
          </div>
        </div>
      </div>
    );
  }
}

export default LayOut;
