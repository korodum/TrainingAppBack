const {register} = require('./register');
const {login} = require('./login');
const {deleteUser} = require('./deleteUser');
const {modifyUser} = require('./modifyUser');
const {getOwnUser} = require('./getOwnUser');
module.exports= {
    register,
    login,
    deleteUser,
    getOwnUser,
    modifyUser,
}