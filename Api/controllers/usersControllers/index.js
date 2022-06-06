const createNewUser = require('./createNewUser');
const login = require('./login');
const deleteUser = require('./deleteUser');
const listUsers = require('./listUsers');
const modifyUser = require('./modifyUser');

module.exports= {
    createNewUser,
    login,
    deleteUser,
    listUsers,
    modifyUser,
}