const { modifyTrainingQuery } = require('../../db/trainingQueries/modifyTrainingQuery');
const { getConnection }  = require('../../db/getConnection');

const modifyTraining = async ( req, res, next ) => {
  let connection;

  try {
    connection = await getConnection();

    const {trainingId} = req.params;

    const { name, description, typology,muscleGroup } = req.body;


    await modifyTrainingQuery(trainingId, name, description, typology,muscleGroup)

    res.send({
      status: 'ok',
      message: `training with id ${trainingId} was successfully modified`
    })
  } catch (error) {
    next(error);
  }
}

module.exports = {
  modifyTraining
}