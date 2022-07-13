const likesQuery = require('../../db/likesQueries/likesQuery');


const likes = async (req,res,next)=>{
    try{
    const {trainingId} = req.params;
    const {userId} = req.user;


    const vote = await likesQuery(userId, trainingId);
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