const  {updateUserQuery} = require('../../db/userQueries/updateUserQuery');
const {getConnection} = require('../../db/getConnection');
const { generateError } = require('../../helpers');

const modifyUser = async (req,res,next) =>{
    let connection;
    try{
        connection = await getConnection();

        // Destructuring del id recogido de los params
        const {userId} = req.params;

        // Destrucutring del id almacenado en el token.
        const {userId:userIdToken, role} = req.user;


        //Destructuring de los datos que recibimos del body
        const { name, email } = req.body;


        // Nos aseguramos de que el usuario que intenta modificar es el suyo.
        if(userId!=userIdToken && role!= 'admin') throw generateError('¡You cannot delete a user diferent than yours!', 404)


        // Llamamos a nuestra query con los parametros del body
        await updateUserQuery(userId,name,email)

        // Enviamos un mensaje de que todo ha ido bien
        res.send({
            status:'ok',
            message: `User ${name} updated succesfully`,
        })

    }catch (error){
        next(error)
    }
}

module.exports = {modifyUser};