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
const  {authUser} = require('./middlewares/authUser')
/*
*######################
*## Users Endpoints ###
*######################
*/
const {
  createNewUser,
  login,
  deleteUser,
  listUsers,
} =
require('./controllers/usersControllers')

// Creamos un nuevo usuario.
app.post('/users', createNewUser);

// Login de usuario
app.post('/login', login);

// Eliminar al usuario
app.delete('/users/delete', deleteUser);

// Lista de usuarios
app.get('/users/list', listUsers);
/*
*##########################
*## Trainings Endpoints ###
*##########################
*/
const {
  newTraining,
} = require('./controllers/trainingsControllers');

// create a new training
app.post('/trainings', authUser, isAdmin, newTraining);

/*
*######################
*## Plans Endpoints ###
*######################
*/

/*
*######################
*## Likes Endpoints ###
*######################
*/


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