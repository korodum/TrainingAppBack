
const { getConnection } = require('../getConnection');

const { generateError } = require('../../helpers');

const totalLikesQuery = async (trainingId)=>{

    let connection;
    try {
        connection = await getConnection();

        const [totalLikes] = await connection.query(`
            SELECT SUM(vote) AS totalLikes, trainingId FROM likes WHERE trainingId = ? AND vote = 1;`,[trainingId] );

        if(totalLikes.length===0) throw generateError('Training has no likes',404 );

        return totalLikes;

    } finally {
        if(connection) connection.release()
    }
};

module.exports = {totalLikesQuery};
