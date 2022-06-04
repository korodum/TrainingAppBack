const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const selectUserByEmailQuery = require('../../db/userQueries/selectUserByEmailQuery');

const { generateError } = require('../../helpers');

const login = async (req,res,next) =>{
    try{
        // Caputuramos los datos
        const {email, password} = req.body;

        //El campo email debe ser rellenado!
        if(!email || !password)throw generateError('Introduce todos los datos', 400)

        // Recogemos el email que nos viene por la query
        const userLogin = await selectUserByEmailQuery(email);
        console.log('userLogin', userLogin)
        // Comprobamos si las contraseñas coinciden
        const match = await bcrypt.compare(password, userLogin.password);

        // Si no es correcta lanzamos error.
        if(!match) throw generateError('Invalid password',401 )

        // Almacenamos los datos que queremos en el token.
        const payload = {
            id:userLogin.id,
            role:userLogin.role,
        }

        // Creamos el token del usuario.
        const token = jwt.sign( payload, process.env.SECRET,{ expiresIn:'30d' })

        res.send({
            status:'ok',
            data:{ token }
        })

    }catch(error){ next(error) }

}

module.exports = login;