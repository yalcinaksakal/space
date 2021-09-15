import { Scene } from "three";
import myCam from "./camera";

import cubeTexture from "./cubeTexture";
import createLights from "./lights";
import modelLoader from "./modelLoader";
import createR from "./renderer";
import setOrbitControls from "./setOrbitControls";

const setScene = (appenderFunc, dispatch, actions) => {
  const loadedContent = [];
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

  //animate
  const animate = () => {
    renderer.render(scene, camera);
    controls.update();
  };

  const { domElement } = renderer;

  //background, texture onLoad calls appender
  // setLoadingMsg("Loading Textures");
  dispatch(actions.setMsg("Loading textures"));
  scene.background = cubeTexture(
    appenderFunc,
    loadedContent,
    dispatch,
    actions
  );

  //GLTF model
  dispatch(actions.setMsg("Loading model"));
  modelLoader(scene, appenderFunc, loadedContent, dispatch, actions);

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
