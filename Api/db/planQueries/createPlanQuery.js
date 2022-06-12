const { getConnection } = require ('../getConnection');
const { generateError } = require ('../../helpers');

const createPlanQuery = async ( name,description, typology, trainerId, userId ) => {
  let connection;

  try {
    connection = await getConnection();

    const newPlan = await connection.query(`
      INSERT INTO plans ( name, description, typology, trainerId, userId ) VALUES (?,?,?,?,?)
    `,[name,description, typology, trainerId, userId]);

    return newPlan.insertId;
  } finally {
    if ( connection ) connection.release();
  }

}

module.exports = {
  createPlanQuery
}