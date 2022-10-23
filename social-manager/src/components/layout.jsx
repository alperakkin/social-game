import React, { Component } from "react";
import LeftMenu from "./nav/leftmenu";
import NavBar from "./nav/navbar";
import Posts from "./posts/main";
import AllTeams from "./teams/all-teams";
import CreateTeam from "./teams/create-team";
import MyTeams from "./teams/my-teams";
import Main from "./game/main";

class LayOut extends Component {
  state = {};
  postStyle = {
    marginTop: "100px",
  };

  keys = {
    "/": Posts,
    "/all-teams": AllTeams,
    "/create-team": CreateTeam,
    "/my-teams": MyTeams,
    "/game": Main,
  };

  leftMenustyle = {
    marginTop: "2%",
    height: "400px",
  };

  render() {
    const DynamicElement = this.keys[window.location.pathname];
    return (
      <div className="container">
        <div className="row">
          <NavBar />
        </div>
        <div className="row d-flex" style={this.postStyle}>
          <div
            className="col-md-3 d-flex justify-content-start"
            style={this.leftMenustyle}
          >
            <LeftMenu />
          </div>

          <div className="col-md-9 d-flex justify-content-center">
            <DynamicElement />
          </div>
        </div>
      </div>
    );
  }
}

export default LayOut;
