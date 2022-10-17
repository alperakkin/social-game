import React, { Component, useState } from "react";
import { getRequest, postRequest } from "../../helpers/requests";

class LeftMenu extends Component {
  state = {
    buttonColor: "black",
    show: false,
    teams: null,
    image: null,
  };
  async componentDidMount() {
    let teams = await getRequest("/teams/");
    this.setState({
      teams: teams.data.msg,
    });
  }

  EnterElement = () => {
    this.setState({ buttonColor: "green" });
  };
  LeaveElement = () => {
    this.setState({ buttonColor: "black" });
  };

  getTeams = () => {
    if (!this.state.teams) return;

    const teams = this.state.teams.map((team) => (
      <option key={team.team}>{team.team}</option>
    ));
    return teams;
  };

  uploadFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      this.setState({ image: reader.result });
    };
  };

  postMessage = () => {
    const payload = {
      msg: document.getElementById("msgBody").value,
      img: this.state.image,
      team_name: document.getElementById("teamSelection").value,
    };

    postRequest("/posts/create/", payload);
    window.location = "/";
  };

  render() {
    return (
      <div className="card">
        <div className="card-title"></div>
        <div className="card-body ">
          <ul className="list-group list-group-flush d-flex justify-content-center">
            <li
              className="list-group-item d-flex justify-content-center"
              data-toggle="tooltip"
              data-placement="top"
              title="Create a post"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="48"
                fill={this.state.buttonColor}
                className="bi bi-chat-dots"
                viewBox="0 0 16 16"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onMouseEnter={this.EnterElement}
                onMouseLeave={this.LeaveElement}
              >
                <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
              </svg>
            </li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Morbi leo risus</li>
            <li className="list-group-item">Porta ac consectetur ac</li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul>
        </div>
        <form>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Share a new Idea
                  </h5>
                  <button
                    id="closeModal"
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="teamSelection"
                  >
                    <option defaultValue>Select Team</option>
                    {this.getTeams()}
                  </select>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="msgBody"
                      rows="3"
                    ></textarea>
                    <input
                      className="form-control"
                      type="file"
                      id="fileUpload"
                      onChange={this.uploadFile}
                      multiple
                    ></input>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={this.postMessage}
                    className="btn btn-primary"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LeftMenu;
