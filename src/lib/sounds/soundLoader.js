import { AudioLoader } from "three";

const soundLoader = onLoad => {
  // load a sound and set it as the PositionalAudio object's buffer
  const audioLoader = new AudioLoader();
  audioLoader.load("sounds/engine.mp3", buffer => {
    onLoad(buffer);
  });
};

export default soundLoader;
