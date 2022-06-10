const isTrainer = async (req, res, next) => {
  try {
    if(req.user.role !== 'admin' || 'trainer') {
      const err = new Error('You must be an admin or a trainer to perform this action');
      err.statusCode = 401;
      throw err;
    }

    next();
  }catch(err) {
    next(err);
  }
}

module.exports = {
  isTrainer
}