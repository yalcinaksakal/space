import { AudioListener, PositionalAudio, AudioLoader } from "three";

const soundLoader = loaded => {
  const listener = new AudioListener();
  // camera.add(listener);

  // create the PositionalAudio object (passing in the listener)
  const sound = new PositionalAudio(listener);

  // load a sound and set it as the PositionalAudio object's buffer
  const audioLoader = new AudioLoader();
  audioLoader.load("sounds/engine.mp3", buffer => {
    sound.setBuffer(buffer);
    sound.setRefDistance(20);
    sound.loop = true;
    loaded(listener, sound);
  });
  return sound;
};

export default soundLoader;
