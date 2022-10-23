class Sprite {
  constructor(engine, image, data, x, y, speed) {
    this.engine = engine;
    this.image = image;
    this.data = data;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.index = 0;
    this.animation = [];
  }

  loadData() {}
  createAnimation() {
    for (let i = 0; i < this.data.frames.length; i++) {
      let pos = this.data.frames[i].position;
      let img = this.image.get(pos.x, pos.y, pos.w, pos.h);
      this.animation.push(img);
    }
  }
  animate() {
    this.engine.image(
      this.animation[this.engine.floor(this.index) % this.animation.length],
      this.x,
      this.y,
      150,
      150
    );
    this.index += this.speed;
    this.index = this.index % 10000;
  }
}

export default Sprite;
