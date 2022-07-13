const { listTrainingsQuery } = require('../../db/trainingQueries/listTrainingsQuery');

const listTrainings = async ( req, res, next ) =>{
  try {
    const {typology, muscleGroup} = req.query;
    const userId = req.user.userId;

    const trainings = await listTrainingsQuery (userId, typology, muscleGroup,);

    res.send({
      status: 'ok',
      data: {
        trainings,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listTrainings
};