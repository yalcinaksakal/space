import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const modelLoader = (scene, onLoadFunc) => {
  const loader = new GLTFLoader();
  loader.load("ship/scene.gltf", gltf => {
    gltf.scene.traverse(c => (c.castShadow = true));
    scene.add(gltf.scene);
    onLoadFunc();
  });
};
export default modelLoader;
