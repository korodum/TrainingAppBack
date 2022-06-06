const { getConnection } = require('../getConnection');

const { generateError } = require('../../helpers')

const selectTrainingByNameQuery = async (name) => {
  let connection;

  try {
    connection = await getConnection();


    const [trainings] = await connection.query(
      `SELECT * FROM trainings WHERE name = ?`,[name]
    )
      console.log('trainings', trainings)
    if (trainings.length < 1) {
     throw generateError ('training not found', 404);
    }

    return trainings [0];
  } finally {
    if (connection) connection.release();
  }

}

module.exports = {
  selectTrainingByNameQuery
};