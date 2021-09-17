import { Scene, AudioListener } from "three";
import { DEGREE, NUMBER_OF_CONTENTS_TO_LOAD } from "../config/content";

import myCam from "./camera";

import cubeTexture from "./cubeTexture";
import createLights from "./lights";
import modelLoader from "./modelLoader";

import createR from "./renderer";
import setOrbitControls from "./setOrbitControls";
import soundLoader from "./soundLoader";
import setStars, { animateStars } from "./stars";

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
  const models = { main: null, others: [] };
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

  //Add stars
  const stars = setStars(scene);

  //move
  let val, angle;
  const move = () => {
    val = models.main.position[movement.axis] + movement.speed;
    if (Math.abs(val) < (movement.axis === "x" ? 1000 : 600)) {
      models.main.position[movement.axis] += movement.speed;
    }
    if (!movement.isMoving) {
      movement.speed += movement.speed > 0 ? -0.3 : 0.3;
      angle = models.main.rotation[movement.rotationAxis];
      if (Math.abs(angle) < 2 * DEGREE)
        models.main.rotation[movement.rotationAxis] = 0;
      else
        models.main.rotation[movement.rotationAxis] +=
          DEGREE * movement.rotDirection * -1 * 3;
    }
  };

  //animate

  const animate = () => {
    if (Math.abs(movement.speed) > 1) {
      move();
      angle = models.main.rotation[movement.rotationAxis];
      if (Math.abs(angle) < 50 * DEGREE)
        models.main.rotation[movement.rotationAxis] +=
          DEGREE * movement.rotDirection;
    }
    if (models.others[0]) {
      models.others[0].position.z += -20;
      if (models.others[0].position.z < -7000)
        models.others[0].position.z = 7000;
    }
    animateStars(stars);
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
  const listener = new AudioListener();
  camera.add(listener);

  const onSound = soundBuf => {
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
      models,
      listener,
      soundBuf
    );

    if (loadedContent.length > NUMBER_OF_CONTENTS_TO_LOAD - 1) appenderFunc();
  };

  dispatch(actions.setMsg("Loading sounds"));
  soundLoader(onSound);

  //add controls
  const controls = setOrbitControls(camera, domElement);

  //onResize
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const keyDownHandler = ({ code }) => {
    if (code === "KeyR") {
      controls.reset();
      if (models.main) models.main.position.set(0, 0, 0);
      return;
    }
    if (!models.main) return;
    //look directions.
    switch (code) {
      case "KeyW":
        controls.rotate(90 * DEGREE, false);
        break;
      case "KeyS":
        controls.rotate(-90 * DEGREE, false);
        break;
      case "KeyA":
        controls.rotate(90 * DEGREE, true);
        break;
      case "KeyD":
        controls.rotate(-90 * DEGREE, true);
        break;
      default:
        break;
    }
    if (!movementMap[code]) return;
    if (movement.code !== code) models.main.rotation.set(0, 0, 0);
    movement = { ...movementMap[code] };
  };
  const keyUpHandler = ({ code }) => {
    //if code =movemonet code
    movement.isMoving = false;
  };
  return {
    animate,
    scene,
    camera,
    domElement,
    controls,
    onResize,

    keyDownHandler,
    keyUpHandler,
  };
};

export default setScene;
