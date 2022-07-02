const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {selectUserByEmailQuery} = require('../../db/userQueries/selectUserByEmailQuery');

const { generateError } = require('../../helpers');

const login = async (req,res,next) =>{
    try{
        // Caputuramos los datos del body
        const {email, password} = req.body;

        //El campo email y password deben ser rellenado si no lanzamos error
        if(!email || !password)throw generateError('Introduce todos los datos', 400);

        // Recogemos el email que nos viene por la query
        const userLogin = await selectUserByEmailQuery(email);
        
        // Comprobamos si las contraseñas coinciden
        const match = await bcrypt.compare(password, userLogin.password);

        // Si no es correcta lanzamos error.
        if(!match) throw generateError('Invalid password',401 );

        // Almacenamos los datos que queremos en el token.
        const payload = {
            idUser:userLogin.id,
            role:userLogin.role,
        };

        // Creamos el token del usuario.
        const token = jwt.sign( payload, process.env.SECRET,{
            expiresIn:'30d'
        })

        res.send({
            status:'ok',
            data:{ token, payload },
            message:`Welcome!`,
        })

    }catch(error){ 
        next(error) 
    }

}

module.exports = {login};