const  updateUserQuery = require('../../db/userQueries/updateUserQuery');

const modifyUser = async (req,res,next) =>{

    try{
        const {name,email,password,role,id} = req.body;

        await updateUserQuery(name,email,password,role,id)
        res.send({
            status:'ok',
            data:{
                user,
            }
        })
    }catch (error){
        next(error)
    }
}

module.exports = modifyUser;