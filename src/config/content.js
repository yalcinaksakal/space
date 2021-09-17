export const NUMBER_OF_CONTENTS_TO_LOAD = 3;
export const DEGREE = Math.PI / 180;
export const MOVEMENT_MAP = {
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
