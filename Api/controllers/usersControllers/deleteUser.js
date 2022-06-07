const deleteUserQuery = require('../../db/userQueries/deleteUserQueries');

const deleteUser = async ( req, res, next)=>{
try{
    // Recogemos el idUser del usuarioq ue va ser eliminado del body
    const { id } = req.params;

    // LLamamos a nuestra query para eliminar al usuario
    await deleteUserQuery(id);

    // Enviamos mensaje de que todo ha ido bien.
    res.send({
        status:'ok',
        message:'User deleted'
    })
}catch (error){ next(error) }
}

module.exports = deleteUser;