const { listTrainingsQuery } = require('../../db/trainingQueries/listTrainingsQuery');

const listTrainings = async ( req, res, next ) =>{
  try {
    const {typology, muscleGroup} = req.query;
    const idUser = req.user.idUser;

    const trainings = await listTrainingsQuery (idUser, typology, muscleGroup);

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