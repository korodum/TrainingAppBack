const likesQuery = require('../../db/likesQueries/likesQuery');


const likes = async (req,res,next)=>{
    try{
    const {idTraining} = req.params;
    const {idUser} = req.user;


    const vote = await likesQuery(idUser, idTraining);
    const message = vote ? "Like enviado" : "Like eliminado";
    res.send({
        status:'ok',
        message
    })

    }catch(error){next(error)}
};

module.exports = {
    likes
};