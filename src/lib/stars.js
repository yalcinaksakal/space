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
  // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position.
  for (let z = -2000; z < 4000; z += 10) {
    // Make a sphere (exactly the same as before).

    const geometry = new SphereGeometry(Math.random() * 2, 32, 32);
    const material = new MeshBasicMaterial({
      color: colors[Math.floor(Math.random() * 5)],
    });
    const sphere = new Mesh(geometry, material);

    // This time we give the sphere random x and y positions between -500 and 500
    sphere.position.x = Math.random() * 4000 - 2000;
    sphere.position.y = Math.random() * 4000 - 2000;

    // Then set the z position to where it is in the loop (distance of camera)
    sphere.position.z = 500;

    //add the sphere to the scene
    scene.add(sphere);

    //finally push it to the stars array
    stars.push(sphere);
  }
  return stars;
}

export function animateStars(stars) {
  // loop through each star
  let star;
  for (let i = 0; i < stars.length; i++) {
    star = stars[i];

    // and move it forward dependent on the mouseY position.
    star.position.z -= i / 100;

    // if the particle is too close move it to the back
    if (star.position.z < -2000) star.position.z += 6000;
  }
}

export default setStars;
