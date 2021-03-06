const {getConnection} = require('../getConnection');

const {generateError} = require('../../helpers');


const updateUserQuery = async ( userId, nameUser, emailUser )=>{
    let connection;

    try {
        //Nos conectamos
        connection = await getConnection();

        // Seleccionamos el usuario mediante id con su nombre y email
        const [users] = await connection.query(`SELECT * FROM users WHERE id = ?`, [userId]);

        // Si no hay usuario devolvemos un error
        if(users.length===0) throw generateError('No users found :(', 404);

        nameUser = nameUser || users[0].name
        emailUser = emailUser || users[0].email

        // Actualizamos los datos.
        await connection.query(`
            UPDATE users SET
            name = ?,
            email = ?
            WHERE
            id=?
        `, [nameUser, emailUser, userId])

        // Devolvemos al usuario
        return users;

    } finally  {
        if(connection) connection.release();
    }
}

module.exports = {updateUserQuery};