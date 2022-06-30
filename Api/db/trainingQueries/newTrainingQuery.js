const {getConnection} = require('../getConnection.js');

const {generateError} = require('../../helpers')

const newTrainingQuery = async (name, muscleGroup, typology, description, image ='') => {

  let connection;

  try {
    connection = await getConnection();
    const [trainings] = await connection.query(`
      SELECT id FROM trainings WHERE name = ?
    `,[name]);

    if(trainings.length > 0) throw generateError('A training with the same name already exists', 409);

    const [newTraining] = await connection.query(`
<<<<<<< HEAD
      INSERT INTO trainings ( name,description, typology, muscleGroup, image) VALUES (?,?,?,?,?)
=======
      INSERT INTO trainings ( name, description, typology, muscleGroup, image) VALUES (?,?,?,?,?)
>>>>>>> 33cda1a611b81f9dafd673cfcfd484be254f2261
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