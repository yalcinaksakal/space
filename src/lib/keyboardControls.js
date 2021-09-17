import { DEGREE, MOVEMENT_MAP as movementMap } from "../config/content";

const keyboardControls = (code, controls, model, currentCode) => {
  if (code === "KeyR") {
    controls.reset();
    if (model) model.position.set(0, 0, 0);
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

export default keyboardControls;
