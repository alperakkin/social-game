import Sprite from "./sprite";

export default class Entity {
  constructor(engine, pos, size, speed) {
    this.engine = engine;
    this.states = [];
    this.speed = speed;
    this.animations = {};
    this.pos = pos;
    this.size = size;
  }

  buildAnimations() {
    for (let data of this.animationData) {
      let s = new Sprite(
        this.engine,
        data.image,
        data.json,
        this.pos,
        this.speed,
        this.size
      );
      s.createAnimation();
      this.animations[data.state] = s;
    }
  }

  animate(state) {
    this.animations[state].animate();
  }
}
