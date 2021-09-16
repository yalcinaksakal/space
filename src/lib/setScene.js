import { Scene } from "three";
import { DEGREE, NUMBER_OF_CONTENTS_TO_LOAD } from "../config/content";

import myCam from "./camera";

import cubeTexture from "./cubeTexture";
import createLights from "./lights";
import modelLoader from "./modelLoader";

import createR from "./renderer";
import setOrbitControls from "./setOrbitControls";
import soundLoader from "./soundLoader";

const movementMap = {
  ArrowUp: {
    code: "ArrowUp",
    isMoving: true,
    axis: "y",
    speed: 10,
    rotationAxis: "x",
    rotDirection: -1,
  },
  ArrowDown: {
    code: "ArrowDown",
    isMoving: true,
    axis: "y",
    speed: -10,
    rotationAxis: "x",
    rotDirection: 1,
  },
  ArrowRight: {
    code: "ArrowRight",
    isMoving: true,
    axis: "x",
    speed: -10,
    rotationAxis: "z",
    rotDirection: 1,
  },
  ArrowLeft: {
    code: "ArrowLeft",
    isMoving: true,
    axis: "x",
    speed: 10,
    rotationAxis: "z",
    rotDirection: -1,
  },
};
const setScene = (appenderFunc, dispatch, actions) => {
  const loadedContent = [];
  const models = [];
  let movement = {
    code: "",
    isMoving: false,
    axis: "",
    speed: 0,
    rotDirection: 0,
    rotationAxis: "",
  };
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
  let val;
  let angle;
  const move = () => {
    val = models[0].scene.position[movement.axis] + movement.speed;
    if (val > -1000 && val < 1000)
      models[0].scene.position[movement.axis] += movement.speed;
    if (!movement.isMoving && Math.abs(movement.speed) > 0) {
      movement.speed += movement.speed > 0 ? -0.3 : 0.3;
      angle = models[0].scene.rotation[movement.rotationAxis];
      if (Math.abs(angle) < 2 * DEGREE)
        models[0].scene.rotation[movement.rotationAxis] = 0;
      else
        models[0].scene.rotation[movement.rotationAxis] +=
          DEGREE * movement.rotDirection * -1 * 3;
    }
  };

  //animate

  const animate = () => {
    if (Math.abs(movement.speed) > 1) {
      move();
      angle = models[0].scene.rotation[movement.rotationAxis];
      if (Math.abs(angle) < 50 * DEGREE)
        models[0].scene.rotation[movement.rotationAxis] +=
          DEGREE * movement.rotDirection;
    }
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
    modelLoader(
      scene,
      appenderFunc,
      loadedContent,
      dispatch,
      actions,
      sound,
      models
    );

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

  const keyDownHandler = ({ code }) => {
    console.log(code);
    if (code === "KeyR") {
      controls.reset();
      if (models[0]) models[0].scene.position.set(0, 0, 0);
      return;
    }
    if (!models[0] || !movementMap[code]) return;
    if (movement.code !== code) models[0].scene.rotation.set(0, 0, 0);
    movement = { ...movementMap[code] };
  };
  const keyUpHandler = ({ code }) => {
    movement.isMoving = false;
  };
  return {
    animate,
    scene,
    camera,
    domElement,
    controls,
    onResize,
    engineSound,
    keyDownHandler,
    keyUpHandler,
  };
};

export default setScene;
