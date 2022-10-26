class Sprite {
  constructor(engine, image, data, pos, speed, size) {
    this.engine = engine;
    this.image = image;
    this.data = data;
    this.pos = pos;
    this.speed = speed;
    this.index = 0;
    this.animation = [];
    this.size = size;
  }

  createAnimation() {
    for (let i = 0; i < this.data.frames.length; i++) {
      let frame = this.data.frames[i].position;
      let img = this.image.get(frame.x, frame.y, frame.w, frame.h);

      this.animation.push(img);
    }
  }

  animate() {
    this.engine.image(
      this.animation[this.engine.floor(this.index) % this.animation.length],
      this.pos.x,
      this.pos.y,
      this.size.x,
      this.size.y
    );
    this.index += this.speed;
    this.index = this.index % 10000;
  }
}

export default Sprite;
