import Entity from "../core/entity";
import bunnyPicture from "../../../resource/sprites/images/bunny.png";
import bunnyData from "../../../resource/sprites/json/bunny.json";

class Bunny extends Entity {
  constructor(engine, pos, size, speed) {
    super(engine, pos, size, speed);
    this.animationData = null;
  }

  loadImages() {
    this.animationData = [
      {
        name: "bunny",
        state: "dancing",
        image: this.engine.loadImage(bunnyPicture),
        json: bunnyData,
      },
    ];
  }
}

export default Bunny;
