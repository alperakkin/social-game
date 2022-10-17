import React, { Component } from "react";
import { getRequest, postRequest } from "../../helpers/requests";
import style from "../../utilities/css/message.module.css";
import Comment from "./comment";
const thumbsUpIconEmpty =
  "M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z";
const thumbsDownIconEmpty =
  "M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z";

const thumbsUpIconFill =
  "M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z";

const thumbsDownIconFill =
  "M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z";

class Message extends Component {
  constructor(props) {
    super(props);
    this.commentRef = React.createRef();
    this.commentListRef = React.createRef();
  }
  state = {
    thumbsUp: 0,
    thumbsDown: 0,
    thumbsDownColor: "black",
    thumbsUpColor: "black",
    thumbsUpIcon: thumbsUpIconEmpty,
    thumbsDownIcon: thumbsDownIconEmpty,
    like: 0,
    dislike: 0,
    userLike: 0,
    userDislike: 0,
    commentCount: 0,
    comments: null,
    commentsCollapsed: true,
  };
  styles = {
    marginTop: "30px",
    textAlign: "center",
  };

  iconStyles = {
    marginRight: "5px",
    marginTop: "5px",
  };

  textStyle = {
    fontSize: "small",

    marginLeft: "1%",
    marginRight: "1%",
  };

  imageStyle = {
    maxHeight: "300px",
    width: "auto",
    height: "auto",
  };
  async componentDidMount() {
    await this.getInteractions();
    await this.getComments();
    this.commentListRef.current.style.display = "none";
  }

  getComments = async () => {
    let data = await getRequest("/comments/", { id: this.props.id });
    if (data) {
      await this.setState({ comments: data, commentCount: data.data.length });
    }
  };

  displayComments = async () => {
    if (this.commentListRef.current.style.display === "block") {
      this.commentListRef.current.style.display = "none";
    } else {
      await this.getComments();
      this.commentListRef.current.style.display = "block";
    }
  };

  commentElements() {
    if (this.state.comments) {
      let arr = this.state.comments.data;
      const items = arr.map((item) => (
        <Comment
          key={item.id}
          user={item.name}
          id={item.id}
          date={item.date}
          msg={item.comment}
        />
      ));

      return items;
    }
  }

  sendComment = async () => {
    const comment = await this.commentRef.current.value;
    await postRequest("/comments/create/", {
      id: this.props.id,
      comment: comment,
    });
    this.commentRef.current.value = "";
    await this.getComments();
  };

  async getInteractions() {
    let result = await getRequest("/interactions/", { id: this.props.id });
    await this.setState({
      like: result.data.like,
      dislike: result.data.dislike,
      userLike: result.data.userLike,
      userDislike: result.data.userDislike,
    });

    if (this.state.userLike > 0) {
      this.setState({
        thumbsUp: 1,
        thumbsUpColor: "green",
        thumbsUpIcon: thumbsUpIconFill,
        thumbsDown: 0,
        thumbsDownColor: "black",
        thumbsDownIcon: thumbsDownIconEmpty,
      });
    }
    if (this.state.userDislike > 0) {
      this.setState({
        thumbsDown: 1,
        thumbsDownColor: "red",
        thumbsDownIcon: thumbsDownIconFill,
        thumbsUp: 0,
        thumbsUpColor: "black",
        thumbsUpIcon: thumbsUpIconEmpty,
      });
    }
  }

  sendThumbsUp = async () => {
    if (this.state.thumbsUp !== 1 && this.state.userLike === 0) {
      this.setState({
        thumbsUp: 1,
        thumbsUpColor: "green",
        thumbsUpIcon: thumbsUpIconFill,
        thumbsDown: 0,
        thumbsDownColor: "black",
        thumbsDownIcon: thumbsDownIconEmpty,
      });
      await postRequest("/interactions/create/", {
        id: this.props.id,
        operation: "add",
        state: "like",
      });
    } else if (this.state.thumbsUp === 1 && this.state.userLike === 1) {
      this.setState({
        thumbsUp: 0,
        thumbsUpColor: "black",
        thumbsUpIcon: thumbsUpIconEmpty,
      });
      await postRequest("/interactions/create/", {
        id: this.props.id,
        operation: "sub",
        state: "like",
      });
    }
    await this.getInteractions();
  };

