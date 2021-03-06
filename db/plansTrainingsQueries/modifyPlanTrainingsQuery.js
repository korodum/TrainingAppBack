const { getConnection } = require('../getConnection');
const { generateError } = require('../../helpers');

const modifyPlanTrainingsQuery = async (trainingId, sets, reps) => {
  let connection;

  try {
    connection = await getConnection();

    const [plans] = await connection.query(`SELECT sets, reps FROM plantrainings WHERE trainingId = ?`,[trainingId]);


    if(plans.length < 1) throw generateError ('no trainings found', 404);

      sets = sets || plans[0].sets;
      reps = reps || plans[0].reps;

    await connection.query(`
    UPDATE plantrainings SET
    sets= ?,
    reps= ?
    WHERE trainingId= ?;`,[sets, reps, trainingId]);


    return plans;

  } finally {
    if(connection) connection.release();
  }
}

module.exports = {
  modifyPlanTrainingsQuery
}