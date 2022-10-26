// import Bunny from "../elements/bunny";
let cls;
let assets = { bunny: null };

Object.entries(assets).forEach(([key, asset]) => {
  import("../elements/" + key)
    .then((ns) => {
      cls = ns.default;
      assets[key] = cls;
    })
    .catch((error) => {
      // Handle error
      console.log(error);
    });
});

class setup {
  loadAssets(engine) {
    assets["bunny"] = new assets["bunny"](
      engine,
      engine.createVector(10, 10),
      engine.createVector(100, 100),
      0.2
    );
  }

  loadImages() {
    Object.entries(assets).forEach(([key, asset]) => {
      asset.loadImages();
    });
  }

  buildAnimations() {
    Object.entries(assets).forEach(([key, asset]) => {
      asset.buildAnimations();
    });
  }
}

export const { loadAssets, loadImages, buildAnimations } = new setup();
export default assets;
