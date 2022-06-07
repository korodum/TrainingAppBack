const {getConnection} = require('../getConnection');

const {generateError} = require('../../helpers');

const selectUserQuery = async ( id, name, email )=>{
    let connection;
    
    try {
        //Nos conectamos
        connection = await getConnection();

        // Seleccionamos el usuario con su nombre y rol
        const [users] = await connection.query(`SELECT name, email FROM users WHERE id = ?`, [id]);

        if(users.length===0) throw generateError('No users found :(', 404);

        await connection.query(`
            UPDATE users SET 
            name = ?,
            email = ?,
            WHERE
            id=?
        `, [name, email, id])

        // Devolvemos al usuario
        return users;

    } finally  {
        if(connection) connection.release();
    }
}

module.exports = selectUserQuery;