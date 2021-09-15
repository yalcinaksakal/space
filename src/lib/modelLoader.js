import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const modelLoader = (scene, onLoadFunc, loadeds, dispatch, actions) => {
  const loader = new GLTFLoader();
  loader.load("ship/scene.gltf", gltf => {
    gltf.scene.traverse(c => (c.castShadow = true));
    gltf.scene.scale.set(0.1, 0.1, 0.1);
    scene.add(gltf.scene);
    loadeds.push("model");
    dispatch(actions.setMsg("Model done"));
    if (loadeds.length > 1) onLoadFunc();
  });
};
export default modelLoader;
