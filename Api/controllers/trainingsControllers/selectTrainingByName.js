const { selectTrainingByNameQuery } = require('../../db/trainingQueries/selectTrainingByNameQuery');

const selectTrainingByName = async (req, res, next) => {
  try {
    const { name } = req.params

    const training = await selectTrainingByNameQuery(name);
    console.log('HOLA MODERFUKER')
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
