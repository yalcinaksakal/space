import { CylinderGeometry, MeshLambertMaterial, Mesh } from "three";
import { DEGREE } from "../../config/content";

const createLaser = (x, y, z, scene, rotX) => {
  z += 110;
  const factor = Math.abs(rotX) < 3 * DEGREE ? 0 : -Math.tan(rotX);
  y += 100 * factor;

  const geometry = new CylinderGeometry(2, 2, 50, 32, 50);
  const material = new MeshLambertMaterial({
    color: "white",
    transparent: true,
    emissive: "white",
    opacity: 1,
  });
  const cylinder = new Mesh(geometry, material);
  cylinder.position.set(x, y, z);
  cylinder.rotateX(90 * DEGREE + rotX);
  scene.add(cylinder);
  return { laser: cylinder, factor };
};

export default createLaser;
