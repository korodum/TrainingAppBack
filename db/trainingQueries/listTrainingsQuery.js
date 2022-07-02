const { getConnection } = require('../getConnection');

const { generateError } = require('../../helpers');

const listTrainingsQuery = async ( typology, muscleGroup) => {
  let connection;

  try {
    connection = await getConnection();
    typology = typology || `%`
    muscleGroup = muscleGroup || `%`
    const [trainings] = await connection.query (`SELECT * FROM trainings WHERE typology LIKE ? AND muscleGroup LIKE ? `,[`%${typology}%`, `%${muscleGroup}%`])

    return trainings
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  listTrainingsQuery
}