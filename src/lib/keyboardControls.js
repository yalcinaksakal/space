import { PositionalAudio, Vector3 } from "three";
import { DEGREE, MOVEMENT_MAP as movementMap } from "../config/content";
import createLaser from "./laser/laser";

const keyboardControls = (code, controls, model, currentCode) => {
  if (code === "KeyR") {
    controls.reset();
    // if (model) model.position.set(0, 0, 0);
    return;
  }
  if (!model) return;
  //look directions.
  switch (code) {
    case "KeyW":
      controls.rotate(90 * DEGREE, false);
      return;
    case "KeyS":
      controls.rotate(-90 * DEGREE, false);
      return;
    case "KeyA":
      controls.rotate(90 * DEGREE, true);
      return;
    case "KeyD":
      controls.rotate(-90 * DEGREE, true);
      return;
    default:
      break;
  }
  if (!movementMap[code]) return;
  if (currentCode !== code) model.rotation.set(0, 0, 0);
  return { ...movementMap[code] };
};

export const fire = (
  pos = new Vector3(0, 0, 0),
  scene,
  buffer,
  listener,
  rotX
) => {
  const laser = createLaser(pos.x, pos.y, pos.z, scene, rotX);
  const audio = new PositionalAudio(listener);
  audio.setBuffer(buffer);
  audio.setRefDistance(10);
  laser.laser.add(audio);
  audio.loop = false;
  audio.play();
  return laser;
};

export default keyboardControls;
