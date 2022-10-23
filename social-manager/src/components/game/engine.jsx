import React from "react";
import Sketch from "react-p5";
import style from "../../resource/css/game.module.css";
import bunnyPicture from "../../resource/sprites/images/bunny.png";
import bunnyData from "../../resource/sprites/json/bunny.json";
import Sprite from "./sprite";

function Engine(props) {
  let bunny;
  let sprite;

  const preload = (p5) => {
    bunny = p5.loadImage(bunnyPicture);
  };
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(props.Canvas.x, props.Canvas.y).parent(canvasParentRef);
    p5.frameRate(30);
    sprite = new Sprite(p5, bunny, bunnyData, 10, 10, 0.2);
    sprite.loadData();
    sprite.createAnimation();
  };

  const draw = (p5) => {
    p5.background(255, 130, 20);
    sprite.animate();
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
