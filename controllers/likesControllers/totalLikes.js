const {selectLikesQuery} = require('../../db/likesQueries/selectLikesQuery');


const totalLikes = async (req,res,next)=>{
    try {
        const {trainingId} = req.params

        const sumLikes = await selectLikesQuery(trainingId);

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