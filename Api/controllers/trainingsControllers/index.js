const { newTraining } = require('../trainingsControllers/newTraining');
const { selectTrainingByName } = require('../trainingsControllers/selectTrainingByName.js');
const{ listTrainingsByMuscleGroup } = require('../trainingsControllers/listTrainingsByMuscleGroup')
const { listTrainingsByTypology } = require('./listTrainingsByTypology')
const { likes } = require('./likes');

const { deleteTrainingByName } = require('../trainingsControllers/deleteTraining')

module.exports = {
  newTraining,
  selectTrainingByName,
  listTrainingsByMuscleGroup,
  listTrainingsByTypology,
  deleteTrainingByName,
  likes
}