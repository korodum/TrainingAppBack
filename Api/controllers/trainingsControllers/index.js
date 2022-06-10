const { newTraining } = require('../trainingsControllers/newTraining');
const { selectTrainingById } = require('./selectTrainingById.js');
const { listTrainings } = require('./listTrainings.js');
const { deleteTrainingById } = require('./deleteTraining');

module.exports = {
  newTraining,
  selectTrainingById,
  listTrainings,
  deleteTrainingById
}