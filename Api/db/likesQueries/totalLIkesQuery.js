
const { getConnection } = require('../getConnection');

const { generateError } = require('../../helpers');

const totalLikesQuery = async (idTraining)=>{

    let connection;
    try {
        connection = await getConnection();

        const [totalLikes] = await connection.query(`
            SELECT SUM(vote) AS totalLikes, idTraining FROM likes WHERE idTraining = ? AND vote = 1;`,[idTraining] );

        if(totalLikes.length===0) throw generateError('Training has no likes',404 );

        return totalLikes;

    } finally {
        if(connection) connection.release()
    }
};

module.exports = {totalLikesQuery};


