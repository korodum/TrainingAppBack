const { selectTrainingByIdQuery } = require('../../db/trainingQueries/selectTrainingByIdQuery');

const selectTrainingById = async (req, res, next) => {
  try {
    const { trainingId } = req.params
    const idUser = req.user.idUser;
    const training = await selectTrainingByIdQuery(idUser, trainingId);
    res.send({
      status: 'ok',
      data: training,
    });

  } catch (err) {
    next(err);
  }
};

module.exports = {
  selectTrainingById
}
