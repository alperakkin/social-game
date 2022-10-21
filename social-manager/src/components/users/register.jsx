import React, { Component } from "react";
import axios from "axios";
import { setCookie } from "../../helpers/cookies";
import style from "../../utilities/css/register.module.css";
class Register extends Component {
  state = {
    display: "alert alert-warning d-flex align-items-center d-none",
    image: null,
  };
  styles = {
    alignItems: "center",
    width: "40%",
    margin: "5% 30% 30% 30%",
  };

  uploadFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      this.setState({ image: reader.result });
    };
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let username = event.target.elements.username.value;
    let email = event.target.elements.email.value;
    let password = event.target.elements.password.value;
    let confirmation = event.target.elements.confirmation.value;

    axios
      .post("http://localhost:5000/api/register/", {
        username: username,
        password: password,
        confirmation,
        email: email,
        image: this.state.image,
      })
      .then((resp) => {
        setCookie("authToken", `Bearer ${resp.data.msg["token"]}`);
        setCookie("username", username);
        window.location = "/";
      })
      .catch((err) => {
        setCookie("username", null);

        document.getElementById("alert").innerHTML = err.response.data["msg"];
        this.setState({
          display: "alert alert-warning d-flex align-items-center d-block",
        });
      });
  };

  goBack() {
    window.location = "/";
  }
  render() {
    return (
      <div className="container">
        <div className={this.state.display} role="alert" id="alert"></div>
        <div className="card align-self-center" style={this.styles}>
          <h5 className="card-title">Register Page</h5>
          <div className="card-body">
            <form className="row g-3" onSubmit={this.handleSubmit}>
              <div className="col-md-8">
                <label className="form-label">User Name</label>
                <input
                  type="text"
                  className="col-8 form-control"
                  id="username"
                  name="username"
                />
              </div>

              <div className={`image-upload col-4 ${style.fileIcon}`}>
                <label for="file-input">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    className={`bi bi-cloud-upload `}
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"
                    />
                  </svg>
                </label>

                <input
                  className={`${style.file}`}
                  id="file-input"
                  type="file"
                  onChange={this.uploadFile}
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">E-Mail</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Confirmation</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmation"
                  name="confirmation"
                />
              </div>

              <div className="col-10">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
              <div className="col-2">
                <a href="/">Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
