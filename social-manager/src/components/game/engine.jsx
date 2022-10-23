import React from "react";
import Sketch from "react-p5";
import style from "../../resource/css/game.module.css";
import bunnyPicture from "../../resource/sprites/bunny.png";
import Sprite from "./sprite";

function Engine(props) {
  let x = 0;
  let animation = [];
  let data;
  let bunny;
  let sprite;

  data = {
    frames: [
      {
        name: "sprite-00",
        position: {
          x: 0,
          y: 0,
          w: 20,
          h: 20,
        },
      },

      {
        name: "sprite-01",
        position: {
          x: 18,
          y: 0,
          w: 20,
          h: 20,
        },
      },
      {
        name: "sprite-02",
        position: {
          x: 36,
          y: 0,
          w: 20,
          h: 20,
        },
      },
      {
        name: "sprite-03",
        position: {
          x: 54,
          y: 0,
          w: 20,
          h: 20,
        },
      },
      {
        name: "sprite-04",
        position: {
          x: 72,
          y: 0,
          w: 20,
          h: 20,
        },
      },
      {
        name: "sprite-05",
        position: {
          x: 90,
          y: 0,
          w: 20,
          h: 20,
        },
      },
      {
        name: "sprite-06",
        position: {
          x: 108,
          y: 0,
          w: 20,
          h: 20,
        },
      },
      {
        name: "sprite-07",
        position: {
          x: 126,
          y: 0,
          w: 20,
          h: 20,
        },
      },
    ],
  };
  const preload = (p5) => {
    bunny = p5.loadImage(bunnyPicture);
  };
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(props.Canvas.x, props.Canvas.y).parent(canvasParentRef);
    p5.frameRate(30);
    sprite = new Sprite(bunny, data, 10, 10, 0.2);
    sprite.createAnimation();
  };

  const draw = (p5) => {
    p5.background(255, 130, 20);
    sprite.show(p5);
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
