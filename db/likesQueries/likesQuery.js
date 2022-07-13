const {getConnection} = require('../getConnection');

const likesQuery = async (userId, trainingId) =>{
    let connection;

    try{
        connection = await getConnection();

        const [trainings] = await connection.query(`
            SELECT votes FROM likes WHERE userId = ? and trainingId= ? `, [userId,trainingId]
        );

        if(trainings.length < 1){
            await connection.query(`
            INSERT INTO likes (userId, trainingId, createdAt)
            VALUES (?,?,?)
            `,[userId, trainingId, new Date()])
            return true;
        }else{
            await connection.query(`
            UPDATE likes SET votes =? WHERE userId= ? and trainingId = ?
            `, [!trainings[0].votes, userId, trainingId ]
            );
            return !trainings[0].votes;
        }

    } finally {
        if (connection) connection.release();
    }

};

module.exports = likesQuery;