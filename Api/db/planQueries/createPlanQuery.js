const { getConnection } = require ('../getConnection');
const { generateError } = require ('../../helpers');

const createPlanQuery = async ( name, muscleGroup, trainerId, userId ) => {
  let connection;

  try {
    connection = await getConnection();

    const newPlan = await connection.query(`
      INSERT INTO plans ( name, muscleGroup, trainerId, userId )
    `);

    return newPlan.insertId;
  } finally {
    if ( connection ) connection.release();
  }

}

module.exports = {
  createPlanQuery
}