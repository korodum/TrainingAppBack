const {register} = require('./register');
const {login} = require('./login');
const {deleteUser} = require('./deleteUser');
const {listUsers} = require('./listUsers');
const {modifyUser} = require('./modifyUser');

module.exports= {
    register,
    login,
    deleteUser,
    listUsers,
    modifyUser,
}