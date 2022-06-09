const likesQuery = require('../../db/likesQueries/likesQueries');


const likes = async (req,res,next)=>{
    try{
    const {idTraining} = req.params;
    const {idUser} = req.user;

    const vote = await likesQuery(idTraining, idUser)
    const message = vote ? "Like enviado" : "Like eliminado"
    res.send({
        status:'ok',
        message
    })

    }catch(error){next(error)}
};

module.exports = {
    likes
};