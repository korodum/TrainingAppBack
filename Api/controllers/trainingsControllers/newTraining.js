const { newTrainingQuery } = require('../../db/trainingQueries/newTrainingQuery');

const { generateError } = require('../../helpers');

const newTraining = async (req, res, next) => {
  try{
    // Recogemos los campos del body.
    const {name, muscleGroup , typology, description } = req.body;

    // Han de rellenarse todos los campos
    if(!name || !muscleGroup || !typology || !description ) throw generateError('Fill all fields',400);


    // Creamos un usuario en la base de datos.
    const user = newTrainingQuery(name,muscleGroup, typology, description);

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