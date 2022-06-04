const {getConnection} = require('../getConnection');

const {generateError} = require('../../helpers');

const selectUserQuery = async (  )=>{
    let connection;
    
    try {
        //Nos conectamos
        connection = await getConnection();

        // Seleccionamos el usuario con su nombre y rol
        const [users] = await connection.query(`SELECT name, role FROM users`);
        
        if(users.length===0) throw generateError('No users found :(', 404);

        // Devolvemos al usuario
        return users;

    } finally  {
        if(connection) connection.release();
    }
}

module.exports = selectUserQuery;