const {getConnection} = require('../getConnection.js');

const {generateError} = require('../../helpers')

const newTrainingQuery = async (name, muscleGroup, typology, description, image ='') => {

  let connection;

  try {
    connection = await getConnection();
    const [trainings] = await connection.query(`
      SELECT id FROM trainings WHERE name = ?
    `,[name]);
    console.log(trainings)
    if(trainings.length > 0) throw generateError('A training with the same name already exists', 409);

    const [newTraining] = await connection.query(`
      INSERT INTO trainings ( name, muscleGroup, typology, description, image) VALUES (?,?,?,?,?)
    `,
    [name, muscleGroup, typology, description, image]);

    return newTraining.inserId;

  } finally {
    if (connection) connection.release();
  }

}

module.exports = {
  newTrainingQuery,
}