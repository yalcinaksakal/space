import { DirectionalLight, AmbientLight, PointLight } from "three";

const createLights = () => {
  //lights
  const light = new DirectionalLight(0xffffff);
  light.position.set(100, 100, 100);
  light.target.position.set(0, 0, 0);
  light.castShadow = true;
  light.shadow.bias = -0.01;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  light.shadow.camera.near = 1.0;
  light.shadow.camera.far = 500;
  light.shadow.camera.left = 200;
  light.shadow.camera.right = -200;
  light.shadow.camera.top = 200;
  light.shadow.camera.bottom = -200;

  const plight = new PointLight("white", 1, 100);
  plight.position.set(500, 100, 0);
  const plight2 = new PointLight("red", 1, 100);
  plight.position.set(-500, -100, 0);

  return {
    directional: light,
    ambient: new AmbientLight(0x404040),
    point: plight,
    p2: plight2,
  };
};

export default createLights;
