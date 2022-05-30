import React, { Component } from "react";
import axios from "axios";
import { getCookie, setCookie } from "../../helpers/cookies";
class Register extends Component {
  state = {
    display: "alert alert-warning d-flex align-items-center d-none",
  };
  styles = {
    alignItems: "center",
    width: "40%",
    margin: "5% 30% 30% 30%",
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
      })
      .then((resp) => {
        setCookie("authToken", `Bearer ${resp.data.msg["token"]}`);
        setCookie("username", username);
        window.location = "/";
        console.log(resp);
      })
      .catch((err) => {
        setCookie("username", null);
        console.log(err);
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
              <div className="col-md-12">
                <label className="form-label">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
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
