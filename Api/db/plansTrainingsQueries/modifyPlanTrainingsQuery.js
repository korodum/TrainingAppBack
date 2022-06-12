const { getConnection } = require('../getConnection');
const { generateError } = require('../../helpers');

const modifyPlanTrainingsQuery = async (idTraining, sets, reps) => {
  let connection;

  try {
    connection = await getConnection();

    const [plans] = await connection.query(`SELECT sets, reps FROM plantrainings WHERE idTraining = ?`,[idTraining]);
    if(trainings.length < 1) throw generateError ('no trainings found', 404);

      sets = sets || plans[0].sets;
      reps = reps || plans[0].reps;

    await connection.query(`
      UPDATE plantrainings SET
      sets = ?,
      reps = ?
      WHERE idTraining = ?
    `,[sets, reps, idTraining]);

    return plans;

  } finally {
    if(connection) connection.release();
  }
}

module.exports = {
  modifyPlanTrainingsQuery
}