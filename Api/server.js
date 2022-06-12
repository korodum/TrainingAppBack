require('dotenv').config();

const { PORT } = process.env;

const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(fileUpload())

/*
*#################
*## Middlewares ##
*#################
*/
const  {isAdmin} = require('./middlewares/isAdmin')
const { isTrainer } = require('./middlewares/isTrainer')
const  {authUser} = require('./middlewares/authUser')
/*
*######################
*## Users Endpoints ###
*######################
*/
const {
  register,
  login,
  deleteUser,
  listUsers,
  modifyUser,
} =
require('./controllers/usersControllers')

// Registramos un usuario.
app.post('/register', register);

// Login de usuario
app.post('/login', login);

// Lista de usuarios
app.get('/users', authUser,isTrainer, listUsers);

// Modificar un usuario
app.put('/users/:idUser', authUser, modifyUser);

// Eliminar al usuario
app.delete('/users/:idUser',authUser, isAdmin, deleteUser);

/*
*##########################
*## Trainings Endpoints ###
*##########################
*/
const {
  newTraining,
  selectTrainingById,
  listTrainings,
  modifyTraining,
  deleteTrainingById,
} = require('./controllers/trainingsControllers');

// create a new training
app.post('/trainings', authUser, isTrainer, newTraining);

//list trainings
app.get('/trainings', authUser, listTrainings)

//select a training by name
app.get('/trainings/:trainingId', authUser, selectTrainingById);

//modify a training
app.put('/trainings/:trainingId', authUser, isTrainer, modifyTraining)

//delete training by name
app.delete('/trainings/:trainingId', authUser, isAdmin, deleteTrainingById);;;

/*
*######################
*## Plans Endpoints ###
*######################
*/
const {
  createPlan,
  addTraining,
  modifyPlanTrainings,
  deleteTrainingFromPlan
} = require('./controllers/plansControllers');

//create a new plan
app.post('/plans',authUser, isTrainer, createPlan);
//add a training to a plan
app.post('/plans/:idPlan', authUser, isTrainer,addTraining)
//modify a plan
app.put('/plans/:trainingId', authUser, isTrainer, modifyPlanTrainings)
//delete a plan
app.delete('/plans/:planId', authUser, isTrainer, deleteTrainingFromPlan)

/*
*######################
*## Likes Endpoints ###
*######################
*/
const {
  likes,
  listLikes
} = require('./controllers/likesControllers/')

app.post('/trainings/:idTraining/likes', authUser, likes)

//Todos los likes de un entrenamiento
app.get('/trainings/:idTraining/listLikes', listLikes)


/*
*######################
*## Middleware Error ##
*######################
*/

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).send({
    status: 'error',
    message: err.message,
  });
});

/*
*##########################
*## Middleware Not Found ##
*##########################
*/

app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});