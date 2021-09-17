import { DEGREE } from "../../config/content";

const moveShip = (model, movement) => {
  let val, angle;
  const move = () => {
    val = model.position[movement.axis] + movement.speed;
    if (Math.abs(val) < (movement.axis === "x" ? 1000 : 600)) {
      model.position[movement.axis] += movement.speed;
    }
    if (!movement.isMoving) {
      movement.speed += movement.speed > 0 ? -0.3 : 0.3;
      angle = model.rotation[movement.rotationAxis];
      if (Math.abs(angle) < 2 * DEGREE)
        model.rotation[movement.rotationAxis] = 0;
      else
        model.rotation[movement.rotationAxis] +=
          DEGREE * movement.rotDirection * -1 * 3;
    }
  };
  if (Math.abs(movement.speed) > 1) {
    move();
    angle = model.rotation[movement.rotationAxis];
    if (Math.abs(angle) < 50 * DEGREE)
      model.rotation[movement.rotationAxis] += DEGREE * movement.rotDirection;
  }
};
export default moveShip;
