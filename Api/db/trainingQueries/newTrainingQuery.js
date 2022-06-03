const {getConnection} = require('../getConnection.js');

const newTrainingQuery = async (name, muscleGroup, typology, description, image ='') => {

  let connection;

  try {
    connection = await getConnection();

    await connection.query(`
      INSERT INTO trainings ( name, muscleGroup, typology, description, image) VALUES (?,?,?,?,?)
    `,
    [name, muscleGroup, typology, description, image])

  } finally {
    if (connection) connection.release();
  }

}

module.exports = {
  newTrainingQuery,
}