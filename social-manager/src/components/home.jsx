import React, { Component } from "react";
import LayOut from "./layout";
import { validateAuth } from "../helpers/requests";
class Home extends Component {
  state = {
    auth: false,
    data: null,
  };

  async componentDidMount() {
    let data = await validateAuth("");
    this.setState({ auth: data.state, data: data });
  }

  render() {
    return (
      <div className="container">
        <div className="row">{this.state.auth ? <LayOut /> : <p>error</p>}</div>
      </div>
    );
  }
}

export default Home;
