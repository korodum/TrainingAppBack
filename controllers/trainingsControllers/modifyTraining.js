const { modifyTrainingQuery } = require('../../db/trainingQueries/modifyTrainingQuery');
const { selectTrainingByIdQuery } = require('../../db/trainingQueries/selectTrainingByIdQuery');
const { getConnection }  = require('../../db/getConnection');
const { createPathIfNotExists, deletePhoto } = require ('../../helpers.js');
const sharp = require('sharp');
const path = require('path');
const {nanoid} = require('nanoid');

const modifyTraining = async ( req, res, next ) => {

  let connection;

  try {
    connection = await getConnection();

    const {trainingId} = req.params;

    const { name, description, typology,muscleGroup} = req.body;


    const training = await selectTrainingByIdQuery(req.user.userId,trainingId)

    let imgName = training.image || null;

    if( req.files && req.files.image ) {

      if (training.image) {

        deletePhoto(training.image);
      }


      const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

      await createPathIfNotExists(uploadsDir);

      const sharpImg = sharp(req.files.image.data);

      sharpImg.resize(500);

      imgName = `${nanoid(24)}.jpg`;

      const imgPath = path.join(uploadsDir, imgName);

      await sharpImg.toFile(imgPath);

    }

    await modifyTrainingQuery(trainingId, name, description, typology, muscleGroup, imgName)

    res.send({
      status: 'ok',
      message: `Training updated`
    })
  } catch (error) {
    next(error);
  }
}

module.exports = {
  modifyTraining
}