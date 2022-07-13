const { getConnection } = require('../getConnection');

const { generateError } = require('../../helpers'); // ***??***

const listTrainingsQuery = async ( userId, typology, muscleGroup) => {
  let connection;

  try {
    connection = await getConnection();

    typology = typology || `%`;
    muscleGroup = muscleGroup || `%`;

    const [trainings] = await connection.query (`
      SELECT T.id, T.userId, U.name, T.name,T.muscleGroup, T.typology, T.description, T.image,
      SUM(IFNULL(L.votes=1,0)) as likes, T.userId=? AS owner, BIT_OR(L.userId = ? AND L.votes=1) AS likedByMe, T.createdAt
      FROM trainings T
      LEFT JOIN likes L
      ON T.id = L.trainingId
      LEFT JOIN users U
      ON T.userId = U.id
      WHERE typology LIKE ?
      AND muscleGroup LIKE ?
      GROUP BY T.id
      ORDER BY T.createdAt DESC`,
      [userId, userId, `%${typology}%`, `%${muscleGroup}%`]
    )

    return trainings
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  listTrainingsQuery
}