  sendThumbsDown = async () => {
    if (this.state.thumbsDown !== 1 && this.state.userDislike === 0) {
      await postRequest("/interactions/create/", {
        id: this.props.id,
        operation: "add",
        state: "dislike",
      });
      this.setState({
        thumbsDown: 1,
        thumbsDownColor: "red",
        thumbsDownIcon: thumbsDownIconFill,
        thumbsUp: 0,
        thumbsUpColor: "black",
        thumbsUpIcon: thumbsUpIconEmpty,
      });
    } else if (this.state.thumbsDown === 1 && this.state.userDislike === 1) {
      this.setState({
        thumbsDown: 0,
        thumbsDownColor: "black",
        thumbsDownIcon: thumbsDownIconEmpty,
      });
      await postRequest("/interactions/create/", {
        id: this.props.id,
        operation: "sub",
        state: "dislike",
      });
    }
    await this.getInteractions();
  };
  render() {
    let image;

    if (this.props.img !== null) {
      image = (
        <img
          src={this.props.img}
          className="card-img-top col-md-12"
          style={this.imageStyle}
          alt="Posts"
        />
      );
    }
    return (
      <div className="card col-md-12" style={this.styles}>
        <div
          className="d-flex justify-content-center"
          style={{
            color: "#c80b0b",
            fontWeight: "bold",
          }}
        >
          <div className="col-md-12" style={this.textStyle}>
            {this.props.team}
          </div>
        </div>
        <div
          className="d-flex justify-content-between pt-1"
          style={this.textStyle}
        >
          <div className="p-2">{this.props.user}</div>
          <div className="p-2">{this.props.date}</div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-person-lines-fill"
            style={this.iconStyles}
          >
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
          </svg>
        </div>

        <div className="card-body pt-0">
          <hr className="solid"></hr>
          {image}
        </div>
        <div className="card-body">
          <p className="card-text">{this.props.msg}</p>
          <hr className="solid"></hr>
          <div className="row">
            <div className="d-flex justify-content-start">
              <div className="col-1">
                <div className="row">
                  <svg
                    style={this.iconStyles}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill={this.state.thumbsUpColor}
                    className="bi bi-hand-thumbs-up"
                    title="I Agree"
                    viewBox="0 0 16 16"
                    onClick={this.sendThumbsUp}
                  >
                    <path d={this.state.thumbsUpIcon} />
                  </svg>
                </div>
                <div className="row justify-content-center">
                  {this.state.like}
                </div>
              </div>
              <div className="col-1">
                <div className="row">
                  <svg
                    style={this.iconStyles}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill={this.state.thumbsDownColor}
                    className="bi bi-hand-thumbs-down"
                    title="I Disagree"
                    viewBox="0 0 16 16"
                    onClick={this.sendThumbsDown}
                  >
                    <path d={this.state.thumbsDownIcon} />
                  </svg>
                </div>
                <div className="row justify-content-center">
                  {this.state.dislike}
                </div>
              </div>
              <div className="col-1">
                <div className="row justify-content-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="bi bi-chat-dots"
                    viewBox="0 0 16 16"
                    onClick={this.displayComments}
                  >
                    <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                    <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                  </svg>
                  <div className="row justify-content-center">
                    {this.state.commentCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <textarea
              rows="1"
              placeholder="Write a comment"
              id="comment"
              className="col-11"
              ref={this.commentRef}
            ></textarea>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              className={`col-1 ${style.sendComment}`}
              viewBox="0 0 16 16"
              onClick={this.sendComment}
            >
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
            </svg>
          </div>
          <div
            className={`row  ${style.commentsSection}`}
            ref={this.commentListRef}
          >
            {this.commentElements()}
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
