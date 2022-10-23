import React, { Component } from "react";
import style from "../../resource/css/comment.module.css";

class Comment extends Component {
  state = {};

  render() {
    return (
      <div className={`row ${style.commentBody}`}>
        <img
          className={`col-1 ${style.profile}`}
          src={this.props.profilePicture}
          alt=""
        />
        <div className={`col-2 ${style.name}`}>{this.props.user}</div>
        <div className={`col-5 ${style.commentArea}`}>{this.props.msg}</div>
        <div className="col-4">
          <div className={`${style.date}`}>{this.props.date}</div>
        </div>
      </div>
    );
  }
}

export default Comment;
