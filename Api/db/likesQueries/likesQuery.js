const {getConnection} = require('../getConnection');

const likesQuery = async (idTraining, idUser) =>{
    let connection;

    try{
        connection = await getConnection();

        const [likes] = await connection.query(`
            SELECT vote FROM likes WHERE idTraining= ? and idUser = ? `, [idTraining,idUser]
        );
        
        if(likes.length < 1){
            await connection.query(`
            INSERT INTO likes (idTraining, idUser)
            VALUES (?,?)
            `,[idTraining, idUser])
            return true;
        }else{
            await connection.query(`
            UPDATE likes SET vote =? WHERE idTraining= ? and idUser = ?
            `, [!likes[0].vote, idTraining, idUser]);
            return !likes[0].vote;
        }

    } finally {
        if (connection) connection.release();
    }

};

module.exports = likesQuery;