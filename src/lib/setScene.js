import { Scene } from "three";
import { NUMBER_OF_CONTENTS_TO_LOAD } from "../config/content";

import myCam from "./camera";

import cubeTexture from "./cubeTexture";
import createLights from "./lights";
import modelLoader from "./modelLoader";
import createR from "./renderer";
import setOrbitControls from "./setOrbitControls";
import soundLoader from "./soundLoader";

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
  dispatch(actions.setMsg("Loading textures"));
  scene.background = cubeTexture(
    appenderFunc,
    loadedContent,
    dispatch,
    actions
  );

  //sounds
  const onSound = (listener, sound) => {
    dispatch(actions.setMsg("Sounds done"));
    loadedContent.push("sounds");
    //GLTF model
    dispatch(actions.setMsg("Loading model"));
    camera.add(listener);
    modelLoader(scene, appenderFunc, loadedContent, dispatch, actions, sound);

    if (loadedContent.length > NUMBER_OF_CONTENTS_TO_LOAD - 1) appenderFunc();
  };

  dispatch(actions.setMsg("Loading sounds"));
  const engineSound = soundLoader(onSound);

  //add controls
  const controls = setOrbitControls(camera, domElement);

  //onResize
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  return {
    animate,
    scene,
    camera,
    domElement,
    controls,
    onResize,
    engineSound,
  };
};

export default setScene;
