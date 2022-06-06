const { getConnection } = require('../getConnection');

const deleteTrainingByNameQuery = async ( name ) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(`
      DELETE FROM trainings WHERE name = ?
    `,[name])
  } finally {
    if (connection) connection.release();
  }

}
module.exports = { deleteTrainingByNameQuery };