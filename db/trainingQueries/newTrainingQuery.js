const {getConnection} = require('../getConnection.js');

const {generateError} = require('../../helpers')

const newTrainingQuery = async (idUser, name, description, typology, muscleGroup, image ='') => {

  let connection;

  try {
    connection = await getConnection();
    const [trainings] = await connection.query(
      `SELECT id FROM trainings WHERE name = ?`,
      [name]
    );
    
    if(trainings.length > 0) throw generateError('A training with the same name already exists', 409);

    const [newTraining] = await connection.query(
      `INSERT INTO trainings ( idUser, name, description, typology, muscleGroup, image) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [idUser, name, description, typology, muscleGroup, image]
    );

    return newTraining.inserId;

  } finally {
    if (connection) connection.release();
  }

}

module.exports = {
  newTrainingQuery,
}