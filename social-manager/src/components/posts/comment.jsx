import React, { Component } from "react";
import { getRequest, postRequest } from "../../helpers/requests";
import style from "../../utilities/css/comment.module.css";

class Comment extends Component {
  state = {};

  render() {
    return (
      <div className={`row ${style.commentBody}`}>
        <div className={`col-2 ${style.name}`}>{this.props.user}</div>
        <div className={`col-6 ${style.commentArea}`}>{this.props.msg}</div>
        <div className="col-4">
          <div className={`${style.date}`}>{this.props.date}</div>
        </div>
      </div>
    );
  }
}

export default Comment;
