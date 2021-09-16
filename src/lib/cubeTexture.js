import { CubeTextureLoader } from "three";
import { NUMBER_OF_CONTENTS_TO_LOAD } from "../config/content";

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
      if (loadeds.length > NUMBER_OF_CONTENTS_TO_LOAD - 1) onLoad();
    }
  );

  return loader;
};

export default cubeTexture;
