const {selectTrainingByIdQuery} = require ('../../db/trainingQueries/selectTrainingByIdQuery.js');
const { deleteTrainingByIdQuery} = require ('../../db/trainingQueries/deleteTrainingByIdQuery.js');

const { deletePhoto } = require ('../../helpers');

const deleteTrainingById = async (req, res, next) => {
  try {
    const {trainingId} = req.params;

    const training = await selectTrainingByIdQuery( trainingId );
    console.log(training.image)
    if(training.image) await deletePhoto( training.image)

    await deleteTrainingByIdQuery( trainingId );

    res.send({
      status: 'success',
      message: 'Training deleted'
    })
  } catch (err) {
    next(err);
  }

}

module.exports = {
  deleteTrainingById
}