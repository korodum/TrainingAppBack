const {selectTrainingByIdQuery} = require ('../../db/trainingQueries/selectTrainingByIdQuery.js');
const { deleteTrainingByIdQuery} = require ('../../db/trainingQueries/deleteTrainingByIdQuery.js');

const { deletePhoto } = require ('../../helpers');

const deleteTrainingById = async (req, res, next) => {
  try {
    const {trainingId} = req.params;
    const {idUser} = req.user;
    
    const training = await selectTrainingByIdQuery( idUser, trainingId );

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