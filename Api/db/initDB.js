const {getConnection} = require('./getConnection');


async function main() {

    let connection;

    try {

        connection = await getConnection();

        console.log('Deleting existing tables');

        await connection.query('DROP TABLE IF EXISTS likes')
        await connection.query('DROP TABLE IF EXISTS plans')
        await connection.query('DROP TABLE IF EXISTS trainings')
        await connection.query('DROP TABLE IF EXISTS users');

        await connection.query(`
        CREATE TABLE IF NOT EXISTS users(
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(25) NOT NULL,
            password VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            role ENUM('admin','trainer','user') DEFAULT 'user',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `)

        await connection.query(`
        CREATE TABLE IF NOT EXISTS trainings(
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(25) NOT NULL,
            description VARCHAR(300) NOT NULL,
            typology ENUM('strength','flexibility','cardio','resistance','equilibrium','recovery') DEFAULT 'strength',
            muscleGroup ENUM('back','chest','arms','shoulders','legs'),
            image VARCHAR(100),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS plans(
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(25) NOT NULL,
            description VARCHAR(300) NOT NULL,
            typology ENUM('strength','flexibility','cardio','resistance','equilibrium','recovery') DEFAULT 'strength',
            muscleGroup ENUM('back','chest','arms','shoulders','legs'),
            trainerId INT,
            trainingId INT NOT NULL,
            userId INT,
            FOREIGN KEY (trainerId) REFERENCES users(id),
            FOREIGN KEY (trainingId)REFERENCES trainings(id),
            FOREIGN KEY (userId) REFERENCES users(id),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `)
        await connection.query(`
        CREATE TABLE IF NOT EXISTS likes(
            id  INT PRIMARY KEY AUTO_INCREMENT,
            idUser INT NOT NULL,
            idTraining INT NOT NULL,
            FOREIGN KEY (idUser) REFERENCES users(id),
            FOREIGN KEY (idTraining) REFERENCES trainings(id)
        )
        `)
        console.log('Tables created susccesfully')

    } catch (error) {
        console.error(error);
    }finally{
        if(connection) connection.release();
        process.exit();
    }
}

main()