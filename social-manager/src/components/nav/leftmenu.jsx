import React, { Component } from "react";
import { getRequest, postRequest } from "../../helpers/requests";
import style from "../../utilities/css/navbar.module.css";
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
      <div className="card col-md-12">
        <div className="card-title"></div>
        <div className="card-body ">
          <ul className="list-group list-group-flush d-flex justify-content-center">
            <li
              className="list-group-item d-flex justify-content-left"
              data-toggle="tooltip"
              data-placement="top"
              title="Create a post"
            >
              <span
                className={`${style.href}`}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i className="bi bi-chat-dots" />
                <span className={`${style.hrefText}`}>Post Message</span>
              </span>
            </li>
            <li className="list-group-item">
              <a className={`${style.href}`} href="all-teams">
                <i className="bi bi-card-list" />
                <span className={`${style.hrefText}`}>All Teams</span>
              </a>
            </li>
            <li className="list-group-item">
              <a className={`${style.href}`} href="my-teams">
                <i className="bi bi-clipboard-heart" />
                <span className={`${style.hrefText}`}>My Teams</span>
              </a>
            </li>
            <li className="list-group-item">
              <a className={`${style.href}`} href="create-team">
                <i className="bi bi-save" />
                <span className={`${style.hrefText}`}>Create Team</span>
              </a>
            </li>
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
                    <div className={`image-upload ${style.fileIcon}`}>
                      <label htmlFor="file-input">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          fill="currentColor"
                          className={`bi bi-cloud-upload `}
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
                          />
                          <path
                            fillRule="evenodd"
                            d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"
                          />
                        </svg>
                      </label>

                      <input
                        className={`${style.file}`}
                        id="file-input"
                        type="file"
                        onChange={this.uploadFile}
                      />
                    </div>
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
