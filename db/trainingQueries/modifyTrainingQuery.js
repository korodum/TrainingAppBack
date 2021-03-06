const { getConnection } = require('../getConnection');

const { generateError } = require('../../helpers');

const modifyTrainingQuery = async (id, name, description, typology, muscleGroup, imgName) => {
  let connection;

  try {
    connection = await getConnection();

    const [trainings] = await connection.query(`SELECT name, description, typology, muscleGroup FROM trainings WHERE id = ?`,[id]);

    if(trainings.length < 1) throw generateError ('No trainings found', 404);

      name = name || trainings[0].name;
      description = description || trainings[0].description;
      typology = typology || trainings[0].typology;
      muscleGroup = muscleGroup || trainings[0].muscleGroup;
      image = imgName || trainings[0].image;
      console.log(image);
    await connection.query(`
      UPDATE trainings SET
      name = ?,
      description = ?,
      typology = ?,
      muscleGroup = ?,
      image = ?
      WHERE id = ?
    `,[name, description, typology, muscleGroup, image, id]);

    return trainings;

  } finally {
    if(connection) connection.release();
  }
}

module.exports = {
  modifyTrainingQuery
}