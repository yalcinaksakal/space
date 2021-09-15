import { CubeTextureLoader } from "three";

const cubeTexture = onLoad => {
  const loader = new CubeTextureLoader().load(
    [
      "SpaceboxCollection/Spacebox5/Sky2_right1.png",
      "SpaceboxCollection/Spacebox5/Sky2_left2.png",

      "SpaceboxCollection/Spacebox5/Sky2_top3.png",
      "SpaceboxCollection/Spacebox5/Sky2_bottom4.png",

      "SpaceboxCollection/Spacebox5/Sky2_front5.png",
      "SpaceboxCollection/Spacebox5/Sky2_back6.png",
    ],
    onLoad
  );

  return loader;
};

export default cubeTexture;
