import { Component } from "react";

import { logOutProcess } from "../../helpers/requests";
class LogOut extends Component {
  state = {};

  render() {
    return <script>{logOutProcess()}</script>;
  }
}

export default LogOut;
