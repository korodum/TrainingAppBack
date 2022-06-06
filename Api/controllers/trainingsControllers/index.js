const { newTraining } = require('../trainingsControllers/newTraining');
const { selectTrainingByName } = require('../trainingsControllers/selectTrainingByName.js');
const{ listTrainingsByMuscleGroup } = require('../trainingsControllers/listTrainingsByMuscleGroup')
module.exports = {
  newTraining,
  selectTrainingByName,
  listTrainingsByMuscleGroup,
}