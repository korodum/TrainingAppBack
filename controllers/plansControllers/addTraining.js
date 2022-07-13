const {addTrainingQuery} = require('../../db/plansTrainingsQueries/addTrainingQuery');

const { selectTrainingByIdQuery } = require('../../db/trainingQueries/selectTrainingByIdQuery')

const { generateError } = require('../../helpers');

const addTraining = async (req, res, next) => {
  try {
    const { planId } = req.params;

    const { trainingId, sets, reps } = req.body;

    if( !trainingId || !sets || !reps){
      throw generateError('fill all fields',400);
    }
    const training = await selectTrainingByIdQuery(trainingId);

    if(training.length === 0){
      throw generateError('training not found',404);
    }

    await addTrainingQuery (planId, training.id, sets, reps)

    res.send({
      status: 'ok',
      message:`the training ${training.name} has been added`
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addTraining
}