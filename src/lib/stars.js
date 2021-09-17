import { Mesh, MeshBasicMaterial, SphereGeometry } from "three";

const colors = [
  "white",
  "rgb(89, 223, 243)",
  "rgb(255, 255, 111)",
  "rgb(223, 185, 115)",
  "rgb(201, 86, 86)",
];
function setStars(scene) {
  const stars = [];
  for (let z = -2000; z < 4000; z += 10) {
    const geometry = new SphereGeometry(Math.random(), 32, 32);
    const material = new MeshBasicMaterial({
      color: colors[Math.floor(Math.random() * 5)],
    });
    const sphere = new Mesh(geometry, material);
    sphere.position.x = Math.random() * 4000 - 2000;
    sphere.position.y = Math.random() * 4000 - 2000;
    sphere.position.z = z + 1800;
    scene.add(sphere);
    stars.push(sphere);
  }
  return stars;
}

export function animateStars(stars) {
  // loop through each star
  let star;
  for (let i = 0; i < stars.length; i++) {
    star = stars[i];
    star.position.z -= i / 50;
    if (star.position.z < -2000) star.position.z += 6000;
  }
}

export default setStars;
