const {listTrainingsByMuscleGroupQuery} = require('../../db/trainingQueries/listTrainingsByMuscleGroupQuery');

const listTrainingsByMuscleGroup = async ( req, res, next ) => {
  try {
    const { muscleGroup } = req.params;
    const trainings = await listTrainingsByMuscleGroupQuery(muscleGroup);

    res.send({
      statue:'ok',
      data: {
        trainings,
      }
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listTrainingsByMuscleGroup
}