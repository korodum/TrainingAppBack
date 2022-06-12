const { deleteTrainingFromPlanQuery } = require('../../db/plansTrainingsQueries/deleteTrainingFromPlanQuery');

const deleteTrainingFromPlan = async (req, res, next) => {
  try {
    const {planId} = req.params;
    const { trainingId } = req.body;

    await deleteTrainingFromPlanQuery( planId, trainingId );

    res.send({
      status: 'ok',
      message: 'Training removed from plan'

    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  deleteTrainingFromPlan
}