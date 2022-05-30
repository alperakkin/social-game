import React, { Component } from "react";
import { getCookie } from "../../helpers/cookies";
class LayOut extends Component {
  state = {};
  styles = { paddingLeft: "10px" };

  render() {
    return (
      <nav className="navbar navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand col-8" href="#">
            <img
              src="favicon.ico"
              alt=""
              width="20"
              height="20"
              className="d-inline-block align-text-center"
            />
            <span style={this.styles}>Social Game</span>
          </a>

          <div className="dropdown dropbottom col-1">
            <button
              className="bi bi-house-fill dropdown-toggle  dropdown-toggle"
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Hi {getCookie("username")}
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton2"
              style={{ left: "-40%" }}
            >
              <li>
                <a className="dropdown-item active" href="/arena">
                  Go To Arena
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/leaderboard">
                  Leader Board
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/market">
                  Market
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="/delete">
                  Remove Me
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/logout">
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default LayOut;
