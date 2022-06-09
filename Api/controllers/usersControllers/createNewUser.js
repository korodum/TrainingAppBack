const {createNewUserQuery} = require('../../db/userQueries/createNewUserQuery');

const generateError = require('../../helpers');

const createNewUser = async (req,res,next)=>{
    try{
        // Recogemos los campos del body.
        const {name,email,password,role} = req.body;

        // Han de rellenarse todos los campos
        if(!name || !email || !password || !role ) throw generateError('Fill all fields',400);


        // Creamos un usuario en la base de datos.
        await createNewUserQuery(name,email,password,role);
        res.send({
            status:'ok',
            message:`The user ${name} with the role ${role} ahs been created succsefully`,
        })


    }catch(error){next(error)}
};

module.exports = createNewUser;