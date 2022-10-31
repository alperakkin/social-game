import Sprite from "./sprite";

export default class Entity {
  constructor(engine, pos, size, speed, animation) {
    this.engine = engine;
    this.speed = speed;
    this.pos = pos;
    this.size = size;
    this.animation = animation;
  }

  buildAnimation() {
    let s = new Sprite(
      this.engine,
      this.animation.image,
      this.animation.json,
      this.pos,
      this.speed,
      this.size
    );
    s.createAnimation();
    this.sprite = s;
  }

  move(pos, dir, speed) {
    this.sprite.pos.x += speed;
    this.sprite.animate();
  }
}
