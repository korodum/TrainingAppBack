const  {updateUserQuery} = require('../../db/userQueries/updateUserQuery');
const {getConnection} = require('../../db/getConnection');

const modifyUser = async (req,res,next) =>{
    let connection;
    try{
        connection = await getConnection();
        // Destructuring del id recogido de los params
        const {id} = req.params;

        //Destructuring de los datos que recibimos del body
        const { name, email } = req.body;

        if(!email){
            const [currentEmail] = await connection.query(`SELECT email FROM users WHERE id= ?`, [id]);
            console.log(`Current email is ${currentEmail}`, currentEmail)
        }
        // Llamamos a nuestra query con los parametros del body
        await updateUserQuery(id,name,email)

        // Enviamos un mensaje de que todo ha ido bien
        res.send({
            status:'ok',
            message: `User ${name} updated succesfully`,
        })

    }catch (error){
        next(error)
    }
}

module.exports = {modifyUser};