const { generateError } = require('../../helpers');
const {getConnection} = require('../getConnection');

const deleteUserQuery = async (idUser) => {
    let connection;

    try{
        // Nos conectamos a la base de datos.
        connection = await getConnection();

        // Seleccionamos el rol del usuario con un id concreto.
        const [ users ] = await connection.query(`SELECT role FROM users WHERE id = ?`,[idUser] );

        // Si el array es menor a 1 no hay usuario con el id indicado
        if(users.length<1){ throw generateError('The user does not exist', 404) };

        // Comprobamos si se intenta eliminar al usuario administrador.
        if(users[0].role==='admin') throw generateError('Admin user cannot be deleted', 403);

        // Función para eliminar el usuario
        await connection.query(`DELETE FROM users WHERE id = ?`,[idUser]);


    }finally {
        if(connection) connection.release()
    };
}

module.exports = {deleteUserQuery};