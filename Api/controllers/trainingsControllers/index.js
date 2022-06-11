const { newTraining } = require('../trainingsControllers/newTraining');
const { selectTrainingById } = require('./selectTrainingById.js');
const { listTrainings } = require('./listTrainings.js');
const { modifyTraining } = require('./modifyTraining');
const { deleteTrainingById } = require('./deleteTraining');

module.exports = {
  newTraining,
  selectTrainingById,
  listTrainings,
  modifyTraining,
  deleteTrainingById,
}