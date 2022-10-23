import React, { Component } from "react";
import { postRequest } from "../../helpers/requests";
import { getCookie } from "../../helpers/cookies";
import style from "../../resource/css/createTeam.module.css";

class CreateTeam extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }
  state = {};

  async componentDidMount() {}

  handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
  };
  createTeam = () => {
    let input = this.inputRef.current.value;
    postRequest("/teams/create/", { team_name: input });
    window.location = "/all-teams";
  };
  render() {
    return (
      <div className={`card ${style.card}`}>
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              Hi <strong>{getCookie("username")}</strong> Please enter an unique
              Team Name!
            </div>
            <div className={`row ${style.input}`}>
              <input
                className="col-8"
                placeholder="Team Name"
                ref={this.inputRef}
              />
              <button
                className={`col-4 bi bi-save ${style.button}`}
                type="button"
                onClick={this.createTeam}
                onSubmit={this.handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateTeam;
