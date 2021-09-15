import { Scene } from "three";
import myCam from "./camera";
import createPlane from "./createObjects";
import cubeTexture from "./cubeTexture";
import createLights from "./lights";
import modelLoader from "./modelLoader";
import createR from "./renderer";
import setOrbitControls from "./setOrbitControls";

const setScene = appenderFunc => {
  //renderer
  const renderer = createR();
  //camera
  const camera = myCam();
  //scene
  const scene = new Scene();
  //lights
  const lights = createLights();
  scene.add(lights.directional);
  scene.add(lights.ambient);

  //add a plane
  scene.add(createPlane());

  //animate
  const animate = () => {
    renderer.render(scene, camera);
    controls.update();
  };

  const { domElement } = renderer;

  //background, texture onLoad calls appender
  scene.background = cubeTexture(appenderFunc);

  //GLTF model
  modelLoader(scene, appenderFunc);

  //add controls
  const controls = setOrbitControls(camera, domElement);

  //onResize
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  return { animate, scene, camera, domElement, controls, onResize };
};

export default setScene;
