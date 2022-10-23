class Sprite {
  constructor(image, imageData, x, y, speed) {
    this.image = image;
    this.imageData = imageData;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.index = 0;
    this.animation = [];
  }
  createAnimation() {
    for (let i = 0; i < this.imageData.frames.length; i++) {
      let pos = this.imageData.frames[i].position;
      let img = this.image.get(pos.x, pos.y, pos.w, pos.h);
      this.animation.push(img);
    }
  }
  show(p5) {
    p5.image(
      this.animation[p5.floor(this.index) % this.animation.length],
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
