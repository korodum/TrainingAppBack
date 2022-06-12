const isTrainer = async (req, res, next) => {
  try {

  if(req.user.role === 'trainer' || req.user.role === 'admin') {
    next();
    } else{
      const err = new Error('You must be an admin or a trainer to perform this action');
      err.statusCode = 401;
      throw err;

    }
  }catch(err) {
    next(err);
  }
}

module.exports = {
  isTrainer
}