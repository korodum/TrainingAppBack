const { modifyTrainingQuery } = require('../../db/trainingQueries/modifyTrainingQuery');
const { getConnection }  = require('../../db/getConnection');

const modifyTraining = async ( req, res, next ) => {
  let connection;

  try {
    connection = await getConnection();

    const {trainingId} = req.params;
    console.log(trainingId)
    let {name, description, typology, muscleGroup} = req.body;

    if(!name) {
      const [currentName] = await connection.query(`SELECT name FROM trainings WHERE id = ?`,[trainingId]);

      name = currentName[0];

      console.log(`currentName: ${currentName}`, currentName);

    }

    if(!description){
      const [currentDescription] = await connection.query(`SELECT description FROM trainings WHERE id = ?`,[trainingId]);

      description = currentDescription

      console.log(`currentDescription: ${description}`);
    }

    if(!typology){
      const [currentTypology] = await connection.query(`SELECT typology FROM trainings WHERE id = ?`,[trainingId]);

      typology= currentTypology[0];

      console.log(`currentTypology: ${typology}`, currentTypology)

    }

    if(!muscleGroup) {
      const [currentMuscleGroup] = await connection.query(`SELECT muscleGroup FROM trainings WHERE id = ?`,[trainingId]);

      muscleGroup = currentMuscleGroup[0];

      console.log(`currentMuscleGroup: ${currentMuscleGroup}`, currentMuscleGroup)
    }

    await modifyTrainingQuery(trainingId, name, description, typology, muscleGroup)

    res.send({
      status: 'ok',
      message:`Training ${name} succsefully updated`,
    })

  } catch (error) {
    next(error);
  }
}

module.exports = {
  modifyTraining
}