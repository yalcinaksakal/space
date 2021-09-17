const moveOthers = models => {
  if (models[0]) {
    models[0].position.z += -20;
    if (models[0].position.z < -7000) models[0].position.z = 7000;
  }
};
export default moveOthers;
