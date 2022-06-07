const  updateUserQuery = require('../../db/userQueries/updateUserQuery');

const modifyUser = async (req,res,next) =>{

    try{
        const {id} = req.params;
        console.log('ID', id)
        const { name, email } = req.body;
        console.log('NAME', name)
        await updateUserQuery(id,name,email)
        res.send({
            status:'ok',
            message: `User ${name} updated succesfully`,
        })


       
    }catch (error){
        next(error)
    }
}

module.exports = modifyUser;