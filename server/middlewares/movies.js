const MoviesModel = require('../models/Movie');

async function moviesCount(req, res, next) {
  req.data = {
    moviesCount: await MoviesModel.count()
  };

  next();
}

module.exports = {
  moviesCount
};
