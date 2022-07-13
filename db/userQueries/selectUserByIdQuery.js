const {getConnection} = require('../getConnection');

const { generateError } = require('../../helpers');

const selectUserByIdQuery = async (userId) => {
    let connection;

    try {
        connection = await getConnection();

        const [users] = await connection.query(
            `SELECT id, name, email, createdAt FROM users WHERE id = ?`,
            [userId]
        );

        // Si no hay usuarios con ese id lanzamos un error.
        if (users.length < 1) {
            throw generateError('Usuario no encontrado', 404);
        }

        // Hacemos destructuring de las propiedades del usuario.
        const { id, name, email, createdAt } = users[0];

        // Información básica que retornaremos a todo el mundo.
        const userInfo = {
            id,
            name,
            createdAt,
        };

        // Si somos el propio usuario agregamos más info.
        if (userId === users[0].id) {
            userInfo.email = email;
        }

        // Retornamos el usuario que está en la posición 0 del array "users".
        return userInfo;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByIdQuery;
