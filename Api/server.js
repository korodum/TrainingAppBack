  require('dotenv').config();

const { PORT } = process.env;

const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use(fileUpload());

app.use(express.static('uploads'));

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
app.get('/users/list', authUser,isTrainer, listUsers);

// Modificar un usuario
app.put('/users/modify/:idUser', authUser, modifyUser);

// Eliminar al usuario
app.delete('/users/delete/:id',isAdmin, deleteUser);

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
app.post('/trainings', authUser, isAdmin, newTraining);

//list trainings
app.get('/trainings', authUser, listTrainings)

//select a training by id
app.get('/trainings/:trainingId', authUser, selectTrainingById);

//modify a training
app.put('/trainings/:trainingId', authUser, isAdmin, modifyTraining)

//delete training by id
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
app.post('/plans/:idPlan', authUser, isTrainer,addTraining)
app.put('/plans/:trainingId', authUser, isTrainer, modifyPlanTrainings)
app.delete('/plans/:planId', authUser, isTrainer, deleteTrainingFromPlan)

/*
*######################
*## Likes Endpoints ###
*######################
*/
const {
  likes,
  totalLikes,
} = require('./controllers/likesControllers/');

app.post('/trainings/:idTraining/likes', authUser, likes)

//Todos los likes de un entrenamiento
app.get('/trainings/:idTraining/totalLikes', totalLikes)


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