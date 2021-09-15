import { CubeTextureLoader } from "three";

const cubeTexture = (onLoad, loadeds, dispatch, actions) => {
  const loader = new CubeTextureLoader().load(
    [
      "SpaceboxCollection/Spacebox5/Sky2_right1.png",
      "SpaceboxCollection/Spacebox5/Sky2_left2.png",

      "SpaceboxCollection/Spacebox5/Sky2_top3.png",
      "SpaceboxCollection/Spacebox5/Sky2_bottom4.png",

      "SpaceboxCollection/Spacebox5/Sky2_front5.png",
      "SpaceboxCollection/Spacebox5/Sky2_back6.png",
    ],
    () => {
      loadeds.push("textures");
      dispatch(actions.setMsg("Textures done"));
      if (loadeds.length > 1) onLoad();
    }
  );

  return loader;
};

export default cubeTexture;
