import { AudioLoader } from "three";

const audioLoader = new AudioLoader();

const soundLoader = onLoad => {
  // load a sound and set it as the PositionalAudio object's buffer
  audioLoader.load("sounds/engine4.mp3", buffer => {
    onLoad(buffer);
  });
};

export const laserSound = onLoad => {
  audioLoader.load("sounds/laser.mp3", buffer => {
    onLoad(buffer);
  });
};

export default soundLoader;
