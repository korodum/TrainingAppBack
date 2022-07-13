const { getConnection } = require('../getConnection');
const { generateError } = require('../../helpers');

const deleteTrainingFromPlanQuery = async (planId, trainingId) => {
  let connection;

  try {
    connection = await getConnection();

    const [plans] = await connection.query(`SELECT * FROM planTrainings WHERE planId = ?`,[planId])

    if (plans.length < 1) throw generateError ('plan  not exist', 404);

    await connection.query(`
      DELETE FROM plantrainings WHERE planId = ? AND trainingId = ?
    `,[planId, trainingId])
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  deleteTrainingFromPlanQuery
}