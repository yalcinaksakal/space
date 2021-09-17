import { Color } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { NUMBER_OF_CONTENTS_TO_LOAD } from "../config/content";

const modelLoader = (
  scene,
  onLoadFunc,
  loadeds,
  dispatch,
  actions,
  sound,
  models
) => {
  const loader = new GLTFLoader();
  loader.load("ship/scene.gltf", gltf => {
    gltf.scene.traverse(c => {
      if (c.name === "mesh_0" || c.name === "mesh_3") {
        c.castShadow = true;
        c.receiveShadow = true;
      }
      if (c.name === "mesh_0") {
        c.material.color = new Color(3, 3, 3);
        c.material.emissive = new Color(15, 55, 155);
        sound.play();
      }
      if (c.name === "mesh_1") {
        // c.material.color = new Color(255, 255, 255);
      }
    });
    gltf.scene.scale.set(0.1, 0.1, 0.1);
    scene.add(gltf.scene);
    loadeds.push("model");
    dispatch(actions.setMsg("Model done"));
    if (loadeds.length > NUMBER_OF_CONTENTS_TO_LOAD - 1) onLoadFunc();
    models.push(gltf);
  });
};
export default modelLoader;
