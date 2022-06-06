const {selectTrainingByNameQuery} = require ('../../db/trainingQueries/selectTrainingByNameQuery.js');
const { deleteTrainingByNameQuery} = require ('../../db/trainingQueries/deleteTrainingByNameQuery.js');

const { generateError, deletePhoto } = require ('../../helpers');

const deleteTrainingByName = async (req, res, next) => {
  try {
    const {trainingName} = req.params;

    const training = await selectTrainingByNameQuery( trainingName);

    if(training.image) await deletePhoto( training.image);

    await deleteTrainingByNameQuery( trainingName);

    res.send({
      status: 'success',
      message: 'Training deleted'
    })
  } catch (err) {
    next(err);
  }

}

module.exports = {
  deleteTrainingByName
}