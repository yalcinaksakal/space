import { AudioLoader } from "three";

const soundLoader = loaded => {
  // load a sound and set it as the PositionalAudio object's buffer
  const audioLoader = new AudioLoader();
  audioLoader.load("sounds/engine.mp3", buffer => {
    loaded(buffer);
  });
};

export default soundLoader;
