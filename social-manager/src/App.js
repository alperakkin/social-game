import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from "./components/home";
import Register from "./components/users/register";
import Delete from "./components/users/delete";
import Login from './components/users/login';
import LogOut from "./components/users/logout";
import LayOut from "./components/layout";

class App extends Component {
  state = {
    auth: false
  };
 
  styles = {
    
  }

  render() {
    return (
      <Router>
        <div className="App">
    
          <Routes>
          <Route path="/" element={<Home/>} />
            <Route path="/register" element={<Register />} /> 
            <Route path="/delete" element={<Delete />} /> 
            <Route path="/login" element={<Login />} /> 
            <Route path="/logout" element={<LogOut />} /> 
            <Route path="/all-teams" element={<LayOut />} />
            <Route path="/my-teams" element={<LayOut />} />
            <Route path="/create-team" element={<LayOut />} />
            <Route path="/game" element={<LayOut />} /> 

          
            
          </Routes>
            <code id="cookies"/>
  
        </div>
       

    </Router>
    );
  }
}


export default App;
