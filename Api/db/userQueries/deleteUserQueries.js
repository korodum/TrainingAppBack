const { generateError } = require('../../helpers');
const {getConnection} = require('../getConnection');

const deleteUserQuery = async (id) => {
let connection;

try{
    connection = await getConnection();

    // Seleccionamos al usuario por id y su rol
    const [ users ] = await connection.query(`SELECT role FROM users WHERE id = ?`,[id] );

    console.log(users)
    // Si el array es menor a 1 no hay usuario con el id indicado
    if(users.length<1){ throw generateError('The user does not exist', 404) };

    // Comprobamos si se intenta eliminar al usuario administrador.
    if(users[0].role==='admin') throw generateError('Admin user cannot be deleted', 403);

    // Función para eliminar el usuario 
    await connection.query(`DELETE FROM users WHERE id = ?`,[id]);


}finally { if(connection) connection.release() };

}

module.exports = deleteUserQuery;