const { getConnection } = require('../getConnection');

const { generateError } = require('../../helpers');

const listTrainingsByTypologyQuery = async (typology) => {
  let connection;

  try {
    connection = await getConnection();

  const [trainings] = await connection.query(`SELECT * FROM trainings WHERE typology = ?`,[typology]);

  if (trainings.length < 1) {
    throw generateError ('training not found', 404);
  }

  return trainings;
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  listTrainingsByTypologyQuery
}