const {selectLikesQuery} = require('../../db/likesQueries/selectLikesQuery');


const totalLikes = async (req,res,next)=>{
    try {
        const {idTraining} = req.params
        
        const sumLikes = await selectLikesQuery(idTraining);

        res.send({
            status:'ok',
            data:{  
                sumLikes
            }
        })

    } catch (error) {
        next(error)
    }
};

module.exports = {totalLikes};