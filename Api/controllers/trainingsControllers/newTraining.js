const path = require('path');
const sharp = require('sharp');
const{ nanoid } = require('nanoid');
const { newTrainingQuery } = require('../../db/trainingQueries/newTrainingQuery');

const { generateError, createPathIfNotExists } = require('../../helpers');

const newTraining = async (req, res, next) => {
  try{
    // Recogemos los campos del body.
    const {name, muscleGroup , typology, description, image } = req.body;

    // Han de rellenarse todos los campos
    if(!name || !muscleGroup || !typology || !description ) {

      throw generateError(
        'Fill all fields',
        400

        );
    }


    if( req.files && req.files.image ) {

      const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

      await createPathIfNotExists(uploadsDir);

      const sharpImg = sharp(req.files.image.data);

      sharpImg.resize(500);

      imgName = `${nanoid(24)}.jpg`;
      console.log(imgName);
      const imgPath = path.join(uploadsDir, imgName);

      await sharpImg.toFile(imgPath);

    }


    // Creamos un usuario en la base de datos.
    await newTrainingQuery(name, description, typology, muscleGroup ,imgName);

    res.send({
      status:'ok',
      message:`The training ${name} has been created succsefully`
  })

  }catch(err){

    next(err);

  }

}
module.exports = {
  newTraining
}