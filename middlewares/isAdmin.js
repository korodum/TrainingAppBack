const isAdmin = async (req, res, next) => {
  try {
    if(req.user.role !== 'admin') {
      const err = new Error('You must be an admin to perform this action');
      err.statusCode = 401;
      throw err;
    }

    next();
  }catch(err) {
    next(err);
  }
}

module.exports = {
  isAdmin
}