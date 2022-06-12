const{modifyPlanTrainingsQuery} = require('../../db/plansTrainingsQueries/modifyPlanTrainingsQuery')
const { getConnection }  = require('../../db/getConnection');

const modifyPlanTrainings = async ( req, res, next ) => {
  let connection;

  try {
    connection = await getConnection();

    const {trainingId} = req.params;

    const { sets, reps } = req.body;


    await modifyTrainingQuery(trainingId, sets, reps)

    res.send({
      status: 'ok',
      message: `training with id ${trainingId} was successfully modified`
    })
  } catch (error) {
    next(error);
  }
}

module.exports = {
  modifyPlanTrainings
}