const jwt = require('jsonwebtoken');

const {generateError} = require('../helpers');

const authUser = (req,res,next)=>{

    try {

        const { authorization } = req.headers;

        if(!authorization) throw generateError('Need headers authorization',401);

        let token;

        try{
            token = jwt.verify(authorization, process.env.SECRET);

        } catch (error){
            throw generateError('Token incorrecto', 401);
        }

    req.idUser = token.id;

    next();

    } catch (error) {
        next(error)
    }
}

module.exports = {
    authUser,
}
