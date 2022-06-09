const  bcrypt = require('bcrypt');

const {getConnection} = require('../getConnection');

const { generateError } = require('../../helpers');

const registerQuery = async (name,email,password, role) =>{

    // Variable para almacenar la conexion.
    let connection;

    try{
         connection = await getConnection();

         // Array de usuarios
         const [users] = await  connection.query(`SELECT id FROM users WHERE email =?`, [email]);

        // Si ya hay un usuario significa que ya existe uno con el mismo email
        if(users.length>0) throw generateError('Email already exists',409 )

        // Encriptamos la contraseña
        const hasedPassword = await bcrypt.hash(password,10);

        // Creamos el usuario
        await connection.query(`
            INSERT INTO users (name,email,password, role) VALUES(?,?,?,?)
        `, [name,email,hasedPassword, role]);

        }finally{
            if(connection) connection.release();

        }
}
module.exports = {
    registerQuery
}