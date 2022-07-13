const { getConnection } = require('../getConnection');

const { generateError } = require('../../helpers')

const selectTrainingByIdQuery = async ( userId,trainingId) => {
  let connection;

  try {
    connection = await getConnection();

    const [trainings] = await connection.query(
      `SELECT T.id, T.userId, U.name, T.name,T.muscleGroup, T.typology, T.description, T.image,
      SUM(IFNULL(L.votes=1,0)) as likes, T.userId=? AS owner, BIT_OR(L.userId = ? AND L.votes=1) AS likedByMe, T.createdAt
      FROM trainings T
      LEFT JOIN likes L
      ON T.id = L.trainingId
      LEFT JOIN users U
      ON T.userId = U.id
      WHERE T.id = ?
      GROUP BY T.id
      ORDER BY T.createdAt DESC`,
      [userId,userId, trainingId]
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