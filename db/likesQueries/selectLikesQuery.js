const { getConnection } = require('../getConnection');

const { generateError } = require('../../helpers');

const selectLikesQuery = async (idLikes)=>{

    let connection;
    try {
        connection = await getConnection();

        const [likes] = await connection.query(`SELECT * FROM likes WHERE trainingId=?`, [idLikes]);

        if(likes.length===0) throw generateError('Training has no likes',404 );

        return likes;

    } finally {
        if(connection) connection.release()
    }
};

module.exports = {selectLikesQuery};
