const moveLights = (p1, p2) => {
  p1.position.z--;
  p1.position.x++;
  p2.position.z++;
  p2.position.x--;
  if (p1.position.z < -150) p1.position.z = 150;
  if (p1.position.x > 300) p1.position.x = -300;
  if (p2.position.z > 70) p2.position.z = -70;
  if (p2.position.x < -300) p2.position.x = 300;
};
export default moveLights;
