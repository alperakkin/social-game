import Entity from "../core/entity";

class Bunny extends Entity {
  constructor(engine, pos, size, speed, animation) {
    super(engine, pos, size, speed, animation);
    this.animation = animation;
  }
}

export default Bunny;
