const { getConnection } = require('../getConnection');

const { generateError } = require('../../helpers')

const selectTrainingByIdQuery = async ( idUser,trainingId) => {
  let connection;

  try {
    connection = await getConnection();


    const [trainings] = await connection.query(
      `SELECT * FROM trainings WHERE id = ?`,[trainingId]
    )

    if (trainings.length < 1) {
      throw generateError ('training not found', 404);
    }

    return trainings[0];
  } finally {
    if (connection) connection.release();
  }

}

module.exports = {
  selectTrainingByIdQuery
};