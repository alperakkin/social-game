import React from "react";
import Sketch from "react-p5";
import style from "../../../resource/css/game.module.css";

import assets, {
  loadAssets,
  loadImages,
  buildAnimations,
} from "../elements/setup";
function Engine(props) {
  const preload = (p5) => {
    loadAssets(p5);
    loadImages();
  };
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(props.Canvas.x, props.Canvas.y).parent(canvasParentRef);
    p5.frameRate(30);
    buildAnimations();
  };

  const draw = (p5) => {
    p5.background(53, 150, 8);

    assets["bunny"].animate("dancing");
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
