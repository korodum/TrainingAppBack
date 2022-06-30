const { selectTrainingByIdQuery } = require('../../db/trainingQueries/selectTrainingByIdQuery');

const selectTrainingById = async (req, res, next) => {
  try {
    const { trainingId } = req.params

    const training = await selectTrainingByIdQuery(trainingId);
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
