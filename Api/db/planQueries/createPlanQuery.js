const { getConnection } = require ('../getConnection');
const { generateError } = require ('../../helpers');

const createPlanQuery = async ( name, muscleGroup, trainerId, trainingId, userId ) => {
  let connection;

  try {
    connection = await getConnection();

    const newPlan = await connection.query(`
      INSERT INTO plans ( name, muscleGroup, trainerId, trainingId, userId )
    `)
  } finally {

  }

}