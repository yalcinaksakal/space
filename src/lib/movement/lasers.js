const moveLasers = (lasers, scene) => {
  for (const l of lasers) {
    l.laser.position.z += 10;

    l.laser.position.y += 10 * l.factor;
  }

  let i = 0;
  while (i < lasers.length && lasers[i].laser.position.z > 7000) {
    scene.remove(lasers[i].laser);
    lasers.shift();
    i++;
  }
};
export default moveLasers;
