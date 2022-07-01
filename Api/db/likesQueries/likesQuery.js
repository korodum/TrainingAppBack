const {getConnection} = require('../getConnection');

const likesQuery = async (idUser, idTraining) =>{
    let connection;

    try{
        connection = await getConnection();

        const [trainings] = await connection.query(`
            SELECT votes FROM likes WHERE idUser = ? and idTraining= ? `, [idUser,idTraining]
        );
        
        if(trainings.length < 1){
            await connection.query(`
            INSERT INTO likes (idUser, idTraining, createdAt)
            VALUES (?,?,?)
            `,[idUser, idTraining, new Date()])
            return true;
        }else{
            await connection.query(`
            UPDATE likes SET votes =? WHERE idUser= ? and idTraining = ?
            `, [!trainings[0].votes, idUser, idTraining ]
            );
            return !trainings[0].votes;
        }

    } finally {
        if (connection) connection.release();
    }

};

module.exports = likesQuery;