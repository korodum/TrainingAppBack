const { listTrainingsQuery } = require('../../db/trainingQueries/listTrainingsQuery');

const listTrainings = async ( req, res, next ) =>{
  try {
    const {typology, muscleGroup} = req.query;

    const trainings = await listTrainingsQuery (typology, muscleGroup);

    res.send({
      status: 'ok',
      data: {
        trainings,
      }
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listTrainings
}