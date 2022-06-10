const { getConnection } = require('../getConnection');

const { generateError } = require('../../helpers');

const modifyTrainingQuery = async (id, name, description, typology, muscleGroup) => {
  let connection;

  try {
    connection = await getConnection();

    const [trainings] = await connection.query(`SELECT name, description, typology, muscleGroup FROM trainings WHERE id = ?`,[id]);

    if(trainings.length < 1) throw generateError ('no trainings found', 404);

    await connection.query(`
      UPDATE trainings SET
      name = ?,
      description = ?,
      typology = ?,
      muscleGroup
      WHERE id = ?
    `,[name, description, typology, muscleGroup, id]);

    return trainings;

  } finally {
    if(connection) connection.release();
  }
}

module.exports = {
  modifyTrainingQuery
}