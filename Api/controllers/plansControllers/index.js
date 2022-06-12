const { createPlan } = require('./createPlan');
const { addTraining } = require('./addTraining');
const { modifyPlanTrainings } = require('./modifyPlanTrainings');
const { deleteTrainingFromPlan } = require('./deleteTrainingFromPlan');

module.exports = {
  createPlan,
  addTraining,
  modifyPlanTrainings,
  deleteTrainingFromPlan
}