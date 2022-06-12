const { getConnection} = require('../getConnection');

const addTrainingQuery = async(idPlan, idTraining, sets, reps) =>{
  let connection;

  try {
    connection = await getConnection();

    await connection.query(`
      INSERT INTO planTraings (idPlan, idTraining, sets, reps) VALUES ('?,?,?,?)
    `,[idPlan, idTraining, sets, reps]);

  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  addTrainingQuery
}