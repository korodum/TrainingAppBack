const selectUserQuery = require('../../db/userQueries/selectUserQuery');

const listUsers = async (req,res,next)=>{

    try {

        // Recogemos la lista de users de la query y la igualamos a una constante
        const usersList = await selectUserQuery()

        // Enviamos los datos
        res.send({
            status:'ok',
            data:{
                usersList,
            }
        })
    } catch (error) {
        next(error);
    }
}

module.exports = listUsers;