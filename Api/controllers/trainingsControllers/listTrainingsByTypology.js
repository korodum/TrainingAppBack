const { listTrainingsByTypologyQuery } = require('../../db/trainingQueries/listTrainingsByTipologyQuery');

const listTrainingsByTypology = async ( req, res, next ) => {
  try {
    const { typology } = req.params;
    const trainings = await listTrainingsByTypologyQuery(typology);

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
  listTrainingsByTypology
}