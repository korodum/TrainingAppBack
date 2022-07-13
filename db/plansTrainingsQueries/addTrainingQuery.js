const { getConnection} = require('../getConnection');

const addTrainingQuery = async(planId, trainingId, sets, reps) =>{
  let connection;

  try {
    connection = await getConnection();

    await connection.query(`
      INSERT INTO planTrainings (planId, trainingId, sets, reps) VALUES (?,?,?,?)
    `,[planId, trainingId, sets, reps]);

  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  addTrainingQuery
}