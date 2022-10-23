import React, { Component } from "react";
import { getCookie } from "../../helpers/cookies";
import style from "../../resource/css/navbar.module.css";
class NavBar extends Component {
  state = {
    image: null,
  };
  styles = { paddingLeft: "10px" };
  componentDidMount() {
    this.setState({
      image: localStorage.getItem(`profilePicture_${getCookie("username")}`),
    });
  }
  render() {
    return (
      <nav className="navbar navbar-light bg-light fixed-top  col-md-12">
        <a className="navbar-brand col-8" href="/">
          <img
            src="favicon.png"
            alt=""
            width="50"
            height="50"
            className="d-inline-block align-text-center"
          />
          <span style={this.styles}>Social Game</span>
        </a>

        <div className="dropdown dropbottom col-1">
          {this.state.image ? (
            <img
              className={`dropdown-toggle ${style.profile}`}
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              src={localStorage.getItem(
                `profilePicture_${getCookie("username")}`
              )}
              alt=""
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-person-circle  dropdown-toggle"
              viewBox="0 0 16 16"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
          )}

          <ul
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton2"
            style={{ left: "-40%" }}
          >
            <li>
              <span className={`${style.user}`}>
                Hi <strong>{getCookie("username")}</strong>
              </span>
              <a className="dropdown-item active" href="/game">
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
      </nav>
    );
  }
}

export default NavBar;
