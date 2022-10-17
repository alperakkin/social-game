import React, { Component } from "react";
import { getRequest } from "../../helpers/requests";
import Message from "./message";
class Posts extends Component {
  state = {
    auth: null,
    data: null,
  };

  styles = {
    marginTop: "30px",
    textAlign: "center",
  };

  iconStyles = {
    marginRight: "5px",
  };

  async componentDidMount() {
    let data = await getRequest("/posts/");
    this.setState({ auth: data.state, data: data });
  }

  getMessages() {
    if (this.state.data) {
      let arr = this.state.data.data.msg;
      const items = arr.map((item) => (
        <Message
          key={item.id}
          user={item.name}
          id={item.id}
          img={item.img}
          date={item.date}
          msg={item.msg}
          team={item.team}
        />
      ));
      return items;
    }
  }

  render() {
    return <div className="col-md-12">{this.getMessages()}</div>;
  }
}

export default Posts;
