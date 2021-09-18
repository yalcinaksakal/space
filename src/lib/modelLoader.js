import { Color, PositionalAudio } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DEGREE, NUMBER_OF_CONTENTS_TO_LOAD } from "../config/content";

const modelLoader = (
  scene,
  onLoadFunc,
  loadeds,
  dispatch,
  actions,
  models,
  listener,
  buffer
) => {
  const addSoundToObj = (obj, distanceRef) => {
    const audio = new PositionalAudio(listener);
    audio.setBuffer(buffer);
    audio.setRefDistance(distanceRef);
    obj.add(audio);
    audio.loop = true;
    audio.play();
  };

  const addModel = (
    gltf,
    type = "others",
    scale = 0.1,
    position = { x: 0, y: 0, z: 0 },
    rotation = { rx: 0, ry: 0, rz: 0 },
    color = new Color(3, 3, 1),
    audioDistanceRef = 300
  ) => {
    const model = gltf.scene;
    model.traverse(c => {
      if (c.name === "mesh_0" || c.name === "mesh_3") {
        c.castShadow = true;
        c.receiveShadow = true;
      }
      if (c.name === "mesh_0") {
        c.material.color = color;
        c.material.emissive = new Color(15, 55, 155);
        addSoundToObj(c, audioDistanceRef);
      }
      if (c.name === "mesh_1") {
        c.material.color = new Color(255, 255, 255);
      }
    });
    model.scale.set(scale, scale, scale);
    const { x, y, z } = position;
    model.position.set(x, y, z);
    const { rx, ry, rz } = rotation;

    model.rotateX(rx * DEGREE);
    model.rotateY(ry * DEGREE);
    model.rotateZ(rz * DEGREE);
    scene.add(model);

    if (type === "others") models.others.push(model);
    else loadeds.push("model");
  };

  const loader = new GLTFLoader();
  //deep clone costs much than reload
  // addmodel(model,type,scale,position,rotation,color,audioDistanceRef)
  loader.load("ship/scene.gltf", gltf =>
    addModel(
      gltf,
      "others",
      0.3,
      { x: 0, y: -100, z: 7500 },
      { rx: 0, ry: 180, rz: 0 }
    )
  );

  loader.load("ship/scene.gltf", gltf => {
    addModel(
      gltf,
      "main",
      0.1,
      { x: 0, y: 0, z: 0 },
      { rx: 0, ry: 0, rz: 0 },
      new Color(1, 1, 3),
      20
    );
    dispatch(actions.setMsg("Model done"));
    if (loadeds.length > NUMBER_OF_CONTENTS_TO_LOAD - 1) onLoadFunc();
    models.main = gltf.scene;
  });
};
export default modelLoader;
