const {selectLikesQuery} = require('../../db/likesQueries/selectLikesQuery');


const listLikes = async (req,res,next)=>{
    try {
        
        const likesList = await selectLikesQuery();

        res.send({
            status:'ok',
            data:{
                likesList
            }
        })

    } catch (error) {
        next(error)
    }
};

module.exports = {listLikes};