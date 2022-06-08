const { getConnection } = require('../getConnection');
const { generateError } = require('../../helpers');
const deleteTrainingByIdQuery = async ( id ) => {
  let connection;

  try {
    connection = await getConnection();

    const [trainings] = await connection.query(`SELECT * FROM trainings WHERE id = ?`,[id])

    if (trainings.length < 1) throw generateError ('Training not exist', 404);

    await connection.query(`
      DELETE FROM trainings WHERE id = ?
    `,[id])
  } finally {
    if (connection) connection.release();
  }

}
module.exports = { deleteTrainingByIdQuery };