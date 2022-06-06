const { getConnection } = require('../getConnection');

const { generateError } = require('../../helpers');

const listTrainingsByMuscleGroupQuery = async (muscleGroup) => {
  let connection;

  try {
    connection = await getConnection();

  const [trainings] = await connection.query(`SELECT name FROM trainings WHERE muscleGroup = ?`,[muscleGroup]);

  return trainings;
  } finally {
    if (connection) connection.require();
  }
}

module.exports = {
  listTrainingsByMuscleGroupQuery
}