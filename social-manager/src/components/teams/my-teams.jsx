import React, { Component } from "react";
import { deleteRequest, getRequest, postRequest } from "../../helpers/requests";
import style from "../../utilities/css/MyTeams.module.css";
class MyTeams extends Component {
  state = {
    data: null,
  };

  async componentDidMount() {
    let data = await getRequest("/teams/");
    this.setState({ data: data });
  }

  approve = async (teamname, username, status) => {
    await postRequest("/teams/approve/", {
      team_name: teamname,
      username: username,
      approval: status,
    });
    window.location = "/my-teams";
  };

  removeMember = async (team, memberName) => {
    await deleteRequest(
      `/teams/teammember/delete/?teamname=${team}&member=${memberName}`
    );
    await this.componentDidMount();
  };

  deleteTeam = async (teamname) => {
    await deleteRequest("/teams/delete/?teamname=" + teamname);
    await this.componentDidMount();
  };
  getRows = (team, rows) => {
    const items = rows.map((item, ind) => (
      <tr key={"rows_$" + ind}>
        <td className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className={`bi bi-person-x-fill ${style.icon}`}
            viewBox="0 0 16 16"
            onClick={() => this.removeMember(team, item.memberName)}
          >
            <path
              fillRule="evenodd"
              d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </td>
        <td className="text-center">{item.memberName}</td>
        <td className="text-center">{item.memberScore}</td>
        <td className={`text-center ${style.joined}`}>{item.memberJoined}</td>
        {!item.isApproved ? (
          <td className="text-center">
            <button
              className={`${style.button} ${style.success}`}
              onClick={() => this.approve(team, item.memberName, true)}
              data-toggle="tooltip"
              data-placement="top"
              title="Request to join the group"
            >
              Approve
            </button>
            <button
              className={`${style.button} ${style.failure}`}
              onClick={() => this.approve(team, item.memberName, false)}
              data-toggle="tooltip"
              data-placement="top"
              title="Request to join the group"
            >
              Reject
            </button>
          </td>
        ) : (
          <td className="text-center">Member</td>
        )}
      </tr>
    ));
    return items;
  };

  getCard = () => {
    if (this.state.data) {
      let arr = this.state.data.data.msg;
      const items = arr.map((item, ind) => (
        <div className={`col-12 card ${style.card}`} key={"tables_$" + ind}>
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-11">
                Team <strong>{item.team}</strong>
              </div>
              <i
                className="col-1 bi bi-x-circle"
                onClick={() => this.deleteTeam(item.team)}
              ></i>
              <div className={`row ${style.input}`}></div>
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <th className="text-center" scope="col"></th>
                    <th className="text-center" scope="col">
                      Member Name
                    </th>
                    <th className="text-center" scope="col">
                      Member Score
                    </th>
                    <th className="text-center" scope="col">
                      Member Date Joined
                    </th>
                    <th className="text-center" scope="col">
                      Member Status
                    </th>
                  </tr>
                </thead>
                <tbody>{this.getRows(item.team, item.team_members)}</tbody>
              </table>
            </div>
          </div>
        </div>
      ));

      return items;
    }
  };

  render() {
    return <div>{this.getCard()}</div>;
  }
}

export default MyTeams;
