import React, { Component } from "react";
import style from "../../resource/css/game.module.css";

import Engine from "./engine";
class Main extends Component {
  render() {
    return (
      <div className={`${style.body}`}>
        <Engine Canvas={{ x: 800, y: 600 }} />
      </div>
    );
  }
}

export default Main;
