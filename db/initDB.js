const {getConnection} = require('./getConnection');
const {registerQuery} = require('./userQueries/registerQuery');
const { createPlanQuery } = require('./planQueries/createPlanQuery');
const { newTrainingQuery } = require('./trainingQueries/newTrainingQuery');
async function main() {

    let connection;

    try {

        connection = await getConnection();

        console.log('Deleting existing tables');

        await connection.query('DROP TABLE IF EXISTS planTrainings');
        await connection.query('DROP TABLE IF EXISTS likes');
        await connection.query('DROP TABLE IF EXISTS plans');
        await connection.query('DROP TABLE IF EXISTS trainings');
        await connection.query('DROP TABLE IF EXISTS users');

        await connection.query(`
        CREATE TABLE IF NOT EXISTS users(
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(25) NOT NULL,
            password VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            role ENUM('admin','trainer','user') DEFAULT 'user',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS trainings(
            id INT PRIMARY KEY AUTO_INCREMENT,
            idUser INT NOT NULL,
            FOREIGN KEY (idUser) REFERENCES users(id),
            name VARCHAR(50) UNIQUE NOT NULL,
            description VARCHAR(500) NOT NULL,
            typology ENUM('strength','flexibility','cardio','resistance','equilibrium','recovery') DEFAULT 'strength',
            muscleGroup ENUM('back','chest','arms','shoulders','legs','full body','cardio'),
            image VARCHAR(100),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS plans(
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(25) NOT NULL,
            description VARCHAR(300) ,
            typology ENUM('strength','flexibility','cardio','resistance','equilibrium','recovery') DEFAULT 'strength',
            trainerId INT,
            userId INT,
            FOREIGN KEY (trainerId) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        await connection.query(`
        CREATE TABLE IF NOT EXISTS planTrainings(
            id INT PRIMARY KEY AUTO_INCREMENT,
            idPlan INT NOT NULL,
            idTraining INT NOT NULL,
            sets TINYINT NOT NULL,
            reps TINYINT NOT NULL,
            FOREIGN KEY (idPlan) REFERENCES plans(id) ON DELETE CASCADE,
            FOREIGN KEY (idTraining) REFERENCES trainings(id),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
        )
        `);
        await connection.query(`
        CREATE TABLE IF NOT EXISTS likes(
            id INT PRIMARY KEY AUTO_INCREMENT,
            votes BOOLEAN DEFAULT true,
            idUser INT NOT NULL,
            FOREIGN KEY (idUser) REFERENCES users(id) ON DELETE CASCADE,
            idTraining INT NOT NULL,
            FOREIGN KEY (idTraining) REFERENCES trainings(id) ON DELETE CASCADE,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
        )
        `);

        console.log('Tables created susccesfully');

        /* ***
        ------------------------------------------------
        CREATE DB FOR DEFAULT
        ------------------------------------------------
        USERS
        ------------------------------------------------
        *** */

        await registerQuery('admin','admin@admin.com','123456','admin');
        console.log('test admin created');
        await registerQuery('trainer','trainer@trainer.com','123456','trainer');
        console.log('test trainer created')
        await registerQuery('user','user@user.com','123456','user');
        console.log('test user created');

        /*  ***
        ------------------------------------------------
        TRAININGS (LEGS, CHEST CARDIO)
        ------------------------------------------------
        *** */

        await newTrainingQuery(1, 'squat', 'A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up. During the descent of a squat, the hip and knee joints flex while the ankle joint dorsiflexes; conversely the hip and knee joints extend and the ankle joint plantarflexes when standing up', 'strength', 'legs', 'squat.jpg');
        await newTrainingQuery(1, 'deadlift', 'The deadlift is a weight training exercise in which a loaded barbell or bar is lifted off the ground to the level of the hips, torso perpendicular to the floor, before being placed back on the ground. It is one of the three powerlifting exercises, along with the squat and bench press.', 'strength', 'legs', 'deadlift.jpg');
        await newTrainingQuery(1,'hip thrust', 'A barbell hip thrust is a lower-body strength training exercise defined by lifting your lower back and torso with your knees bent and your upper body resting on a bench. With proper form, the barbell hip thrust works muscle groups across your entire lower body, particularly the gluteal muscles', 'strength', 'legs', 'hipThrust.jpg');
        console.log('legs trainings created');

        await newTrainingQuery(1,'chest press', 'Start with your arms at chest level at your sides, elbows bent and pointing out. Slowly exhale and lift your arms above your chest. Inhale and slowly lower your arms to your sides to the starting position. Continue to press up', 'strength', 'chest', 'chestPress.jpg')
        await newTrainingQuery(1, 'dumbbell pullover', 'Keeping your core engaged, take the dumbbell slowly down behind your head. Keep a slight bend in your elbows throughout the movement and dont arch your back. Take the weight down until it is about level with your head, then slowly bring it back up to the starting position', 'strength', 'chest', 'dumbbellPullover.jpg')
        console.log('chest trainings created');

        await newTrainingQuery(1,'rope jump', 'Jumping rope, also known as skipping rope, is a popular activity around the world. Basic jumping rope involves a rope held by one end in each hand that is then spun over the head and back to the feet. When it reaches the feet it is jumped over and spun behind the back and up towards the head again.', 'cardio', 'cardio', 'ropeJump.jpg')
        console.log('cardio trainings created')

        /*  ***
        ------------------------------------------------
        PLANS
        ------------------------------------------------
        *** */
        await createPlanQuery('test', 'a test plan', 'strength', '2', '3')
        console.log('test plan created')

    } catch (error) {
        console.error(error);
    }finally{
        if(connection) connection.release();
        process.exit();
    }
}

main()