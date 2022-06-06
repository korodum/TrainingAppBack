const { selectTrainingByNameQuery } = require('../../db/trainingQueries/selectTrainingByNameQuery');

const selectTrainingByName = async (req, res, next) => {
  try {
    const { trainingName } = req.params

    const training = await selectTrainingByNameQuery(trainingName);
    res.send({
      status: 'ok',
      data: {
        training,
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  selectTrainingByName
}
