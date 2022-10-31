import React from "react";
import Sketch from "react-p5";
import style from "../../../resource/css/game.module.css";

import assets, { loadAssets, buildAnimations } from "../elements/setup";
function Engine(props) {
  const preload = (p5) => {
    loadAssets(p5);
  };
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(props.Canvas.x, props.Canvas.y).parent(canvasParentRef);
    p5.frameRate(30);
    buildAnimations();
  };

  const draw = (p5) => {
    p5.background(53, 150, 8);

    assets.bunny.states.dancing.object.move(p5.createVector(20, 10), 0, 0);
    assets.bunny_2.states.dancing.object.move(p5.createVector(20, 250), 0, 0);
  };

  return (
    <Sketch
      className={`${style.body} `}
      preload={preload}
      setup={setup}
      draw={draw}
    />
  );
}

export default Engine;
