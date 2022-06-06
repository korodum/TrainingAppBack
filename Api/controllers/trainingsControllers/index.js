const { newTraining } = require('../trainingsControllers/newTraining');
const { selectTrainingByName } = require('../trainingsControllers/selectTrainingByName.js');
const{ listTrainingsByMuscleGroup } = require('../trainingsControllers/listTrainingsByMuscleGroup')
const { listTrainingsByTypology } = require('./listTrainingsByTypology')
module.exports = {
  newTraining,
  selectTrainingByName,
  listTrainingsByMuscleGroup,
  listTrainingsByTypology,
}