const {getConnection} = require('../getConnection');

const {generateError} = require('../../helpers');

const selectUserByEmailQuery = async ( email )=>{
    let connection;
    
    try {
        //Nos conectamos
        connection = await getConnection();

        // Seleccionamos el usuario
        const [users] = await connection.query(`SELECT * FROM users WHERE email = ?`,[email]);
        
        // Si ahora el length del array de users es menos a 1 es que no 
        // hay un usuario con ese email
        if(users.length<1) throw generateError('Invalid email or password',409 );

        // En caso contrario hay match! y devolvemos el usuario.
        return users[0];

    } finally  {
        if(connection) connection.release();
    }
}

module.exports = {selectUserByEmailQuery};