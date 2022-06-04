const deleteUserQuery = require('../../db/userQueries/deleteUserQueries');

const deleteUser = async ( req, res, next)=>{
try{
    // Recogemos el idUser del usuarioq ue va ser eliminado del body
    const { email } = req.body;

    // LLamamos a nuestra query para eliminar al usuario
    await deleteUserQuery(email);

    // Enviamos mensade de que todo ha ido bien.
    res.send({
        status:'ok',
        message:'User deleted'
    })
}catch (error){ next(error) }
}

module.exports = deleteUser;