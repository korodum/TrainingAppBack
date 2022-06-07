const  updateUserQuery = require('../../db/userQueries/updateUserQuery');

const modifyUser = async (req,res,next) =>{

    try{
        // Destructuring del id recogido de los params
        const {id} = req.params;
        
        //Destructuring de los datos que recibimos del body
        const { name, email } = req.body;
        
        // Llamamos a nuestra query con los parametros del body
        await updateUserQuery(id,name,email)

        // Enviamos un mensaje de que todo ha ido bien
        res.send({
            status:'ok',
            message: `User ${name} updated succesfully`,
        })

    }catch (error){
        next(error)
    }
}

module.exports = modifyUser;