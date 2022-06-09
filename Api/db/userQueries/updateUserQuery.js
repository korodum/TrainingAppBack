const {getConnection} = require('../getConnection');

const {generateError} = require('../../helpers');

const updateUserQuery = async ( idUser, nameUser, emailUser )=>{
    let connection;
    
    try {
        //Nos conectamos
        connection = await getConnection();

        // Seleccionamos el usuario mediante id con su nombre y email
        const [users] = await connection.query(`SELECT name, email FROM users WHERE id = ?`, [idUser]);
        console.log('Usuario seleccionado para ser modificado', users)
        // Si no hay usuario devolvemos un error
        if(users.length===0) throw generateError('No users found :(', 404);

        // Actualizamos los datos.
        await connection.query(`
            UPDATE users SET 
            name = ?,
            email = ?
            WHERE
            id=?
        `, [nameUser, emailUser, idUser])

        // Devolvemos al usuario
        return users;

    } finally  {
        if(connection) connection.release();
    }
}

module.exports = {updateUserQuery};