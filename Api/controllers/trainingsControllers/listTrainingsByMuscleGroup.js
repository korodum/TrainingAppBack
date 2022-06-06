const {listTrainingsByMuscleGroupQuery} = require('../../db/trainingQueries/listTrainingsByMuscleGroupQuery');

const listTrainingsByMuscleGroup = async ( req, res, next ) => {
  try {
    const { muscleGroup } = req.query;
    console.log(muscleGroup)
    const { trainings} = await listTrainingsByMuscleGroup(muscleGroup);

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