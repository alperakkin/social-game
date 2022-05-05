import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from 'react-router-dom';
import axios from "axios";

import LayOut from "./components/layout";
import Login from './components/users/login';


class App extends Component {
  state = {
    data: null,
    error_msg: null

  };
  
 
  componentDidMount() {
    axios.get(`http://localhost:5000/api`)
      .then(res => {
        const data = res.data;
        this.setState({ data });
      }).catch(err => {
        console.log(err.response.data)
        const error = err.response.data.msg;
       this.setState({ error })

      })
  }

  render() {
    return (
      <Router>
         <div className="App">
       
          
      </div>
        <Routes>
          <Route path="/" element={this.state.error === "login_error" ? <Navigate to="/login" /> : LayOut} />
          <Route path="/login" element={<Login/>} />

       
</Routes>
    </Router>
    );
  }
}


export default App;
