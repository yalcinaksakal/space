const moveOthers = models => {
  if (models[0]) {
    models[0].position.z += -10;
    if (models[0].position.z < -7000) models[0].position.z = 8000;
  }
};
export default moveOthers;
