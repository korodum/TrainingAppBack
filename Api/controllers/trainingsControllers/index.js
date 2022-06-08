const { newTraining } = require('../trainingsControllers/newTraining');
const { selectTrainingById } = require('./selectTrainingById.js');
const{ listTrainingsByMuscleGroup } = require('../trainingsControllers/listTrainingsByMuscleGroup')
const { listTrainingsByTypology } = require('./listTrainingsByTypology')

const { deleteTrainingById } = require('../trainingsControllers/deleteTraining')

module.exports = {
  newTraining,
  selectTrainingById,
  listTrainingsByMuscleGroup,
  listTrainingsByTypology,
  deleteTrainingById
}