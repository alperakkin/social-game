import assets from "../../../resource/assets/assets.json";
let cls;

Object.entries(assets).forEach(([key, asset]) => {
  import("../elements/" + key.split("_")[0])
    .then((ns) => {
      cls = ns.default;

      Object.entries(asset.states).forEach(([animation, obj]) => {
        obj.object = cls;
        import("../../../resource/sprites/images/" + obj.path + ".png")
          .then((ns) => {
            obj.image = ns.default;
          })
          .catch((error) => {
            // Handle error
            console.log(error);
          });
        import("../../../resource/sprites/json/" + obj.path + ".json")
          .then((ns) => {
            obj.data = ns.default;
          })
          .catch((error) => {
            // Handle error
            console.log(error);
          });
      });
    })
    .catch((error) => {
      // Handle error
      console.log(error);
    });
});

class setup {
  loadAssets(engine) {
    Object.entries(assets).forEach(([assetName, assetObj]) => {
      Object.entries(assetObj.states).forEach(([stateName, stateObj]) => {
        stateObj.object = new stateObj.object(
          engine,
          engine.createVector(assetObj.posx, assetObj.posy),
          engine.createVector(assetObj.height, assetObj.width),
          assetObj.speed,
          {
            name: assetName,
            state: stateName,
            image: engine.loadImage(stateObj.image),
            json: stateObj.data,
          }
        );
        stateObj.object.buildAnimation();
      });
    });
  }

  buildAnimations() {
    Object.entries(assets).forEach(([assetName, assetObj]) => {
      Object.entries(assetObj.states).forEach(([stateName, stateObj]) => {
        stateObj.object.buildAnimation();
      });
    });
  }
}

export const { loadAssets, buildAnimations } = new setup();
export default assets;
