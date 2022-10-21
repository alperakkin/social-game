import React, { Component } from "react";
import { getRequest, postRequest } from "../../helpers/requests";
import style from "../../utilities/css/AllTeams.module.css";

import { getCookie } from "../../helpers/cookies";
class AllTeams extends Component {
  state = {
    data: null,
  };

  async componentDidMount() {
    let data = await getRequest("/teams/all/");
    this.setState({ data: data });
  }

  async requestGroup(team) {
    let res = await postRequest("/teams/request/", { team_name: team });
    if (res.state === false) alert(res.data);
    window.location = "all-teams";
  }

  requestIcons = (item) => {
    let dIn =
      "M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z";
    let dOut = null;
    let cls = null;
    let styleIcon = style.icon;
    let user = item.team_members.find((x) => {
      return x.member === getCookie("username");
    });

    if (user) {
      if (user.is_approved === true) {
        cls = "bi bi-person-check-fill";
        dIn =
          "M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z";
        dOut =
          "M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z";
        styleIcon = style.approved;
      }
    }

    if (!user) {
      cls = "bi bi-person-plus col-4";
      dOut =
        "M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z";
    } else {
      dOut =
        "M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z";
      cls = "bi bi-person-plus-fill col-4";
    }

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        className={`${cls} ${styleIcon}`}
        viewBox="0 0 16 16"
        onClick={() => this.requestGroup(item.team)}
      >
        <path d={dOut} />
        <path fillRule="evenodd" d={dIn} />
      </svg>
    );
  };

  getRows = () => {
    if (this.state.data) {
      let arr = this.state.data.data.msg;

      const items = arr.map((item, ind) => (
        <tr key={"rows_$" + ind}>
          <td className="d-flex justify-content-center">
            {this.requestIcons(item)}

            <span className="col-8">{item.team}</span>
          </td>
          <td className="text-center">{item.score}</td>
          <td className="text-center" offset="10">
            <img
              className={`col-6 ${style.profile}`}
              src={item.profilePicture}
              alt=""
            />
            <span className={`col-6 ${style.creator}`}>{item.creator}</span>
          </td>
          <td className="text-center">{item.creator_score}</td>
          <td className="text-center">
            {
              item.team_members.filter((i) => {
                return i.is_approved === true;
              }).length
            }
          </td>
        </tr>
      ));
      return items;
    }
  };

  render() {
    return (
      <div className={`col-12 card ${style.card}`}>
        <div className="card-body">
          <div className="row justify-content-center">
            <div className="col-12">All Teams</div>
            <div className={`row ${style.input}`}></div>
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th className="text-center" scope="col">
                    Team Name
                  </th>
                  <th className="text-center" scope="col">
                    Team Score
                  </th>
                  <th className="text-center" scope="col">
                    Team Creator
                  </th>
                  <th className="text-center" scope="col">
                    Team Creator Score
                  </th>
                  <th className="text-center" scope="col">
                    Team Members
                  </th>
                </tr>
              </thead>
              <tbody>{this.getRows()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default AllTeams;
