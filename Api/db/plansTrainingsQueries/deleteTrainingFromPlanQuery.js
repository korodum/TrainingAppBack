const { getConnection } = require('../getConnection');
const { generateError } = require('../../helpers');

const deleteTrainingFromPlanQuery = async (planId, trainingId) => {
  let connection;

  try {
    connection = await getConnection();
    console.log(planId);
    console.log(trainingId)
    const [plans] = await connection.query(`SELECT * FROM planTrainings WHERE idPlan = ?`,[planId])

    if (plans.length < 1) throw generateError ('plan  not exist', 404);

    await connection.query(`
      DELETE FROM plantrainings WHERE idPlan = ? AND idTraining = ?
    `,[planId, trainingId])
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  deleteTrainingFromPlanQuery
}