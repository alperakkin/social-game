import React, { Component } from "react";
import { loginRequest } from "../../helpers/requests";

class Login extends Component {
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
    let password = event.target.elements.password.value;

    this.loginFunc(username, password);
  };

  async loginFunc(username, password) {
    let resp = await loginRequest(username, password);
    if (resp.status === false) {
      document.getElementById("alert").innerHTML = resp.data["msg"];
      this.setState({
        display: "alert alert-warning d-flex align-items-center d-block",
      });
    } else {
      this.setState({
        display: "alert alert-warning d-flex align-items-center d-none",
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className={this.state.display} role="alert" id="alert"></div>

        <div className="card align-self-center" style={this.styles}>
          <h5 className="card-title">Login Page</h5>
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
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                />
              </div>

              <div className="col-10">
                <button type="submit" className="btn btn-primary">
                  Log in
                </button>
              </div>
              <div className="col-2">
                <a href="/register">Sign In</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
