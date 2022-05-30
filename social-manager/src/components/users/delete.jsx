import { Component } from "react";
import axios from "axios";
import { getCookie, setCookie } from "../../helpers/cookies";

class Delete extends Component {
  state = {};

  deleteProcess() {
    axios
      .delete(
        `http://localhost:5000/api/delete/?username=${getCookie("username")}`,

        { headers: { Authorization: getCookie("authToken") } }
      )
      .then((resp) => {
        setCookie("username", null);
        setCookie("authToken", null);
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return <script>{this.deleteProcess()}</script>;
  }
}

export default Delete;
