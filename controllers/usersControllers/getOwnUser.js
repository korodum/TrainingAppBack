const selectUserByIdQuery = require('../../db/userQueries/selectUserByIdQuery');

const getOwnUser = async (req, res, next) => {
    try {
        const {userId} = req.user
        const user = await selectUserByIdQuery(userId);
        console.log(user);
        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {getOwnUser};
